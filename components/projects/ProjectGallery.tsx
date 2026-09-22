"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, Plus } from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects, projectCategories } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";

/**
 * The /projects listing: filter tabs (All | Web Dev | UI/UX | 3D & Motion |
 * Brand) above the project grid. Filtering is client-side; cards fade in
 * via a CSS key re-trigger (no layout shift: the grid keeps its shape and
 * cards animate opacity/transform only). The "Your project here" slot and
 * the confidentiality note live below the grid.
 */
export default function ProjectGallery() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active]
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {(["All", ...projectCategories] as const).map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              aria-pressed={isActive}
              className={clsx(
                "rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-[#AFF45D] to-[#B9ED7A] text-black shadow-sm"
                  : "border border-line text-muted hover:border-[#AFF45D]/60 hover:text-accent-ink"
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid: keyed by filter so cards re-fade on switch */}
      <div
        key={active}
        className="mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        {visible.map((project, index) => (
          <div
            key={project.slug}
            className="project-grid-item"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}

        {/* Your project here: the open slot */}
        <div
          className="project-grid-item flex"
          style={{ animationDelay: `${visible.length * 70}ms` }}
        >
          <div className="relative flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#AFF45D]/30 bg-[#AFF45D]/[0.02] p-8 text-center min-h-[420px] transition-colors duration-300 hover:border-[#AFF45D]/60 hover:bg-[#AFF45D]/[0.05]">
            <span className="absolute top-6 right-7 font-mono text-xs font-bold text-ink/30">
              {String(projects.length + 1).padStart(2, "0")}
            </span>
            <span className="grid h-14 w-14 place-items-center rounded-full border border-[#AFF45D]/40 bg-[#AFF45D]/10 text-accent-ink">
              <Plus className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-sans text-ink/80">
              Your project here
            </h3>
            <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-accent-ink">
              Next slot open
            </span>
            <p className="mt-2 text-sm text-muted">
              We take on 2-3 new projects per quarter.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#AFF45D]/50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent-ink transition-all duration-300 hover:bg-[#AFF45D] hover:text-black shadow-sm"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Confidentiality note */}
      <p className="mt-12 text-center text-xs italic text-muted">
        Some client names and details have been changed for confidentiality.
      </p>
    </div>
  );
}


