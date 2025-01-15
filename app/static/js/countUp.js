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
  var textBox = document.getElementById("timerText");
  if(finished == -1){
    finished = textBox.innerText;
    console.log(finished);
  }

  start++;
  console.log(start);

  textBox.innerText = start;

  requestID = window.requestAnimationFrame( animate );
  if (start >= finished){
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

dotButton.addEventListener( "click", animate(100));
stopButton.addEventListener( "click",  stopIt );
