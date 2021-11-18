import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import { useState, useEffect } from "react";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
      </Routes>
    </Router>
  );
}

export default App;
