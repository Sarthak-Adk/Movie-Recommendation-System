"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import RecommendationSearch from "@/components/recommendation/RecommendationSearch";
import RecommendationSearchResults from "@/components/recommendation/RecommendationSearchResults";
import RecommendedMovieCard from "@/components/recommendation/RecommendedMovieCard";
import { useSearchModelMovies } from "@/hooks/useSearchModelMovies";
import { useRecommendations } from "@/hooks/useRecommendations";

function findBestMatch(
  query: string,
  movies: { title: string }[],
) {
  const normalizedQuery = query.trim().toLowerCase();

  return (
    movies.find((movie) => movie.title.toLowerCase() === normalizedQuery) ??
    movies[0]
  );
}

export default function RecommendationsPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const search = useSearchModelMovies(query);
  const {
    recommendations,
    selectedMovie,
    loading,
    error,
    getRecommendations,
    reset,
  } = useRecommendations();

  const handleSelect = async (title: string) => {
    setQuery(title);
    setShowSuggestions(false);

    if (!submittedQuery) {
      setSubmittedQuery(query);
      await search.searchNow(query);
    }

    getRecommendations(title);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(true);

    if (!value.trim()) {
      setSubmittedQuery("");
      reset();
    }
  };

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setShowSuggestions(false);
    setSubmittedQuery(query);

    const results = await search.searchNow(query);

    if (results.length === 0) {
      reset();
      return;
    }

    const bestMatch = findBestMatch(query, results);
    if (bestMatch) {
      setQuery(bestMatch.title);
      setSubmittedQuery(query);
      getRecommendations(bestMatch.title);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-sm text-yellow-400">
            <Sparkles size={16} />
            ML-Powered Recommendations
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Movie Recommendations
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            Search for a movie from our trained dataset and press Enter to see
            matching movies and personalized recommendations.
          </p>
        </div>

        <RecommendationSearch
          value={query}
          onChange={handleQueryChange}
          suggestions={search.movies}
          loading={search.loading}
          showSuggestions={showSuggestions}
          onSelect={handleSelect}
          onSubmit={handleSubmit}
        />

        {submittedQuery && (
          <RecommendationSearchResults
            query={submittedQuery}
            movies={search.movies}
            loading={search.loading}
            error={search.error}
            selectedTitle={selectedMovie}
            onSelect={handleSelect}
          />
        )}

        {error && (
          <p className="mx-auto mt-6 max-w-3xl rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {loading && (
          <div className="mt-10">
            <LoadingSkeleton />
          </div>
        )}

        {!loading && recommendations.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-6 text-2xl font-bold">
              Recommended for{" "}
              <span className="text-yellow-400">{selectedMovie}</span>
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {recommendations.map((movie) => (
                <RecommendedMovieCard key={movie.movie_id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
