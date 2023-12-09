import Link from "next/link";
import AppSidebarDesktop from "./sidebar-desktop";
import { ThemeToggle } from "@/components/molecules/theme-toggle";

export default function AppSidebar() {
  return (
    <aside className="md:h-full md:max-w-[65px] w-full flex md:flex-col items-center justify-between bg-background border-b md:border-b-0 border-r py-3 md:py-10 px-5 md:px-0 md:overflow-y-auto">
      <div className="md:min-h-[100px]">
        <Link href="/">
          <h1 className="font-semibold select-none">La.</h1>
        </Link>
      </div>

      <div className="md:hidden">
        <ThemeToggle />
      </div>

      <AppSidebarDesktop />
    </aside>
  );
}
