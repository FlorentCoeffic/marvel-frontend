import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { characterId } = location.state;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics/${characterId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <span>En cours de chargement ... </span>
  ) : (
    <div>
      {data.results.map((comic) => {
        return (
          <div key={comic._id}>
            <h2>{comic.title}</h2>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.name}
            />
            <p> {comic.description} </p>
          </div>
        );
      })}
    </div>
  );
};

export default Comics;
