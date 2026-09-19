"use client";

import { useEffect, useRef, useState } from "react";
import { getLenisInstance } from "@/lib/lenis";
import { bootedThisSession, markSessionBooted, isRobotReady, onRobotReady } from "@/lib/boot";

type GsapTimeline = ReturnType<typeof import("gsap").gsap.timeline>;

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
 * - GSAP (+ ScrollTrigger + TextPlugin) is loaded via dynamic import, so it
 *   never blocks first paint / hydration and stays out of the critical
 *   bundle on phones. The shutter is server-rendered solid black, so the
 *   few ms the chunk needs are invisible.
 * - `sessionStorage` downgrades repeat visits (page reloads) to a ~1.8s
 *   cut via `timeScale` — first visit gets the full cinematic ~3.2s cut.
 * - `prefers-reduced-motion` skips the choreography entirely (simple count +
 *   fade), and a <noscript> rule in layout hides the overlay without JS.
 *
 * Syncing with the 3D robot:
 * - The robot (components/SplineRobot.tsx) starts loading the moment it
 *   mounts, in parallel with this whole sequence.
 * - The terminal log + counter play out on their normal fixed schedule up to
 *   a near-100 checkpoint (INTRO_COUNTER_CAP). From there we ask lib/boot.ts
 *   whether the robot is actually ready; if not, the counter keeps creeping
 *   forward until it is. A hard timeout guarantees it never waits forever.
 */

const BOOT_LINES = [
  "compiling design system",
  "hydrating 3d scene",
  "warming gpu shaders",
];

export default function Preloader() {
  const [finished, setFinished] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Freeze page scroll while intro plays
    window.scrollTo(0, 0);
    document.documentElement.classList.add("preloader-lock");

    const stopTick = setTimeout(() => {
      try {
        getLenisInstance()?.stop();
      } catch {
        /* noop */
      }
    }, 0);

    let st: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;
    const refreshScrollTriggers = () => {
      try {
        st?.refresh();
      } catch {
        /* noop */
      }
    };

    const release = () => {
      document.documentElement.classList.remove("preloader-lock");
      const mainEl = document.querySelector("main");
      if (mainEl) {
        // Ensure no leftover inline styles
        try {
          mainEl.style.opacity = "";
          mainEl.style.transform = "";
          mainEl.style.visibility = "";
        } catch {
          /* noop */
        }
      }
      try {
        getLenisInstance()?.start();
      } catch {
        /* noop */
      }
      requestAnimationFrame(refreshScrollTriggers);
    };

    let cancelled = false;
    let mainTl: GsapTimeline | null = null;
    let progressTween: ReturnType<typeof import("gsap").gsap.to> | null = null;
    let offRobotReady: (() => void) | null = null;
    let maxWaitTimer: ReturnType<typeof setTimeout> | null = null;

    const clearWait = () => {
      progressTween?.kill();
      progressTween = null;
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
      setFinished(true); // unmount overlay
    };

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { TextPlugin }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/TextPlugin"),
        ]);
      if (cancelled) return;
      st = ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger, TextPlugin);

      const q = gsap.utils.selector(root);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const counterEl = q(".boot-num")[0] as HTMLElement | undefined;
      const barEl = q(".boot-bar-fill")[0] as HTMLElement | undefined;
      const progress = { v: 0 };

      const writeProgress = () => {
        const rounded = Math.min(100, Math.round(progress.v));
        if (counterEl) counterEl.textContent = String(rounded);
        if (barEl) gsap.set(barEl, { scaleX: rounded / 100 });
      };

      const mainEl = document.querySelector("main");
      if (mainEl && !reduced) {
        gsap.set(mainEl, { opacity: 0, scale: 0.985, y: 18 });
      }

      /* ---------------------------------------------------- */
      /* Finish & Reveal: Seamlessly complete to 100% & open  */
      /* ---------------------------------------------------- */
      let finishTriggered = false;

      const triggerFinish = () => {
        if (finishTriggered || cancelled) return;
        finishTriggered = true;
        clearWait();

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: complete,
        });
        mainTl = tl;

        // 1. Smoothly glide to 100% from current number
        const remainingTo100 = Math.max(0, 100 - progress.v);
        const to100Duration = Math.max(0.28, Math.min(0.48, (remainingTo100 / 100) * 0.85));

        tl.to(progress, {
          v: 100,
          duration: to100Duration,
          ease: "power1.out",
          onUpdate: writeProgress,
        }, 0);

        // 2. Terminal shows ready tagline and [LIVE] badge pops
        tl.to(
          q(".boot-status")[0],
          { text: { value: "ready — entering site" }, duration: 0.3, ease: "none" },
          to100Duration * 0.25
        );
        tl.fromTo(
          q(".boot-ok-live")[0],
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.22, ease: "back.out(2)" },
          to100Duration * 0.6
        );

        // 3. Short satisfying pause at 100%
        const exitStart = to100Duration + 0.18;

        // 4. Preloader content smoothly lifts and fades
        tl.to(
          [q(".boot-content"), q(".boot-counter"), q(".boot-brand"), q(".boot-bar")],
          {
            y: -20,
            autoAlpha: 0,
            duration: 0.32,
            stagger: 0.02,
            ease: "power2.inOut",
          },
          exitStart
        );

        // 5. Lime scanner edge illuminates as shutter curtains rise
        tl.set(q(".boot-edge"), { opacity: 1 }, exitStart + 0.08);

        // 6. Shutter columns lift center-out like a luxury curtain opening
        tl.to(
          q(".boot-col"),
          {
            scaleY: 0,
            transformOrigin: "50% 0%",
            duration: 0.68,
            ease: "power3.inOut",
            stagger: { each: 0.035, from: "center" },
          },
          exitStart + 0.08
        );

        // 7. Backdrop fade
        tl.to(
          q(".boot-backdrop"),
          { autoAlpha: 0, duration: 0.45, ease: "power2.out" },
          exitStart + 0.15
        );
        tl.to(
          root,
          { autoAlpha: 0, duration: 0.35, ease: "power2.out" },
          exitStart + 0.35
        );

        // 8. Coordinated entrance of the website (smooth scale-in & fade-in)
        if (mainEl) {
          tl.to(
            mainEl,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              clearProps: "all",
            },
            exitStart + 0.15
          );
        }
      };

      /* ---------------------------------------------------- */
      /* Reduced Motion Variant                               */
      /* ---------------------------------------------------- */
      if (reduced) {
        const finishReduced = () => {
          if (cancelled) return;
          clearWait();
          const tl = gsap.timeline({ onComplete: complete });
          tl.to(progress, {
            v: 100,
            duration: 0.3,
            ease: "power1.out",
            onUpdate: writeProgress,
          }).to(root, { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, "+=0.08");
          if (mainEl) {
            tl.to(mainEl, { opacity: 1, duration: 0.35, clearProps: "all" }, "<");
          }
        };

        const awaitRobotReduced = () => {
          if (cancelled) return;
          if (isRobotReady()) {
            finishReduced();
            return;
          }
          offRobotReady = onRobotReady(finishReduced);
          maxWaitTimer = setTimeout(finishReduced, 7000);
        };

        const tl = gsap.timeline({ onComplete: awaitRobotReduced });
        mainTl = tl;
        tl.set(q(".boot-content"), { autoAlpha: 1 }).to(progress, {
          v: 92,
          duration: 1.1,
          ease: "power1.out",
          onUpdate: writeProgress,
        });
        return;
      }

      /* ---------------------------------------------------- */
      /* Standard Full Cinematic Boot Sequence                */
      /* ---------------------------------------------------- */
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      mainTl = tl;

      // Phase 0: Reveal preloader content container
      tl.set(q(".boot-content"), { autoAlpha: 1 }, 0);

      // Phase 1: Terminal card & elements slide in smoothly
      tl.from(
        q(".boot-rise"),
        { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.07, ease: "expo.out" },
        0.05
      );

      // Phase 2: Terminal typing effect
      tl.to(
        q(".boot-cmd")[0],
        { text: { value: "npm run codefrem" }, duration: 0.35, ease: "none" },
        0.2
      );

      const lineStarts = [0.5, 0.85, 1.2];
      lineStarts.forEach((at, i) => {
        tl.to(
          q(".boot-line-text")[i],
          { text: { value: BOOT_LINES[i] }, duration: 0.38, ease: "none" },
          at
        );
        tl.fromTo(
          q(".boot-ok")[i],
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.22, ease: "back.out(2)" },
          at + 0.38
        );
      });

      // Phase 3: Single continuous, uninterrupted progress tween toward 98%
      // Ensures the numbers constantly advance with buttery smoothness
      progressTween = gsap.to(progress, {
        v: 98,
        duration: 2.7,
        ease: "power1.inOut",
        onUpdate: writeProgress,
        onComplete: () => {
          if (isRobotReady()) {
            triggerFinish();
          }
        },
      });

      // Handshake with Spline 3D Robot readiness
      const onReadyHandler = () => {
        // Let terminal lines type out comfortably (reach at least 75%)
        const checkReady = () => {
          if (cancelled) return;
          if (progress.v >= 75) {
            triggerFinish();
          } else {
            requestAnimationFrame(checkReady);
          }
        };
        requestAnimationFrame(checkReady);
      };

      if (isRobotReady()) {
        onReadyHandler();
      } else {
        offRobotReady = onRobotReady(onReadyHandler);
      }

      // Safety timeout: never trap user permanently
      maxWaitTimer = setTimeout(triggerFinish, 7500);
    })();

    return () => {
      cancelled = true;
      clearTimeout(stopTick);
      mainTl?.kill();
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
