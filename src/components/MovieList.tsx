import React from 'react';
import MovieCard from './MovieCard.tsx';
import { Movie } from '../models/movies';
import './MovieList.css';

function MovieList({ movies }: { movies: Movie[] }) {
  if (!movies || movies.length === 0) {
    return <div className="movie-list-empty">No hay películas para mostrar.</div>;
  }

  return (
    <div className="movie-list">
      <div className="movie-list-title">Películas</div>
      <div className="movie-list-count">Total: {movies.length}</div>
      <div className="movie-grid">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
