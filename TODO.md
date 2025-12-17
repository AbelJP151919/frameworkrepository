# TODO: Convertir proyecto Flask a React

## Backend Flask (API JSON)
- [ ] Modificar app.py para servir APIs JSON en lugar de templates
- [ ] Agregar CORS para permitir requests desde React
- [ ] Crear endpoints API:
  - GET /api/movies - Lista de películas
  - GET /api/movies/<id> - Detalle de película
  - POST /api/movies - Agregar película
- [ ] Actualizar requirements.txt con flask-cors

## Frontend React
- [x] Instalar dependencias: react-router-dom, axios, bootstrap
- [x] Configurar React Router en App.jsx
- [x] Crear componentes:
  - [x] Layout (navegación y footer)
  - [x] Home
  - [x] Movies (lista)
  - [x] MovieDetail
  - [x] AddMovie (formulario)
  - [x] About
  - [x] Contact
- [x] Implementar llamadas API con axios
- [x] Manejar estados y formularios
- [x] Aplicar estilos Bootstrap

## Testing
- [ ] Probar backend APIs
- [ ] Probar frontend React
- [ ] Verificar integración completa
