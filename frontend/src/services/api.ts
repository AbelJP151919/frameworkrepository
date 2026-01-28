import { Movie } from '../models/movies';

/**
 * API Service Module
 * Centraliza todas las comunicaciones HTTP con el backend Flask
 */

// Configuración de Base URL desde variables de entorno
const API_BASE_URL = 'http://127.0.0.1:5000';

console.log('[API Config] Base URL:', API_BASE_URL); // Debug

/**
 * Clase de error personalizada para errores de API
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

/**
 * Función auxiliar para realizar peticiones HTTP
 */
async function request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    body = null,
    headers = {},
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log(`[API Request] ${method} ${url}`, { body, headers }); // Debug

  // Headers por defecto
  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Configurar body si existe
  const config: RequestInit = {
    method,
    headers: finalHeaders,
    mode: 'cors',
    credentials: 'same-origin',
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    
    console.log(`[API Response] ${response.status} ${response.statusText}`, {
      url: response.url,
      ok: response.ok,
      type: response.type,
      headers: Object.fromEntries(response.headers.entries()),
    });

    // Si no es 2xx, lanzar error
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        try {
          errorData = { message: await response.text() };
        } catch {
          errorData = { message: `Error ${response.status}: ${response.statusText}` };
        }
      }
      
      throw new APIError(
        errorData.error || errorData.message || `Error ${response.status}`,
        response.status,
        errorData
      );
    }

    // Para respuestas vacías
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {} as T;
    }

    // Parsear respuesta JSON
    const data = await response.json();
    console.log('[API Data Received]', data);
    
    return data;

  } catch (error) {
    console.error('[API Fetch Error]', error);
    
    if (error instanceof APIError) {
      throw error;
    }
    
    if (error instanceof TypeError) {
      if (error.message.includes('Failed to fetch')) {
        throw new APIError(
          'No se pudo conectar con el servidor. Verifica que el backend Flask esté corriendo.',
          0
        );
      }
      if (error.message.includes('NetworkError')) {
        throw new APIError(
          'Error de red. Verifica tu conexión a internet.',
          0
        );
      }
    }
    
    throw new APIError(
      error instanceof Error ? error.message : 'Error desconocido en la petición',
      0,
      { originalError: error }
    );
  }
}

/**
 * PELÍCULAS - Endpoints
 */

/**
 * Obtiene la lista completa de películas
 * @returns Array de películas
 */
export async function getMovies(): Promise<Movie[]> {
  try {
    console.log('[API] Fetching movies from /api/movies');
    const response = await request<{ data: Movie[], status: string }>('/api/movies');
    
    if (response.data && Array.isArray(response.data)) {
      console.log(`[API] Successfully fetched ${response.data.length} movies`);
      return response.data;
    }
    
    console.warn('[API] Unexpected response structure:', response);
    
    // Intentar diferentes estructuras de respuesta
    if (Array.isArray(response)) {
      return response as Movie[];
    }
    
    // Si hay un array en la raíz de la respuesta
    const anyResponse = response as any;
    if (anyResponse.movies && Array.isArray(anyResponse.movies)) {
      return anyResponse.movies;
    }
    
    return [];
  } catch (error) {
    console.error('[API] Error fetching movies:', error);
    throw error;
  }
}

/**
 * Obtiene una película por su ID
 * @param id - ID de la película
 * @returns Película encontrada
 */
export async function getMovieById(id: number): Promise<Movie> {
  const response = await request<{ data: Movie, status: string }>(`/api/movies/${id}`);
  return response.data;
}

/**
 * Crea una nueva película
 * @param movieData - Datos de la película a crear
 * @returns Película creada
 */
export async function createMovie(movieData: Omit<Movie, 'id'>): Promise<{ id: number, title: string }> {
  const response = await request<{ data: { id: number, title: string }, status: string }>('/api/movies', {
    method: 'POST',
    body: movieData,
  });
  return response.data;
}

// Exportar la función request para debugging si es necesario
export { request };