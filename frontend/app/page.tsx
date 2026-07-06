"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/hero/HeroBanner";
import MovieSection from "@/components/movie/MovieSection";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { useTopRatedMovies } from "@/hooks/useTopRatedMovies";
import { useNowPlayingMovies } from "@/hooks/useNowPlayingMovies";
import { useUpcomingMovies } from "@/hooks/useUpcomingMovies";
import { useSearchMovies } from "@/hooks/useSearchMovies";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const popular = usePopularMovies();
  const topRated = useTopRatedMovies();
  const nowPlaying = useNowPlayingMovies();
  const upcoming = useUpcomingMovies();
  const search = useSearchMovies(searchQuery);

  const heroMovie = popular.movies[0];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {heroMovie && !popular.loading && (
        <HeroBanner movie={heroMovie} />
      )}

      <div className="relative z-10 -mt-8 space-y-2 pb-12 sm:-mt-12">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SearchResults
          query={searchQuery}
          movies={search.movies}
          loading={search.loading}
          error={search.error}
        />
      </div>

      <MovieSection
        title="Popular Movies"
        subtitle="Trending around the world"
        movies={popular.movies}
        loading={popular.loading}
        error={popular.error}
        page={popular.page}
        totalPages={popular.totalPages}
        hasPreviousPage={popular.hasPreviousPage}
        hasNextPage={popular.hasNextPage}
        onPrevious={popular.goToPreviousPage}
        onNext={popular.goToNextPage}
      />

      <MovieSection
        title="Top Rated Movies"
        subtitle="Highest rated by the community"
        movies={topRated.movies}
        loading={topRated.loading}
        error={topRated.error}
        page={topRated.page}
        totalPages={topRated.totalPages}
        hasPreviousPage={topRated.hasPreviousPage}
        hasNextPage={topRated.hasNextPage}
        onPrevious={topRated.goToPreviousPage}
        onNext={topRated.goToNextPage}
      />

      <MovieSection
        title="Now Playing"
        subtitle="Currently in theaters"
        movies={nowPlaying.movies}
        loading={nowPlaying.loading}
        error={nowPlaying.error}
        page={nowPlaying.page}
        totalPages={nowPlaying.totalPages}
        hasPreviousPage={nowPlaying.hasPreviousPage}
        hasNextPage={nowPlaying.hasNextPage}
        onPrevious={nowPlaying.goToPreviousPage}
        onNext={nowPlaying.goToNextPage}
      />

      <MovieSection
        title="Upcoming Movies"
        subtitle="Coming soon to theaters"
        movies={upcoming.movies}
        loading={upcoming.loading}
        error={upcoming.error}
        page={upcoming.page}
        totalPages={upcoming.totalPages}
        hasPreviousPage={upcoming.hasPreviousPage}
        hasNextPage={upcoming.hasNextPage}
        onPrevious={upcoming.goToPreviousPage}
        onNext={upcoming.goToNextPage}
      />
    </main>
  );
}
