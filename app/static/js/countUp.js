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

var animate = function(id)
{
  console.log("STARTING ANIMATE");
  var textBox = document.getElementById(id);
  if(finished == -1){
    finished = textBox.innerText;
    const ary = finished.split(" ");
    finished = parseInt(ary[1]);
    console.log(finished);
  }

  textBox.innerText = "SEARCHES: " + start.toLocaleString();

  start+= Math.ceil((finished / (100)));
  console.log(start.toLocaleString());
  // sleep(1000);


  requestID = window.requestAnimationFrame( animate );
  if (start >= finished){
    finished = parseInt(finished);
    // console.log("TRYING: " + finished.toLocaleString());
    textBox.innerText = "SEARCHES: " + finished.toLocaleString();
    // console.log("HERE: " + textBox.innerText);
    done = true;
    console.log("DONE!!!");
    console.log(textBox.innerText);
    stopIt();
    return 0;
  }
};


var stopIt = function()
{
  console.log( requestID );
  window.cancelAnimationFrame( requestID );
};

animate("count1");
animate("count2");
// dotButton.addEventListener( "click", animate );
// stopButton.addEventListener( "click",  stopIt );
