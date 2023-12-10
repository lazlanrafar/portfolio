import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/accordion";
import { SiGithub, SiGmail, SiInstagram, SiLinkedin } from "react-icons/si";
import { FadeInStagger, FadeIn } from "@/components/atoms/fade-in";
import { AsideLink } from "@/components/atoms/aside-link";
import { siteConfig } from "@/constants";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-12 overflow-hidden h-full">
      <aside className="md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto">
        <Accordion type="single" collapsible defaultValue="contact">
          <AccordionItem value={"contact"} defaultChecked>
            <AccordionTrigger className="border-b border-lines px-5 py-2.5 text-left">
              Contact Me
            </AccordionTrigger>
            <AccordionContent className="mt-5">
              <FadeInStagger faster className="space-y-2">
                {CONTACTS.map((contact) => (
                  <FadeIn key={contact.name}>
                    <AsideLink href={contact.path} target="_blank">
                      <contact.icon className="w-4 h-4 shrink-0" />
                      {contact.name}
                    </AsideLink>
                  </FadeIn>
                ))}
              </FadeInStagger>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <section className="md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84dvh] md:h-auto">
        {children}
      </section>
    </section>
  );
}

const CONTACTS = [
  {
    name: "Email",
    path: siteConfig.links.email,
    icon: SiGmail,
  },
  {
    name: "Github",
    path: siteConfig.links.github,
    icon: SiGithub,
  },
  {
    name: "Linkedin",
    path: siteConfig.links.linkedin,
    icon: SiLinkedin,
  },
  {
    name: "Instagram",
    path: siteConfig.links.instagram,
    icon: SiInstagram,
  },
];
