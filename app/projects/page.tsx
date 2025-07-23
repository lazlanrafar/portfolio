import { FadeIn } from "@/components/atoms/fade-in";
import ProjectCard from "@/components/molecules/project-card";
import UnifiedFilter from "@/components/molecules/unified-filter";
import ClearFiltersButton from "@/components/molecules/clear-filters-button";
import { siteConfig } from "@/constants";
import { getProjects, getProjectFilterOptions } from "@/actions/projects";
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
  const selectedTechnologies = resolvedSearchParams?.technologies
    ? String(resolvedSearchParams.technologies).split(",")
    : [];
  const selectedCategories = resolvedSearchParams?.categories
    ? String(resolvedSearchParams.categories).split(",")
    : [];
  const selectedPlatforms = resolvedSearchParams?.platforms
    ? String(resolvedSearchParams.platforms).split(",")
    : [];
  const selectedTypes = resolvedSearchParams?.types
    ? String(resolvedSearchParams.types).split(",")
    : [];

  // Fetch filter options and projects using the new actions
  const [filterOptions, projectsResponse] = await Promise.all([
    getProjectFilterOptions(),
    getProjects({
      page,
      pageSize,
      technologies: selectedTechnologies,
      categories: selectedCategories,
      platforms: selectedPlatforms,
      types: selectedTypes,
    }),
  ]);

  const {
    data: projects,
    meta: { pagination },
  } = projectsResponse;

  return (
    <section className="overflow-y-auto relative h-full">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-base font-bold text-foreground mb-1">Projects</h1>
          <p className="text-muted-foreground text-xs">
            A collection of {pagination?.total || projects.length} projects that
            I have worked on.
          </p>
        </div>

        {/* Filter Section */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 mb-6 pb-4 -mx-6 px-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Unified Filter */}
            <UnifiedFilter
              technologies={filterOptions.technologies}
              categories={filterOptions.categories}
              platforms={filterOptions.platforms}
              types={filterOptions.types}
              selectedTechnologies={selectedTechnologies}
              selectedCategories={selectedCategories}
              selectedPlatforms={selectedPlatforms}
              selectedTypes={selectedTypes}
            />

            {/* Reset All Filters Button */}
            <ClearFiltersButton
              hasActiveFilters={
                selectedTechnologies.length > 0 ||
                selectedCategories.length > 0 ||
                selectedPlatforms.length > 0 ||
                selectedTypes.length > 0
              }
              pageSize={
                resolvedSearchParams?.pageSize
                  ? String(resolvedSearchParams.pageSize)
                  : undefined
              }
            />
          </div>

          {/* Active Filters Display */}
          {(selectedTechnologies.length > 0 ||
            selectedCategories.length > 0 ||
            selectedPlatforms.length > 0 ||
            selectedTypes.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Active filters:
              </span>

              {selectedTechnologies.map((tech) => (
                <span
                  key={`tech-${tech}`}
                  className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-xs rounded-md border border-blue-200 dark:border-blue-800"
                >
                  Tech: {tech}
                </span>
              ))}

              {selectedCategories.map((category) => (
                <span
                  key={`cat-${category}`}
                  className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 text-xs rounded-md border border-green-200 dark:border-green-800"
                >
                  Category: {category}
                </span>
              ))}

              {selectedPlatforms.map((platform) => (
                <span
                  key={`platform-${platform}`}
                  className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 text-xs rounded-md border border-purple-200 dark:border-purple-800"
                >
                  Platform: {platform}
                </span>
              ))}

              {selectedTypes.map((type) => (
                <span
                  key={`type-${type}`}
                  className="inline-flex items-center px-2 py-1 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 text-xs rounded-md border border-orange-200 dark:border-orange-800"
                >
                  Type: {type}
                </span>
              ))}

              <span className="text-xs text-muted-foreground ml-2">
                ({pagination?.total || 0} result
                {pagination?.total !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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
                {selectedTechnologies.length > 0
                  ? "No projects found with selected filters"
                  : "No projects found"}
              </h3>
              <p className="text-muted-foreground">
                {selectedTechnologies.length > 0
                  ? "Try adjusting your filters or check back later for new projects."
                  : "Check back later for new projects."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
