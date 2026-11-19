"use client";

import { Suspense, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "@/lib/i18n";

/** Filter UI text; search, noMatch and count templates already carry their noun. */
export interface FilterLabels {
  search: string;
  clearSearch: string;
  all: string;
  /** "+{count} more" */
  more: string;
  less: string;
  /** "{count} {noun}" */
  count: string;
  /** "{shown} of {total} {noun}" */
  countOf: string;
  noMatch: string;
  clear: string;
  group: string;
  noun: string;
  nounOne: string;
}

export interface FilterableItem {
  id: string;
  /** Everything a search should match: title, description, tags. */
  text: string;
  tags: string[];
  /** The item as rendered on the server. */
  node: ReactNode;
}

interface FilterableListProps {
  items: FilterableItem[];
  /** UI text in the page's language (dictionary `filter`, with nouns filled in). */
  labels: FilterLabels;
  /** Classes for the list of matches, e.g. a grid. */
  listClassName?: string;
}

/** Tags shown before "Show all". */
const TAG_LIMIT = 10;

/**
 * Search and a single tag filter over items rendered on the server. The query and tag live in
 * the URL (`?q=`, `?tag=`) so a filtered list can be shared; they change with replaceState,
 * so typing never refetches the page.
 */
export function FilterableList(props: FilterableListProps) {
  // Static pages render the fallback: the same markup with nothing filtered.
  return (
    <Suspense fallback={<FilterableView {...props} query="" tag="" />}>
      <FilterableFromUrl {...props} />
    </Suspense>
  );
}

function FilterableFromUrl(props: FilterableListProps) {
  const params = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => ({
    query: params.get("q") ?? "",
    tag: params.get("tag") ?? "",
  }));

  const onChange = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    const url = new URL(window.location.href);
    for (const [key, value] of [
      ["q", next.query],
      ["tag", next.tag],
    ]) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    window.history.replaceState(null, "", url);
  };

  return <FilterableView {...props} {...filters} onChange={onChange} />;
}

interface Filters {
  query: string;
  tag: string;
}

interface FilterableViewProps extends FilterableListProps, Filters {
  onChange?: (patch: Partial<Filters>) => void;
}

function FilterableView({
  items,
  labels: t,
  listClassName,
  query,
  tag,
  onChange,
}: FilterableViewProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  // Most used first, then by name.
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items)
      for (const t of item.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [items]);

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = items.filter(
    (item) =>
      (!tag || item.tags.includes(tag)) &&
      words.every((w) => item.text.toLowerCase().includes(w)),
  );

  // The active tag stays visible even when it is past the limit.
  const visibleTags =
    showAllTags || tags.length <= TAG_LIMIT
      ? tags
      : [
          ...tags.slice(0, TAG_LIMIT),
          ...(tags.indexOf(tag) >= TAG_LIMIT ? [tag] : []),
        ];
  const filtered = !!query || !!tag;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-3">
        <label className="border-border focus-within:border-foreground/40 anim flex h-9 w-full items-center gap-2 border px-3">
          <Search
            className="text-muted-foreground size-4 shrink-0"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onChange?.({ query: e.target.value })}
            placeholder={t.search}
            aria-label={t.search}
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => onChange?.({ query: "" })}
              aria-label={t.clearSearch}
              className="text-muted-foreground hover:text-foreground anim cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
        </label>

        {tags.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5"
            role="group"
            aria-label={t.group}
          >
            <TagChip
              label={t.all}
              active={!tag}
              onClick={() => onChange?.({ tag: "" })}
            />
            {visibleTags.map((t) => (
              <TagChip
                key={t}
                label={t}
                active={tag === t}
                onClick={() => onChange?.({ tag: tag === t ? "" : t })}
              />
            ))}
            {tags.length > TAG_LIMIT && (
              <button
                type="button"
                onClick={() => setShowAllTags((v) => !v)}
                className="text-muted-foreground hover:text-foreground anim cursor-pointer px-1 text-xs font-medium"
              >
                {showAllTags
                  ? t.less
                  : t.more.replace("{count}", String(tags.length - TAG_LIMIT))}
              </button>
            )}
          </div>
        )}
      </div>

      <p className="text-muted-foreground text-xs" aria-live="polite">
        {format(filtered ? t.countOf : t.count, {
          shown: matches.length,
          total: items.length,
          count: items.length,
          noun: items.length === 1 ? t.nounOne : t.noun,
        })}
      </p>

      {matches.length > 0 ? (
        <div className={listClassName}>
          {matches.map((item) => (
            <div key={item.id} className="contents">
              {item.node}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground space-y-2 py-8 text-center text-sm">
          <p>{t.noMatch}</p>
          <button
            type="button"
            onClick={() => onChange?.({ query: "", tag: "" })}
            className="text-foreground cursor-pointer font-medium underline-offset-2 hover:underline"
          >
            {t.clear}
          </button>
        </div>
      )}
    </div>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "anim h-6 cursor-pointer border px-2 text-xs font-medium",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-muted text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
