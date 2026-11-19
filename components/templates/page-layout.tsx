import { NavDock } from "@/components/organisms/nav-dock";
import { Footer } from "@/components/organisms/footer";
import { getProfile } from "@/lib/profile";

interface PageLayoutProps {
  children: React.ReactNode;
}

export async function PageLayout({ children }: PageLayoutProps) {
  const { name, email, socials } = await getProfile();
  // One column at least the screen tall: main takes the space left, so the footer sits at the
  // bottom of a short page instead of below the fold.
  return (
    <div className="relative flex min-h-svh flex-col items-center">
      <div className="from-background pointer-events-none fixed top-0 left-0 z-40 h-8 w-full bg-linear-to-b to-transparent" />
      <main className="flex h-auto w-full grow flex-col py-16">
        {children}
      </main>
      <NavDock />
      <Footer name={name} email={email} socials={socials} />
    </div>
  );
}
