"""
Akasha: QianjunZhou, AidanWong, IvanGontchar, JasonChao
SoftDev
P02: Makers Makin' It, Act I
2025-01-09
Time Spent: 1
"""

import urllib.request, json
from urllib.parse import urlencode
import urllib
import random

def getKey(apiName):
    if apiName == "serpAPI":
        apiFile = "key_serpAPI.txt"
    elif apiName == "giphy":
        apiFile = "key_giphy.txt"
    elif apiName == "apininja":
        apiFile = "key_apininja.txt"
    else:
        return "INVALID API NAME"

    keyFile = "keys/" + apiFile
    with open(keyFile, "r") as keyFile:
        api_key = keyFile.read().strip()
        if api_key == "":
            return "KEY NOT FOUND"
        return api_key

############################# GiphyAPI #############################

def getGif(tag):

    APIKEY = getKey("giphy")

    if APIKEY == "KEY NOT FOUND": # Easy error handling if needed
        return 404
    if APIKEY == "INVALID API NAME":
        return 405

    params = {
        "api_key": APIKEY,
        "tag": tag,
        "number": 30
    }

    paramString = urlencode(params)
    url = f"https://api.giphy.com/v1/gifs/random?{paramString}"
    headers = {'User-Agent': 'Mozilla/5.0'}
    request = urllib.request.Request(url, headers=headers)

    try:
        with urllib.request.urlopen(request) as response:
            data = json.loads(response.read().decode('utf-8'))
            if 'data' in data and data['data']:
                return data['data']['images']["original"]["url"]
            else:
                return "No gif found"

    except Exception as e:
        print(f"Exception occurred: {e}")
        return 403

############################# Datamuse #############################

def getRandomSearch():
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    randomLength = random.randint(3, 13)

    randomLetter = random.choice(letters)
    randomWord = randomLetter + '?' * randomLength

    params = {
        "sp": randomWord
    }

    paramString = urlencode(params)
    url = f"https://api.datamuse.com/words?{paramString}"
    print(url)
    headers = {'User-Agent': 'Mozilla/5.0'}
    request = urllib.request.Request(url, headers=headers)

    try:
        with urllib.request.urlopen(request) as response:
            data = json.loads(response.read().decode('utf-8'))
            return data[random.randint(0, len(data) - 1)]["word"]

    except Exception as e:
        print(f"Exception occurred: {e}")
        return 403


############################# SerpAPI #############################

def getSearchVolume(keyword):

    APIKEY = getKey("serpAPI")

    if APIKEY == "KEY NOT FOUND": # Easy error handling if needed
        return 404
    if APIKEY == "INVALID API NAME":
        return 405

    params = {
            "api_key": APIKEY,
            "q": keyword
        }

    paramString = urlencode(params)
    url = f"https://serpapi.com/search?engine=google_trends&{paramString}"
    headers = {'User-Agent': 'Mozilla/5.0'}
    request = urllib.request.Request(url, headers=headers)


    try:
        with urllib.request.urlopen(request) as response:
            data = json.loads(response.read().decode('utf-8'))
            if 'interest_over_time' in data and data['interest_over_time']:
                length = len(data["interest_over_time"]["timeline_data"])
                return data["interest_over_time"]["timeline_data"][length - 1]["values"][0]["value"]
            else:
                return "Error"

    except Exception as e:
        print(f"Exception occurred: {e}")
        return 403

############################# Ninjas #############################

def randomCategory(category):
    APIKEY = getKey("apininja")

    if category == "celebrity":
        category = "celebrity?min_net_worth=1"
    elif category == "cats":
        category = "cats?min_life_expectancy=1"
    elif category == "dogs":
        category = "dogs?min_life_expectancy=1"


    url = f"https://api.api-ninjas.com/v1/{category}"
    headers = {'User-Agent': 'Mozilla/5.0', 'X-Api-KEY': APIKEY}
    request = urllib.request.Request(url, headers=headers)
    print(url)

    try:
        with urllib.request.urlopen(request) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data:
                return data


    except Exception as e:
        print (f"Exception occured: {e}")
        return 403

def randomTopic():
    APIKEY = getKey("apininja")

    possibleCategories = ["celebrity", "cats", "dogs", "word"]

    category = possibleCategories[random.randint(0, 3)]

    if category == "celebrity":
        backCategory = "celebrity?min_net_worth=1"
    elif category == "cats":
        backCategory = "cats?min_life_expectancy=1"
    elif category == "dogs":
        backCategory = "dogs?min_life_expectancy=1"
    elif category == "word":
        return getRandomSearch()


    url = f"https://api.api-ninjas.com/v1/{backCategory}"
    headers = {'User-Agent': 'Mozilla/5.0', 'X-Api-KEY': APIKEY}
    request = urllib.request.Request(url, headers=headers)
    print(url)

    try:
        with urllib.request.urlopen(request) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data:
                return data[random.randint(0, len(data) - 1)]["name"]

    except Exception as e:
        print (f"Exception occured: {e}")
        return 403
