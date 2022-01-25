import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "../contexts/ThemeContext";
import Modal from "./Modal";

const Details = () => {
  const [pet, updatePet] = useState(null);
  const [loading, updateLoading] = useState(true);
  const [showModal, updateShowModal] = useState(false);
  const [theme, setTheme] = useContext(ThemeContext);
  const { id } = useParams();
  useEffect(() => {
    async function requestPet() {
      const response = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
      const { pets } = await response.json();

      updatePet(pets[0]);
      updateLoading(false);
    }
    requestPet();
  }, [id]);

  if (loading) {
    return <h2>loading...</h2>;
  }

  function toggleModal() {
    setTheme("green");
    updateShowModal(!showModal);
  }
  function adopt() {
    window.location = "http://bit.ly/pet-adopt";
  }
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        {/* <ThemeContext.Consumer> */}
        {/*  {([theme, callback]) => { */}
        {/*    console.log(theme, callback); */}
        {/*    return ( */}
        {/*      <button */}
        {/*        type="button" */}
        {/*        style={{ backgroundColor: theme }} */}
        {/*        onClick={() => updateTheme(callback)} */}
        {/*      > */}
        {/*        Adopt {pet.name} */}
        {/*      </button> */}
        {/*    ); */}
        {/*  }} */}
        {/* </ThemeContext.Consumer> */}
        <button
          type="button"
          style={{ backgroundColor: theme }}
          onClick={toggleModal}
        >
          Adopt {pet.name}
        </button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button type="button" onClick={adopt}>
                  Yes
                </button>
                <button type="button" onClick={toggleModal}>
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};
const DetailsErrorBoundary = () => (
  <ErrorBoundary>
    <Details />
  </ErrorBoundary>
);
export default DetailsErrorBoundary;
