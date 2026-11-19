/**
 * Languages of the site. English lives at the root (/about); the others under their code
 * (/id/about, /ja/about). proxy.ts maps the root onto app/[lang] as "en".
 */
export const LOCALES = ["en", "id", "ja"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** The cookie that remembers a visitor's choice from the language menu. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  ja: "日本語",
};

/** For Intl date formatting. */
export const INTL_LOCALE: Record<Locale, string> = {
  en: "en-US",
  id: "id-ID",
  ja: "ja-JP",
};

/** For og:locale. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
  ja: "ja_JP",
};

export const hasLocale = (value: string | undefined): value is Locale =>
  !!value && (LOCALES as readonly string[]).includes(value);

/** A site path in a language: "/about" -> "/about", "/id/about", "/ja/about". */
export function localePath(lang: Locale, path: string): string {
  if (lang === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** The language of a pathname and the path without its prefix. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  const first = pathname.split("/")[1];
  if (hasLocale(first) && first !== DEFAULT_LOCALE) {
    return { lang: first, path: pathname.slice(first.length + 1) || "/" };
  }
  return { lang: DEFAULT_LOCALE, path: pathname };
}

/** "{count} projects" with { count: 3 } -> "3 projects". */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}

/** A template split around one placeholder, so the value can be styled in JSX. */
export function splitAround(template: string, key: string): [string, string] {
  const [before, after = ""] = template.split(`{${key}}`);
  return [before, after];
}
