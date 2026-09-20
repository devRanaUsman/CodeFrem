import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProjectGallery from "@/components/projects/ProjectGallery";
import CtaStrip from "@/components/ui/CtaStrip";

export const metadata: Metadata = {
  title: "Projects — Codefrem",
  description:
    "Flagship projects by Codefrem — fintech dashboards, headless storefronts, WebGL configurators and brand systems, with real results.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <PageHero
        eyebrow="Selected Work"
        line1="Flagship projects,"
        highlight="real results"
        lead="A selection of what we've shipped end-to-end — strategy through design through production code. Every card opens a full case study."
      />

      <section className="w-full px-4 sm:px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Stat strip — same glow-border pill language as the cards */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["5 Projects", "4 Disciplines", "End-to-End Delivery"].map(
              (stat) => (
                <span
                  key={stat}
                  className="rounded-full border border-[#AAFF00]/25 bg-[#111111] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-300 shadow-[0_0_18px_rgba(170,255,0,0.07)]"
                >
                  {stat}
                </span>
              )
            )}
          </div>

          {/* Filter tabs + grid + your-project-here + confidentiality note */}
          <div className="mt-10 lg:mt-14">
            <ProjectGallery />
          </div>
        </div>
      </section>

      <CtaStrip
        title="Want your project in this grid?"
        subtext="We take on 2–3 new projects per quarter. Tell us what you're building."
        label="Start a Conversation"
      />
    </main>
  );
}
