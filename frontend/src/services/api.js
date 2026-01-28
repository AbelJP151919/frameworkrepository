/**
 * API Service Module
 * Centraliza todas las comunicaciones HTTP con el backend Flask
 * 
 * Uso:
 * import { getMovies, getMovieById, addMovie } from '@/services/api'
 * 
 * try {
 *   const movies = await getMovies()
 * } catch (error) {
 *   console.error(error.message)
 * }
 */

// Configuración de Base URL desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Clase de error personalizada para errores de API
 */
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Función auxiliar para realizar peticiones HTTP
 * @param {string} endpoint - Ruta del endpoint (ej: '/movies')
 * @param {Object} options - Opciones: { method, body, headers }
 * @returns {Promise<Object>} Respuesta parseada como JSON
 */
async function request(endpoint, options = {}) {
  const {
    method = 'GET',
    body = null,
    headers = {},
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  // Headers por defecto
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Configurar body si existe
  const config = {
    method,
    headers: finalHeaders,
    credentials: 'include', // Incluir cookies si hay autenticación
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    // Si no es 2xx, lanzar error
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `Error ${response.status}`,
        response.status,
        errorData
      );
    }

    // Parsear respuesta JSON
    return await response.json();
  } catch (error) {
    // Re-lanzar APIError o convertir error de red
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      error.message || 'Error de conexión',
      0,
      { original: error }
    );
  }
}

/**
 * PELÍCULAS - Endpoints
 */

/**
 * Obtiene la lista completa de películas
 * @returns {Promise<Array>} Array de películas
 */
export async function getMovies() {
  const response = await request('/movies');
  return response.data;
}

// Exportar la clase de error por si se necesita usar
export { APIError };
