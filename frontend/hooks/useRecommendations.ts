"use client";

import { useState } from "react";

import { api } from "@/services/api";
import { RecommendedMovie } from "@/types/movie";

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendedMovie[]>(
    [],
  );
  const [selectedMovie, setSelectedMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendations = async (movieName: string) => {
    if (!movieName.trim()) return;

    setLoading(true);
    setError("");
    setSelectedMovie(movieName);
    setRecommendations([]);

    try {
      const data = await api.recommend(movieName);
      setRecommendations(data.recommendations);
    } catch {
      setError("Movie not found or failed to get recommendations");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRecommendations([]);
    setSelectedMovie("");
    setError("");
  };

  return {
    recommendations,
    selectedMovie,
    loading,
    error,
    getRecommendations,
    reset,
  };
}
