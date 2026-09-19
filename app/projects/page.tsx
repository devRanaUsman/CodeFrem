import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProjectCard from "@/components/ui/ProjectCard";
import CtaFooter from "@/components/ui/CtaFooter";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/lib/projects";
import Footer from "@/components/ui/Footer";
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

      <section className="w-full pb-20 lg:pb-28 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 3) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}

          {/* Placeholder card for future work — keeps the grid balanced and
              signals availability. Delete when a 6th project lands. */}
          <Reveal delay={200}>
            <div className="rounded-3xl border border-dashed border-[#2A2A2A] min-h-[400px] flex flex-col items-center justify-center text-center p-8">
              <span className="text-3xl font-serif italic text-white/20">
                Your project here
              </span>
              <span className="mt-3 text-xs uppercase tracking-widest text-gray-600 font-bold">
                Next slot open
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* <CtaFooter title="Want your project in this grid?" /> */}
      <Footer />
    </main>
  );
}
