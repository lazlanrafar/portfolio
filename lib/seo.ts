/**
 * Page metadata and schema.org JSON-LD in one place, so every page gets its own canonical URL,
 * a complete Open Graph / Twitter card and structured data that names the same person.
 * JSON-LD only states what the page itself shows (Google's structured data policy).
 */
import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import type { Profile } from "@/lib/profile";

/** The site-wide share image (app/opengraph-image.png). */
const DEFAULT_IMAGE = "/opengraph-image.png";

/** Absolute URL for a site path. */
export const absoluteUrl = (path: string) =>
  new URL(path, siteConfig.url).toString();

/**
 * Share previews want JPEG: LinkedIn and some chat apps skip WebP. KadoCMS makes any format
 * on the fly, so the page's WebP URL becomes a JPEG one.
 */
export const shareImage = (url: string) =>
  url.replace("format=webp", "format=jpeg");

interface PageMetadataInput {
  /** The page title; the layout template adds " | site name". */
  title: string;
  description: string;
  /** The page's own path, e.g. "/projects/aliyah-rizq": its canonical URL. */
  path: string;
  image?: string;
  /** Use this exact title, without the template (the home page). */
  absoluteTitle?: boolean;
  /** Blog posts: Open Graph article fields. */
  article?: { publishedTime: string; authors: string[] };
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle,
  article,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const images = [image ?? DEFAULT_IMAGE];
  const shared = {
    url: path,
    title: fullTitle,
    description,
    siteName: siteConfig.name,
    locale: "en_US",
    images,
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime,
          authors: article.authors,
        }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}

// ---- JSON-LD ----

const PERSON_ID = `${siteConfig.url}/#person`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** A reference to the site owner, for pages that describe something else. */
export const personRef = (profile: Profile) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  url: absoluteUrl("/about"),
});

/** The site owner in full: who they are, where, what they know, where they work and studied. */
export function personLd(profile: Profile) {
  const current = profile.experience.find((x) => x.period.endsWith("Present"));
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    alternateName: siteConfig.name,
    jobTitle: profile.role,
    description: profile.bio,
    url: siteConfig.url,
    image: "https://github.com/lazlanrafar.png",
    ...(profile.email && { email: `mailto:${profile.email}` }),
    ...(profile.location && {
      homeLocation: { "@type": "Place", name: profile.location },
    }),
    sameAs: profile.socials.map((s) => s.url),
    knowsAbout: profile.skillCategories.flatMap((c) => c.skills),
    ...(current && {
      worksFor: { "@type": "Organization", name: current.company },
    }),
    alumniOf: profile.education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.institution,
      ...(e.url && { url: e.url }),
    })),
  };
}

export const websiteLd = (profile: Profile) => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "en",
  author: { "@id": PERSON_ID, name: profile.name },
});

/** Home > ... > current page. */
export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

/** A listing page and the pages it links to, in order. */
export const collectionLd = (
  name: string,
  path: string,
  description: string,
  items: { name: string; path: string }[],
) => ({
  "@type": "CollectionPage",
  name,
  url: absoluteUrl(path),
  description,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  },
});

/** Several schema.org nodes for one page. */
export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
