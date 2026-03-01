from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
import sqlite3
import os
import json

app = Flask(__name__, template_folder='../frontend/templates', static_folder='../frontend/static')
app.secret_key = os.environ.get('FLASK_SECRET', 'dev-secret')

# Configurar CORS para permitir peticiones desde React en desarrollo
ALLOWED_ORIGINS = os.environ.get('FLASK_CORS_ORIGINS', 'http://localhost:5173,http://localhost:3000').split(',')
CORS(app, resources={
    r"/api/*": {
        "origins": "*",  # Permite TODOS los orígenes
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
        "expose_headers": ["Content-Type"]
    }
})

# Debug: mostrar qué carpetas está usando la app (ayuda a diagnosticar duplicados)
print('Template folder used by Flask:', os.path.abspath(app.template_folder))
print('Static folder used by Flask:', os.path.abspath(app.static_folder))

DB_PATH = os.path.join(os.path.dirname(__file__), 'movies.db')


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create the movies table if it doesn't exist."""
    conn = get_db_connection()
    with conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                director TEXT,
                year INTEGER,
                genre TEXT,
                rating REAL,
                description TEXT,
                poster_url TEXT
            )
        ''')
    conn.close()


init_db()

movies_list = [
    {
        'title': 'The Shawshank Redemption',
        'director': 'Frank Darabont',
        'year': 1994,
        'genre': 'Drama',
        'rating': 9.3,
        'description': 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        'poster_url': "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
    },
    {
        'title': 'The Godfather',
        'director': 'Francis Ford Coppola',
        'year': 1972,
        'genre': 'Crime, Drama',
        'rating': 9.2,
        'description': 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        'poster_url': "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
    },
    {
        'title': 'The Dark Knight',
        'director': 'Christopher Nolan',
        'year': 2008,
        'genre': 'Action, Crime, Drama',
        'rating': 9.0,
        'description': 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
        'poster_url': "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
        'title': 'Pulp Fiction',
        'director': 'Quentin Tarantino',
        'year': 1994,
        'genre': 'Crime, Drama',
        'rating': 8.9,
        'description': 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        'poster_url': "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
    },
    {
        'title': 'Forrest Gump',
        'director': 'Robert Zemeckis',
        'year': 1994,
        'genre': 'Drama, Romance',
        'rating': 8.8,
        'description': 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.',
        'poster_url': "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"
    }
]


def seed_db_if_empty():
    conn = get_db_connection()
    cur = conn.execute('SELECT COUNT(*) as cnt FROM movies')
    row = cur.fetchone()
    if row['cnt'] == 0:
        with conn:
            for m in movies_list:
                conn.execute('''INSERT INTO movies (title, director, year, genre, rating, description, poster_url)
                                VALUES (?, ?, ?, ?, ?, ?, ?)''',
                             (m['title'], m['director'], m['year'], m['genre'], m['rating'], m['description'], m['poster_url']))
    conn.close()


seed_db_if_empty()



@app.route('/api/movies', methods=['GET'])
def get_movies():
    """Obtiene lista de todas las películas"""
    try:
        conn = get_db_connection()
        cur = conn.execute('SELECT * FROM movies ORDER BY id DESC')
        movies = [dict(r) for r in cur.fetchall()]
        conn.close()
        return jsonify({'data': movies, 'status': 'success'}), 200
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500


@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie_by_id(movie_id):
    """Obtiene una película por ID"""
    try:
        conn = get_db_connection()
        cur = conn.execute('SELECT * FROM movies WHERE id = ?', (movie_id,))
        row = cur.fetchone()
        conn.close()
        
        if row:
            return jsonify({'data': dict(row), 'status': 'success'}), 200
        else:
            return jsonify({'error': 'Película no encontrada', 'status': 'error'}), 404
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500



@app.route('/api/movies', methods=['POST'])
def create_movie():
    """Crea una nueva película desde datos JSON"""
    try:
        data = request.get_json()
        
        if not data or not data.get('title'):
            return jsonify({
                'error': 'El título es obligatorio',
                'status': 'error'
            }), 400

        title = data.get('title')
        director = data.get('director')
        year = data.get('year')
        genre = data.get('genre')
        rating = data.get('rating')
        description = data.get('description')
        poster_url = data.get('poster_url')

        try:
            year_val = int(year) if year else None
        except (ValueError, TypeError):
            year_val = None

        try:
            rating_val = float(rating) if rating else None
        except (ValueError, TypeError):
            rating_val = None

        conn = get_db_connection()
        with conn:
            cur = conn.execute('''
                INSERT INTO movies (title, director, year, genre, rating, description, poster_url)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (title, director, year_val, genre, rating_val, description, poster_url))
            movie_id = cur.lastrowid

        conn.close()

        return jsonify({
            'data': {'id': movie_id, 'title': title},
            'status': 'success'
        }), 201

    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

@app.route('/api/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    """Elimina una película por ID (Extra Opcional)"""
    try:
        conn = get_db_connection()
        # Verificar si existe primero
        cur = conn.execute('SELECT id FROM movies WHERE id = ?', (movie_id,))
        if not cur.fetchone():
            conn.close()
            return jsonify({
                'error': 'Película no encontrada',
                'status': 'error'
            }), 404

        with conn:
            conn.execute('DELETE FROM movies WHERE id = ?', (movie_id,))
        conn.close()

        return jsonify({
            'message': 'Película eliminada correctamente',
            'status': 'success'
        }), 200

    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == "__main__":
    app.run(debug=True)