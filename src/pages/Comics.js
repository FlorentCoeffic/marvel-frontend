import { useState, useEffect } from "react";
import axios from "axios";

const Comics = ({ searchResult }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/comics");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  console.log("====", searchResult);

  return isLoading ? (
    <span>En cours de chargement ... </span>
  ) : (
    <div className=" body">
      {searchResult.length > 1 ? (
        <div className="container containerComic">
          {" "}
          {searchResult.sort().map((comic) => {
            return (
              <div key={comic._id} className="comicCard">
                <h2>{comic.title}</h2>
                <img
                  className="comicImg"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.name}
                />

                {comic.description ? <p> {comic.description} </p> : null}
              </div>
            );
          })}{" "}
        </div>
      ) : (
        <div className="container containerComic">
          {data.results.map((comic, index) => {
            return (
              <div key={comic._id} className="comicCard">
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
      )}
      {/* </div> */}
    </div>
  );
};

export default Comics;
