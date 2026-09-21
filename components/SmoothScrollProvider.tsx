"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/lenis";

/**
 * Global Lenis smooth-scroll provider.
 *
 * Lenis is driven by a plain rAF loop from the very first frame. On desktop,
 * once GSAP has been lazily loaded, the rAF loop hands over to GSAP's ticker
 * so the smooth scroll and every ScrollTrigger — including the pinned
 * horizontal ProjectsSection — advance on the exact same frame. GSAP itself
 * is never downloaded on phones/tablets (below `lg` the Projects section is
 * a plain vertical stack with no ScrollTriggers to sync).
 *
 * `lenis.css` is imported globally from app/layout.tsx.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    // Lenis's own `respectReducedMotion` (default: true) already forces
    // instant, native scrolling when the user opts out of motion — no extra
    // branch needed here.

    const lenis = new Lenis({
      // We drive Lenis ourselves (rAF loop below, GSAP ticker on desktop).
      autoRaf: false,
      // Lower = smoother/floatier inertia. Coarse pointers (phones) get a
      // higher lerp: touch already has native momentum, so a floatier curve
      // both feels right and does fewer position updates per gesture.
      lerp: window.matchMedia("(pointer: coarse)").matches ? 0.14 : 0.09,
      // Translate vertical wheel/touch gestures to the vertical scroll only.
      gestureOrientation: "vertical",
      // Smooth, animated anchor-link navigation (#projects, #contact, ...).
      anchors: {
        offset: -80, // clears the floating navbar
        lerp: 0.08, // keep the anchor glide consistent with page inertia
      },
    });

    // 1. Own rAF loop: smooth scrolling works from frame one on every device,
    //    with zero library dependency.
    let gsapDriving = false;
    let rafId = requestAnimationFrame(function loop(time) {
      if (gsapDriving) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    let st: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;
    let cancelled = false;

    (async () => {
      // Desktop-only dependency: pinned ScrollTrigger sections need their
      // scroll source frame-locked to GSAP's ticker. On mobile nothing
      // consumes ScrollTrigger, so this chunk is never requested.
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;
        st = ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // lagSmoothing(0) is the documented Lenis+GSAP pattern: without it, a
        // single slow frame (tab switch, GC pause) makes GSAP "catch up" with
        // a large delta that visibly jumps the pinned track.
        gsap.ticker.lagSmoothing(0);

        // Hand scroll driving over to GSAP's ticker (frame-locked with every
        // ScrollTrigger) and retire the plain rAF loop.
        gsapDriving = true;
        cancelAnimationFrame(rafId);
        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });
      } catch {
        // GSAP failed to load (offline, chunk error): the plain rAF loop
        // above keeps smooth scrolling working.
      }
    })();

    const update = () => {
      st?.update();
    };
    lenis.on("scroll", update);

    // ScrollTrigger caches element positions; recalculate once the page has
    // settled so pin distances stay accurate. Each refresh re-measures every
    // trigger (a full layout pass on a page this tall), so we keep them to a
    // minimum: `load`, then the moment fonts/late layout are definitively
    // done, plus one safety net.
    const refresh = () => {
      try {
        st?.refresh();
      } catch {
        /* noop */
      }
    };
    window.addEventListener("load", refresh);

    let fontTimer: ReturnType<typeof setTimeout> | null = null;
    document.fonts?.ready
      .then(() => {
        fontTimer = setTimeout(refresh, 100);
      })
      .catch(() => {
        /* no font loading API — the safety net below covers us */
      });

    const refreshT = setTimeout(refresh, 1200);

    // Freeze every CSS animation while the tab is hidden (see globals.css).
    // Browsers throttle rAF when hidden, but CSS animations keep compositing;
    // this pauses the decorative spins for free.
    const handleVisibility = () => {
      document.documentElement.classList.toggle("tab-hidden", document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    setLenisInstance(lenis);

    // Debug handle (also handy for `window.__lenis.scrollTo(0)` in DevTools).
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    return () => {
      cancelled = true;
      gsapDriving = true; // stops the rAF loop at its next frame
      cancelAnimationFrame(rafId);
      setLenisInstance(null);
      window.removeEventListener("load", refresh);
      if (fontTimer) clearTimeout(fontTimer);
      clearTimeout(refreshT);
      lenis.off("scroll", update);
      document.removeEventListener("visibilitychange", handleVisibility);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}


