import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TagPill from "@/components/ui/TagPill";
import GlowCard from "@/components/ui/GlowCard";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import { projects, getProjectBySlug } from "@/lib/projects";

interface Params {
  slug: string;
}

/** Pre-render every case study at build time from lib/projects.ts. */
export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

/** 404 for unknown slugs instead of rendering an empty template. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found — Codefrem" };
  return {
    title: `${project.title} — Codefrem Case Study`,
    description: project.caseStudy.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { caseStudy } = project;
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <main className="bg-[#0A0A0A] text-white">
      {/* Case-study hero */}
      <section className="w-full pt-32 lg:pt-40 pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-[#AAFF00]/[0.07] blur-[120px]"
        />
        <div className="max-w-6xl mx-auto relative">
          <Reveal>
            <Link
              href="/projects"
              className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#AAFF00] transition-colors"
            >
              ← All Projects
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6 flex items-center gap-3">
              <TagPill lime>{project.category}</TagPill>
              <span className="text-[10px] font-mono text-gray-500">
                /{project.year}
              </span>
            </div>
            <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.05]">
              {project.title}
            </h1>
            <p className="mt-5 text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {caseStudy.summary}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap gap-2">
              {caseStudy.services.map((service) => (
                <TagPill key={service}>{service}</TagPill>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Meta strip */}
      <section className="w-full px-4 sm:px-6 lg:px-12">
        <Reveal className="max-w-6xl mx-auto rounded-3xl border border-[#2A2A2A] border-l-4 border-l-[#AAFF00] bg-[#111111] p-6 sm:p-8 shadow-2xl grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Client
            </span>
            <p className="mt-1.5 text-lg font-serif text-white">{project.client}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Year
            </span>
            <p className="mt-1.5 text-lg font-serif text-white">{project.year}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Our Role
            </span>
            <p className="mt-1.5 text-lg font-serif text-white">{project.role}</p>
          </div>
        </Reveal>
      </section>

      {/* Problem / Solution */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal>
            <GlowCard className="h-full min-h-[260px]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
                The Problem
              </span>
              <h2 className="mt-3 text-2xl font-serif text-white">
                Where it hurt
              </h2>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                {caseStudy.problem}
              </p>
            </GlowCard>
          </Reveal>
          <Reveal delay={120}>
            <GlowCard className="h-full min-h-[260px]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#AAFF00]">
                The Solution
              </span>
              <h2 className="mt-3 text-2xl font-serif text-white">
                What we built
              </h2>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                {caseStudy.solution}
              </p>
            </GlowCard>
          </Reveal>
        </div>
      </section>

      {/* Visuals — populated once real screenshots are added to /public */}
      {caseStudy.visuals.length > 0 && (
        <section className="w-full pb-14 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.visuals.map((visual) => (
              <Reveal key={visual.src}>
                <div className="rounded-3xl overflow-hidden border border-[#222222] bg-[#111111]">
                  {/* Plain <img> for now — switch to next/image when real
                      media lands (see TODO in lib/projects.ts). */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={visual.src}
                    alt={visual.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Results — stats-strip styling */}
      <section className="w-full pb-20 lg:pb-28 px-4 sm:px-6 lg:px-12">
        <Reveal className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Results
          </span>
          <div className="mt-4 rounded-3xl border border-[#2A2A2A] border-l-4 border-l-[#AAFF00] bg-[#111111] p-6 sm:p-10 shadow-2xl">
            <div
              className={`grid grid-cols-1 ${
                caseStudy.results.length === 3
                  ? "md:grid-cols-3"
                  : "md:grid-cols-2"
              } gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#222222]`}
            >
              {caseStudy.results.map((result, index) => (
                <div
                  key={result.label}
                  className={`flex flex-col ${index !== 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}
                >
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#AAFF00] font-sans">
                    {result.value}
                  </span>
                  <span className="mt-2 text-xs sm:text-sm font-medium text-gray-400 tracking-wide uppercase">
                    {result.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* More projects */}
      <section className="w-full pb-20 lg:pb-28 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            More Work
          </span>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {others.map((other) => (
              <a
                key={other.slug}
                href={`/projects/${other.slug}`}
                className="group rounded-3xl border border-[#222222] bg-[#111111] p-6 sm:p-7 flex items-center justify-between gap-4 hover:border-[#AAFF00]/60 hover:shadow-[0_0_35px_rgba(170,255,0,0.12)] transition-all"
              >
                <div>
                  <h3 className="text-xl font-serif text-white group-hover:text-[#AAFF00] transition-colors">
                    {other.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {other.category} · {other.year}
                  </p>
                </div>
                <span className="w-9 h-9 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#AAFF00] group-hover:text-black group-hover:border-[#AAFF00] transition-all">
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <CTAButton href="/contact">Start a Project Like This</CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
