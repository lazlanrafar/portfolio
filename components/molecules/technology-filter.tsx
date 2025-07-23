"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icons } from "../atoms/icons";
import { Button } from "../atoms/button";

interface Technology {
  name: string;
  count: number;
}

interface TechnologyFilterProps {
  technologies: Technology[];
}

export default function TechnologyFilter({
  technologies,
}: TechnologyFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  // Initialize and sync selected technologies from URL params
  useEffect(() => {
    const techParam = searchParams.get("technologies");
    if (techParam) {
      setSelectedTechnologies(techParam.split(","));
    } else {
      // Clear selections when the URL parameter is removed
      setSelectedTechnologies([]);
    }
  }, [searchParams]);

  const updateURL = (newTechnologies: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (newTechnologies.length > 0) {
      params.set("technologies", newTechnologies.join(","));
    } else {
      params.delete("technologies");
    }

    // Reset to first page when filtering
    params.delete("page");

    router.push(`/projects?${params.toString()}`);
  };

  const toggleTechnology = (techName: string) => {
    const newSelected = selectedTechnologies.includes(techName)
      ? selectedTechnologies.filter((t) => t !== techName)
      : [...selectedTechnologies, techName];

    setSelectedTechnologies(newSelected);
    updateURL(newSelected);
  };

  const clearFilters = () => {
    setSelectedTechnologies([]);
    updateURL([]);
  };

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-8 text-xs"
      >
        <Icons.filter className="w-3.5 h-3.5" />
        <span>Technologies</span>
        {selectedTechnologies.length > 0 && (
          <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full ml-1">
            {selectedTechnologies.length}
          </span>
        )}
        <Icons.chevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Filter Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-lg shadow-lg z-10 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">
              Filter by Technologies
            </h3>
            {selectedTechnologies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            )}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {technologies.map((tech) => (
              <label
                key={tech.name}
                className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedTechnologies.includes(tech.name)}
                  onChange={() => toggleTechnology(tech.name)}
                  className="w-3.5 h-3.5 rounded border-border"
                />
                <span className="flex-1 text-foreground">{tech.name}</span>
                {tech.count > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({tech.count})
                  </span>
                )}
              </label>
            ))}
          </div>

          {selectedTechnologies.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Selected:</p>
              <div className="flex flex-wrap gap-1">
                {selectedTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {tech}
                    <button
                      onClick={() => toggleTechnology(tech)}
                      className="text-primary/70 hover:text-primary"
                    >
                      <Icons.x className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
