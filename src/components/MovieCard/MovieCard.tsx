import "./styles.css";
interface IGenre {
  id: number;
  name: string;
}

interface MovieCardProps {
  id: number;
  duration_in_minutes: number;
  name: string;
  release_date: Date;
  thumbnail: string;
  genres: Set<IGenre>;
}
export function MovieCard({
  id,
  duration_in_minutes,
  name,
  release_date,
  thumbnail,
  genres,
}: MovieCardProps) {
  console.log(id);
  console.log(name);
  console.log(thumbnail);
  console.log(genres);
  console.log("");
  return (
    <div className="movie-card">
      <img src={thumbnail} alt={name} />

      <h3>{name}</h3>

      <p>
        {Array.from(genres)
          .map((genre) => genre.name)
          .join(", ")}
      </p>
    </div>
  );
}
