"use client";

import { Icons } from "../atoms/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    // Add existing search params except page
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (key !== "page" && value) {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else {
            params.append(key, value);
          }
        }
      });
    }

    // Add page param
    if (page > 1) {
      params.append("page", page.toString());
    }

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-12"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <a
        href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
        className={`
          flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors
          ${
            currentPage > 1
              ? "border-border bg-background hover:bg-muted text-foreground hover:border-primary"
              : "border-border bg-muted text-muted-foreground cursor-not-allowed"
          }
        `}
        aria-disabled={currentPage <= 1}
      >
        <Icons.arrowRight className="w-4 h-4 rotate-180" />
        <span className="hidden sm:inline">Previous</span>
      </a>
      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="px-3 py-2 text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <a
              key={pageNum}
              href={createPageUrl(pageNum)}
              className={`
                px-3 py-2 text-sm font-medium rounded-lg border transition-colors
                ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-muted text-foreground hover:border-primary"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </a>
          );
        })}
      </div>
      {/* Next Button */}
      <a
        href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
        className={`
          flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors
          ${
            currentPage < totalPages
              ? "border-border bg-background hover:bg-muted text-foreground hover:border-primary"
              : "border-border bg-muted text-muted-foreground cursor-not-allowed"
          }
        `}
        aria-disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <Icons.arrowRight className="w-4 h-4" />
      </a>
      {/* Page Info */}
      <div className="hidden md:flex items-center gap-2 ml-4 text-sm text-muted-foreground">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </nav>
  );
}
