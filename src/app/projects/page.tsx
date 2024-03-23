import {
  AnimatePresence,
  FadeIn,
  FadeInStagger,
} from "@/components/atoms/fade-in";
import ProjectCard from "@/components/molecules/project-card";
import { whoamiFetchProjects } from "@/lib/whoami";
import { notFound } from "next/navigation";
import React from "react";

const projects: any = [
  {
    title: "Hoobank - Master modern web development",
    description:
      "Hoobank is a modern web development project that is created using React.js",
    created: "Sep 30, 2022",
    image:
      "https://assets-global.website-files.com/5efb0b7816032fd33ce6059c/621961b2e092b715903037cf_bi-dashboard-mockup.png",
    designer: "Javascript Mastery",
    link: "https://hoobank-web.vercel.app/",
    sourceCode: "https://github.com/lazlanrafar/hoobank-web",
    category: ["Vite", "React.js", "Tailwind CSS"],
  },
  {
    title: "Foodyar - Cooking Course Website",
    description:
      "Foodyar is a cooking course website that is created using HTML, Bootstrap, and JavaScript.",
    created: "Jan 25, 2022",
    image:
      "https://assets-global.website-files.com/5efb0b7816032fd33ce6059c/621961b2e092b715903037cf_bi-dashboard-mockup.png",
    designer: "Buildwithangga",
    link: "https://foodyar-eight.vercel.app/",
    sourceCode: "https://github.com/lazlanrafar/foodyar",
    category: ["HTML", "Bootstrap"],
  },
  {
    title: "StoreGG - Top Up Game Website",
    description:
      "StoreGG is a top up game website that is created using Next.js and Bootstrap.",
    created: "Nov 1, 2022",
    image:
      "https://assets-global.website-files.com/5efb0b7816032fd33ce6059c/621961b2e092b715903037cf_bi-dashboard-mockup.png",
    designer: "Buildwith Angga",
    link: "https://storegg-sand.vercel.app/",
    sourceCode: "https://github.com/lazlanrafar/storegg-fe",
    category: ["Next.js", "Bootstrap"],
  },
  {
    title: "Resto - Restaurant App",
    description:
      "Resto is a restaurant app that is created using HTML, CSS, and JavaScript.",
    created: "Nov 1, 2022",
    image:
      "https://assets-global.website-files.com/5efb0b7816032fd33ce6059c/621961b2e092b715903037cf_bi-dashboard-mockup.png",
    designer: "Buildwith Angga",
    link: "https://resto-restaurant.vercel.app/",
    sourceCode: "https://github.com/lazlanrafar/resto-restaurant",
    category: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Airplane - Airplane Ticket App",
    description:
      "Airplane is an airplane ticket app that is created using Flutter.",
    created: "Nov 1, 2022",
    image:
      "https://assets-global.website-files.com/5efb0b7816032fd33ce6059c/621961b2e092b715903037cf_bi-dashboard-mockup.png",
    designer: "Buildwith Angga",
    link: "https://github.com/lazlanrafar/airplane",
    sourceCode: "https://github.com/lazlanrafar/airplane",
    category: ["Flutter"],
  },
  {
    title: "Ocean Paradise - Backround Video Website",
    description:
      "Ocean Paradise is a background video website that is created using Vue.js.",
    created: "Dec 23, 2021",
    image:
      "https://assets-global.website-files.com/5efb0b7816032fd33ce6059c/621961b2e092b715903037cf_bi-dashboard-mockup.png",
    designer: "Online Tutorial",
    link: "https://oceanparadise.vercel.app/",
    sourceCode: "https://github.com/lazlanrafar/ocean-paradise",
    category: ["Vue.js"],
  },
  {
    title: "Moonlight - Parralax Website",
    description:
      "Moonlight is a parralax website that is created using Vue.js and Tailwind.",
    created: "Dec 24, 2021",
    image:
      "https://assets-global.website-files.com/5efb0b7816032fd33ce6059c/621961b2e092b715903037cf_bi-dashboard-mockup.png",
    designer: "Online Tutorial",
    link: "https://moonllight.vercel.app/",
    sourceCode: "https://github.com/lazlanrafar/moonllight",
    category: ["Vue.js", "Tailwind"],
  },
];

export default async function ProjectsPage() {
  // if (!projects) return notFound();

  return (
    <section className="overflow-y-auto relative h-full p-5">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* <AnimatePresence mode="wait"> */}
        {projects.map((project: any, index: number) => (
          <FadeIn key={index}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
        {/* </AnimatePresence> */}
      </div>

      <br />
    </section>
  );
}
