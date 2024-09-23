import HomeAboutMe from "@/components/organisms/home-about-me";
import HomeWelcome from "@/components/organisms/home-welcome";

import { siteConfig } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | " + siteConfig.name,
  description: siteConfig.description,
};

export default function Home() {
  return (
    <>
      <HomeWelcome />
      {/* <HomeAboutMe /> */}

      {/* <div className="h-[2000px]"></div>
      <div className="h-[2000px]"></div>
      <div className="h-[2000px]"></div>
      <div className="h-[2000px]"></div> */}
    </>
  );
}
