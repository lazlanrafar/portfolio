import {
  AnimatePresence,
  FadeIn,
  FadeInStagger,
} from "@/components/atoms/fade-in";
import ProjectCard from "@/components/molecules/project-card";
import { fetchProjects } from "@/lib/whoami";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  if (!projects) return notFound();

  return (
    <section className="overflow-y-auto relative h-full p-5">
      {/* <h3 className="text-lg mb-3">PROJECTS</h3> */}

      <FadeInStagger
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        faster
      >
        <AnimatePresence mode="wait">
          {projects.data.data.map((project) => (
            <FadeIn key={project.id}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </AnimatePresence>
      </FadeInStagger>

      <br />
    </section>
  );
}
