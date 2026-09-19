"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { getLenisInstance } from "@/lib/lenis";
import { bootedThisSession, markSessionBooted, isRobotReady, onRobotReady } from "@/lib/boot";

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
 *   mounts, in parallel with this whole sequence — it no longer waits for
 *   the intro to finish.
 * - The terminal log + counter play out on their normal fixed schedule up to
 *   a near-100 checkpoint (INTRO_COUNTER_CAP), exactly as before. From there,
 *   instead of blindly finishing, we ask `lib/boot.ts` whether the robot is
 *   actually ready.
 * - Robot already loaded → the counter sprints straight to 100 and the
 *   curtain opens, same as before.
 * - Robot still loading → the counter keeps creeping forward on its own
 *   (slower, but never motionless) until the robot signals it's ready, then
 *   sprints to 100. A hard timeout guarantees it can never wait forever.
 */

const BOOT_LINES = [
  "compiling design system",
  "hydrating 3d scene",
  "warming gpu shaders",
];

const FULL_TIMESCALE = 1;
const RELOAD_TIMESCALE = 1.75;

// The counter never reaches 100 on its own during the scripted intro — it
// caps just under so there's always a final stretch left to finish once we
// actually know the robot is ready (see finishAndReveal below).
const INTRO_COUNTER_CAP = 92;
// While waiting on the robot, the counter creeps toward this ceiling. The
// creep tween's duration is longer than MAX_EXTRA_WAIT, so within the wait
// window it is always still moving — it just slows down, it never stops.
const CREEP_CEILING = 99;
const CREEP_DURATION = 7;
// Hard safety net: never hold the curtain closed more than this many extra
// seconds waiting on the robot, even if something upstream went wrong.
const MAX_EXTRA_WAIT_MS = 6000;
const FINISH_DURATION = 0.3;

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
    const progress = { v: 0 };
    const writeProgress = () => {
      if (counterEl) counterEl.textContent = String(Math.round(progress.v));
      if (barEl) gsap.set(barEl, { scaleX: progress.v / 100 });
    };

    let cancelled = false;
    let creepTween: gsap.core.Tween | null = null;
    let offRobotReady: (() => void) | null = null;
    let maxWaitTimer: ReturnType<typeof setTimeout> | null = null;

    const clearWait = () => {
      creepTween?.kill();
      creepTween = null;
      offRobotReady?.();
      offRobotReady = null;
      if (maxWaitTimer) {
        clearTimeout(maxWaitTimer);
        maxWaitTimer = null;
      }
    };

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
        clearWait();
        const tl = gsap.timeline({ onComplete: complete });
        tl.to(progress, { v: 100, duration: 0.2, ease: "power1.out", onUpdate: writeProgress }).to(
          root,
          { autoAlpha: 0, duration: 0.3, ease: "power1.out" },
          "+=0.1"
        );
      };

      const awaitRobotReduced = () => {
        if (cancelled) return;
        if (isRobotReady()) {
          finishReduced();
          return;
        }
        creepTween = gsap.to(progress, {
          v: CREEP_CEILING,
          duration: CREEP_DURATION,
          ease: "power1.out",
          onUpdate: writeProgress,
        });
        offRobotReady = onRobotReady(finishReduced);
        maxWaitTimer = setTimeout(finishReduced, MAX_EXTRA_WAIT_MS);
      };

      const tl = gsap.timeline({ onComplete: awaitRobotReduced });
      tl.set(q(".boot-content"), { autoAlpha: 1 }).to(progress, {
        v: INTRO_COUNTER_CAP,
        duration: 0.35,
        ease: "power1.out",
        onUpdate: writeProgress,
      });

      return () => {
        cancelled = true;
        tl.kill();
        clearWait();
        release();
      };
    }

    /* ------------------------- */
    /* Full cinematic boot log   */
    /* ------------------------- */

    // Finishes the counter to exactly 100 and plays the "ready" beat + curtain
    // reveal — the same finale as before, just triggered once we actually know
    // the robot is on screen instead of at a fixed point in time.
    const finishAndReveal = () => {
      if (cancelled) return;
      clearWait();

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: complete });
      tl.timeScale(timeScale);

      // Final stretch of the counter, picking up from wherever it currently
      // sits (92 if the robot was already ready, or wherever the creep got
      // to otherwise) up to exactly 100.
      tl.to(progress, { v: 100, duration: FINISH_DURATION, ease: "power1.out", onUpdate: writeProgress }, 0);

      // Server "goes live", tagline for the finale.
      tl.to(
        q(".boot-status")[0],
        { text: { value: "ready — entering site" }, duration: 0.45, ease: "none" },
        FINISH_DURATION
      );
      tl.fromTo(
        q(".boot-ok-live")[0],
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)" },
        FINISH_DURATION + 0.5
      );

      // Content lifts away, then the shutter opens.
      tl.to(
        [q(".boot-content"), q(".boot-counter"), q(".boot-brand"), q(".boot-bar")],
        { y: -32, autoAlpha: 0, duration: 0.45, ease: "power3.in", stagger: 0.04 },
        FINISH_DURATION + 0.85
      );

      // Arm the lime scanner edges the moment the curtain starts moving.
      tl.set(q(".boot-edge"), { opacity: 1 }, FINISH_DURATION + 1.05);

      // Make root container and solid backdrop transparent right as the
      // shutter curtains lift.
      tl.to(root, { backgroundColor: "transparent", duration: 0.05 }, FINISH_DURATION + 1.1);
      tl.to(q(".boot-backdrop"), { autoAlpha: 0, duration: 0.05 }, FINISH_DURATION + 1.1);

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
        FINISH_DURATION + 1.1
      );
    };

    // Once the scripted intro reaches its checkpoint, either sprint straight
    // to 100 (robot already loaded) or keep the counter creeping smoothly
    // forward while we wait — it never stops moving, it just slows down.
    const awaitRobotThenFinish = () => {
      if (cancelled) return;
      if (isRobotReady()) {
        finishAndReveal();
        return;
      }
      creepTween = gsap.to(progress, {
        v: CREEP_CEILING,
        duration: CREEP_DURATION,
        ease: "power1.out",
        onUpdate: writeProgress,
      });
      creepTween.timeScale(timeScale);
      offRobotReady = onRobotReady(finishAndReveal);
      maxWaitTimer = setTimeout(finishAndReveal, MAX_EXTRA_WAIT_MS);
    };

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: awaitRobotThenFinish,
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

    // Phase 3 — giant counter synced to the scripted part of the boot
    // (0→92%). The last stretch to 100 happens in finishAndReveal, once the
    // robot is confirmed ready.
    tl.to(
      progress,
      { v: INTRO_COUNTER_CAP, duration: 1.3, ease: "power2.inOut", onUpdate: writeProgress },
      0.25
    );

    return () => {
      cancelled = true;
      clearTimeout(stopTick);
      tl.kill();
      clearWait();
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
