import { cn } from "@/lib/utils";

type TextVariant = "default" | "muted" | "small";

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
  as?: React.ElementType;
}

export function Text({ children, variant = "default", className, as: As = "p" }: TextProps) {
  return (
    <As
      className={cn(
        "leading-relaxed",
        variant === "default" && "text-foreground",
        variant === "muted" && "text-muted-foreground",
        variant === "small" && "text-sm text-muted-foreground",
        className
      )}
    >
      {children}
    </As>
  );
}
