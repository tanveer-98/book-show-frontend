import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { apiClient } from "../../api/apiClient";
import "./styles.css";

interface Movie {
  id: number;
  name: string;
  thumbnailUrl: string;
  durationInMinutes: number;
  releaseDate: string;
}

const ShowMovies = () => {
  const movies = useLoaderData() as Movie[];
  const navigate = useNavigate();
  const { cityId } = useParams();

  const handleBookTicket = (showId: number) => {
    console.log("SHOW ID ", showId);
  };

  const handleViewShows = (movieId: number, cityId: number) => {
    navigate(`/movies/${movieId}/shows/${cityId}`);
  };

  return (
    <main className="shows-section">
      <div className="shows-header">
        <p className="shows-eyebrow">Now showing</p>
        <h1>Movies in your City</h1>
        <p>Choose a movie and book your seats.</p>
      </div>

      {movies.length > 0 ? (
        <div className="shows-list">
          {movies &&
            movies.map((movie: Movie) => {
              return (
                <article className="show-card" key={movie.id}>
                  {movie.thumbnailUrl ? (
                    <img
                      src={movie.thumbnailUrl}
                      alt={movie.name}
                      className="show-card__poster"
                    />
                  ) : (
                    <div
                      className="show-card__poster show-card__poster--empty"
                      aria-hidden="true"
                    >
                      {movie.name}
                    </div>
                  )}
                  <div className="show-card__content">
                    <h2>{movie.name}</h2>

                    <div className="show-card__details">
                      {movie.releaseDate && <span>{movie.releaseDate}</span>}

                      {movie.durationInMinutes && (
                        <span>Duration {movie.durationInMinutes} Min</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="show-card__button"
                      onClick={() =>
                        cityId &&
                        handleViewShows(movie.id, parseInt(cityId, 10))
                      }
                    >
                      View Shows
                    </button>
                  </div>
                </article>
              );
            })}
        </div>
      ) : (
        <p className="shows-empty">No shows are available in this city yet.</p>
      )}
    </main>
  );
};

export default ShowMovies;

export async function showMoviesLoader({
  params,
}: {
  params: { cityId?: string };
}) {
  if (!params.cityId) {
    throw new Response("A city is required to find shows.", { status: 400 });
  }

  try {
    const response = await apiClient.get(`/movies/city/${params.cityId}`);
    return Array.isArray(response.data)
      ? response.data
      : response.data.shows || [];
  } catch (error: any) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch shows.",
      { status: error.response?.status || 500 },
    );
  }
}
