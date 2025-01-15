async function getWordData() {
    const response = await fetch('http://127.0.0.1:5000/getGameInfoJson');
    const data = await response.json();
    return data;
}

async function startGame() {
    var listOfObjects = await getWordData();
    var maxValue = -1;
    var valuedUsers = [];
    for (var i in listOfObjects){
        document.getElementById('button' + per["name"]).classList.remove('correct', 'wrong')
        document.getElementById(per["name"]).innerText = per["name"];
        document.getElementById('worth' + per["name"]).innerText = "";
        var per = listOfObjects[i];
        if (per["net_worth"] > maxValue){
            maxValue = per["net_worth"];
            valuedUsers = [];
            valuedUsers.push(per["name"]);
        }
        else if (per["net_worth"] == maxValue){
            valuedUsers.push(per["name"]);
        }
    }
    //console.log(maxValue)
    //console.log(valuedUsers)
    //console.log(listOfObjects);
    window.correctAnswer = valuedUsers;
}

function makeGuess(guess) {
    var listOfObjects = await getWordData();
    var correct = window.correctAnswer
    for (var i in listOfObjects){
        var per = listOfObjects[i];
        const button = document.getElementById("button" + per["name"]);
        const worth = document.getElementById("worth" + per["name"]);
        const name = document.getElementById(per["name"]);
        var isValid = false;
        for(var k in correct){
            if (per["name"] == k){
                isValid = true;
                button.classList.add('correct');
            }
        }
        if (!isValid){
            button.classList.add('wrong')
        }
        worth.innerText = 'Wealth:' + per["net_worth"];
    }
    setTimeout(startGame, 3000);
}

startGame();
