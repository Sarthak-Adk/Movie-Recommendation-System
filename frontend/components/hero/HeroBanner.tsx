"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Movie } from "@/types/movie";
import { getBackdropUrl } from "@/utils/image";
import { formatRating, getYear } from "@/utils/format";

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[70vh]">
      <Image
        src={getBackdropUrl(movie.backdrop_path)}
        alt={movie.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 pt-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-3 max-w-3xl text-3xl font-bold text-white sm:text-5xl lg:text-6xl">
            {movie.title}
          </h1>

          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-zinc-300 sm:text-base">
            <span className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              {formatRating(movie.vote_average)}
            </span>
            {movie.release_date && (
              <span>{getYear(movie.release_date)}</span>
            )}
          </div>

          <p className="mb-6 max-w-2xl line-clamp-3 text-sm text-zinc-300 sm:line-clamp-4 sm:text-lg">
            {movie.overview}
          </p>

          <Link
            href={`/movie/${movie.id}`}
            className="inline-flex rounded-lg bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300 sm:text-base"
          >
            View Details
          </Link>
        </div>
      </div>
    </section>
  );
}
