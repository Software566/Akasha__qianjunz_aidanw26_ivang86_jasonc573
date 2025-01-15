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
        var per = listOfObjects[i];
        if (per["net_worth"] > maxValue){
            maxValue = per["net_worth"];
            valuedUsers = [];
            valuedUsers.push(per["name"])
        }
        else if (per["net_worth"] == maxValue){
            valuedUsers.push(per["name"])
        }
    }
    console.log(maxValue)
    console.log(valuedUsers)
    console.log(listOfObjects);
}

function makeGuess(guess) {
    const correct = guess === window.correctAnswer;
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');

    if (window.correctAnswer === 0) {
        button1.classList.add('tie');
        button2.classlist.add('tie');
        document.getElementById('count1').innerText = `Searches: ${window.searchCounts.word1}`;
        document.getElementById('count2').innerText = `Searches: ${window.searchCounts.word2}`;
    }
    else {
        button1.classList.add(guess === 1 ? (correct ? 'correct' : 'wrong') : (window.correctAnswer === 1 ? 'correct' : 'wrong'));
        button2.classList.add(guess === 2 ? (correct ? 'correct' : 'wrong') : (window.correctAnswer === 2 ? 'correct' : 'wrong'));

        document.getElementById('count1').innerText = `Searches: ${window.searchCounts.word1}`;
        document.getElementById('count2').innerText = `Searches: ${window.searchCounts.word2}`;
    }

    

    setTimeout(startGame, 3000);
}

startGame();
