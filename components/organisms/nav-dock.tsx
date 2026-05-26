"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FolderOpen, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "/": Home,
  "/about": User,
  "/projects": FolderOpen,
  "/contact": Mail,
};

const ITEM_SIZE = 40;

export function NavDock() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const activeIndex = navLinks.findIndex((link) => link.href === pathname);

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

          {navLinks.map(({ href, label }) => {
            const Icon = iconMap[href];
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
               
                className={cn(
                  "group/dock relative size-10 p-3 transition-colors duration-300",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
                aria-label={label}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <Icon className="h-full w-full" />
                <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 scale-75 border border-border bg-popover px-1.5 py-1 text-[10px] font-medium leading-none text-popover-foreground opacity-0 transition-all duration-200 group-hover/dock:scale-100 group-hover/dock:opacity-100 md:block">
                  {label}
                </span>
              </Link>
            );
          })}

          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
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
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 scale-75 border border-border bg-popover px-1.5 py-1 text-[10px] font-medium leading-none text-popover-foreground opacity-0 transition-all duration-200 group-hover/dock:scale-100 group-hover/dock:opacity-100 md:block">
              Theme
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
