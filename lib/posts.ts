/**
 * Blog posts from KadoCMS (content type `post`). The body is stored as rich text and turned
 * back into MDX here, so the post page keeps its MDX pipeline (components, code highlighting,
 * heading anchors) and the table of contents keeps reading Markdown headings.
 */
import { blurFor, fetchKado, mediaUrl, type RichNode } from "@/lib/kadocms";

export type TocItem = {
  depth: number;
  value: string;
  children?: TocItem[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  image: string;
  /** A tiny blurred copy of the cover as a data URL. */
  imageBlur?: string;
  toc: TocItem[];
  /** The body as MDX. */
  content: string;
  seo?: { title?: string; description?: string; image?: string };
};

interface PostEntry {
  slug: string;
  title: string;
  description?: string | null;
  date: string;
  tags?: string[] | null;
  cover?: string | null;
  body?: RichNode | null;
  seo?: { meta_title?: string; meta_description?: string; share_image?: string | null } | null;
}

function buildTree(flat: { depth: number; value: string }[]): TocItem[] {
  const root: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const item of flat) {
    const node: TocItem = { depth: item.depth, value: item.value };

    while (stack.length > 0 && stack[stack.length - 1].depth >= item.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(node);
    }

    stack.push(node);
  }

  return root;
}

function extractToc(content: string): TocItem[] {
  const cleaned = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]+`/g, "");

  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const flat: { depth: number; value: string }[] = [];
  let match;

  while ((match = headingRegex.exec(cleaned)) !== null) {
    // The TOC shows the words, not the Markdown escapes the serializer added.
    flat.push({ depth: match[1].length, value: match[2].replace(/\\(.)/g, "$1").trim() });
  }

  return buildTree(flat);
}

// ---- Rich text to MDX ----

/** Characters Markdown or MDX would read as syntax inside plain text. */
const escapeText = (s: string) => s.replace(/([\\`*_[\]<>{}|~])/g, "\\$1");

function codeSpan(text: string): string {
  const longest = Math.max(0, ...(text.match(/`+/g) ?? []).map((r) => r.length));
  const fence = "`".repeat(longest + 1);
  const pad = text.startsWith("`") || text.endsWith("`") ? " " : "";
  return `${fence}${pad}${text}${pad}${fence}`;
}

function inline(nodes: RichNode[] = []): string {
  return nodes
    .map((n) => {
      if (n.type === "hardBreak") return "  \n";
      if (n.type !== "text") return inline(n.content);
      const marks = n.marks ?? [];
      if (marks.some((m) => m.type === "code")) {
        const code = codeSpan(n.text ?? "");
        const link = marks.find((m) => m.type === "link");
        return link ? `[${code}](${String(link.attrs?.href ?? "")})` : code;
      }
      let out = escapeText(n.text ?? "");
      for (const m of marks) {
        if (m.type === "bold") out = `**${out}**`;
        else if (m.type === "italic") out = `_${out}_`;
        else if (m.type === "strike") out = `~~${out}~~`;
        else if (m.type === "link") out = `[${out}](${String(m.attrs?.href ?? "")})`;
      }
      return out;
    })
    .join("");
}

const indent = (text: string, prefix: string) =>
  text
    .split("\n")
    .map((line, i) => (i === 0 || !line ? line : prefix + line))
    .join("\n");

function blocks(nodes: RichNode[] = []): string {
  return nodes.map(block).filter(Boolean).join("\n\n");
}

function block(n: RichNode): string {
  switch (n.type) {
    case "paragraph":
      return inline(n.content);
    case "heading":
      return `${"#".repeat(Math.min(6, Math.max(1, Number(n.attrs?.level) || 2)))} ${inline(n.content)}`;
    case "blockquote":
      return blocks(n.content)
        .split("\n")
        .map((line) => (line ? `> ${line}` : ">"))
        .join("\n");
    case "codeBlock": {
      const text = (n.content ?? []).map((c) => c.text ?? "").join("");
      const fence = "`".repeat(Math.max(3, ...(text.match(/`+/g) ?? []).map((r) => r.length + 1)));
      return `${fence}${n.attrs?.language ? String(n.attrs.language) : ""}\n${text}\n${fence}`;
    }
    case "bulletList":
      return (n.content ?? []).map((li) => `- ${indent(blocks(li.content), "  ")}`).join("\n");
    case "orderedList": {
      const start = Number(n.attrs?.start) || 1;
      return (n.content ?? [])
        .map((li, i) => `${start + i}. ${indent(blocks(li.content), "   ")}`)
        .join("\n");
    }
    case "horizontalRule":
      return "---";
    case "youtube": {
      const src = String(n.attrs?.src ?? "");
      return src.startsWith("https://www.youtube")
        ? `<iframe allowFullScreen style={{ aspectRatio: "16 / 9", width: "100%", border: 0 }} src="${src}" loading="lazy" />`
        : "";
    }
    case "image": {
      const src = String(n.attrs?.src ?? "");
      return src ? `![${escapeText(String(n.attrs?.alt ?? ""))}](${src})` : "";
    }
    default:
      return blocks(n.content);
  }
}

export function richTextToMdx(doc?: RichNode | null): string {
  return doc ? blocks(doc.content) + "\n" : "";
}

// ---- Posts ----

async function toPost(e: PostEntry): Promise<Post> {
  const content = richTextToMdx(e.body);
  return {
    slug: e.slug,
    title: e.title,
    description: e.description ?? "",
    date: e.date,
    tags: e.tags ?? [],
    published: true,
    image: e.cover ? mediaUrl(e.cover) : "",
    imageBlur: e.cover ? await blurFor(e.cover) : undefined,
    toc: extractToc(content),
    content,
    seo: e.seo
      ? {
          title: e.seo.meta_title || undefined,
          description: e.seo.meta_description || undefined,
          image: e.seo.share_image ? mediaUrl(e.seo.share_image) : undefined,
        }
      : undefined,
  };
}

/** Published posts, newest first by their date. */
export async function getAllPosts(): Promise<Post[]> {
  const data = await fetchKado<{ data: PostEntry[] }>("content/post", {
    page_size: "100",
    sort: "date:desc",
  });
  return Promise.all(data.data.map(toPost));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const data = await fetchKado<{ data: PostEntry[] }>("content/post", {
    "filters[slug]": slug,
    page_size: "1",
  });
  return data.data[0] ? toPost(data.data[0]) : undefined;
}

export function formatPostDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
