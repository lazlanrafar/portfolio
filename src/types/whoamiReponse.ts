export interface IWhoamiPagination {
  total_records: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export type IWhoamiProject = {
  id: string;
  thumbnail?: string;
  title: string;
  description: string;
  source_code?: string;
  url?: string;
  technology?: IWhoamiProjectTechnology[];
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
};

export type IWhoamiProjectTechnology = {
  id: string;
  project_id: string;
  skill_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export type IWhoamiProjectResponse = {
  data: {
    pagination: IWhoamiPagination;
    data: IWhoamiProject[];
  };
};
