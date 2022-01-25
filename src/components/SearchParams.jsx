import React, { useState, useEffect, useContext } from "react";
import useBreedList from "../hooks/useBreedList";
import Results from "./Results";
import ThemeContext from "../contexts/ThemeContext";

const ANIMALS = ["", "bird", "cat", "dog", "rabbit", "reptile"];
function SearchParams() {
  const [location, updateLocation] = useState("");
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);
  const [breeds] = useBreedList(animal);
  async function requestPets() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await response.json();

    setPets(json.pets);
  }
  useEffect(() => {
    requestPets();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    requestPets();
  }

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          location
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => updateLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => updateAnimal(e.target.value)}
            onBlur={(e) => updateAnimal(e.target.value)}
          >
            {ANIMALS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          breed
          <select
            id="breed"
            disabled={!breeds.length}
            value={breed}
            onChange={(e) => updateBreed(e.target.value)}
          >
            {breeds.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          theme
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button type="submit" style={{ backgroundColor: theme }}>
          submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;
