import { siteConfig } from "@/constants/siteConfig";
import {
  CodeIcon,
  CoffeeIcon,
  HomeIcon,
  PhoneIcon,
  Settings,
  UserIcon,
} from "lucide-react";

interface INavigationChild {
  name: string;
  path: string;
}

export interface INavigation {
  title: string;
  path: string;
  content: string;
  icon: any;
  children?: INavigationChild[];
}

export const NAVIGATION: INavigation[] = [
  {
    title: "Home",
    path: "/",
    content: "_Home",
    icon: HomeIcon,
  },
  {
    title: "About",
    path: "/about",
    content: "_About",
    icon: UserIcon,
    children: [
      {
        name: "_Personal",
        path: "/about/personal.ts",
      },
      {
        name: "_Tech-Stack",
        path: "/about/tech-stack.ts",
      },
    ],
  },
  {
    title: "Projects",
    path: "/projects",
    content: "_Projects",
    icon: CodeIcon,
  },
  {
    title: "Preferences",
    path: "/preferences",
    content: "_Preferences",
    icon: Settings,
  },
  {
    title: "Contact",
    path: "/contact",
    content: "_Contact",
    icon: PhoneIcon,
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
