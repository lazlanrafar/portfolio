import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-1">
        <h1 className="text-foreground flex items-center gap-1.5 text-base font-semibold leading-none md:text-lg">
          {siteConfig.author.name}
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
          {siteConfig.author.role}
        </p>
      </div>

      <div className="text-muted-foreground text-sm md:text-base">
        <p>
          I&apos;m a full-stack developer from{" "}
          <span className="text-foreground font-medium">
            {siteConfig.author.location}
          </span>
          . {siteConfig.author.bio}
        </p>
      </div>
    </div>
  );
}
