import React from "react";
import clsx from "clsx";

/**
 * Infinite scrolling text marquee: "Innovate ✦ Inspire ✦ Create ✦".
 *
 * Pure CSS: content is rendered twice and the track translates -50% on a
 * loop, so the seam is invisible. Transform-only animation (compositor,
 * zero layout cost) and it pauses when the tab is hidden via the global
 * `html.tab-hidden` freeze (see globals.css). Server component.
 */
export default function Marquee({
  words = ["Innovate", "Inspire", "Create"],
  className,
}: {
  words?: string[];
  className?: string;
}) {
  const sequence = (
    <div className="marquee-seq shrink-0 flex items-center" aria-hidden="true">
      {words.map((word) => (
        <span key={word} className="flex items-center">
          <span className="mx-6 sm:mx-8 text-4xl sm:text-6xl font-sans tracking-tight text-ink">
            {word}
          </span>
          <span className="text-accent-ink text-2xl sm:text-3xl">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={clsx(
        "marquee relative w-full overflow-hidden border-y border-line bg-canvas py-6 sm:py-8 select-none",
        className
      )}
      role="marquee"
    >
      {/* Gradient edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-canvas to-transparent" />

      <div className="marquee-track flex w-max">
        {/* Two identical sequences = seamless -50% loop. First is the
            accessible copy, second (aria-hidden) completes the loop. */}
        <div className="marquee-seq shrink-0 flex items-center">
          {words.map((word) => (
            <span key={word} className="flex items-center">
              <span className="mx-6 sm:mx-8 text-4xl sm:text-6xl font-sans tracking-tight text-ink">
                {word}
              </span>
              <span className="text-accent-ink text-2xl sm:text-3xl">✦</span>
            </span>
          ))}
        </div>
        {sequence}
      </div>
    </div>
  );
}


