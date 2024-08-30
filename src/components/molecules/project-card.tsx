import { Project } from "@/types";
import Image from "next/image";
import React from "react";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={project.project_url || "#"} target="_blank">
      <article className="group cursor-pointer border rounded-md overflow-hidden">
        <figure className="relative aspect-video rounded-t-md">
          <Image
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            src={project.thumbnail || "/placeholder.png"}
            blurDataURL={project.thumbnail || "/placeholder.png"}
            placeholder="blur"
            quality={10}
            sizes="100%"
            fill
            alt={`${project.name} thumbnail`}
          />
          <div className="w-full h-full absolute top-0 left-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm overflow-hidden group-hover:opacity-0 transition-opacity duration-500">
            <p className="text-xl italic font-semibold uppercase p-3 text-center">
              {project.name}
            </p>
          </div>
        </figure>
        <div className="p-3 text-sm text-muted-foreground text-start">
          {project.description.length > 100
            ? `${project.description.substring(0, 100)}...`
            : project.description}
        </div>
      </article>
    </a>
  );
}
