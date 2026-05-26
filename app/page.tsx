import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { Hero } from "@/components/organisms/hero";
import { FeaturedProjects } from "@/components/organisms/featured-projects";
import { Skills } from "@/components/organisms/skills";
import { siteConfig } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.author.name} — ${siteConfig.author.role}`,
  },
};

export default function HomePage() {
  return (
    <PageLayout>
      <SectionWrapper
        id="home"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
      >
        <Hero />
        <FeaturedProjects />
        <Skills />
      </SectionWrapper>
    </PageLayout>
  );
}
