import { Project } from "@/types";
import { IMicrocmsProject } from "@/types/microcms-response";
import Image from "next/image";
import React from "react";
import { Icons } from "../atoms/icons";

export default function ProjectCard({
  project,
}: {
  project: IMicrocmsProject;
}) {
  return (
    <article className="group cursor-pointer w-full sm:w-[300px] xl:w-[370px] 2xl:w-[336px] mb-10 mx-1">
      <a
        href={project.project_url || "#"}
        target={project.project_url ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative mb-8">
          <Image
            className="group-hover:rotate-3 group-hover:scale-105 transition-transform"
            src={project.thumbnail.url}
            blurDataURL={project.thumbnail.url}
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

          <div className="absolute -right-5 -bottom-5 flex flex-col gap-3">
            {project.github_url && (
              <div className="h-[40px] w-[40px] grid place-items-center bg-background rounded-full border text-xs text-center hover:bg-primary-foreground">
                <button className="flex items-center justify-center w-full h-full">
                  <Icons.github className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </a>
      <div className="mt-3">
        <h3 className="text-sm truncate mb-1">{project.title}</h3>

        <div className="text-xs text-muted-foreground hover:underline mb-2">
          {project.project_url ? (
            <button>{project.project_url}</button>
          ) : (
            "No project URL"
          )}
        </div>

        <div className="truncate text-xs text-muted-foreground flex gap-2">
          {project.skills.slice(0, 4).map((skill) => (
            <span key={skill}>#{skill}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
