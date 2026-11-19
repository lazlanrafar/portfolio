import { ProjectCard } from "@/components/molecules/project-card";
import type { Project } from "@/lib/kadocms";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} priority={i < 2} />
      ))}
    </div>
  );
}
