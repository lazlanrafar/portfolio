"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { ProjectCard } from "@/components/molecules/project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/microcms";

interface ProjectGridProps {
  projects: Project[];
  skills: string[];
}

export function ProjectGrid({ projects, skills }: ProjectGridProps) {
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const comboRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (comboRef.current && !comboRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = projects.filter((p) => {
    const matchSearch = search
      ? p.title.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchSkill = skill ? p.skills.includes(skill) : true;
    return matchSearch && matchSkill;
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 size-3.5 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="anim border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-foreground/30 w-full border py-2 pl-8 pr-3 text-sm outline-none"
          />
        </div>

        <div ref={comboRef} className="relative sm:w-48">
          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "anim border-border bg-background text-foreground flex w-full items-center justify-between border px-3 py-2 text-sm",
              open && "border-foreground/30"
            )}
          >
            <span className={skill ? "text-foreground" : "text-muted-foreground"}>
              {skill ?? "All skills"}
            </span>
            <ChevronDown
              className={cn(
                "text-muted-foreground anim size-3.5 shrink-0",
                open && "rotate-180"
              )}
            />
          </button>

          {open && (
            <div className="border-border bg-popover dock-shadow absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto border py-1">
              <button
                onClick={() => { setSkill(null); setOpen(false); }}
                className={cn(
                  "anim flex w-full items-center justify-between px-3 py-1.5 text-sm",
                  skill === null
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                All skills
                {skill === null && <Check className="size-3.5 shrink-0" />}
              </button>
              {skills.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSkill(s); setOpen(false); }}
                  className={cn(
                    "anim flex w-full items-center justify-between px-3 py-1.5 text-sm",
                    skill === s
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s}
                  {skill === s && <Check className="size-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground col-span-full py-12 text-center text-sm">
            No projects match your search.
          </p>
        )}
      </div>
    </div>
  );
}
