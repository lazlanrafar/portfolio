import { FadeIn } from "@/components/atoms/fade-in";
import { GridPattern } from "@/components/atoms/grid-pattern";
import { AnimatedName } from "@/components/molecules/animated-name";
import HomeAboutMe from "@/components/organisms/home-about-me";
import { siteConfig } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | " + siteConfig.name,
  description: siteConfig.description,
};

export default function Home() {
  return (
    <>
      <section className="h-full flex items-center justify-center">
        <FadeIn>
          <div className="space-y-4 text-center">
            <header className="relative">
              <p className="text-lg">Hi all. I am</p>
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
      </section>

      <HomeAboutMe />

      {/* <div className="h-[2000px]"></div>
      <div className="h-[2000px]"></div>
      <div className="h-[2000px]"></div>
      <div className="h-[2000px]"></div> */}
    </>
  );
}
