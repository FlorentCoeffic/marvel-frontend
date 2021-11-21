import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// import { useState, useEffect } from "react";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Header from "./components/Header";
import CharacterInComic from "./pages/CharacterInComic";
import Footer from "./components/Footer";

function App() {
  const [searchResult, setSearchResult] = useState([]);

  const handleChangeCom = (event) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-marvel.herokuapp.com/search-comics?title=${event.target.value}`
        );
        // console.log("=====", response.data.results);
        setSearchResult(response.data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  return (
    <Router>
      <Header handleChangeCom={handleChangeCom} searchResult={searchResult} />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route
          path="/comics"
          element={<Comics searchResult={searchResult} />}
        />
        <Route path="/comics/:characterId" element={<CharacterInComic />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
