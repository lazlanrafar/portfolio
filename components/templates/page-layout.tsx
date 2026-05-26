import { DesktopNav } from "@/components/organisms/desktop-nav";
import { NavDock } from "@/components/organisms/nav-dock";
import { Footer } from "@/components/organisms/footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <DesktopNav />
      <div className="relative flex min-h-svh flex-col items-center justify-center">
        <div className="from-background pointer-events-none fixed top-0 left-0 z-40 h-8 w-full bg-linear-to-b to-transparent md:hidden" />
        <main className="flex h-auto w-full grow flex-col py-16 md:py-24 lg:py-28">
          {children}
        </main>
        <NavDock />
      </div>
      <Footer />
    </>
  );
}
