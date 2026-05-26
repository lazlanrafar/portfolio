import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const sizeMap: Record<HeadingLevel, string> = {
  1: "text-2xl font-bold md:text-4xl",
  2: "text-xl font-semibold",
  3: "text-base font-semibold",
  4: "text-sm font-semibold",
  5: "text-xs font-semibold uppercase tracking-widest",
  6: "text-xs font-semibold uppercase tracking-widest",
};

export function Heading({ level = 1, children, className }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  return (
    <Tag className={cn("text-foreground", sizeMap[level], className)}>
      {children}
    </Tag>
  );
}
