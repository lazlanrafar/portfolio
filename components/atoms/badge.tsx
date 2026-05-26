import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium",
        variant === "default" &&
          "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
        variant === "secondary" &&
          "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        variant === "outline" &&
          "border border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
        className
      )}
    >
      {children}
    </span>
  );
}
