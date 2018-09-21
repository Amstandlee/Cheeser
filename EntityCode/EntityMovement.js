"use strict";

/*This is the width of the canvas.*/
const canvasWidth = 672;

/*These are the sizes for each type of entity.*/
const height = 45;

/*This is the width, x coordinate, and y coordinate of each non-player entity.*/
const Props = [
  { size: 45, x: 0, y: 599, speed: 2 },
  { size: 45, x: 0, y: 551, speed: 3 },
  { size: 45, x: 0, y: 503, speed: 3 },
  { size: 45, x: 0, y: 455, speed: 2 },
  { size: 45, x: 0, y: 407, speed: 4 },
  { size: 90, x: 0, y: 309, speed: 2 },
  { size: 90, x: 0, y: 261, speed: 4 },
  { size: 180, x: 0, y: 213, speed: 3 },
  { size: 90, x: 0, y: 165, speed: 4 },
  { size: 135, x: 0, y: 117, speed: 5 }
];

/*This is based on code from w3Schools.
https://www.w3schools.com/graphics/tryit.asp?filename=trygame_component_more_move*/

/**
 * Creates new entities on the canvas.
 * @param {int} width of object.
 * @param {int} height of object.
 * @param {string} color of object.
 * @param {int} x position on canvas on x axis.
 * @param {int} y position on canvas on y axis.
 */
function entityCreation(width, height, color, x, y) {
  /*The canvas that is being drawn on.*/
  let canvas = document.getElementById("kitchen");
  /*Allows for components to be drawn on the canvas.*/
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  /*The x coordinate of the component.*/
  this.x = x;
  /*The y coordinate of the component.*/
  this.y = y;
  /*The width of the component.*/
  this.width = width;
  /*The height of the component.*/
  this.height = height;
  //Initial creation of entity.
  ctx.fillRect(this.x, this.y, this.width, this.height);
  /*Allows for the entity to move.*/
  this.update = function() {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

/**
 * Populates lanes with all objects on the canvas.
 */
function generateAllLanes() {
  randomPos();
  Props.forEach(function(i) {
    lanes.push(newEntity(i.y, i.size, i.x));
  });
}

/**
 * Generates random x coordinates for all entities in
 * lanes.
 */
function randomPos() {
  Props.forEach(function(i) {
    i.x = Math.floor(Math.random() * (6 - 1)) * 100;
  });
}

/**
 * This function creates and returns a new entity.
 * @param {*} y is the y coordinate on the canvas.
 * @param {*} size is the width of the entity.
 * @param {*} x is the x coordinate on the canvas.
 */
function newEntity(y, size, x) {
  let returnedEntity = new entityCreation(size, height, "red", x, y);
  return returnedEntity;
}

/**
 * This function updates each entity's position on the canvas
 * and verifies that they move across the screen like a marquis;
 * (when the object reaches the end of the screen, they're set back
 * to the front of the screen).
 */
function moveAllEntities() {
  gameMap.clearEntities();
  lanes.forEach(function(lane, i) {
    if (lane.y == Props[i].y) {
      checkForEach(lane, i);
    }
  });
  checkForPlayerMove();
}

/**
 * This function was made so that every entity can be updated within
 * one function.
 * @param {component} entity the entity whose position will be evaluated.
 * @param {int} index the index of lanes.
 */
function checkForEach(entity, index) {
  if (index % 2 == 0) {
    entity.x += Props[index].speed;
    entity.update();
    if (checkRightMove(entity.x)) {
      entity.x = 0 - Props[index].size;
    }
  } else {
    entity.x -= Props[index].speed;
    entity.update();
    if (checkLeftMove(entity.x, Props[index].size)) {
      entity.x = canvasWidth;
    }
  }
}

/**
 * This checks entities that are moving right
 * and makes sure they are reset when they go
 * off of the screen.
 * @param {int} x is the x coordinate
 */
function checkRightMove(x) {
  let outOfBounds = x >= canvasWidth ? true : false;
  return outOfBounds;
}

/**
 * This checks entities that are moving left
 * and makes sure they are reset when they go
 * off of the screen.
 * @param {int} x is the x coordinate
 * @param {int} size allows objects moving left
 * to fully leave the screen.
 */
function checkLeftMove(x, size) {
  let outOfBounds = x < 0 - size ? true : false;
  return outOfBounds;
}
