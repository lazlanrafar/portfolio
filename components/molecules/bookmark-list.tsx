"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Bookmark {
  title: string;
  href: string;
  description: string;
}

export function BookmarkList({ items }: { items: Bookmark[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="w-full space-y-4">
      <div className="group/book relative min-h-[160px] space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-2"
          >
            {paginatedItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to ${item.title}`}
                className="group/mark text-foreground group-hover/book:text-muted-foreground flex w-fit items-start gap-x-3 py-1 transition-colors hover:text-foreground!"
              >
                <ArrowRight className="mt-[5px] size-3 shrink-0 transition-transform group-hover/mark:translate-x-0.5" />
                <div className="space-y-0.5">
                  <p className="anim w-full pr-5 text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="absolute top-0 right-0 flex items-center gap-x-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 0}
              aria-label="Previous page"
              className={cn(
                "anim bg-muted flex size-7 items-center justify-center transition-opacity",
                currentPage === 0 ? "opacity-20" : "opacity-100"
              )}
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages - 1}
              aria-label="Next page"
              className={cn(
                "anim bg-muted flex size-7 items-center justify-center transition-opacity",
                currentPage === totalPages - 1 ? "opacity-20" : "opacity-100"
              )}
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
