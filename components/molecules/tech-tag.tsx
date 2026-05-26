import { cn } from "@/lib/utils";

interface TechTagProps {
  label: string;
  className?: string;
}

export function TechTag({ label, className }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground",
        className
      )}
    >
      {label}
    </span>
  );
}
