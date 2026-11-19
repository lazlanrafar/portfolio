/**
 * /llms.txt: a Markdown index of the site for AI assistants and answer engines (llmstxt.org),
 * built from the same KadoCMS content as the pages.
 */
import { siteConfig } from "@/lib/data";
import { getProjects } from "@/lib/kadocms";
import { getAllPosts } from "@/lib/posts";
import { getProfile } from "@/lib/profile";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

/** Plain text from HTML, cut at a word boundary. */
function summary(html: string, max = 200): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

export async function GET() {
  const [profile, projects, posts] = await Promise.all([
    getProfile("en"),
    getProjects("en"),
    getAllPosts("en"),
  ]);

  // The long bio usually opens with the short one; say it once.
  const longBio = summary(profile.longBio, 1000);
  const rest = longBio.startsWith(profile.bio)
    ? longBio.slice(profile.bio.length).trim()
    : longBio;

  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.bio} Based in ${profile.location}.`,
    "",
    ...(rest ? [rest, ""] : []),
    "## Pages",
    "",
    `- [About](${absoluteUrl("/about")}): experience, education, skills and tools.`,
    `- [Projects](${absoluteUrl("/projects")}): ${projects.length} web and mobile projects.`,
    `- [Blog](${absoluteUrl("/blog")}): articles on code, design and software engineering.`,
    `- [Contact](${absoluteUrl("/contact")}): email ${profile.email} and social profiles.`,
    "",
    `Every page is also in Indonesian under ${absoluteUrl("/id")} and in Japanese under ${absoluteUrl("/ja")}.`,
    "",
    "## Experience",
    "",
    ...profile.experience.map(
      (x) => `- ${x.role}, ${x.company} (${x.period}): ${x.description}`,
    ),
    "",
    "## Skills",
    "",
    ...profile.skillCategories.map(
      (c) => `- ${c.name}: ${c.skills.join(", ")}`,
    ),
    "",
    "## Projects",
    "",
    ...projects.map((p) => {
      const tech = p.skills.length ? ` Built with ${p.skills.join(", ")}.` : "";
      return `- [${p.title}](${absoluteUrl(`/projects/${p.id}`)}): ${summary(p.seo?.description ?? p.description)}${tech}`;
    }),
    ...(posts.length
      ? [
          "",
          "## Blog",
          "",
          ...posts.map(
            (p) =>
              `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`,
          ),
        ]
      : []),
    "",
    "## Profiles",
    "",
    ...profile.socials.map((s) => `- [${s.label}](${s.url})`),
    "",
    `Site: ${siteConfig.url}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
