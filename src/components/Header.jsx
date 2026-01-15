import { Link } from 'react-router-dom'
import './Header.css';

function Header() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <Link class="navbar-brand" to="/">
                        <i class="fas fa-film me-2"></i>CineFlask
                    </Link>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <Link class="nav-link" to="/">
                                    <i class="fas fa-home me-1"></i>Inicio
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/movies">
                                    <i class="fas fa-video me-1"></i>Películas
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/about">
                                    <i class="fas fa-info-circle me-1"></i>Sobre
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/contact">
                                    <i class="fas fa-envelope me-1"></i>Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;