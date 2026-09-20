import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import CtaStrip from "@/components/ui/CtaStrip";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import { allCategories } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "Services — Codefrem",
  description:
    "Web development and data science, delivered end-to-end by a two-person studio — custom websites, e-commerce, analytics, machine learning, AI integration and more.",
};

/** The studio's other disciplines — detailed on the homepage. */
const alsoOffered = [
  { title: "UI/UX Design", note: "Flows, design systems, prototypes" },
  { title: "3D Designs", note: "Spline scenes that run at 60fps" },
  { title: "Motion Graphics", note: "Motion with intent, never decoration" },
];

const process = [
  {
    title: "Discover",
    body: "Goals, users, constraints. We map the problem before touching a pixel — and define what 'working' means in numbers.",
  },
  {
    title: "Design",
    body: "Flows, prototypes, visual language. You see clickable work early and often; feedback shapes the build, not a post-mortem.",
  },
  {
    title: "Build",
    body: "Typed, tested, componentized code with performance budgets enforced from commit one. Weekly demos, no surprises.",
  },
  {
    title: "Launch",
    body: "Analytics, SEO, monitoring, handover docs. Then we stay around — iteration after launch is where products actually grow.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <PageHero
        eyebrow="What We Do"
        line1="Design, engineering and 3D —"
        highlight="end-to-end"
        lead="Two deep service lanes — Web Development and Data Science — plus the design craft that ties them together. Every service below is delivered by the founders themselves."
      />

      {/* Category cards — each expands into its sub-services */}
      <section className="w-full py-10 lg:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {allCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.id} delay={index * 100}>
                <GlowCard
                  className="p-8 sm:p-10 lg:p-12 h-full"
                  hoverGlow={false}
                >
                  <div
                    id={category.id}
                    className="scroll-mt-28 flex items-center gap-4"
                  >
                    <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#AAFF00]/10 border border-[#AAFF00]/25 text-[#AAFF00]">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-white">
                      {category.title}
                    </h2>
                  </div>
                  <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-md">
                    {category.description}
                  </p>

                  <div className="mt-8 border-t border-white/5">
                    {category.services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group flex items-center justify-between gap-4 border-b border-white/5 py-4 sm:py-5 transition-colors hover:bg-white/[0.02] -mx-2 px-2 rounded-lg"
                      >
                        <span>
                          <span className="block text-base sm:text-lg font-semibold text-white group-hover:text-[#AAFF00] transition-colors">
                            {service.title}
                          </span>
                          <span className="block mt-0.5 text-xs text-gray-500">
                            {service.tagline}
                          </span>
                        </span>
                        <span className="flex items-center gap-3 shrink-0">
                          <span className="hidden sm:block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                            from {service.price}
                          </span>
                          <ArrowUpRight
                            className="w-4 h-4 text-gray-600 transition-all duration-300 group-hover:text-[#AAFF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    ))}
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Also offered — the homepage disciplines */}
      <section className="w-full py-6 lg:py-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="rounded-3xl border border-[#222222] bg-[#0F0F0F] px-6 sm:px-8 py-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Also part of the studio
              </span>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {alsoOffered.map((item) => (
                  <Link
                    key={item.title}
                    href="/#services"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-[#111111] px-4 py-3.5 transition-colors hover:border-[#AAFF00]/40"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-white group-hover:text-[#AAFF00] transition-colors">
                        {item.title}
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">
                        {item.note}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 shrink-0 text-gray-600 group-hover:text-[#AAFF00] transition-colors"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process timeline */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="How It Works"
            title="The"
            highlight="Process"
            align="center"
          />
          <ProcessTimeline steps={process} />
        </div>
      </section>

      <CtaStrip
        title="Not sure which lane fits?"
        subtext="Describe the problem in two sentences — we'll tell you which service (if any) you actually need."
        label="Talk to Us"
      />
    </main>
  );
}
