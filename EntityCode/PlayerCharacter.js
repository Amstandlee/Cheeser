"use strict";

let player;
const timeout = 500;
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
    setTimeout(function() {
      player.update();
    }, timeout);
  }
}

/*Moves the player object down by 48 pixels*/
function playerDown(down, s) {
  if ((gameMap.key && gameMap.key == down) || gameMap.key == s) {
    gameMap.key = false;
    player.y += 48;
    setTimeout(function() {
      player.update();
    }, timeout);
  }
}

/*Moves the player object left by 45 pixels*/
function playerLeft(left, a) {
  if ((gameMap.key && gameMap.key == left) || gameMap.key == a) {
    gameMap.key = false;
    player.x -= 45;
    setTimeout(function() {
      player.update();
    }, timeout);
  }
}

/*Moves the player object right by 45 pixels*/
function playerRight(right, d) {
  if ((gameMap.key && gameMap.key == right) || gameMap.key == d) {
    gameMap.key = false;
    player.x += 45;
    setTimeout(function() {
      player.update();
    }, timeout);
  }
}

/**
 * This function will update a player's position when they press
 * up, down, left, right, w, a, s, or d.
 */
function checkForPlayerMove() {
  if (!gameMap.key) {
    player.update();
  } else {
    playerUp(38, 87);
    playerDown(40, 83);
    playerLeft(37, 65);
    playerRight(39, 68);
  }
}
