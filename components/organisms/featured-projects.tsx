import Link from "next/link";
import { ProjectCard } from "@/components/molecules/project-card";
import { getDictionary } from "@/lib/dictionary";
import { format, localePath, type Locale } from "@/lib/i18n";
import { getProjects } from "@/lib/kadocms";

export async function FeaturedProjects({ lang }: { lang: Locale }) {
  const projects = await getProjects(lang, 2);
  const dict = getDictionary(lang);

  return (
    <div className="w-full space-y-4">
      <div className="flex h-8 w-full items-center justify-between gap-x-4">
        <h2 className="text-foreground text-sm font-bold uppercase leading-none">
          {dict.home.selectedWork}
        </h2>
        <Link
          href={localePath(lang, "/projects")}

          aria-label={dict.home.allProjects}
          className="text-muted-foreground anim hover:text-foreground text-xs font-medium"
        >
          {dict.home.allProjects} →
        </Link>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            href={localePath(lang, `/projects/${project.id}`)}
            label={format(dict.projects.readMore, { title: project.title })}
            priority={i < 2}
          />
        ))}
      </div>
    </div>
  );
}
