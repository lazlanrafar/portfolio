/**
 * The site owner's profile from KadoCMS (content type `profile`, one entry): the bio, socials,
 * skills, experience and the About page lists. Turned into the shapes the components render,
 * so periods, flags and groups are worked out here, not in the CMS.
 */
import { cache } from "react";
import { fetchKado, mediaUrl, renderRichText, type RichNode } from "@/lib/kadocms";

type Item<T> = T & { __id?: string };

interface ProfileEntry {
  name: string;
  role: string;
  bio: string;
  long_bio?: RichNode | null;
  location?: string | null;
  email?: string | null;
  socials?: Item<{ label: string; url: string }>[] | null;
  process?: Item<{ name: string; description: string }>[] | null;
  skills?: Item<{ name: string; category?: string | null }>[] | null;
  tech_icons?: Item<{ name: string; icon: string }>[] | null;
  experience?: Item<{
    role: string;
    company: string;
    start_date: string;
    end_date?: string | null;
    description?: string | null;
    country?: string | null;
  }>[] | null;
  education?: Item<{
    institution: string;
    area?: string | null;
    degree?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    gpa?: string | null;
    url?: string | null;
    country?: string | null;
  }>[] | null;
  awards?: Item<{ title: string; awarder?: string | null; year?: number | null }>[] | null;
  workstation?: Item<{ name: string; category: string }>[] | null;
  inspiration?: Item<{ name: string; url: string; category: string }>[] | null;
  bookmarks?: Item<{ title: string; url: string; description?: string | null }>[] | null;
  seo?: { meta_title?: string; meta_description?: string; share_image?: string | null } | null;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  /** Rendered HTML. */
  longBio: string;
  location: string;
  email: string;
  socials: SocialLink[];
  /** A social URL by its lowercased label: `social.github`. */
  social: Record<string, string | undefined>;
  processItems: { name: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
  techItems: { id: string; name: string }[];
  experience: { role: string; company: string; period: string; description: string; country: string }[];
  education: {
    institution: string;
    area: string;
    degree: string;
    period: string;
    gpa: string;
    url: string;
    country: string;
  }[];
  awards: { title: string; awarder: string; year: string }[];
  workstationItems: { category: string; items: string[] }[];
  inspirationItems: { category: string; items: { name: string; href: string }[] }[];
  bookmarkItems: { title: string; href: string; description: string }[];
  seo?: { title?: string; description?: string; image?: string };
}

/** Category names as the site shows them. */
const CATEGORY_LABEL: Record<string, string> = { Infrastructure: "DevOps & Cloud" };

/** An ISO country code as its flag emoji. */
function flag(code?: string | null): string {
  if (!code || !/^[A-Z]{2}$/.test(code)) return "🌐";
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

const monthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
const year = (iso: string) => String(new Date(iso).getUTCFullYear());

/** "Dec 2023 — Present"; an empty end means still there. */
function period(start: string | null | undefined, end: string | null | undefined, format: (iso: string) => string) {
  if (!start) return end ? format(end) : "";
  return `${format(start)} — ${end ? format(end) : "Present"}`;
}

/** Items grouped by a key, in the order the groups first appear. */
function groupBy<T>(items: T[], key: (item: T) => string): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    groups.set(k, [...(groups.get(k) ?? []), item]);
  }
  return [...groups];
}

function toProfile(e: ProfileEntry): Profile {
  const socials = (e.socials ?? []).map(({ label, url }) => ({ label, url }));
  return {
    name: e.name,
    role: e.role,
    bio: e.bio,
    longBio: renderRichText(e.long_bio),
    location: e.location ?? "",
    email: e.email ?? "",
    socials,
    social: Object.fromEntries(socials.map((s) => [s.label.toLowerCase(), s.url])),
    processItems: (e.process ?? []).map(({ name, description }) => ({ name, description })),
    skillCategories: groupBy(e.skills ?? [], (s) => s.category ?? "Other").map(([category, skills]) => ({
      name: CATEGORY_LABEL[category] ?? category,
      skills: skills.map((s) => s.name),
    })),
    techItems: (e.tech_icons ?? []).map((t) => ({ id: t.icon, name: t.name })),
    experience: (e.experience ?? []).map((x) => ({
      role: x.role,
      company: x.company,
      period: period(x.start_date, x.end_date, monthYear),
      description: x.description ?? "",
      country: flag(x.country),
    })),
    education: (e.education ?? []).map((x) => ({
      institution: x.institution,
      area: x.area ?? "",
      degree: x.degree ?? "",
      period: period(x.start_date, x.end_date, year),
      gpa: x.gpa ?? "",
      url: x.url ?? "",
      country: flag(x.country),
    })),
    awards: (e.awards ?? []).map((a) => ({
      title: a.title,
      awarder: a.awarder ?? "",
      year: a.year ? String(a.year) : "",
    })),
    workstationItems: groupBy(e.workstation ?? [], (t) => t.category).map(([category, tools]) => ({
      category,
      items: tools.map((t) => t.name),
    })),
    inspirationItems: groupBy(e.inspiration ?? [], (i) => i.category).map(([category, people]) => ({
      category,
      items: people.map((p) => ({ name: p.name, href: p.url })),
    })),
    bookmarkItems: (e.bookmarks ?? []).map((b) => ({
      title: b.title,
      href: b.url,
      description: b.description ?? "",
    })),
    seo: e.seo
      ? {
          title: e.seo.meta_title || undefined,
          description: e.seo.meta_description || undefined,
          image: e.seo.share_image ? mediaUrl(e.seo.share_image) : undefined,
        }
      : undefined,
  };
}

/** The published profile; one fetch per render, cached for an hour like the rest of the content. */
export const getProfile = cache(async (): Promise<Profile> => {
  const data = await fetchKado<{ data: ProfileEntry[] }>("content/profile", { page_size: "1" });
  const entry = data.data[0];
  if (!entry) throw new Error("KadoCMS: no published profile");
  return toProfile(entry);
});
