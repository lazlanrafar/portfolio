"use client";

import { cn } from "@/lib/utils";
import { splitAround } from "@/lib/i18n";

function ProcessStep({
  name,
  description,
  index,
  isLast,
}: {
  name: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  return (
    <div className="relative grid grid-cols-6 gap-x-6 sm:grid-cols-8">
      <div className="flex flex-col items-center">
        <div className="bg-muted text-foreground z-10 flex size-6 shrink-0 items-center justify-center">
          <span className="text-xs font-semibold">{index + 1}</span>
        </div>
        {!isLast && (
          <div className="border-muted-foreground/30 mt-1 w-0 flex-1 border-r-2 border-dashed" />
        )}
      </div>

      <div
        className={cn(
          "col-span-5 flex flex-col gap-y-1 sm:col-span-7 sm:gap-y-2",
          !isLast && "pb-6",
        )}
      >
        <h3 className="text-foreground text-sm font-semibold">{name}</h3>
        <p className="text-muted-foreground text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ProcessSection({
  items,
  title,
  intro,
}: {
  items: { name: string; description: string }[];
  title: string;
  /** The intro with a {method} placeholder for the highlighted method name. */
  intro: string;
}) {
  const [before, after] = splitAround(intro, "method");
  return (
    <div className="w-full space-y-4">
      <div className="w-full space-y-1">
        <div className="flex h-8 w-full items-center">
          <h2 className="text-foreground text-sm font-bold uppercase leading-none">
            {title}
          </h2>
        </div>
        <p className="text-muted-foreground text-sm md:text-base">
          {before}
          <span className="text-foreground font-medium">4D</span>
          {after}
        </p>
      </div>

      <div className="flex w-full flex-col">
        {items.map((item, index) => (
          <ProcessStep
            key={index}
            {...item}
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
