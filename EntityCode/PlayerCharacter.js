'use strict';
/**
 * This file contains all code that relate to player movement and collision.
 */

/*This is the player object*/
let player;

/*The number of lives the player has*/
let lives = 2;

/*Images that represent lives*/
let livesImages = [];

/*This stores the properties of the player object
to make*/
const PLAYERPROP = { x: 315, y: 645, size: 45, collision: false };

let playerMove = { max: playerProp.y };

/**
 * Creates a new player object.
 * @param {int} size is the width of the player.
 * @param {int} x is the starting x coordinate of the player.
 * @param {int} y is the starting y coordinate of the player.
 */
function newPlayer(size, x, y) {
  let returnedPlayer = new entityCreation(size, height, 'sienna', x, y);
  return returnedPlayer;
}

/**
 * This function draws the squares that represent the player's lives.
 */
function drawLives() {
  livesImages.push(new entityCreation(10, 10, 'sienna', 10, 724));
  livesImages.push(new entityCreation(10, 10, 'sienna', 30, 724));
  livesImages.push(new entityCreation(10, 10, 'sienna', 50, 724));
}

/**
 * This function will draw a new life for the player when they beat a round
 * if they have less than 3 lives left.
 */
function newLifeDraw() {
  let nextX = livesImages.length - 1;
  livesImages.push(
    new entityCreation(10, 10, 'sienna', livesImages[nextX].x + 20, 724)
  );
}

/*Moves the player object up by 48 pixels*/
function playerUp(up, w) {
  if ((gameMap.key && gameMap.key == up) || gameMap.key == w) {
    gameMap.key = false;
    player.y -= 48;
    player.update();
    player.y < playerMove.max ? updateMaxMove(player.y) : player.y;
    scoreImage.update(score);
    checkForEnemyCollision();
  }
}

/*Moves the player object down by 48 pixels*/
function playerDown(down, s) {
  if ((gameMap.key && gameMap.key == down) || gameMap.key == s) {
    gameMap.key = false;
    player.y += 48;
    player.update();
    checkForEnemyCollision();
  }
}

/*Moves the player object left by 45 pixels*/
function playerLeft(left, a) {
  if ((gameMap.key && gameMap.key == left) || gameMap.key == a) {
    gameMap.key = false;
    player.x -= 45;
    player.update();
    checkForEnemyCollision();
  }
}

/*Moves the player object right by 45 pixels*/
function playerRight(right, d) {
  if ((gameMap.key && gameMap.key == right) || gameMap.key == d) {
    gameMap.key = false;
    player.x += 45;
    player.update();
    checkForEnemyCollision();
  }
}

/**
 * This function will update a player's position when they press
 * up, down, left, right, w, a, s, or d.
 */
function checkForPlayerMove() {
  /*If no keys are pressed*/
  if (!gameMap.key) {
    checkForEnemyCollision();
    sinkTraversal(player.y, player);
    /*If arrows or wasd were pressed, then check where the potential
    move will end up. If off of the canvas, then the move doesn't occur.*/
  } else {
    player.y - 48 < playerProp.size ? player.update() : playerUp(38, 87);
    player.y == playerProp.y ? player.update() : playerDown(40, 83);
    player.x - 45 < 0 ? player.update() : playerLeft(37, 65);
    player.x + 45 > CANVASWIDTH ? player.update() : playerRight(39, 68);
  }
}

/*Checks for collision with all entities in lanes 1-5*/
function checkForEnemyCollision() {
  let top = player.y;
  let bottom = player.y + player.height;
  let left = player.x;
  let right = player.x + player.width;
  lanes5.forEach(function (entity) {
    let othTop = entity.y;
    let othBottom = entity.y + entity.height;
    let othLeft = entity.x;
    let othRight = entity.x + entity.width;
    left < othRight && right > othLeft && top < othBottom && bottom > othTop
      ? gameMap.dead()
      : player.update();
  });
}

/*Verifies that a player is on a log*/
function checkForStaticObjectCollision(array) {
  let top = player.y;
  let bottom = player.y + player.height;
  let left = player.x;
  let right = player.x + player.width;
  let collision = -1;
  for (let i = 0; i < array.length; i++) {
    let othTop = array[i].y;
    let othBottom = array[i].y + array[i].height;
    let othLeft = array[i].x;
    let othRight = array[i].x + array[i].width;
    /*The player is on a log*/
    if (
      left < othRight &&
      right > othLeft &&
      top < othBottom &&
      bottom > othTop
    ) {
      collision = i;
      return collision;
    }
  }
  /*The player is not on a log*/
  return collision;
}

/**
 * Verifies that the player is above water.
 * If they aren't colliding with a log, then they
 * drown in the water. Otherwise, they move with
 * the log.
 */
function sinkTraversal(y, entity) {
  if (y < 357 && y > 56) {
    if (checkForStaticObjectCollision(lanes10) >= 0) {
      y == PROPS[5].y ? moveLeft(5, entity, 1) : y;
      y == PROPS[6].y ? moveRight(6, entity, 1) : y;
      y == PROPS[7].y ? moveLeft(7, entity, 1) : y;
      y == PROPS[8].y ? moveRight(8, entity, 1) : y;
      y == PROPS[9].y ? moveLeft(9, entity, 1) : y;
    } else if (checkForStaticObjectCollision(cheeses) >= 0) {
      gameMap.save(checkForStaticObjectCollision(cheeses));
    } else {
      gameMap.dead();
    }
  }
}

/**
 * Updates the current highest move.
 * This is used to give the player score per move.
 * @param {coordinate} y
 */
function updateMaxMove(y) {
  playerMove.max = y;
  score += 10;
}
