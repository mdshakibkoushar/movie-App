import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Alert,
  Chip,
} from "@mui/material";

const MovieDetails = () => {
  const { imdbID } = useParams();
  // TMDB uses 'id' instead of 'imdbID'
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovieDetails = async () => {
    try {
      // Fetch movie details
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${imdbID}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );

      // Fetch movie credits
      const creditsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${imdbID}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );

      setMovie(movieResponse.data);

      // fetch to director
      const directorData = creditsResponse.data.crew.find(
        (member) => member.job === "Director"
      );
      setDirector(directorData ? directorData.name : "Unknown");

      // fetch to cast
      setCast(creditsResponse.data.cast.slice(0, 3)); // Limit to  actors
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [imdbID]);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      {movie ? (
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                height="500"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <CardContent>
                <Typography variant="h3" component="h1" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="h6">
                  <strong>Release Date:</strong> {movie.release_date}
                </Typography>
                <Typography variant="h6">
                  <strong>Genres:</strong>{" "}
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </Typography>
                <Typography variant="h6">
                  <strong>Director:</strong> {director}
                </Typography>
                <Typography variant="h6">
                  <strong>Cast:</strong>{" "}
                  {cast.map((actor) => (
                    <Chip
                      key={actor.id}
                      label={actor.name}
                      sx={{ margin: 0.5 }}
                    />
                  ))}
                </Typography>
                <Typography variant="h6">
                  <strong>Overview:</strong> {movie.overview}
                </Typography>
                <Typography variant="h6">
                  <strong>Rating:</strong> {movie.vote_average}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Movie not found.
        </Typography>
      )}
    </Container>
  );
};

export default MovieDetails;
