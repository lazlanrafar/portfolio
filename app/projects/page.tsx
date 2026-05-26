import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { ProjectGrid } from "@/components/organisms/project-grid";
import { getProjects } from "@/lib/microcms";
import { siteConfig } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: `A collection of projects built by ${siteConfig.author.name} — web applications across e-commerce, real estate, education, and logistics.`,
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  const skills = Array.from(
    new Set(projects.flatMap((p) => p.skills))
  ).sort();

  return (
    <PageLayout>
      <SectionWrapper
        id="projects"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
      >
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

        <ProjectGrid projects={projects} skills={skills} />
      </SectionWrapper>
    </PageLayout>
  );
}
