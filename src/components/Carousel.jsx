import React, { useState } from "react";

function Carousel({ images }) {
  const [active, updateActive] = useState("");
  function handleIndexClick(e) {
    updateActive(e.target.dataset.index);
  }
  const activeImage =
    images[active] || "http://pets-images.dev-apis.com/pets/none.jpg";
  return (
    <div className="carousel">
      <img src={activeImage} alt="animal" />
      <div className="carousel-smaller">
        {images.map((photo, index) => (
          <img
            key={photo}
            src={photo}
            data-index={index}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
            onClick={handleIndexClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
