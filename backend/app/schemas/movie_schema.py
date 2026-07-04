from pydantic import BaseModel


class MovieRequest(BaseModel):
    movie_name: str