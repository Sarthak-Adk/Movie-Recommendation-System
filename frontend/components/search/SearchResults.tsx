"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Movie } from "@/types/movie";
import { getPosterUrl } from "@/utils/image";
import { formatRating, getYear } from "@/utils/format";

interface SearchResultsProps {
  query: string;
  movies: Movie[];
  loading: boolean;
  error?: string;
}

export default function SearchResults({
  query,
  movies,
  loading,
  error,
}: SearchResultsProps) {
  if (!query.trim()) {
    return null;
  }

  if (loading) {
    return (
      <div className="mx-auto mt-4 max-w-3xl px-4 sm:px-6">
        <p className="text-sm text-zinc-400">Searching...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-4 max-w-3xl px-4 sm:px-6">
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="mx-auto mt-4 max-w-3xl px-4 sm:px-6">
        <p className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-400">
          No movies found
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-4 max-w-3xl px-4 sm:px-6">
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-xl backdrop-blur-sm">
        <ul className="max-h-96 divide-y divide-zinc-800 overflow-y-auto">
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-4 px-4 py-3 transition hover:bg-zinc-800/80"
              >
                <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">
                    {movie.title}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      {formatRating(movie.vote_average)}
                    </span>
                    <span>{getYear(movie.release_date)}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
