import { SectionWrapper } from "@/components/motion/section-wrapper";
import { PageLayout } from "@/components/templates/page-layout";
import { getProfile } from "@/lib/profile";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getProfile();
  return { title: "Contact", description: `Get in touch with ${name}.` };
}

/** "github.com/lazlanrafar", "@lazlanrafar" for Instagram. */
function displayUrl(url: string): string {
  const u = new URL(url);
  const path = u.pathname.replace(/\/$/, "");
  const host = u.hostname.replace(/^www\./, "");
  return host === "instagram.com" ? `@${path.slice(1)}` : `${host}${path}`;
}

export default async function ContactPage() {
  const { email, location, socials } = await getProfile();
  const contactLinks = [
    { label: "Email", value: email, href: `mailto:${email}`, external: false },
    ...socials.map(({ label, url }) => ({
      label,
      value: displayUrl(url),
      href: url,
      external: true,
    })),
  ];
  return (
    <PageLayout>
      <SectionWrapper
        id="contact"
        className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
      >
        <div className="w-full space-y-4">
          <div className="flex h-8 w-full items-center">
            <h1 className="text-foreground text-sm font-bold uppercase leading-none">
              Let&apos;s connect
            </h1>
          </div>
          <div className="text-muted-foreground text-sm md:text-base">
            <p>
              I&apos;m always open to new opportunities and collaborations.
              Based in{" "}
              <span className="text-foreground font-medium">
                {location}
              </span>
              , available worldwide.
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
