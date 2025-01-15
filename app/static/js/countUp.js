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

var animate = function(e)
{
  if(start == -1){
    start = performance.now();
  }
  var textBox = document.getElementById("timerText");


  let elapsed = 5 - Math.trunc(((curr - start) / 1000));
  console.log(elapsed);

  textBox.innerText = elapsed;

  requestID = window.requestAnimationFrame( timer );
  if (elapsed <= 0){
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
