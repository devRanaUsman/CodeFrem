"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global Lenis smooth-scroll provider.
 *
 * Drives Lenis from GSAP's ticker (instead of its own rAF) so the smooth
 * scroll and every ScrollTrigger — including the pinned horizontal
 * ProjectsSection — advance on the exact same frame. `lenis.css` is imported
 * globally from app/layout.tsx.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {  useEffect(() => {
    // Lenis's own `respectReducedMotion` (default: true) already forces
    // instant, native scrolling when the user opts out of motion — no extra
    // branch needed here.

    const lenis = new Lenis({
      // Frame-synced with ScrollTrigger via gsap.ticker below, so Lenis must
      // not run its own requestAnimationFrame loop.
      autoRaf: false,
      // Lower = smoother/floatier inertia. 0.09 is a gentle, "buttery" glide.
      lerp: 0.09,
      // Translate vertical wheel/touch gestures to the vertical scroll only.
      gestureOrientation: "vertical",
      // Smooth, animated anchor-link navigation (#projects, #contact, ...).
      anchors: {
        offset: -80, // clears the floating navbar
        lerp: 0.08, // keep the anchor glide consistent with page inertia
      },
    });

    // Route Lenis through GSAP's ticker and wake ScrollTrigger on every tick
    // so pinned sections and scrubs never lag one frame behind the scroll.
    // lagSmoothing(0) is the documented Lenis+GSAP pattern: without it, a
    // single slow frame (tab switch, GC pause) makes GSAP "catch up" with a
    // large delta that visibly jumps the pinned track.
    gsap.ticker.lagSmoothing(0);
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);

    const update = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", update);

    // ScrollTrigger caches element positions; recalculate once the page has
    // settled so pin distances stay accurate. Each refresh re-measures every
    // trigger (a full layout pass on a page this tall), so we keep them to a
    // minimum: `load`, then the moment fonts/late layout are definitively
    // done, plus one safety net. The preloader also refreshes once when it
    // hands the page over.
    const refresh = () => ScrollTrigger.refresh();
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

    setLenisInstance(lenis);

    // Debug handle (also handy for `window.__lenis.scrollTo(0)` in DevTools).
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    return () => {
      setLenisInstance(null);
      window.removeEventListener("load", refresh);
      if (fontTimer) clearTimeout(fontTimer);
      clearTimeout(refreshT);
      lenis.off("scroll", update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
