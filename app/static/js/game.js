document.addEventListener('DOMContentLoaded', function () {
    const pfpContainer = document.querySelector('.pfp-container');
    const dropdown = document.querySelector('.dropdown');

    pfpContainer.addEventListener('click', function () {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!pfpContainer.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
});

async function getWordData() {
    const response = await fetch('http://127.0.0.1:5000/getGameInfo');
    const data = await response.json();
    return data;
}

async function startGame() {
    const { word1, count1, word2, count2 } = await getWordData();

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
