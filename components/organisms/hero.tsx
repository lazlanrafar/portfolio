import { getDictionary } from "@/lib/dictionary";
import { splitAround, type Locale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";

export async function Hero({ lang }: { lang: Locale }) {
  const { name, role, location, bio } = await getProfile(lang);
  const [before, after] = splitAround(
    getDictionary(lang).home.intro,
    "location",
  );
  return (
    <div className="w-full space-y-8">
      <div className="space-y-1">
        <h1 className="text-foreground flex items-center gap-1.5 text-base font-semibold leading-none md:text-lg">
          {name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#1db7f9"
            stroke="hsl(var(--background))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0 md:size-[18px]"
            aria-label="Verified"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </h1>
        <p className="text-muted-foreground text-xs font-medium leading-none md:text-sm">
          {role}
        </p>
      </div>

      <div className="text-muted-foreground text-sm md:text-base">
        <p>
          {before}
          <span className="text-foreground font-medium">{location}</span>
          {after} {bio}
        </p>
      </div>
    </div>
  );
}
