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
                <div id="count${wordIndex}" class="search-count">Loading</div>
            `;
            button.addEventListener('click', () => makeGuess(wordIndex));

            // Append to the game container
            gameContainer.appendChild(button);
            document.getElementById(`gif${wordIndex}`).src = gameData[`gif${wordIndex}`];
            document.getElementById(`count${wordIndex}`).innerText = `Searches: ${gameData[`count${wordIndex}`]}`;
        }
    });

    // Initialize correct answer logic
    const wordCounts = Object.keys(gameData)
    .filter(key => key.startsWith('count'))
    .map(key => parseInt(gameData[key], 10));
    console.log(wordCounts);

    // Find the maximum value in wordCounts
    let maxValue = 0;
    for (let i = 0; i < wordCounts.length; i++) {
        if (wordCounts[i] > maxValue) {
            maxValue = wordCounts[i];
        }
    }

    // Find the index of the word with the maximum count
    const maxIndex = wordCounts.indexOf(maxValue) + 1; // Add 1 for 1-based index
    if (maxIndex > 0) {
        window.correctAnswer = maxIndex; // Set the correct answer index
    } else {
        window.correctAnswer = 0;  // In case of a tie (multiple max values)
    }

    // Store search counts dynamically
    window.searchCounts = Object.keys(gameData)
        .filter(key => key.startsWith('count'))
        .reduce((acc, key, index) => {
            acc[`word${index + 1}`] = gameData[key];
            return acc;
        }, {});
}


function makeGuess(guessIndex) {
    const correct = guessIndex === window.correctAnswer;

    // Loop through dynamically based on the number of words
    const gameContainer = document.getElementById('game-container');
    const buttons = gameContainer.getElementsByClassName('word-button');

    Array.from(buttons).forEach((button, index) => {
        const buttonIndex = index + 1; // Convert to 1-based index
        button.classList.add(
            guessIndex === buttonIndex
                ? (correct ? 'correct' : 'wrong')
                : (window.correctAnswer === buttonIndex ? 'correct' : 'wrong')
        );
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
