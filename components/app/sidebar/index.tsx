"use client";
import Link from "next/link";
import AppSidebarDesktop from "./sidebar-desktop";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { Button } from "@/components/atoms/button";
import { Menu, X } from "lucide-react";
import AppSidebarMobile from "./sidebar-mobile";
import { useState } from "react";

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="md:h-full md:max-w-[65px] w-full flex md:flex-col items-center justify-between bg-background border-b md:border-b-0 border-r py-3 md:py-10 px-5 md:px-0 md:overflow-y-auto">
        <div className="md:min-h-[100px]">
          <Link href="/">
            <h1 className="select-none text-xl font-bold">La.</h1>
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <ThemeToggle />

          <Button size={"icon"} variant={"ghost"} onClick={toggleNavbar}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <AppSidebarDesktop />
      </nav>

      <AppSidebarMobile isOpen={isOpen} toggleNavbar={toggleNavbar} />
    </>
  );
}
