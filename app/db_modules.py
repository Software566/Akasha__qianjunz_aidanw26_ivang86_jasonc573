import sqlite3
import os
from flask import session, request

# creating path to database file
DB_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'apis.db')

def database_connect() {
    conn = sqlite3.connect(DB_PATH)
    return conn
}

def create_database():
    conn = database_connect()
    cursor = conn.cursor()
    
    cursor.execute('''
                CREATE TABLE IF NOT EXISTS logins (
                    username TEXT NOT NULL UNIQUE PRIMARY KEY,
                    password TEXT NOT NULL
                );
                ''') 
    
    cursor.execute('''
                CREATE TABLE IF NOT EXISTS game_scores (
                    username TEXT,
                    FOREIGN KEY (username) REFERENCES logins(username) ON DELETE CASCADE,
                    timestamp TEXT DEFAULT NULL,
                    position INTEGER
                );
                ''')
    
    cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    contributor TEXT,
                    FOREIGN KEY (contributor) REFERENCES logins(username) ON DELETE CASCADE,
                    timestamp TEXT DEFAULT NULL,
                )
                ''')
    
    cursor.execute('''
                CREATE TABLE IF NOT EXISTS individual (
                    id INTEGER,
                    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
                    name TEXT NOT NULL,
                    image TEXT NOT NULL,
                    description TEXT NOT NULL,
                );
                ''')
    
    conn.commit()
    conn.close()

def add_user(username, password):
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        try:
            conn = database_connect()
            cursor = conn.cursor()
            cursor.execute('''
                        INSERT INTO logins (username, password)
                        VALUES (?, ?);
                        ''', (username, password))
            conn.commit()
        except sqlite3.IntegrityError:
            return "Username already exists"
        finally:
            conn.close()
            return "User added successfully"
        
def login_user(username, password):
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        conn = database_connect()
        cursor = conn.cursor()
        try:
            cursor.execute('''SELECT * FROM logins WHERE username=? AND password=?;''', (username, password))
            conn.close()
            return "Login successful"
        except sqlite3.IntegrityError:
            return "Invalid username or password"
        
def get_game_scores():
    conn = database_connect()
    cursor = conn.cursor()
    cursor.execute('''
                SELECT * FROM game_scores
                ORDER BY position ASC;
                ''')
    scores = cursor.fetchall()
    conn.close()
    return scores
