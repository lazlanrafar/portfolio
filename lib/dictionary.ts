/** UI text per language (dictionaries/*.json); content text comes from KadoCMS. */
import en from "@/dictionaries/en.json";
import id from "@/dictionaries/id.json";
import ja from "@/dictionaries/ja.json";
import { notFound } from "next/navigation";
import { format, hasLocale, type Locale } from "@/lib/i18n";
import type { FilterLabels } from "@/components/organisms/filterable-list";

export type Dictionary = typeof en;

// id and ja must have every key English has: a missing one fails the type check.
const dictionaries: Record<Locale, Dictionary> = { en, id, ja };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

/** The language of a [lang] route; anything else is a 404. */
export async function langFrom(
  params: Promise<{ lang: string }>,
): Promise<Locale> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}

/** The search and filter text for a list of projects or posts. */
export function filterLabels(
  dict: Dictionary,
  kind: "project" | "post",
): FilterLabels {
  const f = dict.filter;
  const noun = kind === "project" ? f.projects : f.posts;
  return {
    search: format(f.search, { noun }),
    clearSearch: f.clearSearch,
    all: f.all,
    more: f.more,
    less: f.less,
    count: f.count,
    countOf: f.countOf,
    noMatch: format(f.noMatch, { noun }),
    clear: f.clear,
    group: f.group,
    noun,
    nounOne: kind === "project" ? f.project : f.post,
  };
}
