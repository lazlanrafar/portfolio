"use client";

import { NAVIGATION } from "@/constants";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import Link from "next/link";

export default function AppSidebarDesktop() {
  const pathname = usePathname();
  const activeBackRef = useRef<HTMLDivElement>(null);
  const navItemRef = useRef<HTMLDivElement>(null);

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
    const index = NAVIGATION.findIndex((item) => item.path === pathname);
    handleTransition(index);
  }, [pathname]);

  return (
    <div className="hidden md:flex flex-col w-full relative">
      <div
        ref={activeBackRef}
        className="absolute top-0 h-14 w-full border-y z-10 translate-y-0 transition-transform duration-300 ease-in-out"
      />

      {NAVIGATION.map((item, index) => (
        <div
          key={item.title}
          className="h-14 grid place-items-center z-20"
          ref={navItemRef}
        >
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={item.path} onClick={() => handleTransition(index)}>
                  <span className="sr-only">{item.title}</span>
                  <item.icon className="w-5 h-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="text-xs">
                <p className="">{item.content}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  );
}
