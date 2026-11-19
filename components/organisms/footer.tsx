"use client";

import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import type { NavItem } from "@/lib/data";
import { localePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import type { SocialLink } from "@/lib/profile";
import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

export function Footer({
  name,
  email,
  socials,
  nav,
  text,
}: {
  name: string;
  email: string;
  socials: SocialLink[];
  /** Menu links (unprefixed paths) with labels in the page's language. */
  nav: NavItem[];
  text: Dictionary["footer"];
}) {
  const { lang } = useLang();
  const linkedin = socials.find(
    (s) => s.label.toLowerCase() === "linkedin",
  )?.url;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative flex w-full flex-col px-4 py-12 md:px-8 lg:px-16">
      <div
        ref={ref}
        className={cn(
          "mx-auto flex w-full max-w-2xl flex-col items-center gap-y-12 pb-20 transition-all duration-500 ease-in-out md:pb-8",
          isInView
            ? "scale-100 opacity-100 blur-none"
            : "scale-95 opacity-0 blur-md",
        )}
      >
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          <p className="text-foreground/60 col-span-full pb-4 text-center text-base md:pb-8">
            ﹏𓊝﹏𓂁﹏
          </p>

          <div className="flex flex-col items-center gap-y-3 md:items-start">
            <p className="text-foreground text-sm font-semibold">{name}</p>
            <p className="text-foreground/60 max-w-48 text-center text-xs font-medium leading-relaxed text-balance md:text-left">
              {text.tagline}
            </p>
            <div className="flex items-center gap-x-4">
              <button
                onClick={scrollToTop}
                aria-label={text.backToTop}
                className="anim text-foreground/60 hover:text-foreground cursor-pointer text-sm font-medium"
              >
                ↑ {text.top}
              </button>
              <button
                onClick={copyEmail}
                aria-label={text.copyEmail}
                className="anim text-foreground/60 hover:text-foreground cursor-pointer text-sm font-medium"
              >
                @ {copied ? text.copied : text.email}
              </button>
            </div>
          </div>

          <div className="flex flex-row items-start justify-center gap-x-12 md:justify-start">
            <div className="flex flex-col gap-y-3">
              <h2 className="text-foreground text-sm font-semibold">
                {text.navigate}
              </h2>
              <div className="flex flex-col gap-y-1.5 text-sm font-medium">
                {nav.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={localePath(lang, href)}

                    className="text-foreground/60 anim hover:text-foreground"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-y-3">
              <h2 className="text-foreground text-sm font-semibold">
                {text.connect}
              </h2>
              <div className="flex flex-col gap-y-1.5 text-sm font-medium">
                {socials.map(({ label, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 anim hover:text-foreground"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-y-3 md:items-start">
            <h2 className="text-foreground text-sm font-semibold">
              {text.stayConnected}
            </h2>
            <div className="flex flex-col gap-y-1.5 text-sm font-medium">
              <a
                href={`mailto:${email}`}
                className="text-foreground/60 anim hover:text-foreground"
              >
                {text.sendEmail}
              </a>
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 anim hover:text-foreground"
                >
                  {text.messageLinkedIn}
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="text-foreground/60 text-center text-sm">
          &copy; {new Date().getFullYear()} {name}. {text.rights}
        </p>
      </div>
    </footer>
  );
}
