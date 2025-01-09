import sqlite3
import os

# creating path to database file
DB_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'apis.db')

def database_connect() {
    conn = sqlite3.connect(DB_PATH)
    return conn
}

def create_database() {
    conn = database_connect()
    cursor = conn.cursor()
    
    cur.execute('''
                CREATE TABLE IF NOT EXISTS logins (
                    username TEXT NOT NULL UNIQUE PRIMARY KEY,
                    password TEXT NOT NULL
                );
                ''') 
    
    cur.execute('''
                CREATE TABLE IF NOT EXISTS game_scores (
                    username TEXT,
                    FOREIGN KEY (username) REFERENCES logins(username) ON DELETE CASCADE,
                    timestamp TEXT DEFAULT NULL,
                    position INTEGER
                );
                ''')
    
    cur.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    contributor TEXT,
                    FOREIGN KEY (contributor) REFERENCES logins(username) ON DELETE CASCADE,
                    timestamp TEXT DEFAULT NULL,
                )
                ''')
    
    cur.execute('''
                CREATE TABLE IF NOT EXISTS individual (
                    id INTEGER,
                    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
                    name TEXT NOT NULL,
                    image TEXT NOT NULL,
                    description TEXT NOT NULL,
                );
                ''')
}