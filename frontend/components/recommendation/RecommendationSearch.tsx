"use client";

import { Search, X } from "lucide-react";

import { ModelMovie } from "@/types/movie";

interface RecommendationSearchProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: ModelMovie[];
  loading: boolean;
  showSuggestions: boolean;
  onSelect: (title: string) => void;
  onSubmit: () => void;
}

export default function RecommendationSearch({
  value,
  onChange,
  suggestions,
  loading,
  showSuggestions,
  onSelect,
  onSubmit,
}: RecommendationSearchProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
      <div className="flex items-center rounded-full border border-zinc-800 bg-zinc-900/80 px-5 py-3 shadow-lg backdrop-blur-sm">
        <Search className="mr-3 shrink-0 text-zinc-400" size={20} />

        <input
          type="text"
          placeholder="Search a movie and press Enter..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="ml-2 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showSuggestions && value.trim().length > 0 && (
        <div className="absolute left-4 right-4 top-full z-20 mt-2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/95 shadow-xl backdrop-blur-sm sm:left-6 sm:right-6">
          {loading && (
            <p className="px-4 py-3 text-sm text-zinc-400">Searching...</p>
          )}

          {!loading && suggestions.length === 0 && (
            <p className="px-4 py-3 text-sm text-zinc-400">No movies found</p>
          )}

          {!loading && suggestions.length > 0 && (
            <ul className="max-h-64 divide-y divide-zinc-800 overflow-y-auto">
              {suggestions.map((movie) => (
                <li key={movie.movie_id}>
                  <button
                    type="button"
                    onClick={() => onSelect(movie.title)}
                    className="w-full px-4 py-3 text-left text-sm text-white transition hover:bg-zinc-800"
                  >
                    {movie.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
