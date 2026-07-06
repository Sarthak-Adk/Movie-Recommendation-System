"use client";

import { api } from "@/services/api";

import { usePaginatedMovies } from "./usePaginatedMovies";

export function useUpcomingMovies() {
  return usePaginatedMovies(api.upcoming);
}
