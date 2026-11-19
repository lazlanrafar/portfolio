/** The site itself. The owner's profile (bio, socials, experience, skills) lives in KadoCMS: see lib/profile.ts. */
export const siteConfig = {
  name: "Azlan Rafar",
  url: "https://lazlanrafar.com",
};

/** The site's pages, in menu order; labels come from the dictionary (nav.<key>). */
export const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

/** A menu link with its label in the page's language. */
export type NavItem = { href: string; label: string };
