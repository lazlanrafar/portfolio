import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-1">
        <h1 className="text-foreground text-base font-semibold leading-none md:text-lg">
          {siteConfig.author.name}
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
