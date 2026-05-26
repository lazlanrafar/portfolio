import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, BadgeCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/templates/page-layout";
import { TableOfContents } from "@/components/molecules/table-of-contents";
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
      <article className="relative flex h-auto w-full grow px-4">
        <TableOfContents toc={toc} />

        <div className="mx-auto w-full max-w-lg space-y-10 md:max-w-md md:space-y-12 lg:max-w-lg lg:space-y-16">
          <div className="flex w-full items-center justify-between">
            <Link
              href="/projects"
             
              aria-label="Go back to projects"
              className="anim text-muted-foreground hover:text-foreground flex items-center gap-x-2"
            >
              <ArrowLeft className="size-4" />
              <p className="text-sm font-medium">Go back</p>
            </Link>
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit live project"
                className="anim text-muted-foreground hover:text-foreground flex items-center gap-x-2"
              >
                <ExternalLink className="size-4" />
                <p className="text-sm font-medium">Live site</p>
              </a>
            )}
          </div>

          <div className="flex w-full flex-col">
            <div className="mb-4 space-y-1 sm:mb-6">
              <h1 className="text-xl font-bold sm:text-2xl">{project.title}</h1>
              {period && (
                <p className="text-muted-foreground text-sm font-medium md:text-base">
                  {period}
                </p>
              )}
            </div>

            {project.thumbnail && (
              <div className="relative mb-4 aspect-video h-auto w-full overflow-hidden sm:mb-6">
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

            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <Image
                  src="https://github.com/lazlanrafar.png"
                  alt={siteConfig.author.name}
                  width={44}
                  height={44}
                  className="border-border size-11 border object-cover"
                />
                <BadgeCheck className="text-background absolute -right-1 -bottom-1 size-5 fill-green-500" />
              </div>
              <div className="flex flex-col">
                <p className="text-foreground text-sm font-semibold">
                  {siteConfig.author.name}
                </p>
                <p className="text-muted-foreground text-xs font-medium">
                  {siteConfig.author.role}
                </p>
              </div>
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
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
