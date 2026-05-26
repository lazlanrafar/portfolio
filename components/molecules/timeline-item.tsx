import { cn } from "@/lib/utils";

interface TimelineItemProps {
  period: string;
  role: string;
  company: string;
  description: string;
  current?: boolean;
  isLast?: boolean;
  className?: string;
}

export function TimelineItem({
  period,
  role,
  company,
  description,
  current,
  isLast,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn("relative flex gap-5", className)}>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "mt-1.5 h-2.5 w-2.5 shrink-0 ring-2 ring-white dark:ring-zinc-950",
            current
              ? "bg-zinc-900 dark:bg-zinc-50"
              : "bg-zinc-300 dark:bg-zinc-600"
          )}
        />
        {!isLast && (
          <div className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        )}
      </div>
      <div className={cn("pb-8", isLast && "pb-0")}>
        <p className="mb-0.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
          {period}
        </p>
        <p className="font-semibold text-zinc-900 dark:text-zinc-50">{role}</p>
        <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">{company}</p>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}
