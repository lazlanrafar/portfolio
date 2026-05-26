import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className, as: As = "div" }: ContainerProps) {
  return (
    <As className={cn("mx-auto w-full max-w-3xl px-6", className)}>
      {children}
    </As>
  );
}
