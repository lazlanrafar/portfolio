import { AnimatePresence, FadeIn } from "@/components/atoms/fade-in";
import ProjectCard from "@/components/molecules/project-card";
import { Pagination } from "@/components/molecules/pagination";
import { siteConfig } from "@/constants";
import { $api } from "@/lib/api";
import { PaginatedResponse, Project } from "@/types/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects | " + siteConfig.name,
  description: "A collection of projects that I have worked on.",
};

interface ProjectsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const page = Number(searchParams?.page) || 1;
  const pageSize = 8; // Projects per page

  const response = await $api<PaginatedResponse<Project>>(
    `/projects?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`
  );

  const { data: projects, meta } = response;
  const totalPages = meta?.pageCount || 1;
  const currentPage = meta?.page || 1;

  console.log({ meta });

  return (
    <section className="overflow-y-auto relative h-full pb-10">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-base font-bold text-foreground mb-1">Projects</h1>
          <p className="text-muted-foreground text-xs">
            A collection of {meta?.total || projects.length} projects that I
            have worked on.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="wait">
                {projects.map((project) => (
                  <FadeIn key={`Project-${project.id}-${currentPage}`}>
                    <ProjectCard project={project} />
                  </FadeIn>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/projects"
              searchParams={searchParams}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground">
                Check back later for new projects or try adjusting your search.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
