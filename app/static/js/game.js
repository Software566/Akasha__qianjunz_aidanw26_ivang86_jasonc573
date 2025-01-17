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
    const { word1, count1, gif1, word2, count2, gif2 } = await getWordData();

    document.getElementById('word1').innerText = word1;
    document.getElementById('word2').innerText = word2;

    document.getElementById('count1').innerText = "";
    document.getElementById('count2').innerText = "";

    document.getElementById('gif1').src = gif1;
    document.getElementById('gif2').src = gif2;

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
        button2.classList.add('tie');
        document.getElementById('count1').innerText = `Searches: ${window.searchCounts.word1}`;
        document.getElementById('count2').innerText = `Searches: ${window.searchCounts.word2}`;
    } else {
        button1.classList.add(guess === 1 ? (correct ? 'correct' : 'wrong') : (window.correctAnswer === 1 ? 'correct' : 'wrong'));
        button2.classList.add(guess === 2 ? (correct ? 'correct' : 'wrong') : (window.correctAnswer === 2 ? 'correct' : 'wrong'));

        document.getElementById('count1').innerText = `Searches: ${window.searchCounts.word1}`;
        document.getElementById('count2').innerText = `Searches: ${window.searchCounts.word2}`;
    }

    if (correct) {
        // Increment streak
        let streak = parseInt(sessionStorage.getItem('streak')) || 0;
        streak++;
        sessionStorage.setItem('streak', streak.toString());
    } else {
        // Send streak to the server and redirect to defeat screen
        let streak = sessionStorage.getItem('streak') || '0';
        fetch('/save_streak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ streak }),
        }).then(() => {
            sessionStorage.setItem('streak', '0'); // Reset streak on client-side
            window.location.href = '/defeat';
        });
        return;
    }

    updateStreakDisplay();

    setTimeout(startGame, 3000);
}

var but1 = document.getElementById( "button1" );
var but2 = document.getElementById( "button2" );

//prepare to interact with canvas in 2D
// var ctx = c.getContext("2d");

//set fill color to red
// ctx.fillStyle = "#FF0000";


var requestID;

var clear = function(e)
{
  e.preventDefault();
  ctx.clearRect(0, 0, 500, 500);
};


// var radius = c.width / 2;
var done = false;

let start = -1;
var timer = function()
{
  if(start == -1){
    start = performance.now();
  }
  var textBox = document.getElementById("timerText");

  let curr = performance.now();

  let elapsed = 5 - Math.trunc(((curr - start) / 1000));
  console.log(elapsed);

  textBox.innerText = elapsed;

  requestID = window.requestAnimationFrame( timer );
  if (elapsed <= 0){
    console.log("DONE!!!");
    stopIt();
    window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    return 0;
  }
};

var redir = function(){
  window.location.replace("http://127.0.0.1:5000/profile");
};

var stopIt = function()
{
  console.log( requestID );
  window.cancelAnimationFrame( requestID );
};

timer();
but1.addEventListener( "click", stopIt );
but2.addEventListener( "click",  stopIt );



document.addEventListener('DOMContentLoaded', updateStreakDisplay);
startGame();
