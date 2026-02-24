import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movie } from '../models/movies';
import { getMovieById } from '../services/api';

export interface MovieDetailViewModel {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
  isFavorite: boolean;
  
  // Actions
  toggleFavorite: () => void;
  goBack: () => void;
  refresh: () => Promise<void>;
}

export function useMovieDetailViewModel(): MovieDetailViewModel {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('movie-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const loadMovie = useCallback(async () => {
    if (!id) {
      setError('Movie ID not provided');
      setLoading(false);
      return;
    }

    const movieId = parseInt(id);
    if (isNaN(movieId)) {
      setError('Invalid movie ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
    
      const data = await getMovieById(movieId);
      setMovie(data);
    } catch (err: any) {
      console.error('Error loading movie:', err);
      setError(err.message || 'Failed to load movie details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Sync favorites across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'movie-favorites' && e.newValue) {
        try {
          setFavorites(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Error parsing favorites:', err);
        }
      }
    };

    const handleCustomEvent = () => {
      const saved = localStorage.getItem('movie-favorites');
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch (err) {
          console.error('Error parsing favorites:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favorites-changed', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favorites-changed', handleCustomEvent);
    };
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback(() => {
    if (!movie) return;
    
    setFavorites(prev => {
      const newFavorites = prev.includes(movie.id)
        ? prev.filter(favId => favId !== movie.id)
        : [...prev, movie.id];
      
      // Save to localStorage
      localStorage.setItem('movie-favorites', JSON.stringify(newFavorites));
      
      // Notify other components
      window.dispatchEvent(new CustomEvent('favorites-changed'));
      
      return newFavorites;
    });
  }, [movie]);

  // Initial load
  useEffect(() => {
    loadMovie();
  }, [loadMovie]);

  const isFavorite = movie ? favorites.includes(movie.id) : false;

  return {
    movie,
    loading,
    error,
    isFavorite,
    toggleFavorite,
    goBack: () => navigate('/movies'),
    refresh: loadMovie,
  };
}