"use client";

import { AppFooter, AppHeader, AppSidebar } from "@/components/app";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Reset position when switching to mobile
      if (mobile) {
        setPosition({ x: 0, y: 0 });
        setDragging(false);
      }
    };

    // Only run on client-side
    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  function onMouseDown(e: React.MouseEvent<HTMLElement>) {
    if (isMobile) return;
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;

      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    },
    [dragging, offset]
  );

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
  }, [dragging, onMouseMove]);

  return (
    <main
      ref={containerRef}
      className={cn(
        "h-dvh w-dvw lg:h-[75dvh] lg:w-[70dvw]",
        "flex flex-col backdrop-blur relative z-50 transition-all bg-background overflow-hidden",
        isMobile ? "rounded-none" : "rounded-lg"
      )}
      style={{
        transform: isMobile
          ? "translate(0, 0)"
          : `translate(${position.x}px, ${position.y}px)`,
        transition: dragging ? "none" : "transform 0.2s ease-out",
      }}
    >
      <AppHeader onMouseDown={onMouseDown} />

      <div className="md:flex flex-1 flex-grow overflow-hidden">
        <AppSidebar />
        <div className="relative w-full h-full overflow-auto">{children}</div>
      </div>
      <AppFooter />
    </main>
  );
}
