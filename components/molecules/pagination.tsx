"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function Pagination({
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log({
    page,
    pageSize,
    totalPages,
    pathname,
    searchParams: Object.fromEntries(searchParams.entries()),
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;

      // Update query params
      const queryString = createQueryString("page", newPage.toString());
      router.push(`${pathname}?${queryString}`);

      // Call external handler if provided
      onPageChange?.(newPage);
    },
    [createQueryString, onPageChange, pathname, router, totalPages]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      // Reset to page 1 when changing page size
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      params.set("pageSize", newPageSize.toString());

      router.push(`${pathname}?${params.toString()}`);

      // Call external handler if provided
      onPageSizeChange?.(newPageSize);
    },
    [onPageSizeChange, pathname, router, searchParams]
  );

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              className="text-xs"
              isActive={page === i}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show pages with ellipsis
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={page === 1}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and neighbors
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={page === i}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      if (totalPages > 1) {
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              isActive={page === totalPages}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <PaginationWrapper>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="text-xs"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page - 1);
              }}
              style={{
                opacity: page <= 1 ? 0.5 : 1,
                pointerEvents: page <= 1 ? "none" : "auto",
              }}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href="#"
              className="text-xs"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page + 1);
              }}
              style={{
                opacity: page >= totalPages ? 0.5 : 1,
                pointerEvents: page >= totalPages ? "none" : "auto",
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationWrapper>

      {/* Page Size Selector */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Items per page:</span>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="rounded border border-input bg-background px-2 py-1 text-xs"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}
