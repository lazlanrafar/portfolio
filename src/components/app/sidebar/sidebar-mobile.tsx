import { NAVIGATION } from "@/constants";
import Link from "next/link";
import React, { Fragment } from "react";

interface AppSidebarMobileProps {
  isOpen: boolean;
  toggleNavbar: () => void;
}

export default function AppSidebarMobile({
  isOpen,
  toggleNavbar,
}: AppSidebarMobileProps) {
  return (
    <div>
      {isOpen && (
        <div className="absolute z-10 left-0 top-[65px] w-full h-[calc(100%-57px-27px)] bg-background p-5 overflow-y-auto">
          {NAVIGATION.map((item) => (
            <Fragment key={item.title}>
              <Link
                href={item.link}
                className="block text-lg py-4 first:pt-0 last:pb-0"
                onClick={toggleNavbar}
              >
                {item.content}
              </Link>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
