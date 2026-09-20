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
 * via a CSS key re-trigger (no layout shift — the grid keeps its shape and
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
                  ? "bg-gradient-to-r from-[#AAFF00] to-[#7ACC00] text-black shadow-[0_0_20px_rgba(170,255,0,0.3)]"
                  : "border border-white/15 text-gray-400 hover:border-[#AAFF00]/60 hover:text-[#AAFF00]"
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid — keyed by filter so cards re-fade on switch */}
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

        {/* Your project here — the open slot */}
        <div
          className="project-grid-item flex"
          style={{ animationDelay: `${visible.length * 70}ms` }}
        >
          <div className="relative flex w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#AAFF00]/30 bg-[#AAFF00]/[0.02] p-8 text-center min-h-[420px] transition-colors duration-300 hover:border-[#AAFF00]/60 hover:bg-[#AAFF00]/[0.05]">
            <span className="absolute top-6 right-7 font-mono text-xs font-bold text-white/30">
              {String(projects.length + 1).padStart(2, "0")}
            </span>
            <span className="grid h-14 w-14 place-items-center rounded-full border border-[#AAFF00]/40 bg-[#AAFF00]/10 text-[#AAFF00]">
              <Plus className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-serif italic text-white/80">
              Your project here
            </h3>
            <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#AAFF00]">
              Next slot open
            </span>
            <p className="mt-2 text-sm text-gray-500">
              We take on 2–3 new projects per quarter.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#AAFF00]/50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#AAFF00] transition-all duration-300 hover:bg-[#AAFF00] hover:text-black hover:shadow-[0_0_25px_rgba(170,255,0,0.35)]"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Confidentiality note */}
      <p className="mt-12 text-center text-xs italic text-gray-600">
        Some client names and details have been changed for confidentiality.
      </p>
    </div>
  );
}
