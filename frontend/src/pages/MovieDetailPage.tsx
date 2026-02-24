import React from 'react';
import { Link } from 'react-router-dom';
import { useMovieDetailViewModel } from '../hooks/useMovieDetailViewModel';
import './MovieDetailPage.css';

function MovieDetailPage() {
  const {
    movie,
    loading,
    error,
    isFavorite,
    toggleFavorite,
    goBack,
    refresh,
  } = useMovieDetailViewModel();

  if (loading) {
    return (
      <div className="movie-detail-page loading">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando detalles de la película...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-detail-page error">
        <div className="error-container">
          <h1>⚠️ Error</h1>
          <p>{error || 'Película no encontrada'}</p>
          <div className="button-group">
            <button onClick={goBack} className="btn btn-secondary">
              ← Volver al catálogo
            </button>
            <button onClick={refresh} className="btn btn-primary">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <nav className="breadcrumb-nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/movies">Películas</Link>
          </li>
          <li className="breadcrumb-item active">{movie.title}</li>
        </ol>
      </nav>

      <div className="movie-detail-container">
        <div className="movie-header">
          <button onClick={goBack} className="back-button">
            ← Volver
          </button>
          
          <div className="title-section">
            <h1>{movie.title} <span className="year">({movie.year})</span></h1>
            <button
              onClick={toggleFavorite}
              className={`favorite-toggle ${isFavorite ? 'active' : ''}`}
              title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              {isFavorite ? '★ Favorita' : '☆ Añadir a favoritos'}
            </button>
          </div>
        </div>

        <div className="movie-content">
          <div className="poster-section">
            <img 
              src={movie.poster_url || 'https://via.placeholder.com/400x600?text=Sin+Poster'} 
              alt={movie.title} 
              className="movie-poster"
            />
            <div className="poster-overlay">
              <div className="rating-badge">
                ⭐ {movie.rating.toFixed(1)}/10
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="detail-grid">
              <div className="detail-item">
                <h3><i className="fas fa-user-tie"></i> Director</h3>
                <p>{movie.director}</p>
              </div>
              
              <div className="detail-item">
                <h3><i className="fas fa-tag"></i> Género</h3>
                <p>{movie.genre}</p>
              </div>
              
              <div className="detail-item">
                <h3><i className="fas fa-calendar"></i> Año</h3>
                <p>{movie.year}</p>
              </div>
              
              <div className="detail-item">
                <h3><i className="fas fa-star"></i> Puntuación</h3>
                <p className="rating-value">{movie.rating.toFixed(1)} / 10</p>
              </div>
            </div>

            <div className="description-section">
              <h2>Sinopsis</h2>
              <p className="movie-description">{movie.description}</p>
            </div>

            <div className="action-buttons">
              <button onClick={goBack} className="btn btn-outline">
                ← Volver al catálogo
              </button>
              <button
                onClick={toggleFavorite}
                className={`btn ${isFavorite ? 'btn-warning' : 'btn-primary'}`}
              >
                {isFavorite ? '★ Quitar de favoritos' : '☆ Añadir a favoritos'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;