"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { getLenisInstance } from "@/lib/lenis";
import { bootedThisSession, markSessionBooted, onRobotReady } from "@/lib/boot";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/**
 * Cinematic first-paint preloader — a fake "terminal boot" for a dev studio.
 *
 * Flow: black shutter → terminal types a compile log while a giant 0→100%
 * counter tracks real progress → shutter columns lift like a curtain with
 * lime scanner edges, revealing the site.
 *
 * Performance notes ("smooth as butter"):
 * - Every animated property is a transform / opacity / textContent write —
 *   no layout thrash, no React re-renders during the sequence (state flips
 *   exactly once, at the end, to unmount the overlay).
 * - It runs on the same GSAP ticker that drives Lenis + ScrollTrigger, so
 *   it can never fight the scroll system for a frame.
 * - `sessionStorage` downgrades repeat visits (page reloads) to a ~1.8s
 *   cut via `timeScale` — first visit gets the full cinematic ~3.2s cut.
 * - `prefers-reduced-motion` skips the choreography entirely (simple count +
 *   fade), and a <noscript> rule in layout hides the overlay without JS.
 *
 * Syncing with the 3D robot:
 * - The robot (components/SplineRobot.tsx) starts loading the moment it
 *   mounts, in parallel with this whole sequence.
 * - The big counter is ONE continuous, always-moving value (see the counter
 *   driver inside the effect). It never runs as separate tweens that hand off
 *   to each other, so its speed never snaps or stalls:
 *     • During the scripted intro it follows the terminal log up to
 *       INTRO_COUNTER_CAP. (If the robot is already loaded it simply rides the
 *       same curve all the way to 100 instead.)
 *     • If the robot is still loading when the intro ends, the counter keeps
 *       creeping forward at a slow-but-steady pace — it decelerates gently but
 *       never freezes, and it has enough room left to keep moving for the
 *       whole MAX_EXTRA_WAIT_MS safety window.
 *     • The moment the robot signals ready, the counter glides (accelerates
 *       and eases out — no jump) to exactly 100, then the curtain opens.
 * - Every frame the shown value is *smoothed* toward a target (critically
 *   damped follower), so any change of target — robot ready, intro end, even a
 *   long main-thread stall while Spline initialises — is absorbed as a smooth
 *   change of speed instead of a visible jump.
 */

const BOOT_LINES = [
  "compiling design system",
  "hydrating 3d scene",
  "warming gpu shaders",
];

const FULL_TIMESCALE = 1;
const RELOAD_TIMESCALE = 1.75;

// Where the scripted intro (terminal log) leaves the counter when the robot
// is NOT ready yet. It is deliberately not too close to 100, so there is
// plenty of room left to keep the number moving while we wait on the robot.
const INTRO_COUNTER_CAP = 80;
// While waiting on the robot, the counter creeps toward this ceiling.
const CREEP_CEILING = 99;
// Hard safety net: never hold the curtain closed more than this many extra
// seconds waiting on the robot, even if something upstream went wrong.
const MAX_EXTRA_WAIT_MS = 6000;
const MAX_EXTRA_WAIT_S = MAX_EXTRA_WAIT_MS / 1000;
// Creep pace (percent per second) at the start / end of the wait window. The
// pace eases linearly from START to END and is solved so the creep uses up
// exactly the room between INTRO_COUNTER_CAP and CREEP_CEILING over the whole
// wait window — i.e. it is still visibly ticking right up to the timeout.
const CREEP_END_SPEED = 1.5;
const CREEP_START_SPEED =
  (2 * (CREEP_CEILING - INTRO_COUNTER_CAP)) / MAX_EXTRA_WAIT_S - CREEP_END_SPEED;
// How "soft" the counter's follower is (seconds). Lower = snappier.
const COUNTER_SMOOTH_TIME = 0.22;
// Clamp for a single frame's delta so a long main-thread stall (Spline
// compiling shaders) can never make the counter leap.
const MAX_FRAME_DT = 0.05;
// Counter is considered "arrived" this close to 100 (it already reads 100
// from 99.5 up), at which point it snaps to exactly 100 and the finale plays.
const ARRIVE_EPSILON = 0.3;

/** How far the creep has advanced after `waited` seconds of waiting. */
function creepAdvance(waited: number): number {
  const x = Math.min(Math.max(waited, 0), MAX_EXTRA_WAIT_S);
  return (
    CREEP_START_SPEED * x -
    ((CREEP_START_SPEED - CREEP_END_SPEED) * x * x) / (2 * MAX_EXTRA_WAIT_S)
  );
}

export default function Preloader() {
  const [finished, setFinished] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revisit = bootedThisSession();
    const timeScale = revisit ? RELOAD_TIMESCALE : FULL_TIMESCALE;

    // Freeze the page (Lenis + native) while the intro plays. Sibling effects
    // may create Lenis *after* this effect runs, so defer the stop one tick —
    // by then every mount effect has flushed and the instance exists.
    window.scrollTo(0, 0);
    document.documentElement.classList.add("preloader-lock");
    const stopTick = setTimeout(() => {
      try {
        getLenisInstance()?.stop();
      } catch {
        /* noop */
      }
    }, 0);

    const release = () => {
      document.documentElement.classList.remove("preloader-lock");
      try {
        getLenisInstance()?.start();
      } catch {
        /* noop */
      }
      // Recalculate pinned/scrolltriggered positions now that the overlay
      // is gone and the scroll lock has been lifted.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const counterEl = q(".boot-num")[0] as HTMLElement | undefined;
    const barEl = q(".boot-bar-fill")[0] as HTMLElement | undefined;
    // `progress.v` is the value actually shown on screen (0→100).
    const progress = { v: 0 };
    const writeProgress = () => {
      if (counterEl) counterEl.textContent = String(Math.round(progress.v));
      if (barEl) gsap.set(barEl, { scaleX: progress.v / 100 });
    };

    let cancelled = false;

    /* ------------------------------------------------------------------ */
    /* Counter driver                                                      */
    /*                                                                     */
    /* One continuous value, advanced every frame on the GSAP ticker. It   */
    /* chases a *target* with a critically-damped follower, so the shown   */
    /* number always changes speed smoothly — never a stall, never a jump. */
    /*                                                                     */
    /* Target:                                                             */
    /*  - intro (terminal log still typing): follows the scripted curve    */
    /*    `introTarget` — up to INTRO_COUNTER_CAP, or all the way to 100   */
    /*    if the robot is already loaded.                                  */
    /*  - intro done, robot NOT ready: slow steady creep (never freezes).  */
    /*  - intro done, robot ready (or safety timeout): 100.                */
    /* ------------------------------------------------------------------ */
    const introTarget = { v: 0 }; // scripted 0→INTRO_COUNTER_CAP, tweened by the timeline
    let introDone = false;
    let waitStartedAt = 0;
    let robotGo = false; // robot is ready (or we gave up waiting on it)
    let velocity = 0;
    let counterTick: (() => void) | null = null;
    let offRobotReady: (() => void) | null = null;

    const stopCounter = () => {
      if (counterTick) {
        gsap.ticker.remove(counterTick);
        counterTick = null;
      }
    };

    const markIntroDone = () => {
      if (cancelled) return;
      introDone = true;
      waitStartedAt = performance.now();
    };

    const startCounter = (smoothTime: number, onArrive: () => void) => {
      let lastNow = performance.now();

      const tick = () => {
        const now = performance.now();
        const dt = Math.min((now - lastNow) / 1000, MAX_FRAME_DT);
        lastNow = now;
        if (dt <= 0) return;

        // ---- where should the counter be heading right now? ----
        let target: number;
        if (!introDone) {
          const p = introTarget.v / INTRO_COUNTER_CAP; // 0→1 scripted progress
          target = p * (robotGo ? 100 : INTRO_COUNTER_CAP);
        } else if (robotGo) {
          target = 100;
        } else {
          const waited = (now - waitStartedAt) / 1000;
          target = INTRO_COUNTER_CAP + creepAdvance(waited);
          // Safety net: never wait on the robot forever.
          if (waited >= MAX_EXTRA_WAIT_S) robotGo = true;
        }

        // ---- critically-damped follower (stable for any dt) ----
        const current = progress.v;
        const omega = 2 / smoothTime;
        const x = omega * dt;
        const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
        const change = current - target;
        const temp = (velocity + omega * change) * dt;
        velocity = (velocity - omega * temp) * decay;
        let next = target + (change + temp) * decay;

        // Never overshoot the target, never run backwards, never pass 100.
        if (target - current > 0 === next > target) {
          next = target;
          velocity = 0;
        }
        if (next < current) {
          next = current;
          velocity = Math.max(velocity, 0);
        }
        progress.v = Math.min(next, 100);

        // ---- arrived at 100? hand over to the finale ----
        if (introDone && robotGo && 100 - progress.v <= ARRIVE_EPSILON) {
          progress.v = 100;
          writeProgress();
          stopCounter();
          onArrive();
          return;
        }

        writeProgress();
      };

      counterTick = tick;
      gsap.ticker.add(tick);
    };

    // Flip `robotGo` the moment the robot is ready (immediately, if it
    // already is). The counter driver above reacts on its next frame.
    offRobotReady = onRobotReady(() => {
      robotGo = true;
    });

    const complete = () => {
      release();
      markSessionBooted();
      setFinished(true); // single re-render: unmounts the overlay
    };

    /* ---------------------------------- */
    /* Reduced motion: count up + fade out */
    /* ---------------------------------- */
    if (reduced) {
      const finishReduced = () => {
        if (cancelled) return;
        const tl = gsap.timeline({ onComplete: complete });
        tl.to(root, { autoAlpha: 0, duration: 0.3, ease: "power1.out" }, 0.1);
      };

      startCounter(COUNTER_SMOOTH_TIME, finishReduced);

      const tl = gsap.timeline({ onComplete: markIntroDone });
      tl.set(q(".boot-content"), { autoAlpha: 1 }).to(introTarget, {
        v: INTRO_COUNTER_CAP,
        duration: 0.35,
        ease: "power1.out",
      });

      return () => {
        cancelled = true;
        tl.kill();
        stopCounter();
        offRobotReady?.();
        release();
      };
    }

    /* ------------------------- */
    /* Full cinematic boot log   */
    /* ------------------------- */

    // Plays the "ready" beat + curtain reveal. Called by the counter driver
    // once the counter has smoothly arrived at exactly 100 — which only
    // happens after the robot is confirmed on screen.
    const finishAndReveal = () => {
      if (cancelled) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: complete });
      tl.timeScale(timeScale);

      // Server "goes live", tagline for the finale.
      tl.to(
        q(".boot-status")[0],
        { text: { value: "ready — entering site" }, duration: 0.45, ease: "none" },
        0
      );
      tl.fromTo(
        q(".boot-ok-live")[0],
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)" },
        0.5
      );

      // Content lifts away, then the shutter opens.
      tl.to(
        [q(".boot-content"), q(".boot-counter"), q(".boot-brand"), q(".boot-bar")],
        { y: -32, autoAlpha: 0, duration: 0.45, ease: "power3.in", stagger: 0.04 },
        0.85
      );

      // Arm the lime scanner edges the moment the curtain starts moving.
      tl.set(q(".boot-edge"), { opacity: 1 }, 1.05);

      // Make root container and solid backdrop transparent right as the
      // shutter curtains lift.
      tl.to(root, { backgroundColor: "transparent", duration: 0.05 }, 1.1);
      tl.to(q(".boot-backdrop"), { autoAlpha: 0, duration: 0.05 }, 1.1);

      // Columns shrink toward the top edge (curtains rising), center-out.
      tl.to(
        q(".boot-col"),
        {
          scaleY: 0,
          transformOrigin: "50% 0%",
          duration: 0.65,
          ease: "expo.inOut",
          stagger: { each: 0.055, from: "center" },
        },
        1.1
      );
    };

    startCounter(COUNTER_SMOOTH_TIME / timeScale, finishAndReveal);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: markIntroDone,
    });
    tl.timeScale(timeScale);

    // Phase 0 — show the stage (SSR renders it opacity-0 to avoid FOUC).
    tl.set(q(".boot-content"), { autoAlpha: 1 }, 0);

    // Phase 1 — terminal, counter and brand slide in.
    tl.from(
      q(".boot-rise"),
      { y: 24, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: "expo.out" },
      0.05
    );

    // Phase 2 — the compile log "types" itself (TextPlugin, char by char).
    tl.to(
      q(".boot-cmd")[0],
      { text: { value: "npm run codefrem" }, duration: 0.35, ease: "none" },
      0.2
    );

    const lineStarts = [0.55, 0.85, 1.15];
    lineStarts.forEach((at, i) => {
      tl.to(
        q(".boot-line-text")[i],
        { text: { value: BOOT_LINES[i] }, duration: 0.4, ease: "none" },
        at
      );
      // Status check pops right after its line finishes typing.
      tl.fromTo(
        q(".boot-ok")[i],
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)" },
        at + 0.42
      );
    });

    // Phase 3 — the scripted curve the visible counter follows during the
    // intro. This only drives `introTarget`; the number on screen is the
    // smoothed follower in the counter driver above.
    tl.to(
      introTarget,
      { v: INTRO_COUNTER_CAP, duration: 1.3, ease: "power2.inOut" },
      0.25
    );

    return () => {
      cancelled = true;
      clearTimeout(stopTick);
      tl.kill();
      stopCounter();
      offRobotReady?.();
      release();
    };
  }, []);

  if (finished) return null;

  return (
    <div
      ref={rootRef}
      id="codefrem-preloader"
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#0A0A0A]"
      role="status"
      aria-label="Loading Codefrem"
    >
      {/* Solid black backdrop ensuring zero bleed-through while loading */}
      <div className="boot-backdrop absolute inset-0 bg-[#0A0A0A] z-0 pointer-events-none" aria-hidden="true" />

      {/* Black shutter columns — the curtain that opens at the end */}
      <div className="absolute inset-0 flex z-[1]" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="boot-col relative h-full flex-1 origin-top bg-[#0A0A0A] will-change-transform -mr-[1px] last:mr-0 [box-shadow:0_0_0_1px_#0A0A0A]"
          >
            <div className="boot-edge absolute bottom-0 -left-[1px] -right-[1px] h-[2px] bg-[#AAFF00] opacity-0" />
          </div>
        ))}
      </div>

      {/* Terminal boot log */}
      <div className="boot-content absolute inset-0 z-10 flex flex-col items-center justify-center px-6 opacity-0">
        <div className="boot-rise w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-[0_0_80px_rgba(170,255,0,0.07)] backdrop-blur-sm">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#AAFF00]/60" />
            <span className="ml-3 font-mono text-[10px] tracking-widest text-white/40">
              ~/codefrem — zsh
            </span>
          </div>
          {/* Body */}
          <div className="space-y-1.5 px-4 py-4 font-mono text-[11px] leading-relaxed sm:text-xs">
            <div>
              <span className="text-[#AAFF00]">λ</span>{" "}
              <span className="boot-cmd text-white/80" />
            </div>
            {BOOT_LINES.map((label) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="truncate">
                  <span className="text-[#AAFF00]">&gt;</span>{" "}
                  <span className="boot-line-text text-white/55" />
                </span>
                <span className="boot-ok shrink-0 font-mono text-[10px] text-[#AAFF00] opacity-0">
                  [OK]
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 pt-1">
              <span>
                <span className="text-[#AAFF00]">&gt;</span>{" "}
                <span className="boot-status text-white/80" />
                <span className="boot-cursor ml-0.5 text-[#AAFF00]" aria-hidden="true">
                  ▌
                </span>
              </span>
              <span className="boot-ok-live shrink-0 font-mono text-[10px] text-[#AAFF00] opacity-0">
                [LIVE]
              </span>
            </div>
          </div>
        </div>

        <p className="boot-rise mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
          Empowering brands through creative solutions
        </p>
      </div>

      {/* Giant progress counter */}
      <div className="boot-counter absolute bottom-6 left-6 z-10 select-none font-mono sm:bottom-10 sm:left-10">
        <div className="mb-1 text-[10px] uppercase tracking-[0.35em] text-white/35">
          Loading
        </div>
        <div className="text-6xl font-black leading-none tabular-nums text-white sm:text-8xl">
          <span className="boot-num">0</span>
          <span className="text-[#AAFF00]">%</span>
        </div>
      </div>

      {/* Brand mark */}
      <div className="boot-brand absolute bottom-6 right-6 z-10 select-none text-right font-mono sm:bottom-10 sm:right-10">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/35">
          Codefrem®
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.35em] text-white/20">
          Digital Studio — 2026
        </div>
      </div>

      {/* Hairline progress bar */}
      <div className="boot-bar absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-white/5" aria-hidden="true">
        <div className="boot-bar-fill h-full w-full origin-left scale-x-0 bg-[#AAFF00]" />
      </div>
    </div>
  );
}
