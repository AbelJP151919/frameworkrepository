import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">CineFlask</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">Películas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-movie">Añadir Película</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Sobre</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        {children}
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p>© 2025 CineFlask</p>
      </footer>
    </div>
  );
}

export default Layout;
