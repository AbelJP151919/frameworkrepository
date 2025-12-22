from flask import Flask, jsonify, request, send_from_directory
import sqlite3
import os

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))  
FRONTEND_DIST = os.path.join(CURRENT_DIR, '..', 'dist')   

DB_PATH = os.path.join(CURRENT_DIR, 'movies.db')

app = Flask(__name__, static_folder=os.path.join(FRONTEND_DIST, 'static'))


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
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



@app.route('/api/movies', methods=['GET'])
def get_movies():
    conn = get_db_connection()
    movies = [dict(row) for row in conn.execute('SELECT * FROM movies ORDER BY id DESC')]
    conn.close()
    return jsonify(movies)

@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    conn = get_db_connection()
    movie = conn.execute('SELECT * FROM movies WHERE id = ?', (movie_id,)).fetchone()
    conn.close()
    return jsonify(dict(movie)) if movie else (jsonify({"error": "Not found"}), 404)

@app.route('/api/movies', methods=['POST'])
def add_movie():
    data = request.get_json()
    title = data.get('title')
    if not title:
        return jsonify({"error": "Título obligatorio"}), 400
    
    conn = get_db_connection()
    with conn:
        conn.execute('''
            INSERT INTO movies (title, director, year, genre, rating, description, poster_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (title, data.get('director'), data.get('year'), data.get('genre'),
              data.get('rating'), data.get('description'), data.get('poster_url')))
    conn.close()
    return jsonify({"success": True}), 201


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    full_path = os.path.join(FRONTEND_DIST, path)
    if os.path.exists(full_path) and not os.path.isdir(full_path):
        return send_from_directory(FRONTEND_DIST, path)
    else:
        return send_from_directory(FRONTEND_DIST, 'index.html')

if __name__ == '__main__':
    print("Sirviendo React desde:", FRONTEND_DIST)
    if not os.path.exists(FRONTEND_DIST):
        print("ERROR: La carpeta dist no existe. Ejecuta 'npm run build' en la raíz.")
    else:
        print("http://localhost:5000")
    app.run(debug=True, port=5000)