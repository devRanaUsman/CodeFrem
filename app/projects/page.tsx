import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProjectGallery from "@/components/projects/ProjectGallery";
import CtaStrip from "@/components/ui/CtaStrip";

export const metadata: Metadata = {
  title: "Projects | Codefrem",
  description:
    "Explore web design and development projects by Codefrem.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-canvas text-ink">
      <PageHero
        eyebrow="Selected Work"
        line1="Design ideas,"
        highlight="made tangible"
        lead="Explore projects across web design and development. Each case study covers the problem, the build, and how it shipped."
      />

      <section className="w-full px-4 sm:px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
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



