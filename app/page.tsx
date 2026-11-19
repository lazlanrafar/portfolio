import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { Hero } from "@/components/organisms/hero";
import { FeaturedProjects } from "@/components/organisms/featured-projects";
import { Skills } from "@/components/organisms/skills";
import { ProcessSection } from "@/components/organisms/process-section";
import { CtaSection } from "@/components/organisms/cta-section";
import { getProfile } from "@/lib/profile";
import { JsonLd } from "@/components/atoms/json-ld";
import { siteConfig } from "@/lib/data";
import { graph, pageMetadata, personLd, websiteLd } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { name, role } = await getProfile();
  return pageMetadata({
    title: `${name} — ${role}`,
    absoluteTitle: true,
    description: siteConfig.description,
    path: "/",
  });
}

export default async function HomePage() {
  const profile = await getProfile();
  const { processItems } = profile;
  return (
    <PageLayout>
      <JsonLd data={graph(websiteLd(profile), personLd(profile))} />
      <SectionWrapper
        id="home"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 md:px-8 lg:gap-y-24 lg:px-16"
      >
        <Hero />
        <FeaturedProjects />
        <Skills />
        <ProcessSection items={processItems} />
        <CtaSection />
      </SectionWrapper>
    </PageLayout>
  );
}
