"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/**
 * Scroll-reveal wrapper used across all pages.
 *
 * Lightweight, dependency-free replacement for GSAP reveal tweens: elements
 * start slightly shifted/faded and slide into place the first time they
 * enter the viewport — the same "feel" as the homepage's scroll animations
 * without any scroll-trigger library on these routes.
 *
 * - `as` lets you wrap headings/lists without breaking semantics.
 * - Honors prefers-reduced-motion (renders visible immediately).
 * - This is the ONLY component allowed to own the `.reveal` classes
 *   (see globals.css); pages never write reveal CSS by hand.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger helper in ms — e.g. 120 for the second card, 240 for the third. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span" | "h2" | "p";
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      // The ref type dance keeps TS happy across the allowed tag names.
      ref={ref as never}
      className={clsx("reveal", visible && "reveal-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
