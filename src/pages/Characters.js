import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/characters?limit=75&skip=${page}`
        );

        setNumPage(
          Array.from(Array(Math.ceil(response.data.count / 75)).keys())
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page]);

  return isLoading ? (
    <span>En cours de chargement ...</span>
  ) : (
    <div className="body">
      <div className="container containerCharacter">
        {data.results.map((character) => {
          return (
            <Link key={character._id} to={`/comics/${character._id}`}>
              <div className="characterCard" key={character._id}>
                <h2>{character.name}</h2>
                <img
                  className="characterImg "
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
                <p>{character.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="pagination">
        {numPage.map((page) => {
          return (
            <button
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {page + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
