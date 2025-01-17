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
        // animate('count1', window.searchCounts.word1);
        // animate('count2', window.searchCounts.word2);
        document.getElementById('count1').innerText = `Searches: ${window.searchCounts.word1}`;
        document.getElementById('count2').innerText = `Searches: ${window.searchCounts.word2}`;
    }
    else {
        button1.classList.add(guess === 1 ? (correct ? 'correct' : 'wrong') : (window.correctAnswer === 1 ? 'correct' : 'wrong'));
        button2.classList.add(guess === 2 ? (correct ? 'correct' : 'wrong') : (window.correctAnswer === 2 ? 'correct' : 'wrong'));

        // animate('count1', window.searchCounts.word1);
        // animate('count2', window.searchCounts.word2);
        document.getElementById('count1').innerText = `Searches: ${window.searchCounts.word1}`;
        document.getElementById('count2').innerText = `Searches: ${window.searchCounts.word2}`;
    }



    setTimeout(startGame, 3000);
}

var done = false;
var finished = -1;
var start = 0;
var animate = function(id, max)
{
  console.log("STARTING ANIMATE");
  var textBox = document.getElementById(id);
  if(finished == -1){
    finished = max;
    console.log(finished);
  }


  while((start >= finished)){
    textBox.innerText = "SEARCHES: " + start.toLocaleString();

    start+= Math.ceil((finished / (100)));
    console.log(start.toLocaleString());
    // sleep(1000);


    requestID = window.requestAnimationFrame( animate );
  }
  textBox.innerText = "SEARCHES: " + finished.toLocaleString();
  // console.log("HERE: " + textBox.innerText);
  done = true;
  console.log("DONE!!!");
  console.log(textBox.innerText);
  window.cancelAnimationFrame( requestID );
  return 0;
};


startGame();
