import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import ProjectPreview from "@/components/projects/ProjectPreview";

export default function ProjectCard({ project }: { project: Project }) {
  return <Link href={`/projects/${project.slug}`} className="reference-project glass-panel" aria-label={`${project.title} case study`}>
    {project.heroImage ? <div className="project-preview"><Image src={project.heroImage} alt={`${project.title} preview`} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div> : <ProjectPreview slug={project.slug}/>}
    <div className="project-card-copy"><span className="project-number">{project.number}</span><div><h3>{project.title}</h3><p>{project.description}</p></div><ArrowRight size={18}/></div>
  </Link>;
}

