"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/atoms/dropdown-menu";
import { Badge } from "@/components/atoms/badge";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterOption {
  name: string;
  count: number;
}

interface UnifiedFilterProps {
  technologies: FilterOption[];
  categories: FilterOption[];
  platforms: FilterOption[];
  types: FilterOption[];
  selectedTechnologies: string[];
  selectedCategories: string[];
  selectedPlatforms: string[];
  selectedTypes: string[];
}

export default function UnifiedFilter({
  technologies,
  categories,
  platforms,
  types,
  selectedTechnologies,
  selectedCategories,
  selectedPlatforms,
  selectedTypes,
}: UnifiedFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const totalActiveFilters =
    selectedTechnologies.length +
    selectedCategories.length +
    selectedPlatforms.length +
    selectedTypes.length;

  const handleFilterChange = (
    filterType: "technologies" | "categories" | "platforms" | "types",
    value: string,
    isChecked: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    // Get current values for the filter type
    const currentValues =
      params.get(filterType)?.split(",").filter(Boolean) || [];

    let newValues: string[];
    if (isChecked) {
      // Add the value if it's not already present
      newValues = currentValues.includes(value)
        ? currentValues
        : [...currentValues, value];
    } else {
      // Remove the value
      newValues = currentValues.filter((v) => v !== value);
    }

    // Update the URL parameters
    if (newValues.length > 0) {
      params.set(filterType, newValues.join(","));
    } else {
      params.delete(filterType);
    }

    // Reset to page 1 when filters change
    params.delete("page");

    router.push(`/projects?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("technologies");
    params.delete("categories");
    params.delete("platforms");
    params.delete("types");
    params.delete("page");

    router.push(`/projects?${params.toString()}`);
    setIsOpen(false);
  };

  const FilterSection = ({
    title,
    options,
    selectedValues,
    filterKey,
  }: {
    title: string;
    options: FilterOption[];
    selectedValues: string[];
    filterKey: "technologies" | "categories" | "platforms" | "types";
  }) => (
    <div className="px-3 py-2 min-h-0 flex flex-col">
      <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-0 pb-2 shrink-0">
        {title}
      </DropdownMenuLabel>
      <div className="space-y-1 overflow-y-auto max-h-64 scrollbar-thin">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.name);
          return (
            <label
              key={option.name}
              className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 rounded p-1 transition-colors"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) =>
                  handleFilterChange(filterKey, option.name, e.target.checked)
                }
                className="rounded border border-input bg-background shrink-0"
              />
              <span className="text-sm flex-1 truncate">{option.name}</span>
              {option.count > 0 && (
                <Badge variant="secondary" className="text-xs shrink-0">
                  {option.count}
                </Badge>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 relative",
            totalActiveFilters > 0 && "bg-primary/10 border-primary/20"
          )}
        >
          <Filter className="w-4 h-4" />
          Filters
          {totalActiveFilters > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {totalActiveFilters}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[800px] max-h-96 overflow-y-auto"
        align="start"
      >
        <div className="flex items-center justify-between p-3 border-b">
          <span className="font-medium">Filters</span>
          {totalActiveFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-auto p-1 text-xs"
            >
              <X className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Grid Layout for Filter Sections */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x">
          {technologies.length > 0 && (
            <FilterSection
              title="Technologies"
              options={technologies}
              selectedValues={selectedTechnologies}
              filterKey="technologies"
            />
          )}

          {categories.length > 0 && (
            <FilterSection
              title="Categories"
              options={categories}
              selectedValues={selectedCategories}
              filterKey="categories"
            />
          )}

          {platforms.length > 0 && (
            <FilterSection
              title="Platforms"
              options={platforms}
              selectedValues={selectedPlatforms}
              filterKey="platforms"
            />
          )}

          {types.length > 0 && (
            <FilterSection
              title="Types"
              options={types}
              selectedValues={selectedTypes}
              filterKey="types"
            />
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
