import { useState, useEffect, DependencyList } from 'react'; 
// Importa los hooks necesarios de React y el tipo para las dependencias.

interface UseFetchResult<T> {
  data: T | null;          // Resultado de la petición asíncrona.
  loading: boolean;        
  error: string | null;    
}

export function useFetch<T>(
  asyncFn: () => Promise<T>,        // Función asíncrona que devuelve una promesa con datos de tipo T.
  dependencies: DependencyList = [] // Lista de dependencias que disparan el efecto.
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null); 
  const [loading, setLoading] = useState(true);     
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    let isMounted = true; // Flag para evitar actualizar el estado si el componente se desmonta.

    const fetchData = async () => {
      try {
        setLoading(true);  
        setError(null);    
        const result = await asyncFn(); 

        if (isMounted) {   // Solo actualiza el estado si el componente sigue montado.
          setData(result); 
        }
      } catch (err) {      // Manejo de errores.
        if (isMounted) {   
          setError(
            err instanceof Error ? err.message : 'Error desconocido' 
          );
          console.error('Error en useFetch:', err); 
        }
      } finally {
        if (isMounted) {   
          setLoading(false);
        }
      }
    };

    fetchData(); 

    return () => {
      isMounted = false; 
    };
  }, dependencies); 

  return { data, loading, error }; 
}
