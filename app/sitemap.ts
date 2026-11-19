import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/kadocms";
import { getAllPosts } from "@/lib/posts";
import { getProfile } from "@/lib/profile";
import { absoluteUrl } from "@/lib/seo";

/** The newest of some dates; lastModified tells crawlers what really changed, so never "now". */
const newest = (dates: string[]) =>
  new Date(Math.max(...dates.map((d) => new Date(d).getTime())));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts, profile] = await Promise.all([
    getProjects(),
    getAllPosts(),
    getProfile(),
  ]);

  const projectsChanged = newest(projects.map((p) => p.updatedAt));
  const postsChanged = posts.length
    ? newest(posts.map((p) => p.updatedAt))
    : undefined;

  return [
    {
      url: absoluteUrl("/"),
      lastModified: newest([profile.updatedAt, projectsChanged.toISOString()]),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: new Date(profile.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: projectsChanged,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: postsChanged,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: new Date(profile.updatedAt),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.id}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
