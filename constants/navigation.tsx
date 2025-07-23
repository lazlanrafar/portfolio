import { Icons } from "@/components/atoms/icons";
import { siteConfig } from "@/constants/siteConfig";

// Markdown navigation
import MDXPersonal from "@/markdown/personal.mdx";
import MDXSkills from "@/markdown/skills.mdx";
import MDXSetup from "@/markdown/setup.mdx";

// Icons
import { HiTerminal } from "react-icons/hi";
import { BsActivity } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { SiArchlinux } from "react-icons/si";

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
      {
        name: "_setup.ts",
        path: "/about/setup.ts",
        mdx_component: MDXSetup,
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

export const LIST_ACTIVITY = [
  {
    name: "Languages",
    slug: "languages",
    icon: HiTerminal,
    path: "/activity/languages",
  },
  {
    name: "Weekly Activity",
    slug: "weekly-activity",
    icon: BsActivity,
    path: "/activity/weekly-activity",
  },
  {
    name: "Code Editor",
    slug: "code-editor",
    icon: BiText,
    path: "/activity/code-editor",
  },
  {
    name: "Operating Systems",
    slug: "operating-systems",
    icon: SiArchlinux,
    path: "/activity/operating-systems",
  },
];
