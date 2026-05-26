import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external,
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none",
    variant === "primary" &&
      "bg-foreground text-background hover:bg-foreground/90",
    variant === "secondary" &&
      "bg-accent text-accent-foreground hover:bg-accent/80",
    variant === "ghost" &&
      "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    size === "sm" && "h-8 gap-1.5 px-3 text-xs",
    size === "md" && "h-10 gap-2 px-4 text-sm",
    size === "lg" && "h-12 gap-2 px-6 text-base",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
