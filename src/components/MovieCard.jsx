import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card-image-container">
        <img className="movie-card-image" src={movie.poster_url} alt={movie.title} />
        <div className="movie-card-rating">⭐ {movie.rating}</div>
      </div>
      <div className="movie-card-content">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-meta">
          <span className="movie-card-year">{movie.year}</span>
          <span className="movie-card-separator">•</span>
          <span className="movie-card-genre">{movie.genre}</span>
        </div>
        <div className="movie-card-director">Dirigida por {movie.director}</div>
        <p className="movie-card-description">{movie.description}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
