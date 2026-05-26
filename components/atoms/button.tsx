import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
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
      )}
      {...props}
    >
      {children}
    </button>
  );
}
