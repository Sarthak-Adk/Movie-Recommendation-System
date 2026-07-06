"use client";

import { api } from "@/services/api";

import { usePaginatedMovies } from "./usePaginatedMovies";

export function useNowPlayingMovies() {
  return usePaginatedMovies(api.nowPlaying);
}
