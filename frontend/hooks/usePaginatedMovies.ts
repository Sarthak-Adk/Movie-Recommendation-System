"use client";

import { useCallback, useEffect, useState } from "react";

import { api } from "@/services/api";
import { Movie, PaginatedResponse } from "@/types/movie";

type Fetcher = (page: number) => Promise<PaginatedResponse<Movie>>;

export function usePaginatedMovies(fetcher: Fetcher) {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMovies = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      setError("");

      try {
        const data = await fetcher(pageNum);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch {
        setError("Failed to load movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [fetcher],
  );

  useEffect(() => {
    loadMovies(page);
  }, [page, loadMovies]);

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage((current) => current + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((current) => current - 1);
    }
  };

  return {
    movies,
    page,
    totalPages,
    loading,
    error,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
