"use client";

import { useEffect, useState } from "react";

import { api } from "@/services/api";
import { MovieDetails } from "@/types/movie";

export function useMovieDetails(id: number) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadMovie() {
      setLoading(true);
      setError("");

      try {
        const data = await api.movie(id);
        setMovie(data);
      } catch {
        setError("Failed to load movie details");
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  return {
    movie,
    loading,
    error,
  };
}
