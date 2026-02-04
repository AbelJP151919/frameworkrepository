import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../models/movies';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card-image-container">
          <img className="movie-card-image" src={movie.poster_url} alt={movie.title} />
          <div className="movie-card-overlay">
            <button 
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              {isFavorite ? '★' : '☆'}
            </button>
            <div className="movie-card-rating">⭐ {movie.rating.toFixed(1)}</div>
          </div>
        </div>
        
        <div className="movie-card-content">
          <h2 className="movie-card-title">{movie.title}</h2>
          <div className="movie-card-meta">
            <span className="movie-card-year">{movie.year}</span>
            <span className="movie-card-separator">•</span>
            <span className="movie-card-genre">{movie.genre}</span>
          </div>
          <div className="movie-card-director">Dirigida por {movie.director}</div>
          <p className="movie-card-description">
            {movie.description.length > 100 
              ? `${movie.description.substring(0, 100)}...` 
              : movie.description}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;