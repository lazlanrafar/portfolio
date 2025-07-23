"use client";

import { useRouter } from "next/navigation";
import { Button } from "../atoms/button";
import { Icons } from "../atoms/icons";

interface ClearFiltersButtonProps {
  hasActiveFilters: boolean;
  pageSize?: string;
}

export default function ClearFiltersButton({
  hasActiveFilters,
  pageSize,
}: ClearFiltersButtonProps) {
  const router = useRouter();

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (pageSize) {
      params.set("pageSize", pageSize);
    }
    router.push(`/projects?${params.toString()}`);
  };

  if (!hasActiveFilters) return null;

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={clearAllFilters}
      className="h-8 text-xs text-muted-foreground hover:text-foreground border border-dashed bg-transparent"
    >
      <Icons.x className="w-3.5 h-3.5 mr-1" />
      Reset
    </Button>
  );
}
