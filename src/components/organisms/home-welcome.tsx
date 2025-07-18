import { memo } from "react";
import { siteConfig } from "@/constants";
import { FadeIn } from "../atoms/fade-in";
import { AnimatedName } from "../molecules/animated-name";
import { Github, Instagram, Linkedin, ExternalLink } from "lucide-react";

// Social links data for better maintainability
const socialLinks = [
  {
    name: "Github",
    href: siteConfig.links.github,
    icon: Github,
    ariaLabel: "Visit my GitHub profile",
  },
  {
    name: "Instagram",
    href: siteConfig.links.instagram,
    icon: Instagram,
    ariaLabel: "Visit my Instagram profile",
  },
  {
    name: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    ariaLabel: "Visit my LinkedIn profile",
  },
] as const;

function HomeWelcome() {
  return (
    <section className="flex flex-col w-full h-full px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="flex-1 flex items-center justify-center">
        <FadeIn>
          <div className="space-y-6 text-center max-w-4xl mx-auto">
            {/* Logo/Icon */}
            <div className="relative">
              <svg
                data-name="Calque 1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 99.81 93.24"
                width={32}
                height={32}
                color="currentColor"
                className="mx-auto text-red-500 animate-pulse gpu-accelerated"
                aria-label="L Azlan Rafar Logo"
              >
                <path
                  d="M.1,60.51V13.56H11.26V3.38h22V13.69H44.48V29.18H55.57V13.69H66.74V3.38h22V13.56H99.9V60.51H88.77V70.75h-11V81.16H61.16V96.62H38.84V81H22.23V70.69H11.17V60.51Z"
                  transform="translate(-0.1 -3.38)"
                  fill="currentColor"
                />
              </svg>
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse -z-10" />
            </div>

            {/* Main Content */}
            <header className="relative space-y-4">
              <p className="text-sm sm:text-base uppercase tracking-wide text-muted-foreground">
                Hi all. I am
              </p>

              {/* ASCII Art - Responsive */}
              <div className="relative overflow-hidden">
                <code className="block text-[clamp(0.3rem,1.5vw,0.8rem)] leading-[0.9] tracking-[-0.05em] whitespace-pre font-mono text-foreground">
                  {`
 __       _____ _____ __    _____ _____    _____ _____ _____ _____ _____ 
|  |     |  _  |__   |  |  |  _  |   | |  | __  |  _  |   __|  _  | __  |
|  |__   |     |   __|  |__|     | | | |  |    -|     |   __|     |    -|
|_____|  |__|__|_____|_____|__|__|_|___|  |__|__|__|__|__|  |__|__|__|__|
                  `}
                </code>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse -z-10" />
              </div>

              {/* Job Title */}
              <h1 className="text-base sm:text-lg lg:text-xl text-muted-foreground">
                <span className="animate-pulse text-primary">&gt; </span>
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Software Developer
                </span>
              </h1>

              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl -z-10 animate-pulse" />
            </header>

            {/* Code Comment Section */}
            <div className="space-y-2 text-xs sm:text-sm font-mono">
              <p className="text-muted-foreground">
                {`// you can also see it on my Github page`}
              </p>
              <p className="text-muted-foreground">
                <span className="text-blue-400 italic">const</span>{" "}
                <span className="text-green-400">githubLink</span> ={" "}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-background rounded"
                  aria-label="Visit my GitHub profile"
                >
                  &apos;{siteConfig.links.github}&apos;
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Social Links Footer */}
      <footer className="mt-8">
        <nav aria-label="Social media links">
          <ul className="flex justify-center gap-6 sm:gap-8">
            {socialLinks.map(({ name, href, icon: Icon, ariaLabel }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-xs sm:text-sm hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md p-1"
                  aria-label={ariaLabel}
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="group-hover:underline">{name}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </section>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(HomeWelcome);
