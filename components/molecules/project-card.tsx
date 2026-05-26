import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/microcms";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { id, title, thumbnail, skills } = project;

  return (
    <Link
      href={`/projects/${id}`}
      scroll={false}
      aria-label={`Read more about ${title}`}
      className={cn("group/card w-full space-y-1.5", className)}
    >
      <div className="bg-muted overflow-hidden ">
        {thumbnail ? (
          <Image
            src={thumbnail.url}
            alt={`Thumbnail for ${title}`}
            width={800}
            height={450}
            className="anim aspect-video w-full object-cover grayscale group-hover/card:scale-105 group-hover/card:grayscale-0"
          />
        ) : (
          <div className="aspect-video w-full" />
        )}
      </div>
      <div className="space-y-0.5 px-0.5">
        <h3 className="text-foreground line-clamp-1 text-sm font-semibold">
          {title}
        </h3>
        {skills.length > 0 && (
          <p className="text-muted-foreground text-xs">{skills.join(" · ")}</p>
        )}
      </div>
    </Link>
  );
}
