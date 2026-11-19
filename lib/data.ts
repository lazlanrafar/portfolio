/** The site itself. The owner's profile (bio, socials, experience, skills) lives in KadoCMS: see lib/profile.ts. */
export const siteConfig = {
  name: "Azlan Rafar",
  url: "https://lazlanrafar.com",
  description:
    "Software Engineer from Bali, Indonesia. Specializing in React, Vue.js, Node.js, and cloud infrastructure on AWS.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
