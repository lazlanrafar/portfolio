import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

export async function Skills({ lang }: { lang: Locale }) {
  const { skillCategories } = await getProfile(lang);
  const title = getDictionary(lang).home.skills;
  return (
    <div className="w-full space-y-4">
      <div className="flex h-8 w-full items-center">
        <h2 className="text-foreground text-sm font-bold uppercase leading-none">
          {title}
        </h2>
      </div>

      {/* The label column fits the longest category name in any language. */}
      <dl className="grid w-full grid-cols-[minmax(5rem,max-content)_1fr] gap-x-4 gap-y-2 text-sm">
        {skillCategories.map((category) => (
          <div key={category.name} className="contents">
            <dt className="text-muted-foreground font-medium">
              {category.name}
            </dt>
            <dd className="text-muted-foreground">
              {category.skills.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
