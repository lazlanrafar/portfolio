import Link from "next/link";
import React from "react";
import navigation from "./sidebar.Constant";

export default function AppSidebar() {
  return (
    <aside className="h-screen w-16 fixed top-0 left-0 flex flex-col items-center justify-between bg-background border-r py-10">
      <div className="">
        <Link href="/">
          <h1 className="font-semibold select-none">La.</h1>
        </Link>
      </div>

      <div className="flex flex-col w-full relative">
        {navigation.map((item) => (
          <div key={item.name} className="h-14 grid place-items-center">
            <item.icon className="w-5 h-5" />
          </div>
        ))}
      </div>
    </aside>
  );
}
