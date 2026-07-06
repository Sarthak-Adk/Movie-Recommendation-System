from fastapi import APIRouter, Query

from app.services.tmdb import (
    get_movie_details,
    get_now_playing_movies,
    get_popular_movies,
    get_top_rated_movies,
    get_upcoming_movies,
    search_movies,
)

router = APIRouter(
    prefix="/tmdb",
    tags=["TMDB"],
)


@router.get("/popular")
def popular(page: int = Query(1, ge=1)):
    return get_popular_movies(page)


@router.get("/top-rated")
def top_rated(page: int = Query(1, ge=1)):
    return get_top_rated_movies(page)


@router.get("/now-playing")
def now_playing(page: int = Query(1, ge=1)):
    return get_now_playing_movies(page)


@router.get("/upcoming")
def upcoming(page: int = Query(1, ge=1)):
    return get_upcoming_movies(page)


@router.get("/search")
def search(
    query: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
):
    return search_movies(query, page)


@router.get("/movie/{movie_id}")
def movie(movie_id: int):
    return get_movie_details(movie_id)
