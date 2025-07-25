import { FadeIn } from "@/components/atoms/fade-in";
import { OptimizedImage } from "@/components/atoms/optimized-image";
import { Button } from "@/components/atoms/button";
import { Separator } from "@/components/atoms/separator";
import { Badge } from "@/components/atoms/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { siteConfig } from "@/constants";
import { getProjectById } from "@/actions/projects";
import { Project } from "@/types/api";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Globe,
  Code2,
  Layers,
  Monitor,
  Tag,
  FileText,
  GitBranch,
  Eye,
  Star,
  Clock,
  User,
} from "lucide-react";

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
    const project = await getProjectById(projectId);

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
    const response = await getProjectById(projectId);
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
    <section className="overflow-y-auto relative h-full">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Project Header - Sticky */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 mb-8 pb-4 -mx-6 px-6">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <h1 className="text-xl font-bold text-foreground">
                    {project.name}
                  </h1>
                  {project.is_released && (
                    <Badge variant="success" className="w-fit">
                      <Globe className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Created {formatDate(project.createdAt)}</span>
                  </div>
                  {project.publishedAt && (
                    <div className="flex items-center gap-1.5">
                      <GitBranch className="w-4 h-4" />
                      <span>Published {formatDate(project.publishedAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {project.url && (
                  <Button asChild size={"sm"}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Live
                    </a>
                  </Button>
                )}
                {project.source_code_url && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.source_code_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Project Image */}
        {project.thumbnail && (
          <FadeIn>
            <div className="mb-8 rounded-xl overflow-hidden border bg-muted/30 shadow-sm">
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

        {/* Project Description */}
        <FadeIn>
          <div className="mb-10">
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
        </FadeIn>

        {/* Tech Stack Section */}
        <FadeIn>
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Tech Stack & Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Code2 className="w-4 h-4" />
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="info" className="text-xs">
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {project.categories && project.categories.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Layers className="w-4 h-4" />
                    Categories
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category, index) => (
                      <Badge key={index} variant="success" className="text-xs">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Platforms */}
              {project.platforms && project.platforms.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Monitor className="w-4 h-4" />
                    Platforms
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.platforms.map((platform, index) => (
                      <Badge key={index} variant="purple" className="text-xs">
                        {platform.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Types */}
              {project.types && project.types.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Tag className="w-4 h-4" />
                    Project Types
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.types.map((type, index) => (
                      <Badge key={index} variant="orange" className="text-xs">
                        {type.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Project Information */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Project Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="w-4 h-4" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Status
                  </span>
                  <Badge variant={project.is_released ? "success" : "warning"}>
                    {project.is_released ? "Released" : "In Development"}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Created
                  </span>
                  <span className="text-sm text-foreground">
                    {formatDate(project.createdAt)}
                  </span>
                </div>
                {project.publishedAt && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <GitBranch className="w-3.5 h-3.5" />
                        Published
                      </span>
                      <span className="text-sm text-foreground">
                        {formatDate(project.publishedAt)}
                      </span>
                    </div>
                  </>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    Last Updated
                  </span>
                  <span className="text-sm text-foreground">
                    {formatDate(project.updatedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ExternalLink className="w-4 h-4" />
                  Quick Access
                </CardTitle>
                <CardDescription>
                  Direct links to project resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.url && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Eye className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">
                                Live Demo
                              </div>
                              <div className="text-xs text-muted-foreground">
                                View the live project
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View the live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {project.source_code_url && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={project.source_code_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <Github className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">
                                Source Code
                              </div>
                              <div className="text-xs text-muted-foreground">
                                View on GitHub
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View source code on GitHub</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {!project.url && !project.source_code_url && (
                  <div className="p-4 rounded-lg border border-dashed text-center">
                    <div className="text-sm text-muted-foreground">
                      No external links available
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        {/* Navigation */}
        <FadeIn>
          <div className="flex justify-center pt-8 border-t">
            <Link href="/projects">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
