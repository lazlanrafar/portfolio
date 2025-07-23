import { Suspense } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/accordion";
import { SiTypescript } from "react-icons/si";
import { FadeInStagger, FadeIn } from "@/components/atoms/fade-in";
import { AsideLink } from "@/components/atoms/aside-link";
import { NAVIGATION, siteConfig } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: siteConfig.description,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = NAVIGATION.find((nav) => nav.title === "About")?.children;
  if (!tabs) return null;

  return (
    <section className="grid grid-cols-12 overflow-hidden h-full">
      <aside className="md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto">
        <Accordion type="single" collapsible defaultValue="about">
          <AccordionItem value={"about"} defaultChecked>
            <AccordionTrigger className="border-b border-lines px-5 py-2.5 text-left">
              About Me
            </AccordionTrigger>
            <AccordionContent className="mt-5 space-y-1">
              <FadeInStagger faster>
                {tabs.map((tab) => (
                  <FadeIn key={tab.path}>
                    <Suspense fallback={<>Loading...</>}>
                      <AsideLink href={tab.path} key={tab.name}>
                        <SiTypescript className="w-4 h-4 shrink-0" />
                        {tab.name}
                      </AsideLink>
                    </Suspense>
                  </FadeIn>
                ))}
              </FadeInStagger>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <section className="md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84dvh] md:h-auto pb-8">
        {children}
      </section>
    </section>
  );
}
