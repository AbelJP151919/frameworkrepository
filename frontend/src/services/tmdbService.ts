import { Movie } from '../models/movies';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';


export async function searchTMDBMovies(query: string): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    throw new Error("No se ha configurado la API Key de TMDB en .env.local");
  }

  try {
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=es-ES`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error de TMDB: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.results.map((item: any): Movie => ({
      id: item.id, 
      title: item.title,
      director: "Desconocido (TMDB)", 
      year: item.release_date ? parseInt(item.release_date.split('-')[0]) : 0,
      genre: "Género TMDB", 
      rating: item.vote_average ? parseFloat(item.vote_average.toFixed(1)) : 0,
      description: item.overview || "Sin descripción disponible.",
      poster_url: item.poster_path 
        ? `${TMDB_IMAGE_BASE}${item.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=Sin+Poster'
    }));

  } catch (error) {
    console.error("[TMDB Service Error]", error);
    throw error;
  }
}