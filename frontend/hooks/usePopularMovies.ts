"use client";

import { api } from "@/services/api";

import { usePaginatedMovies } from "./usePaginatedMovies";

export function usePopularMovies() {
  return usePaginatedMovies(api.popular);
}
