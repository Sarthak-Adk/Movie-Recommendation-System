import {
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from "@/constants/tmdb";

export const getPosterUrl = (path: string | null) => {
  if (!path)
    return "https://placehold.co/500x750?text=No+Image";

  return `${IMAGE_BASE_URL}/${POSTER_SIZE}${path}`;
};

export const getBackdropUrl = (path: string | null) => {
  if (!path)
    return "https://placehold.co/1280x720?text=No+Image";

  return `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${path}`;
};