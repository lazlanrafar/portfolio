"use client";

import { AppFooter, AppHeader, AppSidebar } from "@/components/app";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { useEffect, useRef, useState } from "react";

import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeWrapper({ children, ...props }: ThemeProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function onMouseDown(e: React.MouseEvent<HTMLElement>) {
    if (isMobile) return;
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  function onMouseUp() {
    setDragging(false);
  }

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  return (
    <ThemeProvider {...props}>
      <main
        ref={containerRef}
        className="h-dvh w-dvw lg:h-[75dvh] lg:w-[70dvw] flex flex-col backdrop-blur rounded-lg relative z-50 transition-all bg-background overflow-hidden"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: dragging ? "none" : "transform 0.2s ease-out",
        }}
      >
        <AppHeader onMouseDown={onMouseDown} />

        <div className="md:flex flex-1 flex-grow overflow-y-auto">
          <AppSidebar />
          <div className="relative w-full h-full">
            {children}

            <div className="absolute top-0 right-0 hidden md:block z-50">
              <div className="border-b border-l bg-background">
                <ThemeToggle />
              </div>
            </div>
          </div>

          <AppFooter />
        </div>
      </main>
    </ThemeProvider>
  );
}
