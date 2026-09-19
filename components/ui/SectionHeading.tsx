import React from "react";
import Reveal from "./Reveal";

/**
 * Section heading, pixel-matched to the homepage pattern:
 * serif text + lime pill word ("Featured [Projects]", "Our [Services]").
 * Server component — no client JS.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  /** The word rendered inside the lime pill. */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`mb-10 lg:mb-14 flex flex-col ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#AAFF00]">
          <span className="h-px w-6 bg-[#AAFF00]" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-5xl font-serif tracking-tight flex flex-wrap items-center gap-3">
        <span>{title}</span>
        {highlight && (
          <span className="bg-[#AAFF00] text-black px-4 py-1 rounded-full font-sans font-bold text-2xl sm:text-4xl not-italic">
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p
          className={`mt-3 text-gray-400 text-xs sm:text-sm leading-relaxed ${
            align === "center" ? "max-w-lg mx-auto" : "max-w-lg"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
