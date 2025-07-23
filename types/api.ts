export interface MetaPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginatedResponse<T> {
  meta: {
    pagination: MetaPagination;
    [key: string]: any; // Allow additional properties
  };
  data: T[];
}

interface ProjectMedia {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Project {
  id: number;
  documentId: string;
  name: string;
  description: string;
  source_code_url: string | null;
  url: string | null;
  is_released: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  created_at: string;

  technologies: {
    name: string;
  }[];

  skills?: string[]; // For the skills array used in the component

  thumbnail: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      large: ProjectMedia;
      small: ProjectMedia;
      medium: ProjectMedia;
      thumbnail: ProjectMedia;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
  };
}
