import React from 'react';
import MovieCard from './MovieCard.tsx';
import { Movie } from '../models/movies';
import './MovieList.css';

interface MovieListProps {
  movies: Movie[];
  onToggleFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

function MovieList({ movies, onToggleFavorite, isFavorite }: MovieListProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-empty">
        <p>No hay películas para mostrar.</p>
        <p>Intenta ajustar tus filtros de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <div className="movie-grid">
        {movies.map((movie: Movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={() => onToggleFavorite(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;