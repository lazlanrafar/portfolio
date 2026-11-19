import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/kadocms";
import { getAllPosts } from "@/lib/posts";
import { getProfile } from "@/lib/profile";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { absoluteUrl, languageAlternates, pageUrl } from "@/lib/seo";

/** The newest of some dates; lastModified tells crawlers what really changed, so never "now". */
const newest = (dates: string[]) =>
  new Date(Math.max(...dates.map((d) => new Date(d).getTime())));

/** One URL per page (English), with its Indonesian and Japanese versions as alternates. */
function entry(
  path: string,
  lastModified: Date | undefined,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path))
      .filter(([lang]) => lang !== "x-default")
      .map(([lang, p]) => [lang, absoluteUrl(p)]),
  );
  return {
    url: pageUrl(DEFAULT_LOCALE, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dates and slugs are shared by every language, so the English content is enough here.
  const [projects, posts, profile] = await Promise.all([
    getProjects(DEFAULT_LOCALE),
    getAllPosts(DEFAULT_LOCALE),
    getProfile(DEFAULT_LOCALE),
  ]);

  const projectsChanged = newest(projects.map((p) => p.updatedAt));
  const postsChanged = posts.length
    ? newest(posts.map((p) => p.updatedAt))
    : undefined;
  const profileChanged = new Date(profile.updatedAt);

  return [
    entry(
      "/",
      newest([profile.updatedAt, projectsChanged.toISOString()]),
      "monthly",
      1,
    ),
    entry("/about", profileChanged, "monthly", 0.8),
    entry("/projects", projectsChanged, "weekly", 0.8),
    entry("/blog", postsChanged, "weekly", 0.8),
    entry("/contact", profileChanged, "yearly", 0.5),
    ...projects.map((p) =>
      entry(`/projects/${p.id}`, new Date(p.updatedAt), "monthly", 0.6),
    ),
    ...posts.map((p) =>
      entry(`/blog/${p.slug}`, new Date(p.updatedAt), "monthly", 0.7),
    ),
  ];
}
