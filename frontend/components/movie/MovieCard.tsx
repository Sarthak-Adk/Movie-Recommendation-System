import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Movie } from "@/types/movie";
import { getPosterUrl } from "@/utils/image";
import { formatRating, getYear } from "@/utils/format";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition duration-300 hover:scale-[1.03] hover:shadow-yellow-400/10"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="truncate text-sm font-semibold text-white sm:text-base">
          {movie.title}
        </h3>

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-400 sm:text-sm">
          <span className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            {formatRating(movie.vote_average)}
          </span>
          <span>{getYear(movie.release_date)}</span>
        </div>
      </div>
    </Link>
  );
}
