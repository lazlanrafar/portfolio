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
    <footer className="relative flex w-full flex-col px-4 py-12 md:px-8 lg:px-16">
      <div
        ref={ref}
        className={cn(
          "mx-auto flex w-full max-w-3xl flex-col items-center gap-y-12 pb-20 transition-all duration-500 ease-in-out md:pb-8",
          isInView
            ? "scale-100 opacity-100 blur-none"
            : "scale-95 opacity-0 blur-md"
        )}
      >
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          <p className="text-foreground/60 col-span-full pb-4 text-center text-base md:pb-8">
            ﹏𓊝﹏𓂁﹏
          </p>

          <div className="flex flex-col items-center gap-y-3 md:items-start">
            <p className="text-foreground text-sm font-semibold">
              {siteConfig.author.name}
            </p>
            <p className="text-foreground/60 max-w-48 text-center text-xs font-medium leading-relaxed text-balance md:text-left">
              Building production-grade web apps with clean code and great UX.
            </p>
            <div className="flex items-center gap-x-4">
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="anim text-foreground/60 hover:text-foreground cursor-pointer text-sm font-medium"
              >
                ↑ top
              </button>
              <button
                onClick={copyEmail}
                aria-label="Copy email"
                className="anim text-foreground/60 hover:text-foreground cursor-pointer text-sm font-medium"
              >
                @ {copied ? "copied!" : "email"}
              </button>
            </div>
          </div>

          <div className="flex flex-row items-start justify-center gap-x-12 md:justify-start">
            <div className="flex flex-col gap-y-3">
              <h2 className="text-foreground text-sm font-semibold">Navigate</h2>
              <div className="flex flex-col gap-y-1.5 text-sm font-medium">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    scroll={false}
                    className="text-foreground/60 anim hover:text-foreground"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-y-3">
              <h2 className="text-foreground text-sm font-semibold">Connect</h2>
              <div className="flex flex-col gap-y-1.5 text-sm font-medium">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 anim hover:text-foreground"
                >
                  GitHub
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 anim hover:text-foreground"
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 anim hover:text-foreground"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-y-3 md:items-start">
            <h2 className="text-foreground text-sm font-semibold">
              Stay Connected
            </h2>
            <div className="flex flex-col gap-y-1.5 text-sm font-medium">
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-foreground/60 anim hover:text-foreground"
              >
                Send an email
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 anim hover:text-foreground"
              >
                Message on LinkedIn
              </a>
            </div>
          </div>
        </div>

        <p className="text-foreground/60 text-center text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.author.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
