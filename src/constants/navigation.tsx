import {
  CodeIcon,
  CoffeeIcon,
  HomeIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";

export interface INavigation {
  title: string;
  link: string;
  content: string;
  icon: any;
}

export const NAVIGATION: INavigation[] = [
  {
    title: "Home",
    link: "/",
    content: "_Home",
    icon: HomeIcon,
  },
  {
    title: "About",
    link: "/about",
    content: "_About",
    icon: UserIcon,
  },
  {
    title: "Work",
    link: "/work",
    content: "_Work",
    icon: CoffeeIcon,
  },
  {
    title: "Project",
    link: "/project",
    content: "_Project",
    icon: CodeIcon,
  },
  {
    title: "Contact",
    link: "/contact",
    content: "_Contact",
    icon: PhoneIcon,
  },
];
