import { siteConfig } from "@/constants";
import { FadeIn } from "../atoms/fade-in";
import { AnimatedName } from "../molecules/animated-name";

export default function HomeWelcome() {
  return (
    <section className="flex flex-col w-full h-full px-10 py-20">
      <div className="flex-1 flex items-center justify-between">
        <div className="text-xs md:text-sm ">2003</div>
        <div className="text-xs md:text-sm hidden md:block">12.5</div>
        <FadeIn>
          <div className="space-y-4 text-center">
            <svg
              data-name="Calque 1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 99.81 93.24"
              width={24}
              height={24}
              color="currentColor"
              className="mx-auto animate-pulse"
            >
              <path
                d="M.1,60.51V13.56H11.26V3.38h22V13.69H44.48V29.18H55.57V13.69H66.74V3.38h22V13.56H99.9V60.51H88.77V70.75h-11V81.16H61.16V96.62H38.84V81H22.23V70.69H11.17V60.51Z"
                transform="translate(-0.1 -3.38)"
                fill="currentColor"
              />
            </svg>

            <header className="relative">
              <p className="text-lg uppercase">Hi all. I am</p>
              <AnimatedName />
              <h2 className="text-muted-foreground text-base sm:text-xl md:text-2xl">
                <span className="animate-pulse">&gt; </span>
                Software developer
              </h2>

              <div className="absolute w-full h-1/2 bg-muted-foreground/10 blur-2xl top-0 left-0 -z-10 rounded-full animate-pulse" />
            </header>

            <div className="space-y-2 sm:text-sm text-xs">
              <p className="text-muted-foreground">{`// you can also see it on my Github page`}</p>
              <p className="text-muted-foreground">
                <span className=" italic">const</span>{" "}
                <span className="">githubLink</span> ={" "}
                <a
                  target="_blank"
                  href={siteConfig.links.github}
                  className=" hover:underline hover:text-foreground transition-colors"
                >
                  &apos;{siteConfig.links.github}&apos;
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
        <div className="text-xs md:text-sm hidden md:block">FREE</div>
        <div className="text-xs md:text-sm ">{new Date().getFullYear()}</div>
      </div>

      <div>
        <ul className="flex justify-between md:justify-start gap-8">
          <li>
            <a
              className="text-sm hover:underline"
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              className="text-sm hover:underline"
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              className="text-sm hover:underline"
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
