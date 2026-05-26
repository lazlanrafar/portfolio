"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/utils";

const themedIcons = new Set([
  "astro", "aws", "drizzle", "express", "github",
  "go", "markdown", "motion", "prisma", "shadcn",
  "sketch", "swr", "vercel", "zed",
]);

export function TechIcon({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();

  const src = useMemo(() => {
    const key = id.toLowerCase();
    if (themedIcons.has(key)) {
      return `/icons/tech/${key}-${resolvedTheme === "dark" ? "dark" : "light"}.svg`;
    }
    return `/icons/tech/${key}.svg`;
  }, [id, resolvedTheme]);

  return (
    <Image
      src={src}
      alt={id}
      width={12}
      height={12}
      className={cn("size-3", className)}
    />
  );
}
