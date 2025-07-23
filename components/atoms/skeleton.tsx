import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/50 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

// Preset skeleton components for common use cases
export const TextSkeleton = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
      />
    ))}
  </div>
);

export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("space-y-4 p-4", className)}>
    <Skeleton className="h-48 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export const AvatarSkeleton = ({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return <Skeleton className={cn("rounded-full", sizeClasses[size])} />;
};

export const ButtonSkeleton = ({
  variant = "default",
  size = "default",
}: {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}) => {
  const sizeClasses = {
    sm: "h-8 px-3",
    default: "h-9 px-4",
    lg: "h-10 px-8",
  };

  return (
    <Skeleton
      className={cn(
        "rounded-md",
        sizeClasses[size],
        variant === "outline" && "border",
        variant === "ghost" && "bg-transparent"
      )}
    />
  );
};

export const BadgeSkeleton = ({
  variant = "default",
}: {
  variant?: "default" | "secondary" | "outline";
}) => (
  <Skeleton
    className={cn(
      "h-5 w-16 rounded-full",
      variant === "outline" && "border bg-transparent"
    )}
  />
);

export const InputSkeleton = ({ className }: { className?: string }) => (
  <Skeleton className={cn("h-9 w-full rounded-md", className)} />
);

export const TableSkeleton = ({
  rows = 5,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) => (
  <div className="space-y-3">
    {/* Header */}
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={`header-${i}`} className="h-4 w-20" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={`cell-${rowIndex}-${colIndex}`}
            className="h-4 w-full"
          />
        ))}
      </div>
    ))}
  </div>
);
