import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import MoviesPage from './pages/MoviesPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx';
import Layout from './components/Layout.jsx';
import './App.css'

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
    </>
  )
}

export default App
