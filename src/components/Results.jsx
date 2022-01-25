import React from "react";
import Pet from "./Pet";

export default function Results({ pets }) {
  return (
    <div className="search">
      {pets.length ? (
        pets.map((pet) => (
          <Pet
            key={pet.id}
            id={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            description={pet.description}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
          />
        ))
      ) : (
        <div>Not Pets Found</div>
      )}
    </div>
  );
}
