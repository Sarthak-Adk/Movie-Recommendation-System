# 🎬 Movie Recommendation System

A full-stack Movie Recommendation System that recommends similar movies using **Content-Based Filtering**. The recommendation engine is built with **Python**, **Scikit-learn**, and **FastAPI**, while the frontend is developed using **Next.js**. Movie posters, ratings, release dates, and additional details are fetched from the **TMDB API**.

---

## 🚀 Features

- 🎥 Browse movies by categories
- 🔥 Popular Movies
- ⭐ Top Rated Movies
- 🎬 Upcoming Movies
- 📈 Trending Movies
- 🔍 Search movies by title
- 🤖 Content-Based Movie Recommendations
- 🖼️ Movie posters and details from TMDB API
- 📄 Movie detail page
- 📑 Pagination
- ⚡ FastAPI REST API
- 💻 Responsive Next.js UI

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- TMDB API

## Backend

- Python
- FastAPI
- Pandas
- NumPy
- Scikit-learn
- NLTK
- Joblib
- Uvicorn

## Recommendation Algorithm

- Content-Based Filtering
- CountVectorizer
- Cosine Similarity
- Porter Stemmer

---

# 📂 Project Structure

```
Movie-Recommendation-System/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── dataset/
│   │   ├── raw/
│   │   └── processed/
│   ├── models/
│   │   ├── movies.pkl
│   │   └── similarity.pkl
│   ├── notebooks/
│   └── utils/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── services/
│   ├── public/
│   ├── styles/
│   ├── package.json
│   ├── next.config.ts
│   └── .env.local
│
├── README.md
├── .gitignore
└── LICENSE
```

---

# ⚙️ Backend Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/Movie-Recommendation-System.git

cd Movie-Recommendation-System
```

## Create Virtual Environment

### Linux / macOS

```bash
cd backend

python3 -m venv venv
source venv/bin/activate
```

### Windows

```bash
cd backend

python -m venv venv
venv\Scripts\activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run Backend

```bash
uvicorn app:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Setup

Move into the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

or

```bash
yarn install
```

Create a `.env.local` file.

```env
NEXT_PUBLIC_TMDB_API_KEY=YOUR_TMDB_API_KEY
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

Start the development server.

```bash
npm run dev
```

The frontend runs at:

```
http://localhost:3000
```

---

# 📊 Dataset

This project uses the **TMDB 5000 Movie Dataset** for generating recommendations.

Required files:

```
tmdb_5000_movies.csv

tmdb_5000_credits.csv
```

Place them inside:

```
backend/dataset/raw/
```

---

# 🎬 TMDB API

The frontend uses the TMDB API to display:

- Movie Posters
- Backdrop Images
- Ratings
- Release Dates
- Genres
- Runtime
- Movie Overview
- Search Results
- Popular Movies
- Top Rated Movies
- Trending Movies
- Upcoming Movies

The recommendation engine itself uses the processed TMDB dataset stored locally in the backend.

---

# 🧠 How Recommendation Works

1. Load TMDB movie dataset.
2. Merge movies and credits datasets.
3. Clean missing values.
4. Extract important features:
   - Genres
   - Keywords
   - Cast
   - Crew
   - Overview
5. Apply Porter Stemming.
6. Create a combined feature ("tags").
7. Convert text into vectors using CountVectorizer.
8. Calculate Cosine Similarity.
9. Save processed movies and similarity matrix.
10. FastAPI returns the most similar movies.

---

# 📡 API Endpoints

### Get Recommendations

```
GET /recommend/{movie_name}
```

Example:

```
GET /recommend/Avatar
```

---

### Get All Movies

```
GET /movies
```

---

# 📦 Backend Dependencies

```
fastapi
uvicorn
pandas
numpy
scikit-learn
nltk
joblib
```

Install manually:

```bash
pip install fastapi uvicorn pandas numpy scikit-learn nltk joblib
```

---

# 🚀 Future Improvements

- User Authentication
- Watchlist
- Favorite Movies
- Movie Reviews
- User Ratings
- Hybrid Recommendation System
- Collaborative Filtering
- Deep Learning Recommendations
- Docker Deployment
- Kubernetes Deployment
- CI/CD Pipeline

---

# 📚 Learning Outcomes

This project demonstrates:

- Data Cleaning
- Feature Engineering
- Natural Language Processing
- Porter Stemmer
- CountVectorizer
- Cosine Similarity
- Recommendation Systems
- FastAPI REST API
- Next.js App Router
- TMDB API Integration
- REST API Communication
- Full-Stack Development

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Sarthak Adhikari**

GitHub: https://github.com/Sarthak-Adk

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.
