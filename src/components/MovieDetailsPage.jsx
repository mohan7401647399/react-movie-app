import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Card from "./Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Add to Favorites");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  //  Movie retrieving
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
        );
        setMovie(response.data);
        setError("");
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch movie details");
      }
    };
    fetchMovieDetails();
  }, [id]);

  //  Movies added in favorites
  const handleAddToFavorites = () => {
    if (!movie) return;
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    setButtonText("Added");
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    toast.success("Movie added to favorite lists");
  };

  return (
    <div className="h-svh">
      {error && <p>{error}</p>}
      {movie && (
        <Card>
          <img className="size-56" src={movie.Poster} alt={movie.Title} />
          <h2>
            <strong>Movie Name</strong> : {movie.Title}
          </h2>
          <h2>
            <strong>Year Of Release</strong> : {movie.Released}
          </h2>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="mb-5">
            <strong>Director:</strong> {movie.Director}
          </p>
          <Button
            size="small"
            onClick={handleAddToFavorites}
            variant="contained"
          >
            {buttonText}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default MovieDetailsPage;
