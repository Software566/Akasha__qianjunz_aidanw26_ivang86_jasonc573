"""
Akasha: QianjunZhou, AidanWong, IvanGontchar, JasonChao
SoftDev
P02: Makers Makin' It, Act I
2025-01-09
Time Spent: 1
"""

#----------------------------------------------------------------------------------------------------------------

from flask import Flask, flash, render_template, request, redirect, url_for, session, flash, jsonify
import sqlite3
import os
import datetime
import string
import random
import uuid
import json
import re
from CustomModules import api_modules, db_modules

db_modules.create_database()

app = Flask(__name__)
app.secret_key = "secret hehe"
#app.secret_key = os.urandom(32)

#----------------------------------------------------------------------------------------------------------------

# Landing Page
@app.route('/', methods = ['GET', 'POST'])
def landing():
    if 'username' in session:
        return render_template("landing.html", logged_in = True, username = session['username'])
    return render_template("landing.html", logged_in = False)

#----------------------------------------------------------------------------------------------------------------

# Function to update random username on register page
def updateusername():
    global lastusername
    lastusername = uuid.uuid4()
    return 0

# Authentication Page
@app.route('/auth', methods = ['GET', 'POST'])
def auth():
    if 'username' in session:
        return redirect(url_for('landing'))
    if request.method == 'POST':
        username = lastusername
        password = request.form['password']
        #for i in password:
        #    for k in username:
        #        if i == k:
        #            return render_template("auth.html", Username = lastusername)
        actualusername = lastusername.hex
        #print(lastusername.hex)
        for i in password:
            for k in actualusername:
                if i == k:
                    return render_template("auth.html", Username = lastusername, messages = "Your password cannot contain any parts of your username")
        if(request.form.get('checkbox1') == "on"):
            return render_template("auth.html", Username = lastusername, messages = "Please don't disagree to the terms and conditions")
        if(request.form.get('checkbox2') == None):
            return render_template("auth.html", Username = lastusername, messages = "Please agree to the terms and conditions")
        #print(request.form.get('checkbox1'))
        #print(request.form.get('checkbox2'))
        realage = request.form.get('ages').split("+")
        if(int(realage[0]) < 18):
            return render_template("auth.html", Username = lastusername, messages = "Please have a parent make an account for you since you are underaged")

        result = db_modules.add_user(actualusername, password)
        if (result == "Username already exists"):
            return render_template("auth.html", Username = lastusername, messages = result)
        session['username'] = username
        return redirect(url_for('landing'))
    updateusername()
    return render_template("auth.html", Username = lastusername)

# Login function
@app.route("/login", methods = ['GET', 'POST'])
def login():
    if 'username' in session:
        return redirect(url_for('landing'))
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        result = db_modules.login_user(username, password)
        if (result == "Login successful"):
            session['username'] = username
            return redirect(url_for('landing'))
        return render_template("login.html", messages = result)
    return render_template("login.html")

@app.route("/profile")
def profile():
    if 'username' in session:
        return render_template("profile.html", username = session['username'])
    return redirect(url_for('profile'))

# Logout page
@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for('landing'))

#----------------------------------------------------------------------------------------------------------------

# Classic game mode game page
@app.route("/game")
def game():
    session['streak'] = 0  # Reset the streak
    if 'username' in session:
        return render_template("game.html", timerOn = False, logged_in = True, username = session['username'], streak=session['streak'])
    return render_template("game.html")


# Time trial game mode game page
@app.route("/timed")
def timed():
    if 'username' in session:
        return render_template("game.html", timerOn = True, logged_in = True, username = session['username'])
    return render_template("game.html", timerOn = True)

# Function to get data for classic game mode
@app.route("/getGameInfo")
def getGameInfo():

    word1 = api_modules.randomTopic()
    word2 = api_modules.randomTopic()

    word1Amount = api_modules.getSearchVolume(word1)
    word2Amount = api_modules.getSearchVolume(word2)

    word1Gif = api_modules.getGif(word1)
    word2Gif = api_modules.getGif(word2)

    print(word1Gif)
    print(word2Gif)

    x = {'word1': word1, 'count1': word1Amount, 'gif1': word1Gif,'word2': word2, 'count2': word2Amount, 'gif2': word2Gif}
    return jsonify(x)

@app.route("/defeat")
def defeat():
    streak = session.get('streak', 0)  # Get the streak from session or default to 0
    best_score = db_modules.get_specific_game_scores()
    print(streak)
    print(best_score)
    if streak > best_score[0][2]:
        db_modules.update_game_score(session['username'], streak)
        print("score updated")
    return render_template("defeat.html", streak=streak)

@app.route('/save_streak', methods=['POST'])
def save_streak():
    data = request.json
    session['streak'] = int(data.get('streak', 0))  # Save streak in Flask session
    return jsonify({'success': True})

#----------------------------------------------------------------------------------------------------------------

@app.route("/game2")
def game2():
    return render_template("game2.html")

@app.route("/getGameInfo2")
def getGameInfoJson():
    randomAmount = random.randint(3, 7)

    x = {}

    for i in range(1, randomAmount + 1):
        word = api_modules.randomTopic()
        searchCount = api_modules.getSearchVolume(word)
        gif = api_modules.getGif(word)

        x[f'word{i}'] = word
        x[f'count{i}'] = searchCount
        x[f'gif{i}'] = gif
    
    return jsonify(x)


#----------------------------------------------------------------------------------------------------------------

# Game description
@app.route("/gdesc")
def gdesc():
    return render_template("gdesc.html")

#----------------------------------------------------------------------------------------------------------------

# Losing screen
@app.route("/lose")
def lose():
    return render_template("lose.html", score = 0, highscore = 5)
if __name__ == "__main__":
    app.debug = True
    app.run()
