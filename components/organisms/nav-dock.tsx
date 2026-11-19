"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  User,
  FolderOpen,
  Mail,
  BookOpen,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/data";
import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_NAMES,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { useLang } from "@/hooks/use-lang";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "/": Home,
  "/about": User,
  "/projects": FolderOpen,
  "/blog": BookOpen,
  "/contact": Mail,
};

const ITEM_SIZE = 40;

// Above the dock: it sits at the bottom of the screen, so a tooltip below would be cut off.
// nowrap keeps labels like プロフィール on one line.
const TOOLTIP =
  "pointer-events-none absolute left-1/2 bottom-full mb-3 hidden -translate-x-1/2 scale-75 whitespace-nowrap border border-border bg-popover px-1.5 py-1 text-[10px] font-medium leading-none text-popover-foreground opacity-0 transition-all duration-200 group-hover/dock:scale-100 group-hover/dock:opacity-100 md:block";

interface NavDockProps {
  /** Menu links (unprefixed paths) with labels in the page's language. */
  nav: NavItem[];
  themeLabel: string;
  languageLabel: string;
}

export function NavDock({ nav, themeLabel, languageLabel }: NavDockProps) {
  const { lang, path } = useLang();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const activeIndex = nav.findIndex((link) => link.href === path);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-auto dock-shadow bg-popover  p-1"
      >
        <div className="relative flex items-center">
          {activeIndex !== -1 && (
            <motion.span
              className="absolute inset-y-0 z-50 w-10 bg-primary/40 mix-blend-difference dark:bg-primary/20"
              initial={false}
              animate={{ x: activeIndex * ITEM_SIZE }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}

          {nav.map(({ href, label }) => {
            const Icon = iconMap[href];
            const isActive = path === href;
            return (
              <Link
                key={href}
                href={localePath(lang, href)}
                className={cn(
                  "group/dock relative size-10 p-3 transition-colors duration-300",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
                aria-label={label}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <Icon className="h-full w-full" />
                <span className={TOOLTIP}>{label}</span>
              </Link>
            );
          })}

          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label={themeLabel}
            className="group/dock relative size-10 cursor-pointer p-3 text-yellow-500 transition-colors duration-300 [&>svg]:fill-yellow-400 dark:text-indigo-400 dark:[&>svg]:fill-indigo-400"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Moon className="h-full w-full" />
              ) : (
                <Sun className="h-full w-full" />
              )
            ) : (
              <Sun className="h-full w-full opacity-0" />
            )}
            <span className={TOOLTIP}>{themeLabel}</span>
          </button>

          <LanguageMenu lang={lang} path={path} label={languageLabel} />
        </div>
      </motion.div>
    </div>
  );
}

/** Remembers the visitor's language for a year; proxy.ts sends the root URLs there. */
function saveLocale(lang: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/** Opens the current page in another language and remembers the choice (proxy.ts reads it). */
function LanguageMenu({
  lang,
  path,
  label,
}: {
  lang: Locale;
  path: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (
        e instanceof KeyboardEvent
          ? e.key === "Escape"
          : !ref.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const remember = (l: Locale) => {
    saveLocale(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group/dock text-muted-foreground hover:text-foreground relative flex size-10 cursor-pointer items-center justify-center text-[11px] font-semibold uppercase transition-colors duration-300"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {lang}
        {!open && <span className={TOOLTIP}>{label}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="dock-shadow bg-popover absolute right-0 bottom-full mb-3 flex w-44 flex-col p-1"
          >
            {LOCALES.map((l) => (
              <Link
                key={l}
                role="menuitem"
                href={localePath(l, path)}
                hrefLang={l}
                lang={l}
                onClick={() => remember(l)}
                aria-current={l === lang ? "true" : undefined}
                className={cn(
                  "anim flex items-center justify-between px-2.5 py-2 text-xs font-medium",
                  l === lang
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {LOCALE_NAMES[l]}
                <span className="text-muted-foreground text-[10px] uppercase">
                  {l}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
