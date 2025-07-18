import { AnimatePresence, FadeIn } from "@/components/atoms/fade-in";
import ProjectCard from "@/components/molecules/project-card";
import { projects, siteConfig } from "@/constants";
import { $api } from "@/lib/api";
import { getMicrocmsProjects } from "@/lib/microcms";
import { PaginatedResponse, Project } from "@/types/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects | " + siteConfig.name,
  description: "A collection of projects that I have worked on.",
};

export default async function ProjectsPage() {
  const response = await $api<PaginatedResponse<Project>>(
    "/projects?populate=*"
  );

  console.log("Projects response:", response);

  return (
    <section className="overflow-y-auto relative h-full p-5">
      <div className="flex flex-wrap justify-around gap-5">
        <AnimatePresence mode="wait">
          {response.data.map((project) => (
            <FadeIn key={`Project ${project.id}`}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
