"use client";

import { useEffect, useState } from "react";

import { api } from "@/services/api";
import { Movie } from "@/types/movie";

export function useSearchMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setLoading(false);
      setError("");
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const data = await api.search(query);
        setMovies(data.results);
      } catch {
        setError("Failed to search movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return {
    movies,
    loading,
    error,
  };
}
