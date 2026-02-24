import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../models/movies';
import { getMovies } from '../services/api';

export interface MoviesViewModel {
  movies: Movie[];
  filteredMovies: Movie[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  
  // Actions
  setSearchTerm: (term: string) => void;
  toggleFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  refresh: () => Promise<void>;
  
  // Stats
  totalCount: number;
  filteredCount: number;
  favoritesCount: number;
}

export function useMoviesViewModel(): MoviesViewModel {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Load from localStorage on init
    try {
      const saved = localStorage.getItem('movie-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load movies from API
  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate loading for testing (uncomment to test)
      // await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Random error for testing robustness (optional)
      // if (Math.random() > 0.95) {
      //   throw new Error('Simulated API error for testing');
      // }
      
      const data = await getMovies();
      setMovies(data);
      setFilteredMovies(data);
    } catch (err: any) {
      console.error('Error loading movies:', err);
      setError(err.message || 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter movies based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMovies(movies);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(term) ||
      movie.director?.toLowerCase().includes(term) ||
      movie.genre?.toLowerCase().includes(term) ||
      movie.description?.toLowerCase().includes(term)
    );
    
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('movie-favorites', JSON.stringify(favorites));
      
      // Notify other components about favorites update
      window.dispatchEvent(new CustomEvent('favorites-changed'));
    } catch (err) {
      console.error('Error saving favorites:', err);
    }
  }, [favorites]);

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

  // Toggle favorite status
  const toggleFavorite = useCallback((movieId: number) => {
    setFavorites(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  }, []);

  const isFavorite = useCallback((movieId: number) => {
    return favorites.includes(movieId);
  }, [favorites]);

  // Initial load
  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return {
    // State
    movies,
    filteredMovies,
    loading,
    error,
    searchTerm,
    
    // Actions
    setSearchTerm,
    toggleFavorite,
    isFavorite,
    refresh: loadMovies,
    
    // Stats
    totalCount: movies.length,
    filteredCount: filteredMovies.length,
    favoritesCount: favorites.length,
  };
}