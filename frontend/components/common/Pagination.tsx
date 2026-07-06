"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPrevious: () => void;
  onNext: () => void;
  loading?: boolean;
}

export default function Pagination({
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPrevious,
  onNext,
  loading = false,
}: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPreviousPage || loading}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:border-yellow-400 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <span className="text-sm text-zinc-400">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasNextPage || loading}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:border-yellow-400 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
