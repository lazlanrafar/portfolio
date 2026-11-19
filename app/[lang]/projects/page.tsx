import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { FilterableList } from "@/components/organisms/filterable-list";
import { ProjectCard } from "@/components/molecules/project-card";
import { JsonLd } from "@/components/atoms/json-ld";
import { filterLabels, getDictionary, langFrom } from "@/lib/dictionary";
import { format, localePath, splitAround } from "@/lib/i18n";
import { getProjects } from "@/lib/kadocms";
import { getProfile } from "@/lib/profile";
import { breadcrumbLd, collectionLd, graph, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await langFrom(params);
  const { name } = await getProfile(lang);
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    title: dict.projects.title,
    description: format(dict.meta.projects, { name }),
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const lang = await langFrom(params);
  const projects = await getProjects(lang);
  const dict = getDictionary(lang);
  const [before, after] = splitAround(dict.projects.intro, "count");

  return (
    <PageLayout lang={lang}>
      <JsonLd
        data={graph(
          collectionLd(
            lang,
            dict.projects.title,
            "/projects",
            dict.meta.projectsList,
            projects.map((p) => ({ name: p.title, path: `/projects/${p.id}` })),
          ),
          breadcrumbLd(lang, [
            { name: dict.breadcrumb.home, path: "/" },
            { name: dict.projects.title, path: "/projects" },
          ]),
        )}
      />
      <SectionWrapper
        id="projects"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 md:px-8 lg:gap-y-24 lg:px-16"
      >
        <div className="w-full space-y-8">
          <div className="w-full space-y-4">
            <div className="flex h-8 w-full items-center">
              <h1 className="text-foreground text-sm font-bold uppercase leading-none">
                {dict.projects.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              {before}
              <span className="text-foreground font-medium">
                {format(dict.projects.count, { count: projects.length })}
              </span>
              {after}
            </p>
          </div>

          <FilterableList
            labels={filterLabels(dict, "project")}
            listClassName="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
            items={projects.map((project, i) => ({
              id: project.id,
              text: [
                project.title,
                ...project.skills,
                project.description.replace(/<[^>]+>/g, " "),
              ].join(" "),
              tags: project.skills,
              node: (
                <ProjectCard
                  project={project}
                  href={localePath(lang, `/projects/${project.id}`)}
                  label={format(dict.projects.readMore, {
                    title: project.title,
                  })}
                  priority={i < 2}
                />
              ),
            }))}
          />
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
