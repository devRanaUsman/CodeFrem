import React from "react";
import { Minus, Plus } from "lucide-react";
import type { Faq } from "@/lib/subServices";
import Reveal from "@/components/ui/Reveal";

/**
 * FAQ accordion built on native <details>/<summary>: zero JavaScript,
 * keyboard and screen-reader accessible for free, instant on low-end
 * phones. Chevron state swaps via the CSS :open pseudo-class.
 *
 * Server component.
 */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Reveal className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.q}
          className="group rounded-2xl border border-line bg-surface transition-colors duration-300 open:border-[#AFF45D]/50 open:shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            {faq.q}
            <span className="relative shrink-0 grid place-items-center w-6 h-6 rounded-full border border-line text-muted transition-colors group-open:border-[#AFF45D] group-open:text-accent-ink">
              <Plus
                className="w-3.5 h-3.5 transition-opacity duration-200 group-open:opacity-0"
                aria-hidden="true"
              />
              <Minus
                className="absolute w-3.5 h-3.5 opacity-0 transition-opacity duration-200 group-open:opacity-100"
                aria-hidden="true"
              />
            </span>
          </summary>
          <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-muted leading-relaxed max-w-2xl">
            {faq.a}
          </p>
        </details>
      ))}
    </Reveal>
  );
}


