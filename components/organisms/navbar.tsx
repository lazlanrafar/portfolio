import Link from "next/link";
import { Container } from "@/components/atoms/container";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { NavItem } from "@/components/molecules/nav-item";
import { navLinks, siteConfig } from "@/lib/data";

export function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <Container as="nav" className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
        >
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href} label={link.label} />
            ))}
          </div>
          <ThemeToggle className="ml-2" />
        </div>
      </Container>
    </header>
  );
}
