# Registro de Cambios (Changelog)

Todos los cambios notables de este proyecto se documentarán en este archivo.

## [Versión Inicial] - PR 1: Migración Inicial de React a TypeScript (Core)

El paso fundamental para modernizar el código base, aportando seguridad en tiempo de compilación y reduciendo errores en tiempo de ejecución.

### Añadido
- **Modelado de Dominio:** Creación de la primera interfaz de TypeScript `Movie`, definiendo la estructura estricta (tipos de datos, campos obligatorios) que la aplicación espera para cualquier película.

### Cambiado
- **Refactorización Completa a TSX:** Migración arquitectónica de todos los componentes principales (páginas como `HomePage`, `MoviesPage`, `ContactPage`, etc.) y componentes compartidos (`Header`, `Footer`, `Layout`, etc.) del estándar JavaScript (JSX) a TypeScript (TSX).
- **Tipado de Props:** Inyección de anotaciones de tipos en todas las *props* de los componentes de React, asegurando que los componentes reciban exactamente los datos que necesitan para renderizarse.
- **Estandarización JSX:** Actualización de la sintaxis heredada de HTML dentro de los componentes. Se corrigieron los atributos como `class` y `for`, reemplazándolos por los estándares oficiales de React (`className` y `htmlFor`).

---

## [Versión Anterior] - PR 2: Integración Backend API y Capa de Servicios

Este Pull Request marcó la evolución del proyecto de una simple interfaz a una aplicación Full-Stack funcional, conectando el frontend con un entorno de backend real.

### Añadido
- **Backend Propio (Flask):** Creación de un servidor API RESTful utilizando Python/Flask.
- **Base de Datos:** Implementación de una base de datos SQLite integrada en el backend para el almacenamiento real y persistente de la información de las películas.
- **Capa de Servicios Frontend:** Creación del módulo API (`api.ts`) centralizando y estandarizando todas las comunicaciones HTTP (GET, POST) hacia el backend Flask.
- **Gestión de Fetching Asíncrono:** Desarrollo de un nuevo *Custom Hook* genérico (`useFetch`) diseñado para administrar de manera eficiente y reutilizable el ciclo de vida de peticiones asíncronas con un tipado estricto.

### Cambiado
- **Expansión de TypeScript:** Completada la migración de archivos restantes `.jsx` a `.tsx`, solidificando la adopción de TS en toda la aplicación cliente y asegurando la compatibilidad de tipos con la nueva respuesta de la API.

---
---

## [Versión Anterior] - PR 3: Refactorización a Patrón MVVM y Sistema de Favoritos

En esta actualización se transformó la forma en la que el frontend maneja su estado global y la lógica de negocio, desacoplando la UI de la obtención de datos e introduciendo interactividad avanzada.

### Añadido
- **Sistema de Favoritos:** Nueva funcionalidad que permite a los usuarios marcar y desmarcar películas como favoritas desde la interfaz.
- **Persistencia Local:** Integración de `localStorage` para guardar las preferencias del usuario de forma persistente en su navegador web.
- **Sincronización en Tiempo Real (Cross-Tab):** Implementación de listeners de eventos nativos para mantener el estado de favoritos sincronizado automáticamente si el usuario tiene la aplicación abierta en múltiples pestañas.
- **Feedback Visual (UX):** Integración de estados explícitos de "Cargando" (Loading) y pantallas de manejo de error (Error UX) durante la recuperación de información.

### Cambiado
- **Adopción del Patrón MVVM:** Refactorización total de `MoviesPage` y `MovieDetailPage`. La lógica de negocio fue extraída y encapsulada en los nuevos *Custom Hooks* `useMoviesViewModel` y `useMovieDetailViewModel`.
- **Limpieza de Vistas:** Eliminación de llamadas directas a APIs y uso de datos "mock" dentro de los componentes visuales, delegando esta responsabilidad a los ViewModels.
- **Mejora de UI:** Actualización de los estilos y la estructura de `MovieList` y `MovieCard` para soportar las nuevas interacciones, incluyendo el toggle visual del estado de favoritos.

---

## [Unreleased] - PR 4: Arquitectura, Documentación UML y Seguridad de Credenciales

Esta fase se centró en la formalización de la documentación arquitectónica del proyecto y en asegurar las buenas prácticas respecto al manejo de variables sensibles y configuración de entorno.

### Añadido
- **Documentación Visual (PlantUML):** Creación de diagramas arquitectónicos precisos para representar el patrón MVVM (Model-View-ViewModel) y la jerarquía de componentes de React.
- **Gestión de Entorno Segura:** Implementación del soporte para el archivo `.env.local` destinado a alojar la clave `VITE_TMDB_API_KEY` de manera segura en el entorno de desarrollo.
- **Validación de Credenciales:** Añadida lógica de validación inicial en la capa de servicios (`api.ts`) que comprueba la correcta inyección de la API Key, mostrando advertencias formatadas en la consola para facilitar la depuración.
- **Actualización del README:** Integración directa de las imágenes renderizadas de los diagramas UML en la documentación principal del proyecto para facilitar el "onboarding" de nuevos desarrolladores.

### Cambiado
- **Políticas del Repositorio:** Modificado el archivo `.gitignore` para bloquear estrictamente la subida de archivos `.env.local` al control de versiones, previniendo vulnerabilidades de seguridad y filtración de claves API. Se mantiene `.env.example` como plantilla pública.

---