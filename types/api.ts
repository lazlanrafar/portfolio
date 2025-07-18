export interface MetaPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginatedResponse<T> {
  meta: MetaPagination;
  data: T[];
}

export interface Project {
  id: number;
  documentId: string;
  thumbnail: string;
  name: string;
  description: string;
  source_code_url: string | null;
  url: string | null;
  is_released: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
