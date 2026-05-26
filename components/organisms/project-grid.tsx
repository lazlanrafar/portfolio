import { ProjectCard } from "@/components/molecules/project-card";
import type { Project } from "@/lib/microcms";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
