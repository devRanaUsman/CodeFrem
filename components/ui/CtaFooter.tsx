import React from "react";
import Reveal from "./Reveal";
import CTAButton from "./CTAButton";

/**
 * The lime closing block used at the bottom of every page — a full-width
 * relative of the homepage's lime outro card. Links to /contact.
 * Server component.
 */
export default function CtaFooter({
  title = "Let's build your next flagship project",
  label = "Start a Project",
}: {
  title?: string;
  label?: string;
}) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 pb-20 lg:pb-28 bg-[#0A0A0A]">
      <Reveal className="max-w-6xl mx-auto">
        <div className="rounded-[36px] bg-[#AAFF00] text-black p-8 sm:p-12 shadow-[0_0_45px_rgba(170,255,0,0.2)] relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/20 blur-3xl"
          />
          <span className="text-xs font-extrabold uppercase tracking-widest text-black/60">
            Like what you see?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight max-w-2xl">
            {title}
          </h2>
          <div className="mt-8">
            <CTAButton href="/contact" variant="dark" withArrow>
              {label}
            </CTAButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
