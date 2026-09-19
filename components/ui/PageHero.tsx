import React from "react";
import Reveal from "./Reveal";

/**
 * Shared hero for the /about, /services, /projects and /contact pages.
 * Dark background, lime eyebrow, big serif headline with one lime
 * highlighted phrase — the same tone as the homepage's
 * "Turning Ideas Into Masterpieces" block. Server component.
 */
export default function PageHero({
  eyebrow,
  line1,
  highlight,
  line2,
  lead,
}: {
  eyebrow: string;
  /** First part of the headline (serif). */
  line1: string;
  /** Phrase rendered in the lime accent (italic serif, homepage style). */
  highlight: string;
  /** Optional trailing part of the headline. */
  line2?: string;
  lead: string;
}) {
  return (
    <section className="w-full pt-32 lg:pt-40 pb-14 lg:pb-20 px-4 sm:px-6 lg:px-12 bg-[#0A0A0A] relative overflow-hidden">
      {/* Ambient lime glow, matching the homepage's glow accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-[#AAFF00]/[0.07] blur-[120px]"
      />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#AAFF00]">
            <span className="h-px w-6 bg-[#AAFF00]" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-serif italic tracking-tight leading-[1.08] text-white max-w-4xl">
            {line1}{" "}
            <span className="not-italic text-[#AAFF00]">{highlight}</span>
            {line2 ? <> {line2}</> : null}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
            {lead}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
