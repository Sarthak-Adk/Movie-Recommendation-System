"use client";

import { ModelMovie } from "@/types/movie";

interface RecommendationSearchResultsProps {
  query: string;
  movies: ModelMovie[];
  loading: boolean;
  error?: string;
  selectedTitle?: string;
  onSelect: (title: string) => void;
}

export default function RecommendationSearchResults({
  query,
  movies,
  loading,
  error,
  selectedTitle,
  onSelect,
}: RecommendationSearchResultsProps) {
  if (!query.trim()) {
    return null;
  }

  if (loading) {
    return (
      <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
        <p className="text-sm text-zinc-400">Searching...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
        <p className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-400">
          No movies found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
      <h2 className="mb-3 text-lg font-semibold text-white">
        Search Results
        <span className="ml-2 text-sm font-normal text-zinc-400">
          ({movies.length} found)
        </span>
      </h2>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-xl">
        <ul className="max-h-80 divide-y divide-zinc-800 overflow-y-auto">
          {movies.map((movie) => (
            <li key={movie.movie_id}>
              <button
                type="button"
                onClick={() => onSelect(movie.title)}
                className={`w-full px-4 py-3 text-left text-sm transition hover:bg-zinc-800 ${
                  selectedTitle === movie.title
                    ? "bg-yellow-400/10 text-yellow-400"
                    : "text-white"
                }`}
              >
                {movie.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
