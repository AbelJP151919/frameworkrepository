import React from 'react';
import MovieList from '../components/MovieList';
import { useMoviesViewModel } from '../hooks/useMoviesViewModel';
import './MoviesPage.css';

function MoviesPage() {
  const {
    filteredMovies: movies,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    toggleFavorite,
    isFavorite,
    refresh,
    totalCount,
    filteredCount,
    favoritesCount,
  } = useMoviesViewModel();

  if (loading) {
    return (
      <div className="movies-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando películas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-page">
        <div className="error-container">
          <h3>⚠️ Error al cargar películas</h3>
          <p>{error}</p>
          <button onClick={refresh} className="retry-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movies-page">
      <div className="page-header">
        <div className="header-top">
          <h1>Películas</h1>
          <div className="favorites-badge">
            ⭐ {favoritesCount} Favoritos
          </div>
        </div>
        
        <div className="stats-bar">
          <span>Mostrando {filteredCount} de {totalCount} películas</span>
        </div>
        
       
      </div>

      <MovieList 
        movies={movies} 
        onToggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </div>
  );
}

export default MoviesPage;