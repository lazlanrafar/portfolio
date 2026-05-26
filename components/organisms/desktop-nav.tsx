"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden bg-background/80 backdrop-blur-md md:flex">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          scroll={false}
          className="text-foreground anim hover:text-foreground/80 text-sm font-semibold"
        >
          {siteConfig.author.name}
        </Link>

        <nav className="flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              scroll={false}
              className={cn(
                "anim px-3 py-1.5 text-xs font-medium",
                pathname === href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="anim ml-1 cursor-pointer p-1.5 text-yellow-500 dark:text-indigo-400"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Moon className="h-3.5 w-3.5" />
              ) : (
                <Sun className="h-3.5 w-3.5" />
              )
            ) : (
              <Sun className="h-3.5 w-3.5 opacity-0" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
