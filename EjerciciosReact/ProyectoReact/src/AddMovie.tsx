import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent as ReactChangeEvent } from 'react';
import axios from 'axios';

interface FormData {
  title: string;
  director: string;
  year: string;
  genre: string;
  rating: string;
  poster_url: string;
  description: string;
}

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    rating: '',
    poster_url: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:5000/api/movies', formData);
      navigate('/movies');
    } catch (err) {
      setError('Error al agregar la película. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2 className="mb-4">Añadir nueva película</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título *</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="director" className="form-label">Director</label>
            <input
              type="text"
              className="form-control"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="year" className="form-label">Año</label>
              <input
                type="number"
                className="form-control"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1888"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="genre" className="form-label">Género</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="rating" className="form-label">Rating</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="poster_url" className="form-label">URL del póster</label>
            <input
              type="url"
              className="form-control"
              id="poster_url"
              name="poster_url"
              value={formData.poster_url}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Guardando...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i>
                  Guardar
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/movies')}
              disabled={loading}
            >
              <i className="fas fa-times me-2"></i>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
