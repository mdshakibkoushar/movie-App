import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [detailedMovies, setDetailedMovies] = useState([]);

  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== id)
    );
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        movies,
        setMovies,
        detailedMovies,
        setDetailedMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
