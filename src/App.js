import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// import { useState, useEffect } from "react";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Header from "./components/Header";
import CharacterInComic from "./pages/CharacterInComic";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [token, setToken] = useState();

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 5 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

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
      <Header
        handleChangeCom={handleChangeCom}
        searchResult={searchResult}
        setUser={setUser}
        token={token}
      />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route
          path="/comics"
          element={<Comics searchResult={searchResult} />}
        />
        <Route path="/comics/:characterId" element={<CharacterInComic />} />
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
