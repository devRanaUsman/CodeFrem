import React from "react";
import { ArrowUpRight } from "lucide-react";
import GlowCard from "./GlowCard";
import TagPill from "./TagPill";
import type { Project } from "@/lib/projects";

/**
 * Project card for the /projects grid — the visual language of the homepage
 * showcase cards (gradient visual, ghost index, lime category pill, tag
 * pills, hover arrow) wrapped in a link to the case study. The optional
 * thumbnail is a plain <img> here: case-study media will move to
 * next/image once real screenshots exist. Server component.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const [firstWord] = project.title.split(" ");

  return (
    <GlowCard className="group flex flex-col p-0 min-h-[400px]">
      <a
        href={`/projects/${project.slug}`}
        className="flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AAFF00] rounded-3xl"
      >
        {/* Visual area — typographic placeholder until real thumbnails exist */}
        <div
          className={`relative h-[210px] overflow-hidden rounded-t-3xl bg-gradient-to-b ${project.gradient}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(#1E1E1E_1px,transparent_1px)] [background-size:18px_18px] opacity-60" />

          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-black uppercase tracking-tight text-white/10 group-hover:text-white/20 transition-colors select-none">
                {firstWord}
              </span>
            </div>
          )}

          <span className="absolute top-4 right-5 text-7xl font-black text-white/[0.06] select-none">
            {project.id}
          </span>
          <span className="absolute top-4 left-5">
            <TagPill lime>{project.category}</TagPill>
          </span>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-[#AAFF00] transition-colors">
                {project.title}
              </h3>
              <span className="text-[10px] font-mono text-gray-500">
                /{project.year}
              </span>
            </div>
            <p className="mt-2.5 text-gray-400 text-xs sm:text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
            <span className="w-9 h-9 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#AAFF00] group-hover:text-black group-hover:border-[#AAFF00] transition-all">
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </a>
    </GlowCard>
    // TODO(perf): switch the thumbnail <img> to next/image with remote
    // loader sizes once real screenshots exist; placeholder visuals are pure
    // DOM, so no image optimization is needed for the placeholder state.
    // eslint-disable-next-line react/jsx-no-comment-textnodes
  );
}
