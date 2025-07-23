import { FadeIn } from "@/components/atoms/fade-in";
import ProjectCard from "@/components/molecules/project-card";
import TechnologyFilter from "@/components/molecules/technology-filter";
import GenericFilter from "@/components/molecules/generic-filter";
import ClearFiltersButton from "@/components/molecules/clear-filters-button";
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

  // Fetch all filter options from dedicated endpoints
  const [
    technologiesResponse,
    categoriesResponse,
    platformsResponse,
    typesResponse,
  ] = await Promise.all([
    $api<PaginatedResponse<{ name: string }>>(
      `/project-technologies?pagination[pageSize]=100&sort=name:ASC`
    ),
    $api<PaginatedResponse<{ name: string }>>(
      `/project-categories?pagination[pageSize]=100&sort=name:ASC`
    ),
    $api<PaginatedResponse<{ name: string }>>(
      `/project-platforms?pagination[pageSize]=100&sort=name:ASC`
    ),
    $api<PaginatedResponse<{ name: string }>>(
      `/project-types?pagination[pageSize]=100&sort=name:ASC`
    ),
  ]);

  // Transform filter data
  const availableTechnologies = technologiesResponse.data.map((tech) => ({
    name: tech.name,
    count: 0,
  }));
  const availableCategories = categoriesResponse.data.map((cat) => ({
    name: cat.name,
    count: 0,
  }));
  const availablePlatforms = platformsResponse.data.map((platform) => ({
    name: platform.name,
    count: 0,
  }));
  const availableTypes = typesResponse.data.map((type) => ({
    name: type.name,
    count: 0,
  }));

  // Build projects query with all filters
  let projectsQuery = `/projects?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`;

  // Add technology filter
  if (selectedTechnologies.length > 0) {
    selectedTechnologies.forEach((tech, index) => {
      projectsQuery += `&filters[technologies][name][$in][${index}]=${encodeURIComponent(
        tech
      )}`;
    });
  }

  // Add category filter
  if (selectedCategories.length > 0) {
    selectedCategories.forEach((category, index) => {
      projectsQuery += `&filters[categories][name][$in][${index}]=${encodeURIComponent(
        category
      )}`;
    });
  }

  // Add platform filter
  if (selectedPlatforms.length > 0) {
    selectedPlatforms.forEach((platform, index) => {
      projectsQuery += `&filters[platforms][name][$in][${index}]=${encodeURIComponent(
        platform
      )}`;
    });
  }

  // Add type filter
  if (selectedTypes.length > 0) {
    selectedTypes.forEach((type, index) => {
      projectsQuery += `&filters[types][name][$in][${index}]=${encodeURIComponent(
        type
      )}`;
    });
  }
  const response = await $api<PaginatedResponse<Project>>(projectsQuery);

  const {
    data: projects,
    meta: { pagination },
  } = response;

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
            <TechnologyFilter technologies={availableTechnologies} />
            <GenericFilter
              options={availableCategories}
              filterKey="categories"
              label="Categories"
              icon="category"
            />
            <GenericFilter
              options={availablePlatforms}
              filterKey="platforms"
              label="Platforms"
              icon="platform"
            />
            <GenericFilter
              options={availableTypes}
              filterKey="types"
              label="Types"
              icon="type"
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
                  ? "No projects found with selected technologies"
                  : "No projects found"}
              </h3>
              <p className="text-muted-foreground">
                {selectedTechnologies.length > 0
                  ? "Try adjusting your technology filters or check back later for new projects."
                  : "Check back later for new projects or try adjusting your search."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
