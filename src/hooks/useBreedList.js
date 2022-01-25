import { useState, useEffect } from "react";

const localCache = {};
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);

  useEffect(() => {
    setBreedList([]);
    async function requestBreeds() {
      const response = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const { breeds } = await response.json();
      localCache[animal] = breeds || [];
      setBreedList(breeds);
    }

    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreeds();
    }
  }, [animal]);
  return [breedList];
}
