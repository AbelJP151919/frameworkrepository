import React, { useState } from 'react';
import { Movie } from '../models/movies';
import { searchTMDBMovies } from '../services/tmdbService';
import { createMovie } from '../services/api'; 
import MovieCard from '../components/MovieCard';

export default function SearchTMDBPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);
      const data = await searchTMDBMovies(query);
      setResults(data);
    } catch (err: any) {
      console.error(err);
      setError('Error al buscar películas en TMDB. Revisa tu consola.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMovie = async (movie: Movie) => {
    try {
      setError(null);
      const { id, ...movieDataToSave } = movie; 
      
      await createMovie(movieDataToSave as Omit<Movie, 'id'>);
      setSuccessMsg(`✅ ¡"${movie.title}" se ha guardado en tu catálogo local!`);
      
    } catch (err: any) {
      console.error(err);
      setError(`❌ No se pudo guardar "${movie.title}".`);
      setSuccessMsg(null);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Buscar en TMDB 🎬</h1>
      <p>Busca películas en la base de datos mundial y añádelas a tu colección.</p>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '2rem', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Ej: Star Wars, Matrix..."
          style={{ padding: '10px', width: '100%', maxWidth: '400px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? 'Buscando...' : '🔍 Buscar'}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {successMsg && <div style={{ color: 'green', marginBottom: '1rem', fontWeight: 'bold' }}>{successMsg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {results.map(movie => (
          <div key={movie.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            <MovieCard 
              movie={movie} 
              isFavorite={false} 
              onToggleFavorite={() => {}} 
            />
            
            <button 
              onClick={() => handleSaveMovie(movie)}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              📥 Guardar en mi catálogo
            </button>
          </div>
        ))}
      </div>
      
      {!loading && results.length === 0 && query && !error && (
        <p>No se encontraron resultados para "{query}".</p>
      )}
    </div>
  );
}