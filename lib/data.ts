export const siteConfig = {
  name: "Azlan Rafar",
  url: "https://lazlanrafar.com",
  author: {
    name: "L Azlan Rafar",
    email: "lazlanrafar@gmail.com",
    phone: "+6285161316667",
    location: "Bali, Indonesia",
    role: "Software Engineer",
    bio: "Software Engineer with 4+ years of experience building and shipping production-grade web and mobile applications in startup and consulting environments.",
    longBio:
      "Software Engineer with 4+ years of experience building and shipping production-grade web and mobile applications in startup and consulting environments. Proven track record of leading small development teams, delivering real-estate, e-commerce, and SaaS platforms from architecture to deployment. Skilled across the full stack — from database design and REST API architecture to responsive front-end UI and cloud infrastructure on AWS.",
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

export const skillCategories = [
  {
    name: "Frontend",
    skills: ["Vue.js", "React.js", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "Bootstrap"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "Laravel", "REST API", "JWT"],
  },
  {
    name: "Database",
    skills: ["PostgreSQL", "MySQL"],
  },
  {
    name: "Mobile",
    skills: ["React Native", "Flutter", "Dart"],
  },
  {
    name: "DevOps & Cloud",
    skills: ["AWS", "Docker", "Linux Server", "Firebase", "CI/CD"],
  },
];

export const experience = [
  {
    period: "Dec 2023 — Present",
    role: "Software Engineer",
    company: "B ONE Consulting",
    description:
      "Build and maintain production web applications for clients across real estate, e-commerce, and logistics. Delivered Pertama Property Management System, Bali Smart Investment, Treelogy, and Natalie Lejeune Osteopathy platform.",
    country: "🇮🇩",
  },
  {
    period: "Jan 2023 — Sep 2023",
    role: "Project Manager",
    company: "Nusantara Skuad Teknologi",
    description:
      "Led full project delivery lifecycle for a major software product, managing a team of 5 engineers. Introduced structured sprint planning and improved stakeholder communication practices.",
    country: "🇮🇩",
  },
  {
    period: "Dec 2021 — Jan 2023",
    role: "Full Stack Developer",
    company: "PT. Mitra Kuadran Indonesia",
    description:
      "Designed and maintained web and mobile applications using Vue.js, React.js, and React Native. Built the IT Inventory Management System with real-time dashboards, asset tracking, and role-based access control.",
    country: "🇮🇩",
  },
];

export const education = [
  {
    institution: "Politeknik Negeri Batam",
    area: "Informatics Engineering",
    degree: "Associate Degree (D3)",
    period: "2021 — 2025",
    gpa: "3.5",
    url: "https://www.polibatam.ac.id/",
    country: "🇮🇩",
  },
];

export const processItems = [
  {
    name: "Discovery",
    description:
      "I begin by understanding your goals and technical requirements to create a clear roadmap for your product.",
  },
  {
    name: "Design",
    description:
      "I craft intuitive, user-friendly interfaces that align with your brand and optimize the user experience.",
  },
  {
    name: "Development",
    description:
      "Using modern technologies like Next.js and Laravel, I bring your design to life with responsive and performant code.",
  },
  {
    name: "Deploy",
    description:
      "I thoroughly test the site for functionality and performance, then deploy it to AWS or a hosting of your choice.",
  },
];

export const techItems = [
  // Languages
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },
  { id: "dart", name: "Dart" },
  // Frontend
  { id: "react", name: "React" },
  { id: "next", name: "Next.js" },
  { id: "vue", name: "Vue.js" },
  { id: "tailwindcss", name: "Tailwind" },
  { id: "bootstrap", name: "Bootstrap" },
  // Backend
  { id: "node", name: "Node.js" },
  { id: "express", name: "Express" },
  { id: "laravel", name: "Laravel" },
  // Database
  { id: "postgresql", name: "PostgreSQL" },
  { id: "mysql", name: "MySQL" },
  // Mobile
  { id: "react-native", name: "React Native" },
  { id: "flutter", name: "Flutter" },
  // DevOps & Cloud
  { id: "aws", name: "AWS" },
  { id: "docker", name: "Docker" },
  { id: "firebase", name: "Firebase" },
  // Tools
  { id: "figma", name: "Figma" },
  { id: "github", name: "GitHub" },
  { id: "postman", name: "Postman" },
  { id: "code", name: "VS Code" },
];

export const workstationItems = [
  { category: "OS", items: ["macOS", "Ubuntu"] },
  { category: "Device", items: ["MacBook Pro", "iPhone"] },
  { category: "Shell", items: ["Zsh", "Bash"] },
  { category: "Browser", items: ["Arc", "Chrome"] },
  { category: "Development", items: ["VS Code", "Postman"] },
  { category: "Design", items: ["Figma"] },
  { category: "Productivity", items: ["Notion", "Obsidian"] },
];

export const inspirationItems = [
  {
    category: "Engineers",
    items: [
      { name: "Lee Robinson", href: "https://leerob.io" },
      { name: "Theo Browne", href: "https://t3.gg" },
      { name: "Josh W. Comeau", href: "https://joshwcomeau.com" },
      { name: "Matt Pocock", href: "https://mattpocock.com" },
    ],
  },
  {
    category: "Designers",
    items: [
      { name: "Adam Argyle", href: "https://nerdy.dev" },
      { name: "Rauno Freiberg", href: "https://rauno.me" },
    ],
  },
  {
    category: "Creators",
    items: [
      { name: "Web Programming Unpas", href: "https://youtube.com/@sandhikagalihWPU" },
      { name: "Fireship", href: "https://youtube.com/@Fireship" },
      { name: "Traversy Media", href: "https://youtube.com/@TraversyMedia" },
    ],
  },
  {
    category: "Libraries",
    items: [
      { name: "Shadcn UI", href: "https://ui.shadcn.com" },
      { name: "TailwindCSS", href: "https://tailwindcss.com" },
      { name: "Lucide", href: "https://lucide.dev" },
    ],
  },
];

export const bookmarkItems = [
  {
    title: "ray.so",
    href: "https://ray.so",
    description: "Create beautiful images of your code.",
  },
  {
    title: "transform.tools",
    href: "https://transform.tools",
    description: "A collection of code transformers.",
  },
  {
    title: "Excalidraw",
    href: "https://excalidraw.com",
    description: "Virtual whiteboard for sketching hand-drawn diagrams.",
  },
  {
    title: "Bundlephobia",
    href: "https://bundlephobia.com",
    description: "Find the cost of adding an npm package to your bundle.",
  },
  {
    title: "Coolors",
    href: "https://coolors.co",
    description: "Fast color palette generator for designers.",
  },
];

export const awards = [
  {
    title: "3rd Place — Web & Mobile Application",
    awarder: "Workshop PBL Expo, Politeknik Negeri Batam",
    year: "2023",
  },
  {
    title: "1st Place — Vocational Students' Competence Competition",
    awarder: "National Vocational Competence Competition",
    year: "2019",
  },
];
