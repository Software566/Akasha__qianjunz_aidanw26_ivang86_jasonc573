"""
Akasha: QianjunZhou, AidanWong, IvanGontchar, JasonChao
SoftDev
P02: Makers Makin' It, Act I
2025-01-09
Time Spent: 1
"""

from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
import os
import datetime
import string
import random
import uuid; 

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
        for i in password:
            for k in username:
                if i == k:
                    return render_template("auth.html", Username = lastusername)
        session['username'] = username
        print(request.form.get('ages'))
        print(request.form.get('checkbox1'))
        print(request.form.get('checkbox2'))
        return redirect(url_for('landing'))
    updateusername()
    return render_template("auth.html", Username = lastusername)

@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for('landing'))

if __name__ == "__main__":
    app.debug = True
    app.run()
