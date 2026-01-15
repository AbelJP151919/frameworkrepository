import React from 'react';
import MovieList from '../components/MovieList';
import mockMovies from '../data/mockMovies';
import { Movie } from '../models/movies';
import './HomePage.css';

function MoviesPage() {
    const movies: Movie[] = mockMovies;
    
    return (
        <>
            <MovieList movies={movies} />
        </>
    );
}

export default MoviesPage;