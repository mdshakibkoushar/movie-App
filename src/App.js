// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./context/MovieContext";

const App = () => {
  return (
    <MovieProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/genre/:genre" element={<Home />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
      </Routes>
    </MovieProvider>
  );
};

export default App;
