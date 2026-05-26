"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/microcms";

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop || toc.length === 0) return;

    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("h2[id], h3[id], h4[id]")
    );

    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let current: string | null = null;
      for (const el of headings) {
        if (el.offsetTop <= scrollY) current = el.id;
        else break;
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop, toc]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      window.innerHeight / 3;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isMounted && isDesktop && toc.length > 0 && (
        <motion.aside
          key="toc"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-16 left-16 h-fit w-36 shrink-0"
        >
          <h3 className="mb-3 text-sm font-semibold tracking-wide">
            On this page
          </h3>
          <nav>
            <ul className="space-y-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      "hover:text-foreground w-fit cursor-pointer text-left text-xs font-medium transition-colors duration-300 lg:text-sm lg:text-nowrap",
                      item.depth === 3 && "pl-3",
                      item.depth === 4 && "pl-6",
                      activeId === item.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
