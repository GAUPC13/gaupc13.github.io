// MATRIX.JS
// This is a combination of these 2 projects
// https://codepen.io/P3R0/pen/MwgoKv/?editors=0010#0
// https://www.youtube.com/watch?v=S1TQCi9axzg
// https://p5js.org/

// setup the canvas
var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// 5-50 is reasonable for font_size
var font_size = 20;

//number of columns for the rain
var columns = c.width/font_size; 

// create an array where each element is a unicode katakana character
var katakana = [];
for (var i = 0; i < 96; i++) {
    katakana.push(String.fromCharCode(0x30A0 + i));
}

// a drop is a single katakana character
var drop = function(x, y, char){
    this.dropX = x; 
    this.dropY = y; 
    this.dropChar = char;
    this.tailChar = char;
    };

// each column on the canvas has a drop that moves from top to bottom   
var drops = [];

// initialize the drops
for (var i = 0; i < columns; i++) {
    drops.push((new drop(i*font_size,0,katakana[Math.floor(Math.random()*katakana.length)])));
}

function drawFrame() {
	//Black BG for the canvas
	//translucent BG to show trail  ** This is where the magic happens!  Clever **
	ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.font = font_size + "px courier";

    drops.forEach(function(drop){
        ctx.fillStyle = "#FFF"; // white text
        ctx.fillText(drop.dropChar, drop.dropX, drop.dropY);

        ctx.fillStyle = "#0F0"; // green text
        ctx.fillText(drop.tailChar, drop.dropX, drop.dropY - font_size);

        drop.tailChar = drop.dropChar;
        drop.dropChar = katakana[Math.floor(Math.random()*katakana.length)];

        if (drop.dropY > c.height && Math.random() > 0.975) {
            drop.dropY = 0;
        }else {
            drop.dropY += font_size;
        }
    }) 
}

setInterval(drawFrame, 80);