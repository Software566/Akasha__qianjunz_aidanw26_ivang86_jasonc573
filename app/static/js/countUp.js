// Clyde "Thluffy" Sinclair
// SoftDev pd0
// canvas-based, JS-driven animation basics
// 2025-01-09r
// --------------------------------------------------

//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
var c = document.getElementById("timerArea");
var dotButton = document.getElementById( "circle" );
var stopButton = document.getElementById( "stop" );

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");

//set fill color to red
ctx.fillStyle = "#FF0000";


var requestID;

function sleep (time){
  return new Promise((resolve) => setTimeout(resolve, time));
}

var clear = function(e)
{
  e.preventDefault();
  ctx.clearRect(0, 0, 500, 500);
};


var done = false;
var finished = -1;
var start = 0;

var animate = function(e)
{
  var textBox = document.getElementById("answerText");
  if(finished == -1){
    finished = textBox.innerText;
    console.log(finished);
  }

  textBox.innerText = start;

  start+= Math.trunc((finished / 270));
  console.log(start.toLocaleString());
  sleep(1000);


  requestID = window.requestAnimationFrame( animate );
  if (start > finished){
    textBox.innerText = finished;
    console.log("DONE!!!");
    stopIt();
    return 0;
  }
};

var stopIt = function()
{
  console.log( requestID );
  window.cancelAnimationFrame( requestID );
};

dotButton.addEventListener( "click", animate(10000000));
stopButton.addEventListener( "click",  stopIt );
