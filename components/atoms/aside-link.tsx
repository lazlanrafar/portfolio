"use client";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { type ClassValue } from "clsx";

import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  title?: string | null;
  className?: ClassValue;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const AsideLink = ({
  href,
  children,
  title,
  className,
  ...props
}: Props) => {
  const segment = useSelectedLayoutSegment();
  const tag = useSearchParams().get("tag");
  const pathname = usePathname();

  const isActive = tag === title || segment === title || pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        isActive
          ? "text-foreground bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-primary/10",
        "w-full transition-colors flex items-center gap-x-2.5 hover:bg-primary/10 px-5 py-1 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
