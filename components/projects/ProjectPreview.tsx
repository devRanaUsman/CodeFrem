import Image from "next/image";
import { getProjectBySlug } from "@/data/projects";

export default function ProjectPreview({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  return (
    <div className="project-preview">
      <div className="absolute inset-0" style={{ padding: "inherit" }}>
        <div className="relative h-[80%] border border-gray-300 rounded-sm overflow-hidden">
          <Image
            src={project.heroImage}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
