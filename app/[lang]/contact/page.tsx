import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { getProfile } from "@/lib/profile";
import { getDictionary, langFrom } from "@/lib/dictionary";
import { format, splitAround } from "@/lib/i18n";
import { JsonLd } from "@/components/atoms/json-ld";
import {
  pageUrl,
  breadcrumbLd,
  graph,
  pageMetadata,
  personLd,
} from "@/lib/seo";
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
    title: dict.nav.contact,
    description: format(dict.meta.contact, { name }),
    path: "/contact",
  });
}

/** "github.com/lazlanrafar", "@lazlanrafar" for Instagram. */
function displayUrl(url: string): string {
  const u = new URL(url);
  const path = u.pathname.replace(/\/$/, "");
  const host = u.hostname.replace(/^www\./, "");
  return host === "instagram.com" ? `@${path.slice(1)}` : `${host}${path}`;
}

export default async function ContactPage({ params }: Props) {
  const lang = await langFrom(params);
  const profile = await getProfile(lang);
  const dict = getDictionary(lang);
  const [before, after] = splitAround(dict.contact.intro, "location");
  const { email, location, socials } = profile;
  const contactLinks = [
    {
      label: dict.contact.email,
      value: email,
      href: `mailto:${email}`,
      external: false,
    },
    ...socials.map(({ label, url }) => ({
      label,
      value: displayUrl(url),
      href: url,
      external: true,
    })),
  ];
  return (
    <PageLayout lang={lang}>
      <JsonLd
        data={graph(
          {
            "@type": "ContactPage",
            url: pageUrl(lang, "/contact"),
            inLanguage: lang,
            mainEntity: personLd(profile, lang),
          },
          breadcrumbLd(lang, [
            { name: dict.breadcrumb.home, path: "/" },
            { name: dict.nav.contact, path: "/contact" },
          ]),
        )}
      />
      <SectionWrapper
        id="contact"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 md:px-8 lg:gap-y-24 lg:px-16"
      >
        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h1 className="text-foreground text-sm font-bold uppercase leading-none">
              {dict.contact.title}
            </h1>
          </div>
          <div className="text-muted-foreground text-sm md:text-base">
            <p>
              {before}
              <span className="text-foreground font-medium">{location}</span>
              {after}
            </p>
          </div>
        </div>

        <div className="w-full space-y-1">
          {contactLinks.map(({ label, value, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="anim group/contact flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-accent hover:pl-3"
            >
              <span className="text-muted-foreground font-medium">{label}</span>
              <span className="text-muted-foreground group-hover/contact:text-foreground anim text-xs">
                {value}
              </span>
            </a>
          ))}
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
