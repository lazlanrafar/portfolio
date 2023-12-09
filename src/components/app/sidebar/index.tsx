"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import navigation from "./sidebar.constant";
import { usePathname } from "next/navigation";
import AppSidebarLink from "./sidebar-link";

export default function AppSidebar() {
  const pathname = usePathname();
  const activeBackRef = React.useRef<HTMLDivElement>(null);
  const navItemRef = React.useRef<HTMLDivElement>(null);

  const handleTransition = (index: number) => {
    const activeBack = activeBackRef.current;
    const navItem = navItemRef.current;

    if (activeBack && navItem) {
      activeBack.style.transform = `translateY(${
        index * navItem.offsetHeight
      }px)`;
    }
  };

  useEffect(() => {
    const index = navigation.findIndex((item) => item.link === pathname);
    handleTransition(index);
  }, [pathname]);

  return (
    <aside className="h-screen w-16 sticky top-0 left-0 flex flex-col items-center justify-between bg-background border-r py-10">
      <div className="">
        <Link href="/">
          <h1 className="font-semibold select-none">La.</h1>
        </Link>
      </div>

      <div className="flex flex-col w-full relative">
        <div
          ref={activeBackRef}
          className="absolute top-0 h-14 w-full border-y z-10 translate-y-0 transition-transform duration-300 ease-in-out"
        />

        {navigation.map((item, index) => (
          <div
            key={item.title}
            className="h-14 grid place-items-center z-20"
            ref={navItemRef}
          >
            <AppSidebarLink
              item={item}
              onClick={() => handleTransition(index)}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
