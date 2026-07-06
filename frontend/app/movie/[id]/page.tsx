"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Star,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { getBackdropUrl, getPosterUrl } from "@/utils/image";
import { formatRating } from "@/utils/format";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = use(params);
  const movieId = Number(id);
  const { movie, loading, error } = useMovieDetails(movieId);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-yellow-400"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {loading && <LoadingSkeleton />}

        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && movie && (
          <>
            <section className="relative mb-8 h-56 overflow-hidden rounded-2xl sm:h-72 lg:h-96">
              <Image
                src={getBackdropUrl(movie.backdrop_path)}
                alt={movie.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </section>

            <section className="flex flex-col gap-8 lg:flex-row">
              <div className="relative mx-auto h-80 w-56 shrink-0 overflow-hidden rounded-xl shadow-2xl sm:h-96 sm:w-64 lg:mx-0">
                <Image
                  src={getPosterUrl(movie.poster_path)}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 224px, 256px"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="mt-2 text-lg italic text-zinc-400">
                    {movie.tagline}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
                  <span className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {formatRating(movie.vote_average)}
                  </span>

                  {movie.runtime && (
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {movie.runtime} min
                    </span>
                  )}

                  {movie.release_date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {movie.release_date}
                    </span>
                  )}
                </div>

                {movie.genres.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6">
                  <h2 className="mb-2 text-lg font-semibold">Overview</h2>
                  <p className="leading-relaxed text-zinc-300">
                    {movie.overview || "No overview available."}
                  </p>
                </div>

                {movie.production_companies.length > 0 && (
                  <div className="mt-6">
                    <h2 className="mb-2 text-lg font-semibold">
                      Production Companies
                    </h2>
                    <p className="text-zinc-300">
                      {movie.production_companies
                        .map((company) => company.name)
                        .join(", ")}
                    </p>
                  </div>
                )}

                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-yellow-400 transition hover:text-yellow-300"
                  >
                    <ExternalLink size={16} />
                    Official Homepage
                  </a>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
