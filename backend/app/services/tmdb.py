import os

import requests
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"


def tmdb_get(endpoint: str, **params):
    if not API_KEY:
        raise HTTPException(
            status_code=500,
            detail="TMDB API key is not configured",
        )

    params["api_key"] = API_KEY
    params["language"] = "en-US"

    try:
        response = requests.get(
            f"{BASE_URL}{endpoint}",
            params=params,
            timeout=10,
        )
        response.raise_for_status()
        return response.json()
    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to fetch data from TMDB: {exc}",
        ) from exc


def get_popular_movies(page: int = 1):
    return tmdb_get("/movie/popular", page=page)


def get_top_rated_movies(page: int = 1):
    return tmdb_get("/movie/top_rated", page=page)


def get_now_playing_movies(page: int = 1):
    return tmdb_get("/movie/now_playing", page=page)


def get_upcoming_movies(page: int = 1):
    return tmdb_get("/movie/upcoming", page=page)


def search_movies(query: str, page: int = 1):
    return tmdb_get("/search/movie", query=query, page=page)


def get_movie_details(movie_id: int):
    return tmdb_get(f"/movie/{movie_id}")
