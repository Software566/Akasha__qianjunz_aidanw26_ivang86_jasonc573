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


var radius = c.width / 2;
var done = false;

let start = -1;
var drawDot = function()
{
  if(start == -1){
    start = performance.now();
  }
  var textBox = document.getElementById("timerText");

  let curr = performance.now();

  let elapsed = 10 - Math.trunc(((curr - start) / 1000));
  console.log(elapsed);

  textBox.innerText = elapsed;

  //draw the dot
  ctx.beginPath();
  ctx.arc( c.width / 2, c.height / 2, radius, 0, 2 * Math.PI );
  ctx.stroke();
  ctx.fill();

  requestID = window.requestAnimationFrame( drawDot );
  if (done){
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

dotButton.addEventListener( "click", drawDot );
stopButton.addEventListener( "click",  stopIt );
