from fastapi import APIRouter, HTTPException, Query

from app.schemas.movie_schema import MovieRequest
from app.services.recommend import (
    get_all_movies,
    recommend,
    search_model_movies,
)

router = APIRouter(tags=["Recommendations"])


@router.get("/movies")
def all_movies():
    return {"movies": get_all_movies()}


@router.get("/movies/search")
def search_movies(
    q: str = Query(..., min_length=1),
    limit: int = Query(20, ge=1, le=50),
):
    return {"movies": search_model_movies(q, limit)}


@router.post("/recommend")
def recommend_movies(data: MovieRequest):
    try:
        recommendations = recommend(data.movie_name)
        return {
            "movie_name": data.movie_name,
            "recommendations": recommendations,
        }
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
