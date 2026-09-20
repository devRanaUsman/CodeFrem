import React from "react";
import Reveal from "@/components/ui/Reveal";

/**
 * Narrow, line-type closing CTA — the quiet alternative to the big lime
 * outro block: a single bordered strip with the heading, one line of
 * subtext and a text-button, separated by hairlines.
 *
 * Used at the bottom of the sub-service pages (and reusable anywhere a
 * full lime block would be too loud). Server component.
 */
export default function CtaStrip({
  title = "Ready to get started?",
  subtext = "Tell us about your project — we'll reply within a day with honest next steps.",
  label = "Start a Project",
  href = "/contact",
}: {
  title?: string;
  subtext?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 pb-20 lg:pb-28 bg-[#0A0A0A]">
      <Reveal className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-[#222222] bg-[#0F0F0F] px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-colors duration-300 hover:border-[#AAFF00]/40">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#AAFF00]">
              Next step
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-serif tracking-tight text-white">
              {title}
            </h2>
            <p className="mt-1.5 text-sm text-gray-400 max-w-md leading-relaxed">
              {subtext}
            </p>
          </div>
          <a
            href={href}
            className="group inline-flex shrink-0 items-center gap-3 border-t-0 sm:border-t-0 sm:border-l border-[#222222] pt-6 sm:pt-0 sm:pl-8"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#AAFF00] transition-colors">
              {label}
            </span>
            <span
              aria-hidden="true"
              className="text-[#AAFF00] transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
