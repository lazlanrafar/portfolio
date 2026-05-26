import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <div className="w-full space-y-4">
      <div className="flex h-8 w-full items-center">
        <h2 className="text-foreground text-sm font-bold uppercase leading-none">
          Skills
        </h2>
      </div>

      <div className="flex w-full flex-col gap-2">
        {skillCategories.map((category) => (
          <div key={category.name} className="flex w-full items-start gap-4 text-sm">
            <p className="text-muted-foreground w-20 shrink-0 font-medium">
              {category.name}
            </p>
            <p className="text-muted-foreground">
              {category.skills.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
