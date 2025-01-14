import sqlite3
import os
from flask import session

# creating path to database file
DB_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'apis.db')

def database_connect():
    conn = sqlite3.connect(DB_PATH)
    return conn

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
                    timestamp TEXT NOT NULL,
                    position INTEGER,
                    FOREIGN KEY (username) REFERENCES logins(username) ON DELETE CASCADE
                );
                ''')
    
    cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    contributor TEXT,
                    timestamp TEXT NOT NULL,
                    FOREIGN KEY (contributor) REFERENCES logins(username) ON DELETE CASCADE
                );
                ''')
    
    cursor.execute('''
                CREATE TABLE IF NOT EXISTS individual (
                    id INTEGER,
                    name TEXT NOT NULL,
                    image TEXT NOT NULL,
                    description TEXT NOT NULL,
                    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
                );
                ''')
    conn.commit()
    conn.close()

# Add a new user login to the database
def add_user(username, password):
    try:
        conn = database_connect()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO logins (username, password) VALUES (?, ?)", (username, password,))
        conn.commit()
    except:
        return "Username already exists"
    finally:
        conn.close()
        return "User added successfully"
        
# Login user
def login_user(username, password):
    conn = database_connect()
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT password FROM logins WHERE username = ?', (username,))
        db_password = cursor.fetchone()[0]
        
        if password != db_password:
            return "Invalid username or password"
        
        conn.close()
        return "Login successful"
    except:
        return "Invalid username or password"
    
# Add a new user to the database
def add_game_score(username, timestamp, position): # FIX THIS TOMORROW
    conn = database_connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO game_scores (username, timestamp, position) VALUES (?, ?, ?)", (username, timestamp, position,))
    conn.commit()
    conn.close()

# Retrieve all game scores in ascending order
def get_all_game_scores():
    conn = database_connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM game_scores ORDER BY position ASC")
    scores = cursor.fetchall()
    conn.close()
    return scores

# Retrieve game score for a specific user
def get_specific_game_scores(): # CHANGE THIS IF NEEDED
    conn = database_connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM game_scores WHERE username = ?", (session['username'],))
    scores = cursor.fetchall()
    conn.close()
    return scores

