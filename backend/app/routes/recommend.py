from fastapi import APIRouter, HTTPException
from app.services.recommend import recommend, get_all_movies
from app.schemas.movie_schema import MovieRequest

router = APIRouter()


@router.get("/movies")
def all_movies():
    return {"movies": get_all_movies()}


@router.post("/recommend")
def recommend_movies(data: MovieRequest):
    try:
        recommendations = recommend(data.movie_name)
        return {"recommendations": recommendations}
    except:
        raise HTTPException(status_code=404, detail="Movie not found")