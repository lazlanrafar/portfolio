// Re-export and import existing types
import type { Project, MetaPagination, PaginatedResponse } from "./api";

// Project-related types
export interface ProjectFilterOption {
  name: string;
  count: number;
}

export interface ProjectFilters {
  technologies: string[];
  categories: string[];
  platforms: string[];
  types: string[];
}

export interface ProjectsQueryParams {
  page?: number;
  pageSize?: number;
  filters?: Partial<ProjectFilters>;
}

export interface GetProjectsParams {
  page?: number;
  pageSize?: number;
  technologies?: string[];
  categories?: string[];
  platforms?: string[];
  types?: string[];
}

export interface ProjectsResponse {
  data: Project[];
  meta: {
    pagination: MetaPagination;
  };
}

export interface FilterOptionsResponse {
  technologies: ProjectFilterOption[];
  categories: ProjectFilterOption[];
  platforms: ProjectFilterOption[];
  types: ProjectFilterOption[];
}

// Re-export types for convenience
export type { Project, MetaPagination, PaginatedResponse };
