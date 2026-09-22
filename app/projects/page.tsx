import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProjectGallery from "@/components/projects/ProjectGallery";
import CtaStrip from "@/components/ui/CtaStrip";

export const metadata: Metadata = {
  title: "Projects | Codefrem",
  description:
    "Explore illustrative web design and development concept projects by Codefrem.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-canvas text-ink">
      <PageHero
        eyebrow="Selected Work"
        line1="Design ideas,"
        highlight="made tangible"
        lead="Explore concept projects across web design and development. These illustrative case studies show possible approaches; client names, metrics and testimonials are placeholders."
      />

      <section className="w-full px-4 sm:px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Stat strip: same glow-border pill language as the cards */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["5 Projects", "4 Disciplines", "End-to-End Delivery"].map(
              (stat) => (
                <span
                  key={stat}
                  className="rounded-full border border-[#AFF45D]/25 bg-surface px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-muted shadow-sm"
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
        subtext="We take on 2-3 new projects per quarter. Tell us what you're building."
        label="Start a Conversation"
      />
    </main>
  );
}



