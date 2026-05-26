import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { WorkCard } from "@/components/molecules/work-card";
import { Skills } from "@/components/organisms/skills";
import { siteConfig, experience } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.author.name} — a full-stack software developer from Bali, Indonesia.`,
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
      </SectionWrapper>
    </PageLayout>
  );
}
