"""
Akasha: QianjunZhou, AidanWong, IvanGontchar, JasonChao
SoftDev
P02: Makers Makin' It, Act I
2025-01-09
Time Spent: 1
"""

from flask import Flask, render_template, redirect, session

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def landing():
    return render_template("landing.html", logged_in = True)

if __name__ == "__main__":
    app.debug = True
    app.run()
