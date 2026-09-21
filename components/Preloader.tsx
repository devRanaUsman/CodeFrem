"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getLenisInstance } from "@/lib/lenis";
import { bootedThisSession, markSessionBooted, isRobotReady, onRobotReady } from "@/lib/boot";

type GsapTimeline = ReturnType<typeof import("gsap").gsap.timeline>;

/**
 * Cinematic first-paint preloader — a developer studio terminal boot.
 *
 * Requirements:
 * 1. Flow from 0 to 100 is consistent, smooth, and not laggy (no sudden speed jumps, no freezing).
 * 2. Preloader NEVER opens until the 3D robot is fully loaded.
 * 3. Only runs once per session; route navigations (e.g. /services -> /) skip preloader.
 */

const BOOT_LINES = [
  "compiling design system",
  "hydrating 3d scene",
  "warming gpu shaders",
];

let hasBootedSession = false;

export default function Preloader() {
  const pathname = usePathname();
  const [shouldRun] = useState(() => {
    if (typeof window !== "undefined") {
      if (hasBootedSession || pathname !== "/") {
        hasBootedSession = true;
        return false;
      }
      return true;
    }
    return pathname === "/";
  });
  const [finished, setFinished] = useState(() => !shouldRun);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldRun || finished) {
      hasBootedSession = true;
      return;
    }
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
    let activeTween: ReturnType<typeof import("gsap").gsap.to> | null = null;
    let offRobotReady: (() => void) | null = null;
    let maxWaitTimer: ReturnType<typeof setTimeout> | null = null;

    const clearWait = () => {
      activeTween?.kill();
      activeTween = null;
      offRobotReady?.();
      offRobotReady = null;
      if (maxWaitTimer) {
        clearTimeout(maxWaitTimer);
        maxWaitTimer = null;
      }
    };

    const complete = () => {
      release();
      hasBootedSession = true;
      markSessionBooted();
      setFinished(true);
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
      let lastReported = -1;

      // High-performance progress updater: avoids redundant DOM writes
      const writeProgress = () => {
        const rounded = Math.min(100, Math.floor(progress.v));
        if (rounded !== lastReported) {
          lastReported = rounded;
          if (counterEl) counterEl.textContent = String(rounded);
        }
        if (barEl) {
          barEl.style.transform = `scaleX(${progress.v / 100})`;
        }
      };

      const mainEl = document.querySelector("main");
      if (mainEl && !reduced) {
        gsap.set(mainEl, { opacity: 0, scale: 0.985, y: 18 });
      }

      /* ---------------------------------------------------- */
      /* Exit Animation: Reveals website once 100% & ready    */
      /* ---------------------------------------------------- */
      const isRepeat = bootedThisSession();
      let finishTriggered = false;

      const triggerFinish = () => {
        if (finishTriggered || cancelled) return;
        finishTriggered = true;
        clearWait();

        // Ensure 100% is displayed
        progress.v = 100;
        writeProgress();

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: complete,
        });
        if (isRepeat) {
          tl.timeScale(1.4);
        }
        mainTl = tl;

        // 1. Status indicates ready & [LIVE] badge pops
        tl.to(
          q(".boot-status")[0],
          { text: { value: "ready — entering site" }, duration: 0.25, ease: "none" },
          0
        );
        tl.fromTo(
          q(".boot-ok-live")[0],
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.22, ease: "back.out(2)" },
          0.05
        );

        // 2. Pause briefly at 100% for satisfying feedback
        const exitStart = 0.22;

        // 3. Preloader cards smoothly lift and fade
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

        // 4. Lime scanner edge illuminates as shutter curtains rise
        tl.set(q(".boot-edge"), { opacity: 1 }, exitStart + 0.08);

        // 5. Shutter columns lift center-out
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

        // 6. Backdrop fade
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

        // 7. Smooth entrance of website
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
          progress.v = 100;
          writeProgress();
          const tl = gsap.timeline({ onComplete: complete });
          tl.to(root, { autoAlpha: 0, duration: 0.35, ease: "power1.out" });
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
          v: 100,
          duration: 1.2,
          ease: "power1.out",
          onUpdate: writeProgress,
        });
        return;
      }

      /* ---------------------------------------------------- */
      /* Standard Consistent Boot Flow                        */
      /* ---------------------------------------------------- */
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      if (isRepeat) {
        tl.timeScale(1.5);
      }
      mainTl = tl;

      // Reveal preloader content container
      tl.set(q(".boot-content"), { autoAlpha: 1 }, 0);

      // Terminal card slide in
      tl.from(
        q(".boot-rise"),
        { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.07, ease: "expo.out" },
        0.05
      );

      // Terminal typing
      tl.to(
        q(".boot-cmd")[0],
        { text: { value: "npm run codefrem" }, duration: 0.35, ease: "none" },
        0.18
      );

      const lineStarts = [0.45, 0.85, 1.25];
      lineStarts.forEach((at, i) => {
        tl.to(
          q(".boot-line-text")[i],
          { text: { value: BOOT_LINES[i] }, duration: 0.35, ease: "none" },
          at
        );
        tl.fromTo(
          q(".boot-ok")[i],
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(2)" },
          at + 0.35
        );
      });

      // Terminal status line
      tl.to(
        q(".boot-status")[0],
        { text: { value: "calibrating 3d viewport..." }, duration: 0.35, ease: "none" },
        1.65
      );

      // Homepage has the 3D robot; other routes treat robot as ready
      const robotLivesHere =
        window.location.pathname === "/" || window.location.pathname === "";

      let robotIsReady = !robotLivesHere || isRobotReady();

      if (!robotIsReady) {
        offRobotReady = onRobotReady(() => {
          robotIsReady = true;
          // If we are currently holding/creeping near ~92-99%, glide to 100 now!
          if (progress.v >= 90 && !finishTriggered) {
            completeTo100();
          }
        });
      }

      // Smooth completion to 100% and finish
      const completeTo100 = () => {
        if (finishTriggered || cancelled) return;
        activeTween?.kill();
        const remaining = Math.max(1, 100 - progress.v);
        // Consistent speed for the final stretch
        const duration = Math.max(0.24, (remaining / 10) * 0.38);

        activeTween = gsap.to(progress, {
          v: 100,
          duration,
          ease: "power1.out",
          onUpdate: writeProgress,
          onComplete: () => {
            if (robotIsReady) {
              triggerFinish();
            } else {
              // Safety fallback: wait for robot
              offRobotReady = onRobotReady(triggerFinish);
            }
          },
        });
      };

      // Primary smooth progression: 0 to 92% at a steady, consistent, non-laggy rate
      const primaryDuration = isRepeat ? 1.1 : 1.85;

      activeTween = gsap.to(progress, {
        v: 92,
        duration: primaryDuration,
        ease: "power1.inOut",
        onUpdate: writeProgress,
        onComplete: () => {
          if (cancelled) return;
          if (robotIsReady) {
            // Robot is ready: smoothly glide straight from 92 to 100
            completeTo100();
          } else {
            // Robot is still loading: gently creep forward (92 -> 99) so it NEVER freezes or feels stuck
            gsap.to(q(".boot-status")[0], {
              text: { value: "finalizing 3d scene..." },
              duration: 0.3,
              ease: "none",
            });
            activeTween = gsap.to(progress, {
              v: 99,
              duration: 3.5,
              ease: "sine.out",
              onUpdate: writeProgress,
            });
          }
        },
      });

      // Safety timeout so user is never trapped even on network drops
      maxWaitTimer = setTimeout(() => {
        robotIsReady = true;
        completeTo100();
      }, isRepeat ? 4000 : 7500);
    })();

    return () => {
      cancelled = true;
      hasBootedSession = true;
      clearTimeout(stopTick);
      mainTl?.kill();
      clearWait();
      release();
    };
  }, [shouldRun, finished]);

  if (!shouldRun || finished || pathname !== "/") return null;

  return (
    <div
      ref={rootRef}
      id="codefrem-preloader"
      className="fixed inset-0 z-[9999] overflow-hidden bg-canvas"
      role="status"
      aria-label="Loading Codefrem"
    >
      {/* Solid black backdrop ensuring zero bleed-through while loading */}
      <div className="boot-backdrop absolute inset-0 bg-canvas z-0 pointer-events-none" aria-hidden="true" />

      {/* Black shutter columns — the curtain that opens at the end */}
      <div className="absolute inset-0 flex z-[1]" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="boot-col relative h-full flex-1 origin-top bg-canvas will-change-transform -mr-[1px] last:mr-0 [box-shadow:0_0_0_1px_#0A0A0A]"
          >
            <div className="boot-edge absolute bottom-0 -left-[1px] -right-[1px] h-[2px] bg-[#AFF45D] opacity-0" />
          </div>
        ))}
      </div>

      {/* Terminal boot log */}
      <div className="boot-content absolute inset-0 z-10 flex flex-col items-center justify-center px-6 opacity-0">
        <div className="boot-rise w-full max-w-md overflow-hidden rounded-xl border border-line bg-black/60 shadow-sm backdrop-blur-sm">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#AFF45D]/60" />
            <span className="ml-3 font-mono text-[10px] tracking-widest text-ink/40">
              ~/codefrem — zsh
            </span>
          </div>
          {/* Body */}
          <div className="space-y-1.5 px-4 py-4 font-mono text-[11px] leading-relaxed sm:text-xs">
            <div>
              <span className="text-accent-ink">λ</span>{" "}
              <span className="boot-cmd text-ink/80" />
            </div>
            {BOOT_LINES.map((label) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="truncate">
                  <span className="text-accent-ink">&gt;</span>{" "}
                  <span className="boot-line-text text-ink/55" />
                </span>
                <span className="boot-ok shrink-0 font-mono text-[10px] text-accent-ink opacity-0">
                  [OK]
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 pt-1">
              <span>
                <span className="text-accent-ink">&gt;</span>{" "}
                <span className="boot-status text-ink/80" />
                <span className="boot-cursor ml-0.5 text-accent-ink" aria-hidden="true">
                  ▌
                </span>
              </span>
              <span className="boot-ok-live shrink-0 font-mono text-[10px] text-accent-ink opacity-0">
                [LIVE]
              </span>
            </div>
          </div>
        </div>

        <p className="boot-rise mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-ink/35">
          Empowering brands through creative solutions
        </p>
      </div>

      {/* Giant progress counter */}
      <div className="boot-counter absolute bottom-6 left-6 z-10 select-none font-mono sm:bottom-10 sm:left-10">
        <div className="mb-1 text-[10px] uppercase tracking-[0.35em] text-ink/35">
          Loading
        </div>
        <div className="text-6xl font-black leading-none tabular-nums text-ink sm:text-8xl">
          <span className="boot-num">0</span>
          <span className="text-accent-ink">%</span>
        </div>
      </div>

      {/* Brand mark */}
      <div className="boot-brand absolute bottom-6 right-6 z-10 select-none text-right font-mono sm:bottom-10 sm:right-10">
        <div className="text-[10px] uppercase tracking-[0.35em] text-ink/35">
          Codefrem®
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.35em] text-ink/20">
          Digital Studio — 2026
        </div>
      </div>

      {/* Hairline progress bar */}
      <div className="boot-bar absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-white/5" aria-hidden="true">
        <div className="boot-bar-fill h-full w-full origin-left scale-x-0 bg-[#AFF45D]" />
      </div>
    </div>
  );
}


