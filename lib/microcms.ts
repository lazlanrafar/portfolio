export interface MicroCMSImage {
  url: string;
  height: number;
  width: number;
}

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  description: string;
  thumbnail?: MicroCMSImage;
  start_date?: string;
  end_date?: string;
  project_url?: string;
  skills: string[];
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

const API_KEY = process.env.MICROCMS_API_KEY!;
const BASE_URL = process.env.MICROCMS_BASE_URL!;

async function fetchMicroCMS<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: { "X-MICROCMS-API-KEY": API_KEY },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`microCMS error ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function getProjects(limit = 100): Promise<Project[]> {
  const data = await fetchMicroCMS<MicroCMSListResponse<Project>>("project", {
    limit: String(limit),
  });
  return data.contents;
}

export async function getProject(id: string): Promise<Project> {
  return fetchMicroCMS<Project>(`project/${id}`);
}

export interface TocItem {
  id: string;
  depth: number;
  text: string;
}

export function parseToc(html: string): TocItem[] {
  const regex = /<h([2-4])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[2-4]>/gi;
  const items: TocItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    items.push({
      depth: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, "").trim(),
    });
  }
  return items;
}
