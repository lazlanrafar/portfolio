/**
 * KadoCMS client for projects (server-side only; the API key never reaches the browser).
 * The Delivery API returns rich text as a document tree and media as ids; this file turns
 * them into what the pages render: HTML with heading ids (for the table of contents) and
 * image URLs that KadoCMS resizes on the fly.
 */

import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export interface ProjectImage {
  url: string;
  /** A tiny blurred copy as a data URL, shown while the image loads. */
  blurDataURL?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  /** The slug: the project's URL segment. */
  id: string;
  title: string;
  /** Rendered HTML. */
  description: string;
  thumbnail?: ProjectImage;
  gallery: { image: ProjectImage; caption?: string }[];
  start_date?: string;
  end_date?: string;
  links: ProjectLink[];
  /** Technology names, for the card line ("Next.js · Docker"). */
  skills: string[];
  seo?: { title?: string; description?: string; image?: ProjectImage };
  updatedAt: string;
}

interface Entry {
  document_id: string;
  slug: string;
  title: string;
  description?: RichNode | null;
  thumbnail?: string | null;
  gallery?: { image?: string | null; caption?: string | null }[] | null;
  start_date?: string | null;
  end_date?: string | null;
  links?: { label?: string; url?: string }[] | null;
  tech_stack?: { name?: string; category?: string }[] | null;
  /** Older fields, read until they are removed from the schema. */
  skills?: string[] | null;
  project_url?: string | null;
  github_url?: string | null;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    share_image?: string | null;
  } | null;
  updated_at: string;
}

interface ListResponse {
  data: Entry[];
  meta: { pagination: { total: number } };
}

const API_KEY = process.env.KADOCMS_API_KEY!;
const BASE_URL = (process.env.KADOCMS_URL ?? "").replace(/\/$/, "");

/**
 * A Delivery API read. With a language other than English, entries not translated yet come back
 * in English (fallback_locale); a language the CMS project does not have yet reads English too.
 */
export async function fetchKado<T>(
  path: string,
  params: Record<string, string>,
  lang: Locale = DEFAULT_LOCALE,
): Promise<T> {
  const url = new URL(`${BASE_URL}/api/v1/${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  if (lang !== DEFAULT_LOCALE) {
    url.searchParams.set("locale", lang);
    url.searchParams.set("fallback_locale", DEFAULT_LOCALE);
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${API_KEY}` },
    next: { revalidate: 3600 },
  });
  if (res.status === 422 && lang !== DEFAULT_LOCALE) {
    const body = await res.json().catch(() => null);
    if (body?.details?.path === "locale") {
      console.warn(
        `KadoCMS: locale ${lang} is not enabled, reading ${DEFAULT_LOCALE}`,
      );
      return fetchKado(path, params);
    }
    throw new Error(`KadoCMS error 422: ${JSON.stringify(body)}`);
  }
  if (!res.ok)
    throw new Error(`KadoCMS error ${res.status}: ${await res.text()}`);
  return res.json();
}

/** A media id as an image URL, resized by KadoCMS (WebP, at most `width` wide). */
export function mediaUrl(id: string, width = 1280): string {
  return `${BASE_URL}/media/${encodeURIComponent(id)}?w=${width}&format=webp`;
}

const image = (id?: string | null, width?: number): ProjectImage | undefined =>
  id ? { url: mediaUrl(id, width) } : undefined;

/**
 * A 64px-wide, low-quality WebP of the image as a data URL (about 1 KB), for next/image's blur
 * placeholder. KadoCMS stores the variant after the first request; failures just skip it.
 */
export async function blurFor(id: string): Promise<string | undefined> {
  try {
    // 64 is the smallest width KadoCMS makes.
    const url = `${BASE_URL}/media/${encodeURIComponent(id)}?w=64&format=webp&q=40`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return undefined;
    const bytes = Buffer.from(await res.arrayBuffer());
    return `data:image/webp;base64,${bytes.toString("base64")}`;
  } catch {
    return undefined;
  }
}

/** The thumbnail with its blur placeholder. */
async function withBlur(
  p: Project,
  thumbnailId?: string | null,
): Promise<Project> {
  if (!p.thumbnail || !thumbnailId) return p;
  const blurDataURL = await blurFor(thumbnailId);
  return blurDataURL ? { ...p, thumbnail: { ...p.thumbnail, blurDataURL } } : p;
}

function toProject(e: Entry): Project {
  const links: ProjectLink[] = (e.links ?? [])
    .filter((l): l is ProjectLink => !!l.label && !!l.url)
    .map(({ label, url }) => ({ label, url }));
  if (!links.length) {
    if (e.project_url) links.push({ label: "Live site", url: e.project_url });
    if (e.github_url) links.push({ label: "Source code", url: e.github_url });
  }
  const tech = (e.tech_stack ?? [])
    .map((t) => t.name)
    .filter((n): n is string => !!n);
  return {
    id: e.slug,
    title: e.title,
    description: renderRichText(e.description),
    thumbnail: image(e.thumbnail),
    gallery: (e.gallery ?? [])
      .filter((g) => !!g.image)
      .map((g) => ({
        image: image(g.image)!,
        caption: g.caption ?? undefined,
      })),
    start_date: e.start_date ?? undefined,
    end_date: e.end_date ?? undefined,
    links,
    skills: tech.length ? tech : (e.skills ?? []),
    seo: e.seo
      ? {
          title: e.seo.meta_title || undefined,
          description: e.seo.meta_description || undefined,
          image: image(e.seo.share_image),
        }
      : undefined,
    updatedAt: e.updated_at,
  };
}

/** Newest first, in the order they were added (in English); every language keeps that order. */
export async function getProjects(
  lang: Locale,
  limit = 100,
): Promise<Project[]> {
  const list = (l: Locale) =>
    fetchKado<ListResponse>(
      "content/project",
      { page_size: "100", sort: "created_at:desc" },
      l,
    );
  let entries = (await list(lang)).data;
  if (lang !== DEFAULT_LOCALE) {
    // A translation's row is created when it is written, so its created_at says nothing about
    // the project: keep the English order (the same request the English pages cache).
    const order = new Map(
      (await list(DEFAULT_LOCALE)).data.map((e, i) => [e.document_id, i]),
    );
    entries = [...entries].sort(
      (a, b) =>
        (order.get(a.document_id) ?? Infinity) -
        (order.get(b.document_id) ?? Infinity),
    );
  }
  return Promise.all(
    entries.slice(0, limit).map((e) => withBlur(toProject(e), e.thumbnail)),
  );
}

/** One project by its slug; throws when there is none. */
export async function getProject(slug: string, lang: Locale): Promise<Project> {
  const data = await fetchKado<ListResponse>(
    "content/project",
    { "filters[slug]": slug, page_size: "1" },
    lang,
  );
  const entry = data.data[0];
  if (!entry) throw new Error(`KadoCMS: no project "${slug}"`);
  return withBlur(toProject(entry), entry.thumbnail);
}

// ---- Rich text (the editor's document tree) to HTML ----

export interface RichNode {
  type: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  content?: RichNode[];
}

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const plainText = (n: RichNode): string =>
  n.type === "text"
    ? (n.text ?? "")
    : (n.content ?? []).map(plainText).join("");

const headingId = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "section";

const safeHref = (href: unknown) =>
  typeof href === "string" && /^(https?:|mailto:|\/|#)/.test(href)
    ? href
    : null;

function renderText(n: RichNode): string {
  let html = escape(n.text ?? "");
  for (const mark of n.marks ?? []) {
    if (mark.type === "bold") html = `<strong>${html}</strong>`;
    else if (mark.type === "italic") html = `<em>${html}</em>`;
    else if (mark.type === "underline") html = `<u>${html}</u>`;
    else if (mark.type === "strike") html = `<s>${html}</s>`;
    else if (mark.type === "code") html = `<code>${html}</code>`;
    else if (mark.type === "link") {
      const href = safeHref(mark.attrs?.href);
      if (href) {
        const external = /^https?:/.test(href);
        html = `<a href="${escape(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${html}</a>`;
      }
    }
  }
  return html;
}

export function renderRichText(doc?: RichNode | null): string {
  const used = new Map<string, number>();
  const uniqueId = (text: string) => {
    const base = headingId(text);
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };
  const inner = (n: RichNode) => (n.content ?? []).map(render).join("");
  function render(n: RichNode): string {
    switch (n.type) {
      case "doc":
        return inner(n);
      case "text":
        return renderText(n);
      case "paragraph":
        return `<p>${inner(n)}</p>`;
      case "heading": {
        const level = Math.min(6, Math.max(1, Number(n.attrs?.level) || 2));
        return `<h${level} id="${uniqueId(plainText(n))}">${inner(n)}</h${level}>`;
      }
      case "bulletList":
        return `<ul>${inner(n)}</ul>`;
      case "orderedList":
        return `<ol>${inner(n)}</ol>`;
      case "listItem":
        return `<li>${inner(n)}</li>`;
      case "blockquote":
        return `<blockquote>${inner(n)}</blockquote>`;
      case "codeBlock":
        return `<pre><code>${escape(plainText(n))}</code></pre>`;
      case "horizontalRule":
        return "<hr />";
      case "hardBreak":
        return "<br />";
      case "image": {
        const src = safeHref(n.attrs?.src);
        return src
          ? `<img src="${escape(src)}" alt="${escape(String(n.attrs?.alt ?? ""))}" />`
          : "";
      }
      default:
        // Unknown blocks keep their text.
        return inner(n);
    }
  }
  return doc ? render(doc) : "";
}

// ---- Table of contents ----

export interface TocItem {
  id: string;
  depth: number;
  text: string;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export function parseToc(html: string): TocItem[] {
  const regex = /<h([2-4])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[2-4]>/gi;
  const items: TocItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    items.push({
      depth: parseInt(match[1]),
      id: match[2],
      text: decodeEntities(match[3].replace(/<[^>]+>/g, "").trim()),
    });
  }
  return items;
}
