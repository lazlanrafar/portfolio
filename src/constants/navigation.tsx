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
    content: "Home",
    icon: HomeIcon,
  },
  {
    title: "About",
    link: "/about",
    content: "About",
    icon: UserIcon,
  },
  {
    title: "Work",
    link: "/work",
    content: "Work",
    icon: CoffeeIcon,
  },
  {
    title: "Project",
    link: "/project",
    content: "Project",
    icon: CodeIcon,
  },
  {
    title: "Contact",
    link: "/contact",
    content: "Contact",
    icon: PhoneIcon,
  },
];
