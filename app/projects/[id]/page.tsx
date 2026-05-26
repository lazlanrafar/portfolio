import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/templates/page-layout";
import { TableOfContents } from "@/components/molecules/table-of-contents";
import { TechTag } from "@/components/molecules/tech-tag";
import { getProject, getProjects, parseToc } from "@/lib/microcms";
import { siteConfig } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const project = await getProject(id);
    return {
      title: project.title,
      description: project.description.replace(/<[^>]+>/g, "").slice(0, 160),
      openGraph: {
        title: project.title,
        images: project.thumbnail ? [project.thumbnail.url] : [],
      },
    };
  } catch {
    return { title: "Project Not Found" };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  let project;
  try {
    project = await getProject(id);
  } catch {
    notFound();
  }

  const toc = parseToc(project.description);

  const startYear = project.start_date
    ? new Date(project.start_date).getFullYear()
    : null;
  const endYear = project.end_date
    ? new Date(project.end_date).getFullYear()
    : null;
  const period =
    startYear && endYear
      ? startYear === endYear
        ? String(startYear)
        : `${startYear} — ${endYear}`
      : null;

  return (
    <PageLayout>
      <article className="mx-auto flex w-full max-w-3xl gap-x-8 px-6">
        <TableOfContents toc={toc} />

        <div className="min-w-0 flex-1 space-y-10 md:space-y-12">
          <div className="flex w-full items-center justify-between">
            <Link
              href="/projects"
              scroll={false}
              aria-label="Back to projects"
              className="text-muted-foreground anim hover:text-foreground flex items-center gap-x-2 text-sm font-medium"
            >
              <ArrowLeft className="size-4" />
              Go back
            </Link>
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit live project"
                className="text-muted-foreground anim hover:text-foreground flex items-center gap-x-1.5 text-sm font-medium"
              >
                <ExternalLink className="size-3.5" />
                Live site
              </a>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
                Case study{period ? ` · ${period}` : ""}
              </p>
              <h1 className="text-foreground text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                {project.title}
              </h1>
            </div>

            {project.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <TechTag key={skill} label={skill} />
                ))}
              </div>
            )}

            {project.thumbnail && (
              <div className="relative aspect-video w-full overflow-hidden ">
                <Image
                  src={project.thumbnail.url}
                  alt={`${project.title} thumbnail`}
                  fill
                  sizes="(min-width: 1024px) 512px, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          <div
            className="prose prose-sm prose-neutral max-w-none dark:prose-invert
              prose-headings:text-foreground prose-headings:font-semibold
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-foreground prose-a:underline prose-a:underline-offset-2
              prose-hr:border-border
              prose-code:text-foreground prose-code:bg-muted prose-code:px-1"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground text-sm">
              Built by{" "}
              <span className="text-foreground font-medium">
                {siteConfig.author.name}
              </span>
              {project.project_url && (
                <>
                  {" · "}
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground anim hover:text-foreground/70 underline underline-offset-2"
                  >
                    Visit project
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
