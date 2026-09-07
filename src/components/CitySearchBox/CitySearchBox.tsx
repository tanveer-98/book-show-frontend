import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useNavigation } from "react-router-dom";
import { nav } from "framer-motion/client";

interface ICity {
  id: number;
  name: string;
}

function CitySearchBox() {
  const [cities, setCities] = useState<ICity[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/cities")
      .then((response) => response.json())
      .then((data) => {
        console.log("cities");

        setCities(data);
      })
      .catch((error) => console.error("Err  or fetching cities:", error));
  }, []);

  const navigateShows = () => {
    navigate(`/showMovies/${selectedCity?.id}`);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="city-search-container">
      <input
        type="text"
        placeholder="Search for your city"
        value={selectedCity ? selectedCity.name : search}
        onChange={(e) => {
          setSelectedCity(null);
          setSearch(e.target.value);
        }}
      />
      <button
        type="button"
        className="city-search-button"
        aria-label="Search"
        onClick={() => navigateShows()}
      >
        &rarr;
      </button>

      {search && !selectedCity && (
        <div className="city-results">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city.id}
                className="city-option"
                onClick={() => {
                  setSelectedCity(city);
                  setSearch("");
                }}
              >
                {city.name}
              </div>
            ))
          ) : (
            <div className="no-city">No city found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default CitySearchBox;
