import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectsSection() {
  const selected = ["nebula-finance", "vertex-studio", "lumen-health"].map(slug => projects.find(project => project.slug === slug)!);
  return <section id="projects" className="home-section">
    <div className="section-label-row"><h2 className="section-label">SELECTED WORK</h2><Link href="/projects" className="section-more">EXPLORE MORE PROJECTS <ArrowRight size={17}/></Link></div>
    <div className="reference-project-grid">{selected.map(project => <ProjectCard key={project.slug} project={project}/>)}</div>
    <p className="concept-note">Concept projects — a look at what we can create together.</p>
  </section>;
}

