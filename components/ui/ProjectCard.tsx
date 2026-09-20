import React from "react";
import { ArrowRight } from "lucide-react";
import TagPill from "./TagPill";
import { categoryGradients } from "@/data/projects";
import type { Project } from "@/data/projects";

/**
 * Project card for the /projects grid.
 *
 * TOP: 16:9 thumbnail area — real image when `project.heroImage` exists,
 * otherwise the category's CSS gradient placeholder (never external URLs)
 * with the project number in the top-left corner.
 * BOTTOM: category pill, title, client + year, one-liner, service tag
 * pills, "View Case Study →" link.
 *
 * Hover: card lifts, image scales 1.05, lime glow border activates.
 * The thumbnail <img> is a plain img until real media lands; switch to
 * next/image then (placeholder visuals are pure CSS, so no optimization
 * is needed for them).
 *
 * Server component.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const gradient = categoryGradients[project.category];

  return (
    <a
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#222222] bg-[#111111] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#AAFF00]/60 hover:shadow-[0_0_35px_rgba(170,255,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AAFF00]"
      aria-label={`${project.title} case study`}
    >
      {/* Thumbnail — 16:9. TODO: Replace with actual project screenshot
          (set heroImage in data/projects.ts) */}
      <div className="relative aspect-video overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ backgroundImage: gradient }}
          aria-hidden="true"
        />
        {/* Accent tint + dot grid, unique per project */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `radial-gradient(${project.accentColor} 1.5px, transparent 1.5px)`,
            backgroundSize: "18px 18px",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Real image when present — gradient stays as the loading layer */}
        {project.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.heroImage}
            alt={`${project.title} — project preview`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        )}

        <span className="absolute top-4 left-5 font-mono text-xs font-bold text-white/70">
          {project.number}
        </span>
        <span className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest text-white/50">
          {project.duration}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="flex items-center gap-2.5">
          <TagPill lime>{project.category}</TagPill>
          <span className="text-[10px] font-mono text-gray-500">
            /{project.year}
          </span>
        </span>

        <h3 className="mt-3 text-xl sm:text-2xl font-serif text-white transition-colors group-hover:text-[#AAFF00]">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {project.client} · {project.year}
        </p>

        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
          {project.description}
        </p>

        <div className="mb-6 mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>

        <span className="mt-auto inline-flex items-center gap-2 border-t border-white/5 pt-4 text-xs font-bold uppercase tracking-wider text-[#AAFF00]">
          View Case Study
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </a>
  );
}
