"use client";

import { usePathname } from "next/navigation";
import { splitLocale } from "@/lib/i18n";

/** The page's language and its path without the language prefix, from the URL. */
export function useLang() {
  return splitLocale(usePathname());
}
