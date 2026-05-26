export const siteConfig = {
  name: "Azlan Rafar",
  url: "https://lazlanrafar.com",
  author: {
    name: "L Azlan Rafar",
    email: "lazlanrafar@gmail.com",
    location: "Bali, Indonesia",
    role: "Full-Stack Software Developer",
    bio: "A walking merge conflict turned software engineer. I build production-grade web applications with a focus on clean code, great UX, and scalable architecture.",
    longBio:
      "I'm a full-stack developer based in Bali, Indonesia, with over 4 years of hands-on experience building production applications for clients across various industries. I specialize in React, Vue.js, Node.js, and cloud infrastructure — and I have a strong preference for dark mode, late-night debugging sessions, and a good cup of coffee.",
    avatar: "/avatar.jpg",
  },
  social: {
    github: "https://github.com/lazlanrafar",
    linkedin: "https://www.linkedin.com/in/lazlanrafar",
    instagram: "https://www.instagram.com/lazlanrafar",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavLink = (typeof navLinks)[number];

export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  year: number;
  url?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "aliyah-rizq",
    title: "Aliyah Rizq",
    description:
      "Designed and developed a responsive corporate website for Aliyah Rizq Group, a multinational livestock and social enterprise company.",
    tech: ["WordPress", "WooCommerce"],
    year: 2026,
    url: "https://aliyahrizq.id",
    featured: true,
  },
  {
    slug: "bonvent-motorbikes",
    title: "Bonvent Motorbikes",
    description:
      "E-commerce platform for custom motorcycle accessories with Shopify theme customization, SEO optimization, and multi-currency support.",
    tech: ["Shopify", "Liquid", "JavaScript"],
    year: 2025,
    url: "https://bonventmotorbikes.com",
    featured: true,
  },
  {
    slug: "natalie-lejeune-osteopathy",
    title: "Natalie Lejeune Osteopathy",
    description:
      "Integrated system to sell and manage online courses, memberships, and live event registrations for osteopathy education.",
    tech: ["Next.js", "TypeScript", "Vue.js"],
    year: 2025,
    url: "https://www.natalielejeuneosteopathy.com",
    featured: true,
  },
  {
    slug: "treelogy",
    title: "Treelogy",
    description:
      "Sustainable e-commerce platform for Moringa-based products with product catalog, inventory tracking, and promotional pricing.",
    tech: ["Next.js", "TypeScript", "AWS"],
    year: 2025,
    url: "https://treelogy.com",
  },
  {
    slug: "bali-smart-investment",
    title: "Bali Smart Investment",
    description:
      "Real estate platform with custom CMS for managing property listings, inquiries, and media content with lead capture integration.",
    tech: ["Vue.js", "Express.js", "Next.js"],
    year: 2025,
    url: "https://balismartinvestment.com",
  },
  {
    slug: "pertama-property",
    title: "Pertama Property",
    description:
      "Centralized CMS handling maintenance tracking, purchasing workflows, and facility booking for property management.",
    tech: ["Next.js", "Vue.js", "Express.js"],
    year: 2024,
    url: "https://pertamaproperty.com",
  },
  {
    slug: "it-inventory-camak",
    title: "IT Inventory Camak",
    description:
      "Comprehensive web application to efficiently track, manage, and organize IT assets across an organization.",
    tech: ["Vue.js", "Express.js", "Bootstrap"],
    year: 2024,
  },
  {
    slug: "estatix",
    title: "Estatix",
    description:
      "All-in-one application that simplifies finding and booking your dream home while managing monthly bills.",
    tech: ["Vue.js", "Express.js", "Bootstrap"],
    year: 2024,
  },
  {
    slug: "distribusi-sk",
    title: "Distribusi SK & Surat Tugas",
    description:
      "System optimizing the distribution process of SK and Surat Tugas at Politeknik Negeri Batam.",
    tech: ["Vue.js", "Express.js", "TypeScript"],
    year: 2024,
    url: "https://sk.polibatam.ac.id",
  },
  {
    slug: "airplane",
    title: "Airplane",
    description:
      "Airplane ticket booking application with an intuitive mobile interface for browsing routes and managing bookings.",
    tech: ["Flutter"],
    year: 2024,
  },
  {
    slug: "ilog",
    title: "ILOG",
    description:
      "Parcel courier application that revolutionizes the courier industry by simplifying the sending and tracking of packages.",
    tech: ["Vue.js", "Express.js", "Bootstrap"],
    year: 2024,
    url: "https://ilogexpresstrack.id",
  },
  {
    slug: "foodyar",
    title: "Foodyar",
    description:
      "Cooking course website with a clean interface for browsing recipes and course materials.",
    tech: ["HTML", "Bootstrap", "JavaScript"],
    year: 2024,
    url: "https://foodyar-eight.vercel.app",
  },
];

export const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "Vue.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js"],
  },
  {
    name: "Database",
    skills: ["PostgreSQL", "MySQL", "Supabase"],
  },
  {
    name: "DevOps",
    skills: ["Docker", "CI/CD", "AWS", "Linux"],
  },
  {
    name: "Mobile",
    skills: ["Flutter"],
  },
  {
    name: "CMS",
    skills: ["WordPress", "WooCommerce", "Shopify"],
  },
];

export const experience = [
  {
    period: "2022 — Present",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    description:
      "Building production-grade web applications for clients across e-commerce, real estate, education, and logistics. Delivered 12+ projects spanning Next.js, Vue.js, Node.js, and cloud infrastructure.",
    country: "🇮🇩",
  },
];
