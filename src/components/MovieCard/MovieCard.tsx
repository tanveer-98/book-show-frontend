import "./styles.css";
interface IGenre {
  id: number;
  name: string;
}

interface MovieCardProps {
  id: number;
  duration_in_minutes: number;
  name: string;
  release_date: string | Date;
  thumbnail: string;
  genres: Set<IGenre>;
}

function formatReleaseDate(moviedate: string | Date) {
  const date = new Date(moviedate);

  console.log("moviedate", moviedate);

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
}

export function MovieCard({
  id,
  duration_in_minutes,
  name,
  release_date,
  thumbnail,
  genres,
}: MovieCardProps) {
  console.log("details");
  console.log(id, duration_in_minutes, name, release_date, thumbnail);

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        <img src={thumbnail} alt={name} />
        <div className="movie-card__poster-overlay" />
      </div>

      <div className="movie-card__content">
        <h3>{name}</h3>

        <div className="movie-card__genres">
          {Array.from(genres).map((genre) => (
            <span key={genre.id} className="genre_tag">
              {genre.name}
            </span>
          ))}
        </div>

        <div className="movie-card__metadata">
          <span>{duration_in_minutes} min</span>
          <span>{formatReleaseDate(release_date)}</span>
        </div>
      </div>
    </article>
  );
}
