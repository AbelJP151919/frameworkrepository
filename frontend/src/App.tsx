import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MovieDetailPage from './pages/MovieDetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchTMDBPage from './pages/SearchTMDBPage'; 
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/search" element={<SearchTMDBPage />} />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;