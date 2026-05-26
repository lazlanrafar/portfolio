import Link from "next/link";
import { ProjectCard } from "@/components/molecules/project-card";
import { getProjects } from "@/lib/microcms";

export async function FeaturedProjects() {
  const projects = await getProjects(3);

  return (
    <div className="w-full space-y-4">
      <div className="flex h-8 w-full items-center justify-between gap-x-4">
        <h2 className="text-foreground text-sm font-bold uppercase leading-none">
          Selected Work
        </h2>
        <Link
          href="/projects"
          scroll={false}
          aria-label="All projects"
          className="text-muted-foreground anim hover:text-foreground text-xs font-medium"
        >
          All projects →
        </Link>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
