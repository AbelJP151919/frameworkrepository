import React from 'react';
import MovieList from '../components/MovieList.js';
import mockMovies from '../data/mockMovies.js';
import './HomePage.css';

function MoviesPage() {
    return (
        <>
            <MovieList movies={mockMovies} />
        </>
    );
}

export default MoviesPage;