import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { FilterableList } from "@/components/organisms/filterable-list";
import { ProjectCard } from "@/components/molecules/project-card";
import { getProjects } from "@/lib/kadocms";
import { getProfile } from "@/lib/profile";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getProfile();
  return {
    title: "Projects",
    description: `A collection of projects built by ${name} — web applications across e-commerce, real estate, education, and logistics.`,
  };
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageLayout>
      <SectionWrapper
        id="projects"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 md:px-8 lg:gap-y-24 lg:px-16"
      >
        <div className="w-full space-y-8">
          <div className="w-full space-y-4">
            <div className="flex h-8 w-full items-center">
              <h1 className="text-foreground text-sm font-bold uppercase leading-none">
                Projects
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              A selection of{" "}
              <span className="text-foreground font-medium">
                {projects.length} projects
              </span>{" "}
              I&apos;ve built for clients and personal use over the years.
            </p>
          </div>

          <FilterableList
            noun="projects"
            nounOne="project"
            listClassName="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
            items={projects.map((project, i) => ({
              id: project.id,
              text: [
                project.title,
                ...project.skills,
                project.description.replace(/<[^>]+>/g, " "),
              ].join(" "),
              tags: project.skills,
              node: <ProjectCard project={project} priority={i < 2} />,
            }))}
          />
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
