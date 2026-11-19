import { NavDock } from "@/components/organisms/nav-dock";
import { Footer } from "@/components/organisms/footer";
import { navLinks } from "@/lib/data";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

interface PageLayoutProps {
  lang: Locale;
  children: React.ReactNode;
}

export async function PageLayout({ lang, children }: PageLayoutProps) {
  const { name, email, socials } = await getProfile(lang);
  const dict = getDictionary(lang);
  const nav = navLinks.map(({ href, key }) => ({ href, label: dict.nav[key] }));
  // One column at least the screen tall: main takes the space left, so the footer sits at the
  // bottom of a short page instead of below the fold.
  return (
    <div className="relative flex min-h-svh flex-col items-center">
      <div className="from-background pointer-events-none fixed top-0 left-0 z-40 h-8 w-full bg-linear-to-b to-transparent" />
      <main className="flex h-auto w-full grow flex-col py-16">{children}</main>
      <NavDock
        nav={nav}
        themeLabel={dict.nav.theme}
        languageLabel={dict.nav.language}
      />
      <Footer
        name={name}
        email={email}
        socials={socials}
        nav={nav}
        text={dict.footer}
      />
    </div>
  );
}
