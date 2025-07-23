"use client";

import { Project } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icons } from "../atoms/icons";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-lg bg-card border border-border/50 transition-all duration-200 hover:border-primary/20 hover:shadow-sm h-full flex flex-col">
      <Link
        href={`/projects/${project.documentId}`}
        className="block flex-shrink-0"
      >
        <div className="relative overflow-hidden">
          {project?.thumbnail ? (
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project?.thumbnail?.formats?.large?.url || ""}
                fill
                quality={90}
                alt={`${project?.name} thumbnail`}
                className="object-cover object-center transition-opacity duration-200 group-hover:opacity-90"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="aspect-[16/10] bg-muted/50 flex items-center justify-center">
              <Icons.image className="w-8 h-8 text-muted-foreground/60" />
            </div>
          )}

          {/* Quick Action Buttons - Simplified */}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {project?.source_code_url && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project?.source_code_url || undefined, "_blank");
                }}
                className="h-7 w-7 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-md border border-border/50 hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                title="Source Code"
              >
                <Icons.github className="w-3.5 h-3.5" />
              </button>
            )}
            {project?.url && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project?.url || undefined, "_blank");
                }}
                className="h-7 w-7 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-md border border-border/50 hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                title="Live Demo"
              >
                <Icons.externalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1 space-y-3">
          {/* Project Title */}
          <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-150">
            {project?.name}
          </h3>

          {/* Description - More prominent */}
          {project?.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Technologies - Cleaner design */}
          {project?.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded border border-border/30"
                >
                  {tech.name}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs text-muted-foreground/70">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Minimalist Footer */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/30">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icons.calendar className="w-3 h-3" />
            <span>
              {project?.created_at
                ? new Date(project.created_at).getFullYear()
                : "Recent"}
            </span>
            {/* Project URL indicator */}
            {project?.url && (
              <>
                <span className="w-1 h-1 bg-muted-foreground/40 rounded-full" />
                <Icons.link className="w-3 h-3" />
                <span className="text-muted-foreground/70">Live</span>
              </>
            )}
          </div>

          <Icons.arrowRight className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150" />
        </div>
      </div>
    </article>
  );
}
