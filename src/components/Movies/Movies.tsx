import "./styles.css";
import { useLoaderData } from "react-router-dom";

import { apiClient } from "../../api/apiClient";
import { MovieCard } from "../MovieCard/MovieCard";

function Movies() {
  const movies = useLoaderData();
  console.log("MOVIES");
  console.log(movies);
  return (
    <div className="movies-section bg-gray-100">
      <div className="movie-grid">
        {movies &&
          movies.map((movie: any) => {
            console.log("movie genre");
            console.log(movie.genres);

            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                duration_in_minutes={movie.durationInMinutes}
                name={movie.name}
                release_date={movie.releaseDate}
                thumbnail={movie.thumbnailUrl}
                genres={movie.genres}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Movies;

export async function moviesLoader() {
  try {
    const response = await apiClient.get("/movies"); // Axios GET Request
    return response.data;
  } catch (error: any) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch products. Please try again.",
      { status: error.status || 500 },
    );
  }
}
