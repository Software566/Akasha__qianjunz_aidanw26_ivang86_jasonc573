// Clyde "Thluffy" Sinclair
// SoftDev pd0
// canvas-based, JS-driven animation basics
// 2025-01-09r
// --------------------------------------------------

//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
// var c = document.getElementById("timerArea");
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
    window.location.replace("http://127.0.0.1:5000/lose");
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
