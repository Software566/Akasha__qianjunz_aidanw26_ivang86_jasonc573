
# Up or Nah by Akasha 

## Roster

**Project Manager + Frontend (HTML and CSS):** Qianjun Ryan Zhou

**Frontend (Javascript):** Ivan Gontchar

**Backend (Database and API Functions):** Jason Chao

**Backend (Python Logic and Website Flow):** Aidan Wong

## Site Description

Up or Nah is a game where users can choose between two options for various topics. There will be three modes: “Classic”, “Tournament”, and “Wild West.” Classic mode is a spin on “Higher or Lower” from higherorlowergame.com, where users choose the option with the higher search count on Google. After making a choice, the numbers are revealed with a fun animation. The game will end when one incorrect answer is made, and the goal is to get the largest streak possible. There will also be fun mods like a time limit for choosing an option, reverse mode (where the goal is to pick the lower-searched topic), and even grid mode, where there are more than two options! The tournament mode is a space where user-generated datasets are put together into a bracket to see the best content of that category (ex. Music, anime, etc). The Wild West mode is where chaos ensues, ranging from guessing the exact search count of a topic to the rules changing mid-game. Although this is playable without an account, one must track personal scores, compete with other users on the leaderboards, and contribute data sets. This simple yet addictive game is the perfect way to pass the time while keeping you updated with trending and popular topics. 

## Install Guide

**Prerequisites**

Ensure that **Git** and **Python** are installed on your machine. It is recommended that you use a virtual machine when running this project to avoid any possible conflicts. For help, refer to the following documentation:
   1. Installing Git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git 
   2. Installing Python: https://www.python.org/downloads/ 

   3. (Optional) Setting up Git with SSH (Ms. Novillo's APCSA Guide): https://novillo-cs.github.io/apcsa/tools/ 
         

**Cloning the Project**
1. Create Python virtual environment:

```
$ python3 -m PATH/TO/venv_name
```

2. Activate virtual environment 

   - Linux: `$ . PATH/TO/venv_name/bin/activate`
   - Windows (PowerShell): `> . .\PATH\TO\venv_name\Scripts\activate`
   - Windows (Command Prompt): `>PATH\TO\venv_name\Scripts\activate`
   - macOS: `$ source PATH/TO/venv_name/bin/activate`

   *Notes*

   - If successful, command line will display name of virtual environment: `(venv_name) $ `

   - To close a virtual environment, simply type `$ deactivate` in the terminal


3. In terminal, clone the repository to your local machine: 

HTTPS METHOD (Recommended)

```
$ git clone https://github.com/RyanThe1o8th/Akasha__qianjunz_aidanw26_ivang86_jasonc573.git      
```

SSH METHOD (Requires SSH Key to be set up):

```
$ git clone git@github.com:RyanThe1o8th/Akasha__qianjunz_aidanw26_ivang86_jasonc573.git
```

4. Navigate to project directory

```
$ cd PATH/TO/Akasha__qianjunz_aidanw26_ivang86_jasonc573
```

5. Install dependencies

```
$ pip install -r requirements.txt
```
        
# Launch Codes

1. Navigate to project directory:

```
$ cd PATH/TO/Akasha__qianjunz_aidanw26_ivang86_jasonc573/
```
 
2. Navigate to 'app' directory

```
 $ cd app/
```

3. Run App

```
 $ python3 __init__.py
```
4. Open the link that appears in the terminal to be brought to the website
    - You can visit the link via several methods:
        - Control + Clicking on the link
        - Typing/Pasting http://127.0.0.1:5000 in any browser
    - To close the app, press control + C when in the terminal

```    
* Running on http://127.0.0.1:5000
``` 
