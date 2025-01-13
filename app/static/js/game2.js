async function getWordData() {
    const response = await fetch('http://127.0.0.1:5000/getGameInfo');
    const data = await response.json();
    return data;
}

async function startGame() {
    //const { word1, count1, word2, count2 } = await getWordData();
    var listOfObjects = await getWordDate();
    var maxValue = -1;
    var maxValueLocation = [];
    var searchCount = new Map();
    for (let i = 0; i < listOfObjects.length/2; i++){
        document.getElementById('word' + i).innerText = listOfObject[i];
        document.getElementById('count' + i).innerText = "";
        document.getElementById('button' + i).classList.remove('correct', 'wrong');
        searchCount.set(i, listOfObjects[i+listOfObjects.length/2]);
        if (maxValue < listOfObjects[i + listOfObjeects.length/2]){
            maxValue = listOfObjects[i + listOfObjeects.length/2];
            maxValueLocation = [];
            maxValueLocation.add(i);
        }
        else if (maxValue === listOfObjects[i + listOfObjeects.length/2]){
            maxValueLocation.add(i);
        }
    }
    window.correctAnswer = maxValueLocation;
    window.searchCount = searchCount;

/*
    document.getElementById('word1').innerText = word1;
    document.getElementById('word2').innerText = word2;

    document.getElementById('count1').innerText = "";
    document.getElementById('count2').innerText = "";

    document.getElementById('button1').classList.remove('correct', 'wrong');
    document.getElementById('button2').classList.remove('correct', 'wrong');

    if (count1 === count2) {
        window.correctAnswer = 0;
    }
    else {
        window.correctAnswer = count1 > count2 ? 1 : 2;
        window.searchCounts = { word1: count1, word2: count2 };
    }
*/
    
}

function makeGuess(guess) {
    //const correct = guess === window.correctAnswer;

    for(let i = 0; i < 3; i++){
        if(window.correctAnswer.length == 1){
            if (i == window.correctAnswer[0]){
                document.getElementById('button'+i).classList.add("correct");
            }
            else{
                document.getElementById('button'+i).classList.add("wrong");
            }
        }
        else if(window.correctAnswer.length > 1){
            var found = false;
            for(let k = 0; k < window.correctAnswer.length && !found; k++){
                if(window.correctAnswer[k] == i){
                    found=true;
                    document.getElementById('button'+i).classList.add("tie");
                }
            }
            if(!found){
                document.getElementById('button'+i).classList.add("wrong");
            }

        }
        document.getElementById('count' + i).innerText = `Searches: ${window.searchCounts.get(i)}`;
    }
    /*
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');

    if (window.correctAnswer === 0) {
        button1.classList.add('tie');
        button2.classlist.add('tie');
        document.getElementById('count1').innerText = `Searches: ${window.searchCounts.word1}`;
        document.getElementById('count2').innerText = `Searches: ${window.searchCounts.word2}`;
    }
    else {

        button1.classList.add(guess === 1 ? (correct ? 'correct' : 'wrong') : (window.correctAnswer != 1 ? 'wrong' : 'correct'));

        document.getElementById('count1').innerText = `Searches: ${window.searchCounts.word1}`;
        document.getElementById('count2').innerText = `Searches: ${window.searchCounts.word2}`;
    }
*/
    

    setTimeout(startGame, 3000);
}

startGame();