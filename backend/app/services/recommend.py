from app.models.load_model import movies, similarity


def get_all_movies():
    return movies[["movie_id", "title"]].to_dict(orient="records")


def search_model_movies(query: str, limit: int = 10):
    mask = movies["title"].str.contains(query, case=False, na=False)
    results = movies[mask].head(limit)
    return results[["movie_id", "title"]].to_dict(orient="records")


def recommend(movie_name: str):
    matches = movies[movies["title"] == movie_name]

    if matches.empty:
        raise ValueError(f"Movie '{movie_name}' not found in the dataset")

    movie_index = matches.index[0]
    distances = similarity[movie_index]

    movie_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1],
    )[1:6]

    recommendations = []

    for i in movie_list:
        row = movies.iloc[i[0]]
        recommendations.append(
            {
                "movie_id": int(row["movie_id"]),
                "title": row["title"],
            }
        )

    return recommendations
