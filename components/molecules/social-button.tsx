import Link from "next/link";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export function SocialButton({ href, label, icon, className }: SocialButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "flex h-9 w-9 items-center justify-center text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        className
      )}
    >
      {icon}
    </Link>
  );
}
