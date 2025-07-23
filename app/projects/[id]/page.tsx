import { FadeIn } from "@/components/atoms/fade-in";
import { OptimizedImage } from "@/components/atoms/optimized-image";
import { Button } from "@/components/atoms/button";
import { Separator } from "@/components/atoms/separator";
import { siteConfig } from "@/constants";
import { $api } from "@/lib/api";
import { Project } from "@/types/api";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar, Globe } from "lucide-react";

// Add revalidation to cache API responses
export const revalidate = 3600; // Revalidate every hour

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  try {
    const project = await $api<{ data: Project }>(
      `/projects/${projectId}?populate=*`
    );

    return {
      title: `${project.data.name} | Projects | ${siteConfig.name}`,
      description: project.data.description,
      openGraph: {
        title: project.data.name,
        description: project.data.description,
        images: project.data.thumbnail?.url
          ? [
              {
                url: project.data.thumbnail.url,
                width: project.data.thumbnail.width,
                height: project.data.thumbnail.height,
                alt:
                  project.data.thumbnail.alternativeText || project.data.name,
              },
            ]
          : [],
      },
    };
  } catch {
    return {
      title: `Project Not Found | ${siteConfig.name}`,
      description: "The requested project could not be found.",
    };
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  let project: Project;

  try {
    const response = await $api<{ data: Project }>(
      `/projects/${projectId}?populate=*`
    );
    project = response.data;
  } catch {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="overflow-y-auto relative h-full pb-10">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Back Navigation */}
        <FadeIn>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </FadeIn>

        {/* Project Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {project.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Created {formatDate(project.createdAt)}</span>
                  </div>
                  {project.is_released && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <span className="text-green-600 dark:text-green-400">
                        Released
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {project.source_code_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.source_code_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  </Button>
                )}
                {project.url && (
                  <Button size="sm" asChild>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Project Image */}
        {project.thumbnail && (
          <FadeIn>
            <div className="mb-8 rounded-lg overflow-hidden border bg-muted">
              <OptimizedImage
                src={project.thumbnail.url}
                alt={project.thumbnail.alternativeText || project.name}
                width={project.thumbnail.width}
                height={project.thumbnail.height}
                className="w-full h-auto"
                priority
              />
            </div>
          </FadeIn>
        )}

        <Separator className="my-8" />

        {/* Project Description */}
        <FadeIn>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              About This Project
            </h2>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.description}
            </div>
          </div>
        </FadeIn>

        {/* Project Details */}
        <FadeIn>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">
                Project Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={
                      project.is_released
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }
                  >
                    {project.is_released ? "Released" : "In Development"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="text-foreground">
                    {formatDate(project.createdAt)}
                  </span>
                </div>
                {project.publishedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Published:</span>
                    <span className="text-foreground">
                      {formatDate(project.publishedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Links</h3>
              <div className="space-y-2">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.source_code_url && (
                  <a
                    href={project.source_code_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Navigation to Other Projects */}
        <Separator className="my-8" />
        <FadeIn>
          <div className="text-center">
            <Link href="/projects">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                View All Projects
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
