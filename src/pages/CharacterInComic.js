import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharacterInComic = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.characterId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/comics/${id}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement ... </span>
  ) : (
    <div className="body">
      <div className="container containerComic">
        {data.comics.sort().map((comic) => {
          return (
            <div className="comicCard ">
              <h2>{comic.title}</h2>
              <img
                className="comicImg"
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.name}
              />
              {comic.description ? <p> {comic.description} </p> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterInComic;
