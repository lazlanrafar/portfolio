import { FadeIn } from "@/components/atoms/fade-in";
import ProjectCard from "@/components/molecules/project-card";
import { siteConfig } from "@/constants";
import { $api } from "@/lib/api";
import { PaginatedResponse, Project } from "@/types/api";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/atoms/skeleton";
import Pagination from "@/components/molecules/pagination";
import { Separator } from "@/components/atoms/separator";

// Add revalidation to cache API responses in development
export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Projects | " + siteConfig.name,
  description: "A collection of projects that I have worked on.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const pageSize = Number(resolvedSearchParams?.pageSize) || 8;

  const response = await $api<PaginatedResponse<Project>>(
    `/projects?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`
  );

  const {
    data: projects,
    meta: { pagination },
  } = response;

  return (
    <section className="overflow-y-auto relative h-full pb-10">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-base font-bold text-foreground mb-1">Projects</h1>
          <p className="text-muted-foreground text-xs">
            A collection of {pagination?.total || projects.length} projects that
            I have worked on.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project) => (
                <FadeIn key={`Project-${project.id}-${pagination?.page || 1}`}>
                  <Suspense
                    fallback={
                      <Skeleton className="w-full h-64 sm:h-72 lg:h-80" />
                    }
                  >
                    <ProjectCard project={project} />
                  </Suspense>
                </FadeIn>
              ))}
            </div>
            <Separator className="my-6" />

            <Pagination
              page={pagination?.page}
              pageSize={pagination?.pageSize}
              totalPages={pagination?.pageCount || 1}
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
