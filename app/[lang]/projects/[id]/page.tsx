import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, BadgeCheck, Code } from "lucide-react";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/templates/page-layout";
import { TableOfContents } from "@/components/molecules/table-of-contents";
import { getProject, getProjects, parseToc } from "@/lib/kadocms";
import { getProfile } from "@/lib/profile";
import { getDictionary, langFrom } from "@/lib/dictionary";
import { format, localePath } from "@/lib/i18n";
import { JsonLd } from "@/components/atoms/json-ld";
import {
  pageUrl,
  breadcrumbLd,
  graph,
  pageMetadata,
  personRef,
  shareImage,
} from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateStaticParams() {
  // Slugs are shared by every language.
  const projects = await getProjects("en");
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const lang = await langFrom(params);
  try {
    const project = await getProject(id, lang);
    const description =
      project.seo?.description ??
      project.description.replace(/<[^>]+>/g, "").slice(0, 160);
    const ogImage = project.seo?.image ?? project.thumbnail;
    return pageMetadata({
      lang,
      title: project.seo?.title ?? project.title,
      description,
      path: `/projects/${project.id}`,
      image: ogImage && shareImage(ogImage.url),
    });
  } catch {
    return { title: "Project Not Found" };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const lang = await langFrom(params);
  const dict = getDictionary(lang);

  let project;
  try {
    project = await getProject(id, lang);
  } catch {
    notFound();
  }
  const author = await getProfile(lang);

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
    <PageLayout lang={lang}>
      <JsonLd
        data={graph(
          {
            "@type": "CreativeWork",
            name: project.title,
            description:
              project.seo?.description ??
              project.description
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 300),
            url: pageUrl(lang, `/projects/${project.id}`),
            inLanguage: lang,
            ...(project.thumbnail && {
              image: shareImage(project.thumbnail.url),
            }),
            ...(startYear && { dateCreated: String(startYear) }),
            creator: personRef(author, lang),
            ...(project.links.length > 0 && {
              sameAs: project.links.map((l) => l.url),
            }),
          },
          breadcrumbLd(lang, [
            { name: dict.breadcrumb.home, path: "/" },
            { name: dict.projects.title, path: "/projects" },
            { name: project.title, path: `/projects/${project.id}` },
          ]),
        )}
      />
      <article className="relative flex h-auto w-full grow px-4 md:px-8 lg:px-16">
        <TableOfContents toc={toc} title={dict.toc} />

        <div className="mx-auto w-full max-w-2xl space-y-10 md:space-y-12 lg:space-y-16">
          <div className="flex w-full items-center justify-between">
            <Link
              href={localePath(lang, "/projects")}

              aria-label={dict.projects.backLabel}
              className="anim text-muted-foreground hover:text-foreground flex items-center gap-x-2"
            >
              <ArrowLeft className="size-4" />
              <p className="text-sm font-medium">{dict.projects.back}</p>
            </Link>
            {project.links.length > 0 && (
              <div className="flex items-center gap-x-4">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={format(dict.projects.newTab, {
                      label: link.label,
                    })}
                    className="anim text-muted-foreground hover:text-foreground flex items-center gap-x-2"
                  >
                    {/github\.com/.test(link.url) ? (
                      <Code className="size-4" />
                    ) : (
                      <ExternalLink className="size-4" />
                    )}
                    <p className="text-sm font-medium">{link.label}</p>
                  </a>
                ))}
              </div>
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
                  alt={format(dict.projects.thumbnail, {
                    title: project.title,
                  })}
                  fill
                  sizes="(min-width: 1024px) 672px, 90vw"
                  className="object-cover"
                  preload
                  placeholder={project.thumbnail.blurDataURL ? "blur" : "empty"}
                  blurDataURL={project.thumbnail.blurDataURL}
                />
              </div>
            )}

            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <Image
                  src="https://github.com/lazlanrafar.png"
                  alt={author.name}
                  width={44}
                  height={44}
                  className="border-border size-11 border object-cover"
                />
                <BadgeCheck className="text-background absolute -right-1 -bottom-1 size-5 fill-green-500" />
              </div>
              <div className="flex flex-col">
                <p className="text-foreground text-sm font-semibold">
                  {author.name}
                </p>
                <p className="text-muted-foreground text-xs font-medium">
                  {author.role}
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

            {project.gallery.length > 1 && (
              <div className="mt-8 space-y-4">
                {project.gallery.slice(1).map((shot) => (
                  <figure key={shot.image.url} className="space-y-2">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={shot.image.url}
                        alt={
                          shot.caption ??
                          format(dict.projects.screenshot, {
                            title: project.title,
                          })
                        }
                        fill
                        sizes="(min-width: 1024px) 672px, 90vw"
                        className="object-cover"
                      />
                    </div>
                    {shot.caption && (
                      <figcaption className="text-muted-foreground text-xs">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
