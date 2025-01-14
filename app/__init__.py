"""
Akasha: QianjunZhou, AidanWong, IvanGontchar, JasonChao
SoftDev
P02: Makers Makin' It, Act I
2025-01-09
Time Spent: 1
"""

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

@app.route('/', methods = ['GET', 'POST'])
def landing():
    if 'username' in session:
        return render_template("landing.html", logged_in = True, username = session['username'])
    return render_template("landing.html", logged_in = False)


def updateusername():
    global lastusername
    lastusername = uuid.uuid4()
    return 0

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

@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for('landing'))

@app.route("/game")
def game():
    if 'username' in session:
        return render_template("game.html", logged_in = True, username = session['username'])
    return render_template("game.html")

@app.route("/getGameInfo")
def getGameInfo():
    word1 = api_modules.getRandomSearch()
    word2 = api_modules.getRandomSearch()

    word1Amount = api_modules.getSearchVolume(word1)
    word2Amount = api_modules.getSearchVolume(word2)

    x = {'word1': word1, 'count1': word1Amount, 'word2': word2, 'count2': word2Amount}
    return jsonify(x)

@app.route("/game2")
def game2():
    #result = api_modules.getTop30(10000)
    #result = [{"name": "lenny dykstra", "net_worth": -25000000, "gender": "male", "nationality": "us", "occupation": ["baseball_player"], "birthday": "1963-02-10", "age": 61, "is_alive": true}, {"name": "jackie wilson", "net_worth": 10000, "gender": "male", "nationality": "us", "occupation": ["singer", "musician", "singer-songwriter"], "birthday": "1934-06-09", "age": 49, "is_alive": false, "death": "1984-01-21"}, {"name": "danielle staub", "net_worth": -1000000, "gender": "female", "nationality": "us", "height": 1.75, "birthday": "1962-07-29", "age": 62, "is_alive": true}, {"name": "jam master jay", "net_worth": -1000000, "gender": "male", "nationality": "us", "occupation": ["disc_jockey", "musician", "rapper", "actor"], "birthday": "1965-01-21", "age": 37, "is_alive": false, "death": "2002-10-30"}, {"name": "joe giudice", "net_worth": -11000000, "gender": "male", "height": 1.65}, {"name": "de'aundre bonds", "net_worth": 10000, "gender": "male", "nationality": "us", "occupation": ["actor"], "birthday": "1976-03-19", "age": 48, "is_alive": true}, {"name": "lillo brancato jr", "net_worth": 10000, "gender": "male", "nationality": "us", "occupation": ["actor"], "birthday": "1976-03-30", "age": 48, "is_alive": true}, {"name": "michael cohen", "net_worth": -1000000, "gender": "male", "occupation": ["politician"], "birthday": "1966-08-25", "age": 58, "is_alive": true}, {"name": "len barrie", "net_worth": -5000000, "gender": "male", "nationality": "ca", "birthday": "1969-06-04", "age": 55, "is_alive": true}, {"name": "corey haim", "net_worth": 5000, "gender": "male", "nationality": "ca", "occupation": ["actor", "film_producer", "musician", "painter"], "height": 1.73, "birthday": "1971-12-23", "age": 38, "is_alive": false, "death": "2010-03-10"}, {"name": "teresa giudice", "net_worth": -11000000, "gender": "female", "nationality": "us", "occupation": ["actor"], "height": 1.73, "birthday": "1972-05-18", "age": 52, "is_alive": true}, {"name": "brian dunkleman", "net_worth": 10000, "gender": "male", "nationality": "us", "occupation": ["comedian", "actor", "presenter"], "birthday": "1971-09-25", "age": 53, "is_alive": true}, {"name": "austin jones", "net_worth": 10000}, {"name": "george jung", "net_worth": 10000, "gender": "male", "nationality": "us", "birthday": "1942-08-06", "age": 82, "is_alive": true}, {"name": "nick denton", "net_worth": -10000000, "gender": "male", "nationality": "gb", "occupation": ["journalist", "editor", "internet_entrepreneur"], "birthday": "1966-08-24", "age": 58, "is_alive": true}, {"name": "joe exotic", "net_worth": -1000000}, {"name": "nevin shapiro", "net_worth": -82000000, "gender": "male", "birthday": "1969-04-13", "age": 55, "is_alive": true}, {"name": "mahatma gandhi", "net_worth": 1000, "gender": "male", "nationality": "in", "occupation": ["lawyer", "politician", "philosopher", "writer"], "height": 1.64, "birthday": "1869-10-02", "age": 78, "is_alive": false, "death": "1948-01-30"}, {"name": "amber portwood", "net_worth": 10000, "gender": "female", "nationality": "us", "occupation": ["tv_personality"], "birthday": "1990"}, {"name": "dmx", "net_worth": -1000000, "gender": "male", "nationality": "us", "occupation": ["actor", "rapper", "film_producer"], "height": 1.8, "birthday": "1970-12-18", "age": 54, "is_alive": true}, {"name": "shifty shellshock", "net_worth": 10000, "gender": "male", "nationality": "us", "occupation": ["singer", "actor"], "height": 1.7, "birthday": "1974-08-23", "age": 50, "is_alive": true}, {"name": "redd foxx", "net_worth": -3500000, "gender": "male", "nationality": "us", "occupation": ["comedian", "actor", "screenwriter"], "height": 1.72, "birthday": "1922-12-09", "age": 68, "is_alive": false, "death": "1991-10-11"}, {"name": "jamal lewis", "net_worth": -1000000, "gender": "male", "nationality": "us", "occupation": ["american_football_player"], "height": 1.8, "birthday": "1979-08-26", "age": 45, "is_alive": true}, {"name": "dana plato", "net_worth": 1000, "gender": "female", "nationality": "us", "occupation": ["actor"], "height": 1.57, "birthday": "1964-11-07", "age": 34, "is_alive": false, "death": "1999-05-08"}, {"name": "craig carton", "net_worth": -4000000, "gender": "male", "nationality": "us", "birthday": "1969-01-31", "age": 55, "is_alive": true}, {"name": "dalai lama", "net_worth": 1, "gender": "male", "occupation": ["writer", "philosopher", "lama"], "birthday": "1935-07-06", "age": 89, "is_alive": true}, {"name": "eric williams", "net_worth": -100000, "gender": "male", "nationality": "us", "occupation": ["basketball_player"], "birthday": "1972-07-17", "age": 52, "is_alive": true}, {"name": "casey anthony", "net_worth": -800000, "gender": "female", "nationality": "us", "birthday": "1987"}, {"name": "whitney houston", "net_worth": -20000000, "gender": "female", "nationality": "us", "occupation": ["record_producer", "singer", "model", "songwriter", "film_producer", "actor", "musician", "artist", "music_artist"], "height": 1.73, "birthday": "1963-08-09", "age": 48, "is_alive": false, "death": "2012-02-11"}, {"name": "dick york", "net_worth": 10000, "gender": "male", "nationality": "us", "occupation": ["actor"], "height": 1.85, "birthday": "1928-09-04", "age": 63, "is_alive": false, "death": "1992-02-20"}]
    return render_template("game2.html", mainData = getGameInfo2())

@app.route("/getGameInfo2")
def getGameInfo2():
    result = api_modules.getTop30(10000)
    result = str(result)
    result = result[2:-2]
    result = result.split("}, {")
    maindict = {}
    count = 0
    for i in result:
        i = i.replace('"', '')
        i = i.split(":")
        subdict = {}
        #print(isinstance(i, list))
        #print(i)
        for k in range(len(i)-1):
            if (k != 0 and k != (len(i) - 1)):
                if(i[k].rsplit(",")[-1].strip() == "name" or i[k].rsplit(",")[-1].strip() == "net_worth"):
                    subdict[i[k].rsplit(",")[-1].strip()] = i[k+1].split(",", 1)[0].strip()
            elif (k == 0):
                if(i[k].strip() == "name" or i[k].strip() == "net_worth"):
                    subdict[i[k].strip()] = i[k+1].split(",", 1)[0].strip()
            else:
                if(i[k].rsplit(",")[-1].strip() == "name" or i[k].rsplit(",")[-1].strip() == "net_worth"):
                    subdict[i[k].rsplit(",")[-1].strip()] = i[k+1].strip()
        maindict[count] = subdict
        count+=1
    #print(maindict)
    return maindict
    return render_template("game2.html")

@app.route("/profile")
def profile():
    if 'username' in session:
        return render_template("profile.html", username = session['username'])
    return redirect(url_for('profile'))

if __name__ == "__main__":
    app.debug = True
    app.run()
