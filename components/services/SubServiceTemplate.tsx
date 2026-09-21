import React from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import CTAButton from "@/components/ui/CTAButton";
import TagPill from "@/components/ui/TagPill";
import CtaStrip from "@/components/ui/CtaStrip";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import FaqAccordion from "@/components/services/FaqAccordion";
import PricingPlans from "@/components/services/PricingPlans";
import type { Category, SubService } from "@/lib/subServices";

/**
 * The shared 7-section template every sub-service page inherits:
 *
 *   1. Hero (service name, tagline, description, CTA)
 *   2. What you get (client-perspective feature cards)
 *   3. Our process (numbered timeline)
 *   4. Tools & tech (tag pills)
 *   5. Starting price + timeline (highlighted banner)
 *   6. FAQ (native details accordion)
 *   7. Narrow line-type CTA → /contact
 *
 * All copy comes from lib/subServices.ts — page files only pick the
 * service and pass it here.
 */
export default function SubServiceTemplate({
  service,
  category,
}: {
  service: SubService;
  category: Category;
}) {
  return (
    <main className="bg-canvas text-ink">
      {/* 1 — HERO */}
      <section className="w-full pt-16 lg:pt-24 pb-14 lg:pb-20 px-4 sm:px-6 lg:px-12 bg-canvas relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-[#AFF45D]/[0.07] blur-[120px]"
        />
        <div className="max-w-7xl mx-auto relative">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted"
            >
              <Link
                href="/services"
                className="hover:text-accent-ink transition-colors"
              >
                Services
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={`/services#${category.id}`}
                className="hover:text-accent-ink transition-colors"
              >
                {category.title}
              </Link>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.08] text-ink max-w-4xl">
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 text-base sm:text-lg text-accent-ink font-medium">
              {service.tagline}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-muted text-sm sm:text-base leading-relaxed max-w-xl">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8">
              <CTAButton href="/contact" variant="primary">
                Get a Quote
              </CTAButton>
            </div>
          </Reveal>
        </div>
        {/* Section anchor for the breadcrumb's category link */}
        <span id={category.id} className="absolute top-0" aria-hidden="true" />
      </section>

      {/* 2 — WHAT YOU GET */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="What You Get"
            title="Built around"
            highlight="your problems"
            description="Every line item below exists because a client once paid the price of not having it."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {service.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={index * 60}>
                  <GlowCard className="h-full p-6 sm:p-7">
                    <Icon
                      className="w-6 h-6 text-accent-ink"
                      aria-hidden="true"
                    />
                    <h3 className="mt-4 text-base sm:text-lg font-bold text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {feature.body}
                    </p>
                </GlowCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 — OUR PROCESS */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Our Process"
            title="How this"
            highlight="works"
            align="center"
          />
          <ProcessTimeline steps={service.process} />
        </div>
      </section>

      {/* 4 — TOOLS & TECH */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading eyebrow="Tools & Tech" title="Our" highlight="stack" align="center" />
          <Reveal className="flex flex-wrap justify-center gap-2.5">
            {service.tools.map((tool) => (
              <TagPill key={tool} className="px-4 py-2 text-xs">
                {tool}
              </TagPill>
            ))}
          </Reveal>
        </div>
      </section>
      {/* 5 — PRICING PLANS */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Pricing"
            title="Pick a"
            highlight="plan"
            description="Clear scopes, fixed prices. Every plan can be tailored — the quote you approve is the invoice you pay."
            align="center"
          />
          <PricingPlans plans={service.plans} />
        </div>
      </section>

      {/* 6 — STARTING PRICE + TIMELINE */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="rounded-xl border border-[#AFF45D]/25 bg-gradient-to-b from-[#AFF45D]/[0.06] to-transparent p-8 sm:p-10 text-center shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 sm:divide-x divide-line">
                <div className="sm:pr-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Starting from
                  </span>
                  <p className="mt-2 text-4xl sm:text-5xl font-sans font-bold text-ink">
                    {service.price}
                  </p>
                </div>
                <div className="sm:pl-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Typical timeline
                  </span>
                  <p className="mt-2 text-4xl sm:text-5xl font-sans font-bold text-ink">
                    {service.timeline}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-sm text-muted max-w-md mx-auto leading-relaxed">
                Final quote depends on scope — you always get a fixed price before
                we start, so there are no surprises.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions"
            highlight="clients ask"
            align="center"
          />
          <FaqAccordion faqs={service.faqs} />
        </div>
      </section>

      {/* 8 — CTA STRIP */}
      <CtaStrip
        title="Ready to get started?"
        subtext={`Tell us about your ${service.title.toLowerCase()} project — we reply within a day.`}
      />
    </main>
  );
}


