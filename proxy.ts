/**
 * Language routing. English is served at the root (/about) by rewriting to app/[lang] as "en";
 * /id/... and /ja/... pass through. /en/... redirects to the root so English has one URL.
 * A visitor who picked another language in the menu (cookie) is sent there from the root;
 * crawlers carry no cookie, so they always get the URL they asked for.
 */
import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  hasLocale,
  localePath,
} from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (hasLocale(first)) return NextResponse.next();

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(saved) && saved !== DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = localePath(saved, pathname);
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: not Next internals, files with an extension, or the root metadata routes.
  matcher: [
    "/((?!_next|api|llms.txt|robots.txt|sitemap.xml|opengraph-image|icons/|.*\\..*).*)",
  ],
};
