import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { WorkCard } from "@/components/molecules/work-card";
import { BookmarkList } from "@/components/molecules/bookmark-list";
import { Skills } from "@/components/organisms/skills";
import { TechIcon } from "@/components/atoms/tech-icon";
import { getProfile } from "@/lib/profile";
import { getDictionary, langFrom } from "@/lib/dictionary";
import { format } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/atoms/json-ld";
import {
  pageUrl,
  breadcrumbLd,
  graph,
  pageMetadata,
  personLd,
  shareImage,
} from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await langFrom(params);
  const profile = await getProfile(lang);
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    title: profile.seo?.title ?? dict.about.title,
    description:
      profile.seo?.description ??
      format(dict.meta.about, {
        name: profile.name,
        location: profile.location,
      }),
    path: "/about",
    image: profile.seo?.image && shareImage(profile.seo.image),
  });
}

export default async function AboutPage({ params }: Props) {
  const lang = await langFrom(params);
  const profile = await getProfile(lang);
  const dict = getDictionary(lang);
  const {
    longBio,
    experience,
    education,
    awards,
    techItems,
    workstationItems,
    inspirationItems,
    bookmarkItems,
  } = profile;
  return (
    <PageLayout lang={lang}>
      <JsonLd
        data={graph(
          {
            "@type": "ProfilePage",
            url: pageUrl(lang, "/about"),
            inLanguage: lang,
            dateModified: profile.updatedAt,
            mainEntity: personLd(profile, lang),
          },
          breadcrumbLd(lang, [
            { name: dict.breadcrumb.home, path: "/" },
            { name: dict.about.title, path: "/about" },
          ]),
        )}
      />
      <SectionWrapper
        id="about"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 md:px-8 lg:gap-y-24 lg:px-16"
      >
        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h1 className="text-foreground text-sm font-bold uppercase leading-none">
              {dict.about.title}
            </h1>
          </div>
          <div
            className="text-muted-foreground space-y-4 text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: longBio }}
          />
        </div>

        <Skills lang={lang} />

        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h2 className="text-foreground text-sm font-bold uppercase leading-none">
              {dict.about.tools}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {techItems.map((item) => (
              <span
                key={item.id}
                className="border-border text-muted-foreground flex h-6 items-center gap-2 border px-2 text-xs font-medium"
              >
                <TechIcon id={item.id} />
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h2 className="text-foreground text-sm font-bold uppercase leading-none">
              {dict.about.experience}
            </h2>
          </div>
          <div className="flex w-full flex-col">
            {experience.map((item, i) => (
              <WorkCard
                key={i}
                role={item.role}
                company={item.company}
                period={item.period}
                country={item.country}
              />
            ))}
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h2 className="text-foreground text-sm font-bold uppercase leading-none">
              {dict.about.education}
            </h2>
          </div>
          <div className="flex w-full flex-col">
            {education.map((item, i) => (
              <WorkCard
                key={i}
                role={item.degree}
                company={item.institution}
                period={item.period}
                country={item.country}
              />
            ))}
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h2 className="text-foreground text-sm font-bold uppercase leading-none">
              {dict.about.awards}
            </h2>
          </div>
          <div className="flex w-full flex-col">
            {awards.map((item, i) => (
              <WorkCard
                key={i}
                role={item.title}
                company={item.awarder}
                period={item.year}
                country="🏆"
              />
            ))}
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h2 className="text-foreground text-sm font-bold uppercase leading-none">
              {dict.about.workstation}
            </h2>
          </div>
          <ul className="flex flex-col gap-y-3">
            {workstationItems.map((item, i) => (
              <li
                key={i}
                className="flex flex-col items-start gap-y-1 text-sm sm:flex-row sm:items-center"
              >
                <p className="text-muted-foreground w-28 shrink-0">
                  {item.category}
                </p>
                <ArrowRight className="text-foreground hidden size-3 sm:block" />
                <p className="text-foreground font-medium">
                  {item.items.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h2 className="text-foreground text-sm font-bold uppercase leading-none">
              {dict.about.inspiration}
            </h2>
          </div>
          <ul className="flex flex-col gap-y-2">
            {inspirationItems.map((item, i) => (
              <li
                key={i}
                className="flex flex-col items-start text-sm sm:flex-row"
              >
                <div className="mb-1 flex items-center sm:mb-0">
                  <p className="text-muted-foreground w-28 shrink-0">
                    {item.category}
                  </p>
                  <ArrowRight className="text-foreground mx-3 hidden size-3 sm:block" />
                </div>
                <div className="flex flex-wrap items-center gap-x-0">
                  {item.items.map((person, j) => (
                    <Link
                      key={j}
                      href={person.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground font-medium underline-offset-2 hover:underline"
                    >
                      {person.name}
                      {j < item.items.length - 1 && (
                        <span className="mr-1">,</span>
                      )}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h2 className="text-foreground text-sm font-bold uppercase leading-none">
              {dict.about.bookmarks}
            </h2>
          </div>
          <BookmarkList items={bookmarkItems} labels={dict.bookmarks} />
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
