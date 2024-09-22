export interface IMicrocmsResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface IMicrocmsProject {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: Date;
  thumbnail: IMicrocmsMedia;
  title: string;
  project_url: string;
  description: string;
  github_url: string;
  skills: string[];
}

export interface IMicrocmsMedia {
  url: string;
  height: number;
  width: number;
}
