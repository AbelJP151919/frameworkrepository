import { useParams, Link } from 'react-router-dom';
import { mockMovies } from '../data/mockMovies';
import './MovieDetailPage.css';

function MovieDetailPage() {
	const { id } = useParams();
	const movie = mockMovies.find(m => m.id === parseInt(id!));

	if (!movie) {
		return (
			<div className="container mt-5">
				<h1>Película no encontrada</h1>
				<Link to="/movies" className="btn btn-primary">Volver al catálogo</Link>
			</div>
		);
	}

	return (
		<div className="container mt-4">
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
					<li className="breadcrumb-item"><Link to="/movies">Películas</Link></li>
					<li className="breadcrumb-item active">{movie.title}</li>
				</ol>
			</nav>

			<div className="row">
				<div className="col-md-4 mb-4">
					<img src={movie.poster_url || 'https://via.placeholder.com/400x600?text=Sin+Poster'} 
						className="img-fluid rounded shadow" alt={movie.title} />
				</div>
				<div className="col-md-8">
					<h1>{movie.title}</h1>
					<div className="row mb-3">
						<div className="col-sm-6">
							<p><strong><i className="fas fa-user-tie me-2"></i>Director:</strong> {movie.director}</p>
							<p><strong><i className="fas fa-calendar me-2"></i>Año:</strong> {movie.year}</p>
						</div>
						<div className="col-sm-6">
							<p><strong><i className="fas fa-tag me-2"></i>Género:</strong> {movie.genre}</p>
							<p><strong><i className="fas fa-star me-2"></i>Puntuación:</strong> 
								<span className="fs-5 text-warning">{movie.rating.toFixed(1)}/10</span>
							</p>
						</div>
					</div>
					
					<h3>Sinopsis</h3>
					<p className="lead">{movie.description}</p>
					
					<div className="mt-4">
						<Link to="/movies" className="btn btn-secondary">
							<i className="fas fa-arrow-left me-2"></i>Volver al catálogo
						</Link>
					</div>
				</div>
			</div>

			<hr className="my-5" />

			<div className="row">
				<div className="col-12">
					<h3><i className="fas fa-comments me-2"></i>Reseñas</h3>
					<div className="alert alert-info">
						<i className="fas fa-info-circle me-2"></i>
						Las reseñas estarán disponibles en la próxima versión.
					</div>
				</div>
			</div>
		</div>
	);
}

export default MovieDetailPage;
