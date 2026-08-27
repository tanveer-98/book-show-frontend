import { useEffect, useState } from "react";
import CitySearchBox from "../CitySearchBox/CitySearchBox";
import { MovieCard } from "../MovieCard/MovieCard";
import "./style.css";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("movies set successfully");
        console.log(data);
        setMovies(data);
      });
  }, []);

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Book<span>My</span>Show
        </div>

        <div className="nav-links">
          <a href="#">Movies</a>
          <a href="#">Events</a>
          <a href="#">Sports</a>
          <a href="#">Plays</a>
        </div>

        <div className="nav-right">
          <button className="search-button">🔍</button>

          <button className="login-button">Sign In</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small-text">
            MOVIES • EVENTS • SPORTS • EXPERIENCES
          </p>

          <h1>
            Your next experience
            <br />
            <span>awaits.</span>
          </h1>

          <p className="hero-description">
            Discover the latest movies, events and experiences happening around
            you.
          </p>

          <div className="city-search">
            <CitySearchBox />
          </div>
        </div>
      </section>

      {/* Movies */}
      <section className="movies-section">
        <div className="section-header">
          <h2>Recommended Movies</h2>
          <button>See All →</button>
        </div>

        <div className="movie-grid">
          {movies &&
            movies.map((movie: any) => {

              console.log("movie genre")
              console.log(movie.genres)
              return (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  duration_in_minutes={movie.duration_in_minutes}
                  name={movie.name}
                  release_date={new Date(movie.release_date)}
                  thumbnail={movie.thumbnailUrl}
                  genres={movie.genres}
                />
              );
            })}
        </div>
      </section>
    </div>
  );
}

export default Home;
