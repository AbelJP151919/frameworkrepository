import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_url?: string;
  director?: string;
  year?: number;
  genre?: string;
  description?: string;
  rating?: number;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las películas');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando películas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1><i className="fas fa-video me-2"></i>Catálogo de Películas</h1>
        <span className="badge bg-primary fs-6">{movies.length} películas</span>
      </div>

      {movies.length > 0 ? (
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-6 col-lg-4 mb-4" key={movie.id}>
              <div className="card h-100 movie-card">
                <img
                  src={movie.poster_url || 'https://via.placeholder.com/300x450?text=Sin+Poster'}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text text-muted">
                    <i className="fas fa-user-tie me-1"></i>{movie.director || 'N/A'}<br />
                    <i className="fas fa-calendar me-1"></i>{movie.year || 'N/A'}<br />
                    <i className="fas fa-tag me-1"></i>{movie.genre || 'N/A'}
                  </p>
                  <p className="card-text flex-grow-1">
                    {movie.description ? movie.description.substring(0, 100) + (movie.description.length > 100 ? '...' : '') : 'Sin descripción'}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                      <i className="fas fa-star text-warning"></i>
                      <span className="fw-bold">{movie.rating ? movie.rating.toFixed(1) : 'N/A'}</span>
                    </div>
                    <Link to={`/movies/${movie.id}`} className="btn btn-primary btn-sm">
                      <i className="fas fa-eye me-1"></i>Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="fas fa-film fa-4x text-muted mb-3"></i>
          <h3>No hay películas disponibles</h3>
          <p className="text-muted">Pronto añadiremos más contenido.</p>
        </div>
      )}
    </div>
  );
};

export default Movies;
