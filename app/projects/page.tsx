import { AnimatePresence, FadeIn } from "@/components/atoms/fade-in";
import ProjectCard from "@/components/molecules/project-card";
import { projects, siteConfig } from "@/constants";
import { getMicrocmsProjects } from "@/lib/microcms";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects | " + siteConfig.name,
  description: "A collection of projects that I have worked on.",
};

export default async function ProjectsPage() {
  const { contents } = await getMicrocmsProjects();

  return (
    <section className="overflow-y-auto relative h-full p-5">
      <div className="flex flex-wrap justify-around gap-5">
        <AnimatePresence mode="wait">
          {contents.map((project) => (
            <FadeIn key={`Project ${project.id}`}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
