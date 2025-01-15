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
    return render_template("game2.html", mainData = getGameInfo2())

@app.route("/getGameInfo2")
def getGameInfo2():
    result = api_modules.randomCategory('celebrity')

    if not result or not isinstance(result, list): # Quick error handling
        print("No data available or result is not a list.")
        return

    randomAmount = 3 # Make it actually random

    information = []

    for i in range(randomAmount):
        randomChoice = result[random.randint(0, len(result) - 1)]
        information.append({
            'name': randomChoice['name'],
            'net_worth': randomChoice['net_worth']
        })

    print(information)
    # return information # For when its working


    """
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
    """

@app.route("/profile")
def profile():
    if 'username' in session:
        return render_template("profile.html", username = session['username'])
    return redirect(url_for('profile'))

if __name__ == "__main__":
    app.debug = True
    app.run()
