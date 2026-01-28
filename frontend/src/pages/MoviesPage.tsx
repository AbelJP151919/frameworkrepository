

import React from 'react';
import MovieList from '../components/MovieList';
import { getMovies } from '../services/api';
import { useFetch } from '../services/useFetch';
import './MoviesPage.css';

function MoviesPage() {
  // Usar el hook para obtener películas con manejo automático de estados
  const { data: movies, loading, error } = useFetch(() => getMovies());

  if (loading) {
    return (
      <div className="movies-page">
        <div className="loading-spinner">
          <p>Cargando películas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-page">
        <div className="error-message">
          <h3>⚠️ Error al cargar películas</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movies-page">
      <MovieList movies={movies || []} />
    </div>
  );
}

export default MoviesPage;
