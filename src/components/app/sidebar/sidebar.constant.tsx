import {
  CodeIcon,
  CoffeeIcon,
  HomeIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";

export interface Navigation {
  name: string;
  link: string;
  content: string;
  icon: any;
}

const navigation: Navigation[] = [
  {
    name: "Home",
    link: "/",
    content: "Home",
    icon: HomeIcon,
  },
  {
    name: "About",
    link: "/about",
    content: "About",
    icon: UserIcon,
  },
  {
    name: "Work",
    link: "/work",
    content: "Work",
    icon: CoffeeIcon,
  },
  {
    name: "Project",
    link: "/project",
    content: "Project",
    icon: CodeIcon,
  },
  {
    name: "Contact",
    link: "/contact",
    content: "Contact",
    icon: PhoneIcon,
  },
];

export default navigation;
