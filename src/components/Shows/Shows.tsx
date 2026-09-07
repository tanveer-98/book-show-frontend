import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { apiClient } from "../../api/apiClient";
import "./styles.css";

interface Show {
  showId: number;
  movieId: number;
  movieName: string;
  thumbnailUrl: string;
  durationInMinutes: number;
  theaterId: number;
  theaterAddress: string;
  screenID: number;
  showDate: string;
  showTime: string;
}

const Shows = () => {
  const shows = useLoaderData() as Show[];
  const [selectedDate, setSelectedDate] = useState("");

  const filteredShows = selectedDate
    ? shows.filter((show) => show.showDate?.slice(0, 10) === selectedDate)
    : shows;

  const handleBookTicket = (showId: number) => {
    console.log("SHOW ID ", showId);
  };

  return (
    <main className="shows-section">
      <div className="shows-header">
        <p className="shows-eyebrow">Now showing</p>
        <h1>Shows near you</h1>
        <p>Choose a showtime and book your seats.</p>
      </div>

      <div className="shows-filter">
        <label htmlFor="show-date">Filter by date</label>
        <div className="shows-filter__controls">
          <input
            id="show-date"
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
          {selectedDate && (
            <button
              type="button"
              className="shows-filter__clear"
              onClick={() => setSelectedDate("")}
            >
              Clear date
            </button>
          )}
        </div>
      </div>

      {filteredShows.length > 0 ? (
        <div className="shows-list">
          {filteredShows.map((show: Show) => {
            return (
              <article className="show-card" key={show.showId}>
                {show.thumbnailUrl ? (
                  <img
                    src={show.thumbnailUrl}
                    alt={show.movieName}
                    className="show-card__poster"
                  />
                ) : (
                  <div
                    className="show-card__poster show-card__poster--empty"
                    aria-hidden="true"
                  >
                    {show.movieName}
                  </div>
                )}
                <div className="show-card__content">
                  <h2>{show.movieName}</h2>
                  <p className="show-card__theatre">{show.theaterAddress}</p>
                  <div className="show-card__details">
                    {show.showDate && (
                      <span>{show.showDate || show.showDate}</span>
                    )}
                    {show.showTime && <span>{show.showTime}</span>}
                    {show.durationInMinutes && (
                      <span>Duration {show.durationInMinutes} Min</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="show-card__button"
                    onClick={() => handleBookTicket(show.showId)}
                  >
                    Book tickets
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="shows-empty">
          {selectedDate
            ? "No shows are available on this date."
            : "No shows are available in this city yet."}
        </p>
      )}
    </main>
  );
};

export default Shows;

export async function showsLoader({
  params,
}: {
  params: { movieId?: string; cityId?: string };
}) {
  if (!params.cityId) {
    throw new Response("A city is required to find shows.", { status: 400 });
  }

  try {
    const response = await apiClient.get(
      `/shows/movies/${params.movieId}/city/${params.cityId}`,
    );
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
