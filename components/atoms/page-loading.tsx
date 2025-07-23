import { Loader2 } from "lucide-react";

interface PageLoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const PageLoading = ({ size = "md", text }: PageLoadingProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <Loader2
          className={`${sizeClasses[size]} animate-spin text-muted-foreground`}
        />
        {/* Pulsing background effect */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} bg-muted-foreground/20 rounded-full animate-ping`}
        />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
};
