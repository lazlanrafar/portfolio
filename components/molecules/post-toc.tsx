"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/posts";

type PostTocProps = {
  toc: TocItem[];
  className?: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderItems(items: TocItem[], activeId: string | null, onScroll: (id: string) => void) {
  return items.map((item) => {
    const id = slugify(item.value);
    const isActive = activeId === id;

    return (
      <li key={id}>
        <button
          onClick={() => onScroll(id)}
          className={cn(
            "hover:text-foreground w-fit cursor-pointer text-left text-xs font-medium transition-colors duration-300 lg:text-sm lg:text-nowrap",
            {
              "text-foreground": isActive,
              "text-muted-foreground": !isActive,
              "pl-3": item.depth === 3,
              "pl-6": item.depth === 4,
            },
          )}
        >
          {item.value}
        </button>
        {item.children && item.children.length > 0 && (
          <ul className="mt-2 w-fit space-y-2">
            {renderItems(item.children, activeId, onScroll)}
          </ul>
        )}
      </li>
    );
  });
}

export function PostToc({ toc, className }: PostTocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("h2[id], h3[id], h4[id]"),
    );

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let currentId: string | null = null;
      for (const heading of headings) {
        if (heading.offsetTop <= scrollY) currentId = heading.id;
        else break;
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isMounted && isDesktop && toc.length > 0 && (
        <motion.div
          key="post-toc"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("sticky top-16 left-16 h-fit w-36 shrink-0", className)}
        >
          <h3 className="mb-3 text-sm font-semibold tracking-wide lg:text-base lg:text-nowrap">
            On this page
          </h3>
          <nav>
            <ul className="space-y-2">{renderItems(toc, activeId, scrollToHeading)}</ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
