import {
  AnimatePresence,
  FadeIn,
  FadeInStagger,
} from "@/components/atoms/fade-in";
import ProjectCard from "@/components/molecules/project-card";
import { siteConfig } from "@/constants";
import { whoamiFetchProjects } from "@/lib/whoami";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Projects | " + siteConfig.name,
  description: "A collection of projects that I have worked on.",
};

export default async function ProjectsPage() {
  const { data: projects } = await whoamiFetchProjects({ page_size: 20 });

  if (!projects) return notFound();

  return (
    <section className="overflow-y-auto relative h-full p-5">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="wait">
          {projects.map((project: any, index: number) => (
            <FadeIn key={index}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </AnimatePresence>
      </div>

      <br />
    </section>
  );
}
