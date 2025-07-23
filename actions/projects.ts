import { $api } from "@/lib/api";
import type {
  ProjectsResponse,
  FilterOptionsResponse,
  GetProjectsParams,
  ProjectFilterOption,
  PaginatedResponse,
  Project,
} from "@/types/projects";

/**
 * Fetches projects with optional filtering and pagination
 */
export async function getProjects(
  params: GetProjectsParams = {}
): Promise<ProjectsResponse> {
  const {
    page = 1,
    pageSize = 8,
    technologies = [],
    categories = [],
    platforms = [],
    types = [],
  } = params;

  // Build query string
  let query = `/projects?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`;

  // Add technology filters
  if (technologies.length > 0) {
    technologies.forEach((tech, index) => {
      query += `&filters[technologies][name][$in][${index}]=${encodeURIComponent(
        tech
      )}`;
    });
  }

  // Add category filters
  if (categories.length > 0) {
    categories.forEach((category, index) => {
      query += `&filters[categories][name][$in][${index}]=${encodeURIComponent(
        category
      )}`;
    });
  }

  // Add platform filters
  if (platforms.length > 0) {
    platforms.forEach((platform, index) => {
      query += `&filters[platforms][name][$in][${index}]=${encodeURIComponent(
        platform
      )}`;
    });
  }

  // Add type filters
  if (types.length > 0) {
    types.forEach((type, index) => {
      query += `&filters[types][name][$in][${index}]=${encodeURIComponent(
        type
      )}`;
    });
  }

  return $api<ProjectsResponse>(query);
}

/**
 * Fetches a single project by ID
 */
export async function getProjectById(id: string) {
  return $api<{ data: Project }>(`/projects/${id}?populate=*`);
}

/**
 * Fetches all available filter options for projects
 */
export async function getProjectFilterOptions(): Promise<FilterOptionsResponse> {
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

  // Transform to include count (currently set to 0, can be enhanced later)
  const technologies: ProjectFilterOption[] = technologiesResponse.data.map(
    (tech) => ({
      name: tech.name,
      count: 0,
    })
  );

  const categories: ProjectFilterOption[] = categoriesResponse.data.map(
    (cat) => ({
      name: cat.name,
      count: 0,
    })
  );

  const platforms: ProjectFilterOption[] = platformsResponse.data.map(
    (platform) => ({
      name: platform.name,
      count: 0,
    })
  );

  const types: ProjectFilterOption[] = typesResponse.data.map((type) => ({
    name: type.name,
    count: 0,
  }));

  return {
    technologies,
    categories,
    platforms,
    types,
  };
}

/**
 * Fetches technologies only
 */
export async function getProjectTechnologies(): Promise<ProjectFilterOption[]> {
  const response = await $api<PaginatedResponse<{ name: string }>>(
    `/project-technologies?pagination[pageSize]=100&sort=name:ASC`
  );

  return response.data.map((tech) => ({
    name: tech.name,
    count: 0,
  }));
}

/**
 * Fetches categories only
 */
export async function getProjectCategories(): Promise<ProjectFilterOption[]> {
  const response = await $api<PaginatedResponse<{ name: string }>>(
    `/project-categories?pagination[pageSize]=100&sort=name:ASC`
  );

  return response.data.map((cat) => ({
    name: cat.name,
    count: 0,
  }));
}

/**
 * Fetches platforms only
 */
export async function getProjectPlatforms(): Promise<ProjectFilterOption[]> {
  const response = await $api<PaginatedResponse<{ name: string }>>(
    `/project-platforms?pagination[pageSize]=100&sort=name:ASC`
  );

  return response.data.map((platform) => ({
    name: platform.name,
    count: 0,
  }));
}

/**
 * Fetches types only
 */
export async function getProjectTypes(): Promise<ProjectFilterOption[]> {
  const response = await $api<PaginatedResponse<{ name: string }>>(
    `/project-types?pagination[pageSize]=100&sort=name:ASC`
  );

  return response.data.map((type) => ({
    name: type.name,
    count: 0,
  }));
}
