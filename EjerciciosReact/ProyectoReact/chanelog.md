# Changelog - CineFlask (React + Flask)

Mi registro personal del proyecto para Frameworks en DAW2.  
Empecé el 26 de noviembre de 2025 y hoy, 22 de diciembre, por fin lo tengo funcionando al 100%. ¡Ha sido un mes intenso!

## [0.1.0] - 26/11/2025 - Inicio del proyecto
- Empecé el proyecto convirtiendo el ejercicio Flask clásico en uno con frontend React.
- Objetivo: separar bien frontend (React/TSX) y backend (Flask API + SQLite).
- Todavía no sabía bien cómo iba a encajar todo.

## [0.2.0] - 27/11/2025 - Preparando la base
- Creé la estructura de carpetas: `/backend` para Flask y la raíz para el futuro frontend React.
- Copié el código del ejercicio Flask original a `backend/app.py`.
- Probé que la BD se creara y las películas de ejemplo se insertaran.

## [0.3.0] - 28/11/2025 - Backend inicial funcionando
- Terminé el backend Flask como en el ejercicio original: rutas con `render_template`, base de datos SQLite, seeding de 5 películas.
- Lo probé y funcionaba perfecto con las plantillas Jinja.

## [0..4.0] - 29/11/2025 - Primeros componentes React
- Creé el proyecto React con Vite + TypeScript.
- Empecé a pasar los componentes: `App.tsx`, `Layout.tsx`, `Home.tsx`.
- Probé que corriera con `npm run dev` y viera la página de inicio.

## [0.5.0] - 01/12/2025 - Routing y componentes básicos
- Configuré React Router con todas las rutas.
- Creé los componentes principales: `Home`, `Layout` con navbar, `Movies` (lista), `MovieDetail`.
- Puse el navbar con los enlaces a todas las páginas.

## [0.6.0] - 05/12/2025 - Frontend avanzando
- Terminé casi todos los componentes: `Movies`, `MovieDetail`, `AddMovie`, `About`, `Contact`.
- Puse Bootstrap para que quede bonito y responsive.
- Implementé el formulario de añadir película con Axios (aunque todavía apuntaba a rutas que no existían).

## [0.7.0] - 10/12/2025 - Empiezo a ver la luz
- Entendí que no podía mezclar plantillas Jinja de Flask con un frontend React completo.
- Empecé a cambiar el backend: quité todos los `render_template` y empecé a hacer rutas que devuelven JSON.
- Añadí las rutas API básicas: lista de películas y detalle.

## [0.8.0] - 15/12/2025 - Me lié con las carpetas
- Intenté organizar mejor el proyecto y metí todo el código React dentro de una subcarpeta `/frontend`.
- Mal hecho: se me rompió el build, npm no encontraba el package.json...
- Perdí un par de días peleando con eso hasta que lo saqué todo de nuevo a la raíz. Lección aprendida: no tocar la estructura estándar de Vite sin motivo.

## [0.9.0] - 20/12/2025 - Casi casi...
- Rehice el build de React (`npm run build`) y generé la carpeta `dist` limpia.
- Modifiqué el `app.py` para que sirva los archivos de `dist` y tenga las rutas API correctas (`/api/movies`).
- Probé las llamadas Axios desde el frontend y ya traen los datos de la BD.
- Todavía tenía algún problemilla con rutas relativas, pero lo fui ajustando.

## [1.0.0] - 22/12/2025 - ¡Funciona todo!
¡Por fin! Hoy he terminado de integrar todo:
- El backend ahora es una API pura que devuelve JSON.
- Flask sirve los archivos estáticos del build de React (carpeta `dist`).
- Todas las páginas cargan perfecto: inicio, lista de películas, detalle, añadir nueva, sobre y contacto.
- Las películas se ven con sus pósters, ratings y todo. Puedo añadir nuevas y se guardan en la base de datos.
- Arreglé el último lío de rutas y ahora abro http://localhost:5000 y todo va fluido.

Estoy súper contento, porque después de tantos errores ya lo veo completo.

### Reflexión final
Lo que más me ha costado ha sido entender que Flask no debía renderizar HTML cuando ya tengo un frontend React completo. Al principio estuve mezclando las plantillas con React y me daba errores todo el rato (ese famoso `TemplateNotFound`).  

Una vez que lo separé todo (API + archivos estáticos), todo encajó.  