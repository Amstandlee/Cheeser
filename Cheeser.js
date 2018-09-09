"use strict";
function buildMap() {
  var canvas = document.getElementById("kitchen");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(8, 2, 41)";
  //Highscore area.
  ctx.fillRect(0, 0, 672, 55);
  //Lives and amount of time remaining.
  ctx.fillRect(0, 709, 672, 35);
  //48px per move up/down
  //48px per move left/right

  //Edge of wall
  ctx.fillStyle = "rgb(154, 42, 199)";
  ctx.fillRect(0, 699, 672, 10);
  //Spawning space
  ctx.fillStyle = "rgb(43, 163, 123)";
  ctx.fillRect(0, 649, 672, 50);
  //Floor
  ctx.fillStyle = "rgb(168, 112, 38)";
  ctx.fillRect(0, 409, 672, 240);
  //Lines of floor
  ctx.fillStyle = "rgb(8, 2, 41)";
  for (let i = 0; i <= 5; i++) {
    ctx.fillRect(0, 649 - i * 48, 672, 2);
  }
  ctx.fillRect(0, 356, 672, 2);
  //Kitchen Counter
  ctx.fillStyle = "rgb(156, 156, 156)";
  ctx.fillRect(0, 358, 672, 50);
  //Sink
  ctx.fillStyle = "rgb(33, 75, 192)";
  ctx.fillRect(0, 106, 672, 250);
  //Cabinet (cheese location)
  ctx.fillStyle = "rgb(90, 45, 19)";
  ctx.fillRect(0, 56, 672, 50);
  for (let i = 45; i <= 675; i += 135) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(i, 55, 45, 45);
  }
}
function startGame() {}
window.onload = function() {
  buildMap();
};
