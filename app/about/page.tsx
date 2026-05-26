import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { WorkCard } from "@/components/molecules/work-card";
import { BookmarkList } from "@/components/molecules/bookmark-list";
import { Skills } from "@/components/organisms/skills";
import { TechIcon } from "@/components/atoms/tech-icon";
import {
  siteConfig,
  experience,
  education,
  awards,
  techItems,
  workstationItems,
  inspirationItems,
  bookmarkItems,
} from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.author.name} — a Full-Stack Software Engineer from Bali, Indonesia.`,
};

export default function AboutPage() {
  return (
    <PageLayout>
      <SectionWrapper
        id="about"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
      >
        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h1 className="text-foreground text-sm font-bold uppercase leading-none">
              About
            </h1>
          </div>
          <div className="text-muted-foreground space-y-4 text-sm md:text-base">
            <p>{siteConfig.author.longBio}</p>
          </div>
        </div>

        <Skills />

        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h2 className="text-foreground text-sm font-bold uppercase leading-none">
              Tools
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
              Experience
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
              Education
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
              Awards
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
              Workstation
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
              Inspiration
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
              Bookmarks
            </h2>
          </div>
          <BookmarkList items={bookmarkItems} />
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
