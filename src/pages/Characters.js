import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/characters");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement ...</span>
  ) : (
    <div>
      {data.results.map((character) => {
        return (
          <Link
            state={{
              characterId: character._id,
            }}
            key={character._id}
            to={`/comics/${character._id}`}
          >
            <div key={character._id}>
              <h2>{character.name}</h2>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <p>{character.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Characters;
