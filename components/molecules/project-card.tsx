import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/kadocms";

interface ProjectCardProps {
  project: Project;
  /** The project page in the current language. */
  href: string;
  /** Accessible name of the link, in the current language. */
  label: string;
  className?: string;
  /** Above the fold: load it first instead of lazily. */
  priority?: boolean;
}

export function ProjectCard({
  project,
  href,
  label,
  className,
  priority = false,
}: ProjectCardProps) {
  const { title, thumbnail, skills } = project;

  return (
    <Link
      href={href}

      aria-label={label}
      className={cn("group/card w-full space-y-1.5", className)}
    >
      <div className="bg-muted overflow-hidden ">
        {thumbnail ? (
          <Image
            src={thumbnail.url}
            alt={`Thumbnail for ${title}`}
            width={800}
            height={450}
            sizes="(min-width: 768px) 336px, (min-width: 640px) 50vw, 100vw"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            placeholder={thumbnail.blurDataURL ? "blur" : "empty"}
            blurDataURL={thumbnail.blurDataURL}
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
