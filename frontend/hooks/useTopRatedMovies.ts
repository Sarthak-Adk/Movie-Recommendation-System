"use client";

import { api } from "@/services/api";

import { usePaginatedMovies } from "./usePaginatedMovies";

export function useTopRatedMovies() {
  return usePaginatedMovies(api.topRated);
}
