"use strict";

/*This is the player object*/
let player;
/*This stores the properties of the player object
to make*/
const playerProp = { x: 315, y: 647, size: 45 };

/**
 * Creates a new player object.
 * @param {int} size is the width of the player.
 * @param {int} x is the starting x coordinate of the player.
 * @param {int} y is the starting y coordinate of the player.
 */
function newPlayer(size, x, y) {
  let returnedPlayer = new entityCreation(size, height, "yellow", x, y);
  return returnedPlayer;
}

/*Moves the player object up by 48 pixels*/
function playerUp(up, w) {
  if ((gameMap.key && gameMap.key == up) || gameMap.key == w) {
    gameMap.key = false;
    player.y -= 48;
    player.update();
  }
}

/*Moves the player object down by 48 pixels*/
function playerDown(down, s) {
  if ((gameMap.key && gameMap.key == down) || gameMap.key == s) {
    gameMap.key = false;
    player.y += 48;
    player.update();
  }
}

/*Moves the player object left by 45 pixels*/
function playerLeft(left, a) {
  if ((gameMap.key && gameMap.key == left) || gameMap.key == a) {
    gameMap.key = false;
    player.x -= 45;
    player.update();
  }
}

/*Moves the player object right by 45 pixels*/
function playerRight(right, d) {
  if ((gameMap.key && gameMap.key == right) || gameMap.key == d) {
    gameMap.key = false;
    player.x += 45;
    player.update();
  }
}

/**
 * This function will update a player's position when they press
 * up, down, left, right, w, a, s, or d.
 */
function checkForPlayerMove() {
  /*If no keys are pressed*/
  if (!gameMap.key) {
    player.update();
    /*Check for arrows or wasd and if it'll be off of the canvas*/
  } else {
    player.y - 48 < playerProp.size ? player.update() : playerUp(38, 87);
    player.y == playerProp.y ? player.update() : playerDown(40, 83);
    player.x - 45 < 0 ? player.update() : playerLeft(37, 65);
    player.x + 45 > canvasWidth ? player.update() : playerRight(39, 68);
  }
}
