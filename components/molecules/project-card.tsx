"use client";

import { Project } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icons } from "../atoms/icons";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 h-full">
      <Link href={`/projects/${project.documentId}`} className="block">
        <div className="relative overflow-hidden">
          {project?.thumbnail ? (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project?.thumbnail?.formats?.large?.url || ""}
                fill
                quality={90}
                alt={`${project?.name} thumbnail`}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="aspect-video bg-muted flex items-center justify-center">
              <Icons.image className="w-12 h-12 text-muted-foreground" />
            </div>
          )}

          {/* Floating Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project?.source_code_url && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project?.source_code_url || undefined, "_blank");
                }}
                className="cursor-pointer h-10 w-10 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-full border shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                title="View Source Code"
              >
                <Icons.github className="w-4 h-4" />
              </button>
            )}
            {project?.url && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project?.url || undefined, "_blank");
                }}
                className="cursor-pointer h-10 w-10 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-full border shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                title="Live Demo"
              >
                <Icons.externalLink className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
              Project
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {project?.name}
          </h3>

          {project?.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {project.description}
            </p>
          )}

          {project?.url && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icons.link className="w-3 h-3" />
              <span className="truncate hover:text-primary transition-colors duration-200">
                {project.url.replace(/^https?:\/\//, "")}
              </span>
            </div>
          )}
        </div>

        {/* Technologies/Skills Tags */}
        {project?.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md">
                +{project.skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer with actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icons.calendar className="w-3 h-3" />
            <span>
              {project?.created_at
                ? new Date(project.created_at).getFullYear()
                : "Recent"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-primary font-medium">
              View Details
            </span>
            <Icons.arrowRight className="w-3 h-3 text-primary group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </article>
  );
}
