import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { Hero } from "@/components/organisms/hero";
import { FeaturedProjects } from "@/components/organisms/featured-projects";
import { Skills } from "@/components/organisms/skills";
import { ProcessSection } from "@/components/organisms/process-section";
import { CtaSection } from "@/components/organisms/cta-section";
import { JsonLd } from "@/components/atoms/json-ld";
import { getDictionary, langFrom } from "@/lib/dictionary";
import { getProfile } from "@/lib/profile";
import { graph, pageMetadata, personLd, websiteLd } from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await langFrom(params);
  const { name, role } = await getProfile(lang);
  return pageMetadata({
    lang,
    title: `${name} — ${role}`,
    absoluteTitle: true,
    description: getDictionary(lang).meta.site,
    path: "/",
  });
}

export default async function HomePage({ params }: Props) {
  const lang = await langFrom(params);
  const profile = await getProfile(lang);
  const dict = getDictionary(lang);
  return (
    <PageLayout lang={lang}>
      <JsonLd
        data={graph(
          websiteLd(profile, dict.meta.site),
          personLd(profile, lang),
        )}
      />
      <SectionWrapper
        id="home"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 md:px-8 lg:gap-y-24 lg:px-16"
      >
        <Hero lang={lang} />
        <FeaturedProjects lang={lang} />
        <Skills lang={lang} />
        <ProcessSection
          items={profile.processItems}
          title={dict.home.process}
          intro={dict.home.processIntro}
        />
        <CtaSection lang={lang} />
      </SectionWrapper>
    </PageLayout>
  );
}
