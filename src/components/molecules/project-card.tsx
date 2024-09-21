import { Project } from "@/types";
import { IMicrocmsProject } from "@/types/microcms-response";
import Image from "next/image";
import React from "react";

export default function ProjectCard({
  project,
}: {
  project: IMicrocmsProject;
}) {
  return (
    <a
      href={project.project_url || "#"}
      target={project.project_url ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      <article className="group cursor-pointer w-full sm:w-[300px] xl:w-[370px] 2xl:w-[336px] mb-10 mx-1">
        <figure className="relative mb-8">
          <Image
            className="group-hover:rotate-3 group-hover:scale-105 transition-transform"
            src={project.thumbnail.url || "/placeholder.png"}
            blurDataURL={project.thumbnail.url || "/placeholder.png"}
            placeholder="blur"
            quality={10}
            width={768}
            height={640}
            alt={`${project.title} thumbnail`}
          />

          <div className="absolute -left-5 -bottom-5 bg-background h-[90px] w-[90px] grid place-items-center rounded-full border text-xs text-center">
            _Preview <br />
            プレビュー
          </div>
        </figure>
        <div className="mt-3">
          <p className="text-sm truncate mb-1">{project.title}</p>

          <p className="text-xs text-muted-foreground hover:underline">
            {project.project_url ? (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.project_url}
              </a>
            ) : (
              "No project URL"
            )}
          </p>
        </div>
        {/* <div className="p-3 text-sm text-muted-foreground text-start">
          <p
            dangerouslySetInnerHTML={{
              __html: project.description
                ? project.description.slice(0, 65)
                : "",
            }}
          ></p>
        </div> */}
      </article>
    </a>
  );
}
