'use strict';
/**
 * This file is used for the creation of entities. That means, enemies in the first
 * five lanes as well as the "logs" that will be ridden across the water.
 */

/*This is the width of the canvas.*/
const CANVASWIDTH = 672;

/*These are the sizes for each type of entity.*/
const HEIGHT = 45;

/*This is the width, x coordinate, and y coordinate of each non-player entity.*/
const PROPS = [
  { size: 45, x: 0, y: 599, speed: 0.5 },
  { size: 45, x: 0, y: 551, speed: 1 },
  { size: 45, x: 0, y: 503, speed: 0.8 },
  { size: 45, x: 0, y: 455, speed: 1.6 },
  { size: 90, x: 0, y: 407, speed: 2 },
  { size: 90, x: 0, y: 309, speed: 1 },
  { size: 135, x: 0, y: 261, speed: 1.6 },
  { size: 180, x: 0, y: 213, speed: 1 },
  { size: 90, x: 0, y: 165, speed: 1.1 },
  { size: 135, x: 0, y: 117, speed: 2 }
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
  let canvas = document.getElementById('kitchen');
  /*Allows for components to be drawn on the canvas.*/
  let ctx = canvas.getContext('2d');
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
  this.update = function () {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

/**
 * Populates lanes with all objects on the canvas.
 */
function generateAllLanes() {
  randomPos();
  lane1();
  lane6();
  cutTheCheese();
}

/**
 * Generates random x coordinates for all entities in
 * lanes.
 */
function randomPos() {
  PROPS.forEach(function (i) {
    i.x = Math.floor(Math.random() * (6 - 1) + 1) * 100;
  });
}

/**
 * This function creates and returns a new entity.
 * @param {*} y is the y coordinate on the canvas.
 * @param {*} size is the width of the entity.
 * @param {*} x is the x coordinate on the canvas.
 */
function newEntity(y, size, x, color) {
  let returnedEntity = new entityCreation(size, HEIGHT, color, x, y);
  return returnedEntity;
}

/**
 * Creates 3 entities in lanes 1-5
 */
function lane1() {
  lanes5.push(newEntity(PROPS[0].y, PROPS[0].size, PROPS[0].x, 'gray'));
  lanes5.push(newEntity(PROPS[1].y, PROPS[1].size, PROPS[1].x, 'white'));
  lanes5.push(newEntity(PROPS[2].y, PROPS[2].size, PROPS[2].x, 'black'));
  lanes5.push(newEntity(PROPS[3].y, PROPS[3].size, PROPS[3].x, 'brown'));
  lanes5.push(newEntity(PROPS[4].y, PROPS[4].size, PROPS[4].x, 'orange'));
  lanes5.push(newEntity(PROPS[0].y, PROPS[0].size, PROPS[0].x - 400, 'gray'));
  lanes5.push(newEntity(PROPS[1].y, PROPS[1].size, PROPS[1].x - 400, 'white'));
  lanes5.push(newEntity(PROPS[2].y, PROPS[2].size, PROPS[2].x - 400, 'black'));
  lanes5.push(newEntity(PROPS[3].y, PROPS[3].size, PROPS[3].x - 575, 'brown'));
  lanes5.push(newEntity(PROPS[4].y, PROPS[4].size, PROPS[4].x - 400, 'orange'));
  lanes5.push(newEntity(PROPS[2].y, PROPS[2].size, PROPS[2].x - 400, 'black'));
}

/**
 * Populates canvas with non-enemy entities.
 */
function lane6() {
  lanes10.push(newEntity(PROPS[5].y, PROPS[5].size, 0, 'rgb(115, 214, 198)'));
  lanes10.push(newEntity(PROPS[5].y, PROPS[5].size, 190, 'rgb(115, 214, 198)'));
  lanes10.push(newEntity(PROPS[5].y, PROPS[5].size, 380, 'rgb(115, 214, 198)'));
  lanes10.push(newEntity(PROPS[5].y, PROPS[5].size, 570, 'rgb(115, 214, 198)'));
  lanes10.push(newEntity(PROPS[6].y, PROPS[6].size, 0, 'rgb(223, 143, 199)'));
  lanes10.push(newEntity(PROPS[6].y, PROPS[6].size, 235, 'rgb(223, 143, 199)'));
  lanes10.push(newEntity(PROPS[6].y, PROPS[6].size, 470, 'rgb(223, 143, 199)'));
  lanes10.push(newEntity(PROPS[7].y, PROPS[7].size, 0, 'rgb(94, 91, 91)'));
  lanes10.push(newEntity(PROPS[7].y, PROPS[7].size, 280, 'rgb(94, 91, 91)'));
  lanes10.push(newEntity(PROPS[7].y, PROPS[7].size, 560, 'rgb(94, 91, 91)'));
  lanes10.push(newEntity(PROPS[8].y, PROPS[8].size, 0, 'rgb(115, 214, 198)'));
  lanes10.push(newEntity(PROPS[8].y, PROPS[8].size, 190, 'rgb(115, 214, 198)'));
  lanes10.push(newEntity(PROPS[8].y, PROPS[8].size, 380, 'rgb(115, 214, 198)'));
  lanes10.push(newEntity(PROPS[9].y, PROPS[9].size, 0, 'rgb(223, 143, 199)'));
  lanes10.push(newEntity(PROPS[9].y, PROPS[9].size, 235, 'rgb(223, 143, 199)'));
  lanes10.push(newEntity(PROPS[9].y, PROPS[9].size, 470, 'rgb(223, 143, 199)'));
}

/**
 * This draws the cheeses and populates the cheeses array.
 */
function cutTheCheese() {
  cheeses.push(newEntity(56, 45, 47, 'yellow'));
  cheeses.push(newEntity(56, 45, 182, 'yellow'));
  cheeses.push(newEntity(56, 45, 316, 'yellow'));
  cheeses.push(newEntity(56, 45, 450, 'yellow'));
  cheeses.push(newEntity(56, 45, 584, 'yellow'));
}
