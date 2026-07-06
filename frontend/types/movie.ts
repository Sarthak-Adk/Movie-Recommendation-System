export interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Genre[];
  homepage: string;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
}

export interface ModelMovie {
  movie_id: number;
  title: string;
}

export interface RecommendedMovie {
  movie_id: number;
  title: string;
}

export interface RecommendResponse {
  movie_name: string;
  recommendations: RecommendedMovie[];
}
