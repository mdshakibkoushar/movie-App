import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import MovieItem from "./MovieItem";
import SearchIcon from "@mui/icons-material/Search";
import "./Home.css";

// Component Definition:
// Defines a functional component named..

const Home = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [selectedYear, setSelectedYear] = useState("");
  const { movies, setMovies } = useContext(MovieContext);

  // Defines a functional component named

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      setMovies(response.data.results);
      // setDetailedMovies(response.data.results);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  // Search Functionality

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${query}`
        );
        setMovies(response.data.results);
      } catch (err) {
        console.error("No movies found", err);
      }
    }
  };

  // Sorting and Filtering
  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value.includes("Sort by")) {
      setSortBy(value.split(": ")[1].toLowerCase());
      setSelectedYear("");
    } else if (value.includes("Filter by Year")) {
      setSelectedYear(value.split(": ")[1]);
      setSortBy("title");
    }
  };

  // Filtering and Sorting Logic
  const filteredAndSortedMovies = () => {
    let filtered = selectedYear
      ? movies.filter(
          (movie) =>
            new Date(movie.release_date).getFullYear() ===
            parseInt(selectedYear)
        )
      : movies;

    return filtered.sort((a, b) => {
      if (sortBy === "year") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortBy === "rating") {
        return b.vote_average - a.vote_average;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="home">
      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter your movie Name....."
          />
          <SearchIcon className="search-icon" />
        </div>
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="sort-filter-options">
        <label htmlFor="sort-filter">Sort/Filter By:</label>
        <select id="sort-filter" onChange={handleSelectChange}>
          <option value="Sort by: Title">Title</option>
          <option value="Sort by: Year">Year</option>
          <option value="Sort by: Rating">Rating</option>
          <option value="Filter by Year: 2022">2022</option>
          <option value="Filter by Year: 2023">2023</option>
          <option value="Filter by Year: 2024">2024</option>
        </select>
      </div>

      <div className="movie-list">
        {filteredAndSortedMovies().length > 0 ? (
          filteredAndSortedMovies().map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="no-movies">
            No movies found. search different movie Name !!!!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
