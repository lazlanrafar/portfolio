import { whoamiAssets } from "@/lib/whoami";
import { IWhoamiProject } from "@/types/whoamiResponse";
import Image from "next/image";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../atoms/sheet";
import Link from "next/link";

export default function ProjectCard({ project }: { project: IWhoamiProject }) {
  return (
    <Sheet>
      <SheetTrigger>
        <article className="group cursor-pointer border rounded-md overflow-hidden">
          <figure className="relative aspect-video rounded-t-md">
            <Image
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              src={whoamiAssets(project.thumbnail)}
              blurDataURL={whoamiAssets(project.thumbnail)}
              placeholder="blur"
              quality={10}
              sizes="100%"
              fill
              alt={`${project.title} thumbnail`}
            />
            <div className="w-full h-full absolute top-0 left-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm overflow-hidden group-hover:opacity-0 transition-opacity duration-500">
              <p className="text-xl italic font-semibold uppercase p-3 text-center">
                {project.title}
              </p>
            </div>
          </figure>
          <div className="p-3 text-sm text-muted-foreground text-start">
            {project.description.length > 100
              ? `${project.description.substring(0, 100)}...`
              : project.description}
          </div>
        </article>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{project.title}</SheetTitle>
          <figure className="relative aspect-video">
            <Image
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              src={whoamiAssets(project.thumbnail)}
              blurDataURL={whoamiAssets(project.thumbnail)}
              placeholder="blur"
              quality={10}
              sizes="100%"
              fill
              alt={`${project.title} thumbnail`}
            />
          </figure>
        </SheetHeader>

        <div className="space-y-3 mt-3">
          <div className="">
            <h4 className="mb-1 text-sm font-medium">Description</h4>

            <p className="text-muted-foreground text-sm">
              {project.description}
            </p>
          </div>

          {project.url && (
            <div className="">
              <h4 className="mb-1 text-sm font-medium">
                Project&apos;s Website
              </h4>
              <Link
                href={project.url}
                target="_blank"
                className="truncate text-muted-foreground hover:underline"
              >
                {project.url.substring(0, 30)}...
              </Link>
            </div>
          )}

          {project.source_code && (
            <div className="">
              <h4 className="mb-1 text-sm font-medium">Source Code</h4>
              <Link
                href={project.source_code}
                target="_blank"
                className="truncate text-muted-foreground hover:underline"
              >
                {project.source_code.substring(0, 30)}...
              </Link>
            </div>
          )}

          <hr />
          <div>
            <div className="flex gap-1 flex-wrap">
              {project.technology?.map((tech) => (
                <div
                  key={tech.skill.title}
                  className="text-xs border px-2 py-1 rounded-lg"
                >
                  <span>{tech.skill.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
