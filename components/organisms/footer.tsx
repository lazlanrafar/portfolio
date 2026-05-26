"use client";

import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { siteConfig, navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.author.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      ref={ref}
      className="relative flex w-full flex-col px-4 py-12 pb-28 md:pb-12"
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-3xl flex-col gap-y-12 transition-all duration-500 ease-in-out",
          isInView
            ? "scale-100 opacity-100 blur-none"
            : "scale-95 opacity-0 blur-md"
        )}
      >
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          <div className="flex flex-col items-center gap-y-3 md:items-start">
            <p className="text-foreground text-sm font-semibold">
              {siteConfig.author.name}
            </p>
            <p className="text-muted-foreground max-w-48 text-center text-xs font-medium leading-relaxed text-balance md:text-left">
              Building production-grade web apps with clean code and great UX.
            </p>
            <div className="flex items-center gap-x-4">
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="anim text-foreground hover:text-foreground/70 cursor-pointer text-sm font-medium"
              >
                ↑ top
              </button>
              <button
                onClick={copyEmail}
                aria-label="Copy email"
                className="anim text-foreground hover:text-foreground/70 cursor-pointer text-sm font-medium"
              >
                @ {copied ? "copied!" : "email"}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-y-3 md:items-start">
            <h2 className="text-foreground text-sm font-semibold">Navigate</h2>
            <div className="flex flex-col items-center gap-y-2 text-sm font-medium md:items-start md:gap-y-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  scroll={false}
                  className="text-muted-foreground anim hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-y-3 md:items-start">
            <h2 className="text-foreground text-sm font-semibold">Connect</h2>
            <div className="flex flex-col items-center gap-y-2 text-sm font-medium md:items-start md:gap-y-1">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground anim hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground anim hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground anim hover:text-foreground"
              >
                Instagram
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-muted-foreground anim hover:text-foreground"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-center text-sm font-medium">
          &copy; {new Date().getFullYear()} {siteConfig.author.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
