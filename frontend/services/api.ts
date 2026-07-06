import {
  ModelMovie,
  Movie,
  MovieDetails,
  PaginatedResponse,
  RecommendResponse,
} from "@/types/movie";

const BASE_URL = "http://127.0.0.1:8000";

async function get<T>(url: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.detail ?? "Failed to fetch data from the server",
    );
  }

  return response.json();
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.detail ?? "Failed to fetch data from the server",
    );
  }

  return response.json();
}

export const api = {
  popular: (page = 1) =>
    get<PaginatedResponse<Movie>>(`/tmdb/popular?page=${page}`),

  topRated: (page = 1) =>
    get<PaginatedResponse<Movie>>(`/tmdb/top-rated?page=${page}`),

  upcoming: (page = 1) =>
    get<PaginatedResponse<Movie>>(`/tmdb/upcoming?page=${page}`),

  nowPlaying: (page = 1) =>
    get<PaginatedResponse<Movie>>(`/tmdb/now-playing?page=${page}`),

  search: (query: string, page = 1) =>
    get<PaginatedResponse<Movie>>(
      `/tmdb/search?query=${encodeURIComponent(query)}&page=${page}`,
    ),

  movie: (id: number) => get<MovieDetails>(`/tmdb/movie/${id}`),

  searchModelMovies: (query: string, limit = 20) =>
    get<{ movies: ModelMovie[] }>(
      `/movies/search?q=${encodeURIComponent(query)}&limit=${limit}`,
    ),

  recommend: (movieName: string) =>
    post<RecommendResponse>("/recommend", { movie_name: movieName }),
};
