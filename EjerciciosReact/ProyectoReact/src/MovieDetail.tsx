import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Movie {
  title: string;
  poster_url?: string;
  director?: string;
  year?: number;
  genre?: string;
  rating?: number;
  description?: string;
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError('Película no encontrada');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando película...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="alert alert-danger text-center">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error || 'Película no encontrada'}
      </div>
    );
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/movies">Películas</Link></li>
          <li className="breadcrumb-item active">{movie.title}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-4 mb-4">
          <img
            src={movie.poster_url || 'https://via.placeholder.com/400x600?text=Sin+Poster'}
            className="img-fluid rounded shadow"
            alt={movie.title}
          />
        </div>
        <div className="col-md-8">
          <h1>{movie.title}</h1>
          <div className="row mb-3">
            <div className="col-sm-6">
              <p><strong><i className="fas fa-user-tie me-2"></i>Director:</strong> {movie.director || 'N/A'}</p>
              <p><strong><i className="fas fa-calendar me-2"></i>Año:</strong> {movie.year || 'N/A'}</p>
            </div>
            <div className="col-sm-6">
              <p><strong><i className="fas fa-tag me-2"></i>Género:</strong> {movie.genre || 'N/A'}</p>
              <p><strong><i className="fas fa-star me-2"></i>Puntuación:</strong>
                <span className="fs-5 text-warning"> {movie.rating ? movie.rating.toFixed(1) : 'N/A'}/10</span>
              </p>
            </div>
          </div>

          <h3>Sinopsis</h3>
          <p className="lead">{movie.description || 'Sin descripción disponible'}</p>

          <div className="mt-4">
            <Link to="/movies" className="btn btn-secondary">
              <i className="fas fa-arrow-left me-2"></i>Volver al catálogo
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Sección para futuras reseñas */}
      <div className="row">
        <div className="col-12">
          <h3><i className="fas fa-comments me-2"></i>Reseñas</h3>
          <div className="alert alert-info">
            <i className="fas fa-info-circle me-2"></i>
            Las reseñas estarán disponibles en la próxima versión.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
