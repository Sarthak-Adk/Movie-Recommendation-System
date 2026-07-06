"use client";

import { useCallback, useEffect, useState } from "react";

import { api } from "@/services/api";
import { ModelMovie } from "@/types/movie";

export function useSearchModelMovies(query: string) {
  const [movies, setMovies] = useState<ModelMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async (searchQuery: string, limit = 10) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return [];
    }

    setLoading(true);
    setError("");

    try {
      const data = await api.searchModelMovies(searchQuery, limit);
      setMovies(data.movies);
      return data.movies;
    } catch {
      setError("Failed to search movies");
      setMovies([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setLoading(false);
      setError("");
      return;
    }

    const timer = setTimeout(() => {
      fetchMovies(query, 10);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, fetchMovies]);

  const searchNow = useCallback(
    (searchQuery: string) => fetchMovies(searchQuery, 20),
    [fetchMovies],
  );

  return {
    movies,
    loading,
    error,
    searchNow,
  };
}
