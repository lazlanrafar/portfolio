"use client";

import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeWrapper({ children, ...props }: ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
