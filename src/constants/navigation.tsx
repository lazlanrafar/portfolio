import { Icons } from "@/components/atoms/icons";
import { siteConfig } from "@/constants/siteConfig";

// Markdown navigation
import MDXPersonal from "@/markdown/personal.mdx";
import MDXSkills from "@/markdown/skills.mdx";

export const NAVIGATION: {
  title: string;
  path: string;
  content: string;
  icon: any;
  children?: {
    name: string;
    path: string;
    mdx_component?: any;
  }[];
}[] = [
  {
    title: "Home",
    path: "/",
    content: "_Home",
    icon: Icons.home,
  },
  {
    title: "About",
    path: "/about",
    content: "_About",
    icon: Icons.user,
    children: [
      {
        name: "_personal.ts",
        path: "/about/personal.ts",
        mdx_component: MDXPersonal,
      },
      {
        name: "_skills.ts",
        path: "/about/skills.ts",
        mdx_component: MDXSkills,
      },
    ],
  },
  {
    title: "Projects",
    path: "/projects",
    content: "_Projects",
    icon: Icons.code,
  },
  {
    title: "Activity",
    path: "/activity",
    content: "_Activity",
    icon: Icons.chart,
  },
  {
    title: "Contact",
    path: "/contact",
    content: "_Contact",
    icon: Icons.phone,
    children: [
      {
        name: "Email",
        path: siteConfig.links.email,
      },
      {
        name: "Github",
        path: siteConfig.links.github,
      },
      {
        name: "Linkedin",
        path: siteConfig.links.linkedin,
      },
      {
        name: "Instagram",
        path: siteConfig.links.instagram,
      },
    ],
  },
];
