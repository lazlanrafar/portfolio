/**
 * Page metadata and schema.org JSON-LD in one place, so every page gets its own canonical URL,
 * its language alternates (hreflang), a complete Open Graph / Twitter card and structured data
 * that names the same person. JSON-LD only states what the page itself shows (Google's
 * structured data policy). Paths are given without a language prefix ("/about").
 */
import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import {
  DEFAULT_LOCALE,
  LOCALES,
  OG_LOCALE,
  localePath,
  type Locale,
} from "@/lib/i18n";
import type { Profile } from "@/lib/profile";

/** The site-wide share image (app/opengraph-image.png). */
const DEFAULT_IMAGE = "/opengraph-image.png";

/** Absolute URL for a site path that already carries its language prefix, if any. */
export const absoluteUrl = (path: string) =>
  new URL(path, siteConfig.url).toString();

/** Absolute URL of a page in a language. */
export const pageUrl = (lang: Locale, path: string) =>
  absoluteUrl(localePath(lang, path));

/** The page in every language, plus x-default (English), for hreflang. */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
    "x-default": localePath(DEFAULT_LOCALE, path),
  };
}

/**
 * Share previews want JPEG: LinkedIn and some chat apps skip WebP. KadoCMS makes any format
 * on the fly, so the page's WebP URL becomes a JPEG one.
 */
export const shareImage = (url: string) =>
  url.replace("format=webp", "format=jpeg");

interface PageMetadataInput {
  lang: Locale;
  /** The page title; the layout template adds " | site name". */
  title: string;
  description: string;
  /** The page's path without a language prefix, e.g. "/projects/aliyah-rizq". */
  path: string;
  image?: string;
  /** Use this exact title, without the template (the home page). */
  absoluteTitle?: boolean;
  /** Blog posts: Open Graph article fields. */
  article?: { publishedTime: string; authors: string[] };
}

export function pageMetadata({
  lang,
  title,
  description,
  path,
  image,
  absoluteTitle,
  article,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const images = [image ?? DEFAULT_IMAGE];
  const url = localePath(lang, path);
  const shared = {
    url,
    title: fullTitle,
    description,
    siteName: siteConfig.name,
    locale: OG_LOCALE[lang],
    alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    images,
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
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

// One person and one site, whatever the language of the page.
const PERSON_ID = `${siteConfig.url}/#person`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** A reference to the site owner, for pages that describe something else. */
export const personRef = (profile: Profile, lang: Locale) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  url: pageUrl(lang, "/about"),
});

/** The site owner in full: who they are, where, what they know, where they work and studied. */
export function personLd(profile: Profile, lang: Locale) {
  const current = profile.experience.find((x) => x.current);
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    alternateName: siteConfig.name,
    jobTitle: profile.role,
    description: profile.bio,
    url: pageUrl(lang, "/"),
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

export const websiteLd = (profile: Profile, description: string) => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteConfig.url,
  name: siteConfig.name,
  description,
  inLanguage: LOCALES,
  author: { "@id": PERSON_ID, name: profile.name },
});

/** Home > ... > current page, in the page's language. */
export const breadcrumbLd = (
  lang: Locale,
  items: { name: string; path: string }[],
) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: pageUrl(lang, item.path),
  })),
});

/** A listing page and the pages it links to, in order. */
export const collectionLd = (
  lang: Locale,
  name: string,
  path: string,
  description: string,
  items: { name: string; path: string }[],
) => ({
  "@type": "CollectionPage",
  name,
  url: pageUrl(lang, path),
  description,
  inLanguage: lang,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: pageUrl(lang, item.path),
    })),
  },
});

/** Several schema.org nodes for one page. */
export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
