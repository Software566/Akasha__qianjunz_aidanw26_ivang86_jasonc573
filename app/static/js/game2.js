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
    const response = await fetch('http://127.0.0.1:5000/getGameInfo2');  // Update to call your getGameInfo2 route
    const data = await response.json();
    return data;
}

if (!sessionStorage.getItem('streak')) {
    sessionStorage.setItem('streak', '0');
}

function updateStreakDisplay() {
    const streakDisplay = document.getElementById('streak');
    if (streakDisplay) {
        streakDisplay.innerText = `Streak: ${sessionStorage.getItem('streak')}`;
    }
}

async function startGame() {
    const gameData = await getWordData();
    
    // Clear previous game buttons
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    // Loop over the game data to dynamically create the buttons
    Object.keys(gameData).forEach((key, index) => {
        if (key.startsWith('word')) {
            const wordIndex = key.replace('word', '');
            const button = document.createElement('button');
            button.classList.add('word-button');
            button.id = `button${wordIndex}`;
            button.innerHTML = `
                <img id="gif${wordIndex}" alt="Word ${wordIndex}" style="margin-bottom: 20px;">
                <div id="word${wordIndex}">${gameData[key]}</div>
                <div id="count${wordIndex}" class="search-count" >Loading</div>
            `;
            button.addEventListener('click', () => makeGuess(wordIndex, gameData));

            // Append to the game container
            gameContainer.appendChild(button);
            document.getElementById(`gif${wordIndex}`).src = gameData[`gif${wordIndex}`];
        }
    });

    // Initialize correct answer logic
    const wordCounts = Object.keys(gameData)
        .filter(key => key.startsWith('count'))
        .map(key => gameData[key]);

    if (wordCounts[0] === wordCounts[1]) {
        window.correctAnswer = 0;  // It's a tie
    } else {
        window.correctAnswer = wordCounts[0] > wordCounts[1] ? 1 : 2;
        window.searchCounts = { word1: wordCounts[0], word2: wordCounts[1] };
    }
}

function makeGuess(guess, gameData) {
    const correct = guess === window.correctAnswer;

    // Reveal search counts after the guess is made
    Object.keys(gameData).forEach((key, index) => {
        if (key.startsWith('count')) {
            const buttonIndex = key.replace('count', '');
            document.getElementById(`count${buttonIndex}`).innerText = `Searches: ${gameData[key]}`;
            document.getElementById(`count${buttonIndex}`).style.display = 'block';
        }
    });

    // Apply classes to the buttons based on the user's guess
    Object.keys(gameData).forEach((key, index) => {
        if (key.startsWith('word')) {
            const buttonIndex = key.replace('word', '');
            const button = document.getElementById(`button${buttonIndex}`);
            button.classList.add(guess === buttonIndex ? (correct ? 'correct' : 'wrong') : (window.correctAnswer === buttonIndex ? 'correct' : 'wrong'));
        }
    });

    // Update streak based on the correctness of the guess
    if (correct) {
        let streak = parseInt(sessionStorage.getItem('streak')) || 0;
        streak++;
        sessionStorage.setItem('streak', streak.toString());
    } else {
        let streak = sessionStorage.getItem('streak') || '0';
        fetch('/save_streak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ streak }),
        }).then(() => {
            sessionStorage.setItem('streak', '0');
            window.location.href = '/defeat';
        });
        return;
    }

    updateStreakDisplay();
    setTimeout(startGame, 3000);
}

document.addEventListener('DOMContentLoaded', updateStreakDisplay);
startGame();
