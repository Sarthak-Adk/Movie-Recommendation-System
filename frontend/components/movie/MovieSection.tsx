import { Movie } from "@/types/movie";

import LoadingSkeleton from "../common/LoadingSkeleton";
import Pagination from "../common/Pagination";
import SectionHeader from "../common/SectionHeader";
import MovieGrid from "./MovieGrid";

interface MovieSectionProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  loading: boolean;
  error?: string;
  page: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function MovieSection({
  title,
  subtitle,
  movies,
  loading,
  error,
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPrevious,
  onNext,
}: MovieSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <SectionHeader title={title} subtitle={subtitle} />

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <MovieGrid movies={movies} />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPrevious={onPrevious}
        onNext={onNext}
        loading={loading}
      />
    </section>
  );
}
