import { HiTerminal } from "react-icons/hi";
import { BsActivity } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { SiArchlinux } from "react-icons/si";
import { Suspense } from "react";
import { allAbouts } from "contentlayer/generated";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/accordion";
import { SiTypescript } from "react-icons/si";
import { FadeInStagger, FadeIn } from "@/components/atoms/fade-in";
import { AsideLink } from "@/components/atoms/aside-link";

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-12 overflow-hidden h-full">
      <aside className="md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto">
        <Accordion type="single" collapsible defaultValue="about">
          <AccordionItem value={"about"} defaultChecked>
            <AccordionTrigger className="border-b border-lines px-5 py-2.5 text-left">
              Coding Activity
            </AccordionTrigger>
            <AccordionContent className="mt-5 space-y-1">
              <FadeInStagger faster>
                {ACTIVITY.map((item) => (
                  <FadeIn key={item.name}>
                    <Suspense fallback={<>Loading...</>}>
                      <AsideLink
                        href={`/activity/${item.slug}`}
                        title={item.slug}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {item.name}
                      </AsideLink>
                    </Suspense>
                  </FadeIn>
                ))}
              </FadeInStagger>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <section className="md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84dvh] md:h-auto">
        <div className="p-5">{children}</div>
      </section>
    </section>
  );
}

const ACTIVITY = [
  {
    name: "Languages",
    slug: "languages",
    icon: HiTerminal,
    path: "/activity/languages",
  },
  {
    name: "Activity",
    slug: "activity",
    icon: BsActivity,
    path: "/activity/activity",
  },
  {
    name: "Code Editor",
    slug: "code-editor",
    icon: BiText,
    path: "/activity/code-editor",
  },
  {
    name: "Operating Systems",
    slug: "operating-systems",
    icon: SiArchlinux,
    path: "/activity/operating-systems",
  },
];
