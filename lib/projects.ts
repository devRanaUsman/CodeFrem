/**
 * Compatibility layer over data/projects.ts (the real single source of
 * truth). The homepage horizontal showcase renders cards keyed by
 * `project.id` with tailwind `gradient` classes; those legacy fields are
 * derived here so the homepage needs no changes.
 *
 * Everything else (grid, case studies) should import from data/projects.
 */

import { projects as dataProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

export type { Project, ProjectResult } from "@/data/projects";

/** Per-slug legacy gradient classes preserving the homepage's look. */
const legacyGradients: Record<string, string> = {
  "style-hub": "from-[#AAFF00]/25 via-[#0A0A0A] to-[#0A0A0A]",
  "harrington-property-group": "from-white/15 via-[#0A0A0A] to-[#0A0A0A]",
  "rag-video-chatbot": "from-[#AAFF00]/25 via-[#0A0A0A] to-[#0A0A0A]",
  "trueman": "from-white/15 via-[#0A0A0A] to-[#0A0A0A]",
  "zaiqa": "from-[#AAFF00]/25 via-[#0A0A0A] to-[#0A0A0A]",
};

const fallbackGradient = "from-[#AAFF00]/25 via-[#0A0A0A] to-[#0A0A0A]";

export type LegacyProject = Project & {
  id: string;
  gradient: string;
  /** TEMP bridge for the old case-study template; removed in its rebuild. */
  role: string;
  /** TEMP bridge for the old case-study template; removed in its rebuild. */
  caseStudy: {
    summary: string;
    problem: string;
    solution: string;
    visuals: { src: string; alt: string }[];
    results: { value: string; label: string }[];
    /** Real feature bullets shown in the Highlights section. */
    highlights: string[];
    services: string[];
  };
};

export const projects: LegacyProject[] = dataProjects.map((project) => ({
  ...project,
  id: project.number,
  gradient: legacyGradients[project.slug] ?? fallbackGradient,
  role: project.category,
  caseStudy: {
    summary: project.tagline,
    problem: project.problem.body,
    solution: project.solution.body,
    visuals: project.gallery
      .filter((item) => Boolean(item.src))
      .map((item) => ({ src: item.src as string, alt: item.caption })),
    results: project.results.map(({ value, label }) => ({ value, label })),
    highlights: project.highlights,
    services: project.tags,
  },
}));

export function getProjectBySlug(slug: string): LegacyProject | undefined {
  return projects.find((p) => p.slug === slug);
}
