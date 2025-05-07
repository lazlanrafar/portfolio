import { siteConfig } from "@/constants";
import { FadeIn } from "../atoms/fade-in";
import { AnimatedName } from "../molecules/animated-name";

export default function HomeWelcome() {
  return (
    <section className="flex flex-col w-full h-full px-10 py-10">
      <div className="flex-1 flex items-center justify-around">
        <FadeIn>
          <div className="space-y-4 text-center ">
            <svg
              data-name="Calque 1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 99.81 93.24"
              width={24}
              height={24}
              color="currentColor"
              className="mx-auto text-red-500 animate-pulse"
            >
              <path
                d="M.1,60.51V13.56H11.26V3.38h22V13.69H44.48V29.18H55.57V13.69H66.74V3.38h22V13.56H99.9V60.51H88.77V70.75h-11V81.16H61.16V96.62H38.84V81H22.23V70.69H11.17V60.51Z"
                transform="translate(-0.1 -3.38)"
                fill="currentColor"
              />
            </svg>

            <header className="relative">
              <p className="text-base uppercase">Hi all. I am</p>
              {/* <AnimatedName /> */}
              <code className="block text-[2dvw] leading-[0.9] tracking-[-0.1em] whitespace-pre-wrap lg:text-[1.4dvh]">
                {`
                                                                         
 __       _____ _____ __    _____ _____    _____ _____ _____ _____ _____ 
|  |     |  _  |__   |  |  |  _  |   | |  | __  |  _  |   __|  _  | __  |
|  |__   |     |   __|  |__|     | | | |  |    -|     |   __|     |    -|
|_____|  |__|__|_____|_____|__|__|_|___|  |__|__|__|__|__|  |__|__|__|__|
                                                                         
`}
              </code>
              <br />
              <h2 className="text-muted-foreground text-base sm:text-lg">
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
      </div>

      <div>
        <ul className="flex justify-between md:justify-start gap-8">
          <li>
            <a
              className="text-xs xl:text-sm hover:underline"
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              className="text-xs xl:text-sm hover:underline"
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              className="text-xs xl:text-sm hover:underline"
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
