import React from "react";
import clsx from "clsx";
import type { ProcessStep } from "@/lib/subServices";
import Reveal from "@/components/ui/Reveal";

/** Column classes per step count (desktop). */
const columnClass: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Numbered process timeline: horizontal with dividing hairlines on
 * desktop, vertical stack on mobile. Shared by the sub-service pages,
 * the main /services process section and the /contact "what happens
 * next" steps.
 *
 * Server component, zero JS.
 */
export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <Reveal className="rounded-xl border border-line border-l-4 border-l-[#AFF45D] bg-surface p-6 sm:p-10 shadow-sm">
      <ol
        className={clsx(
          "grid grid-cols-1 gap-6 sm:gap-8 divide-y divide-line",
          "md:grid-cols-2 md:divide-y-0 lg:divide-x",
          columnClass[steps.length] ?? "lg:grid-cols-4"
        )}
      >
        {steps.map((phase, index) => (
          <li
            key={phase.title}
            className={clsx(
              "flex flex-col",
              index !== 0 && "pt-6 md:pt-0 lg:pl-8"
            )}
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-ink">
              Step {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 text-xl lg:text-2xl font-extrabold tracking-tight text-ink font-sans">
              {phase.title}
            </span>
            <span className="mt-2 text-xs sm:text-sm font-medium text-muted leading-relaxed">
              {phase.body}
            </span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}


