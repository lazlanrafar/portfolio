"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/microcms";

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
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
    const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (!isDesktop || toc.length === 0) return null;

  return (
    <aside className="sticky top-24 hidden h-fit w-44 shrink-0 lg:block">
      <h3 className="text-foreground mb-3 text-xs font-semibold uppercase tracking-widest">
        On this page
      </h3>
      <nav>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "anim w-full cursor-pointer text-left text-xs font-medium",
                  item.depth === 3 && "pl-3",
                  item.depth === 4 && "pl-6",
                  activeId === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
