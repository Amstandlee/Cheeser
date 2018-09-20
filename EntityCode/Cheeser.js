"use strict";

/*This is an array that stores each entity and allows
for them to have their positions updated and tracked.*/
let lanes = [];

let gameMap = {
  /**
   * This function will clear the canvas so that all entities
   * can have their positions updated.
   */
  clearEntities: function() {
    let canvas = document.getElementById("kitchen");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  /**
   * This function creates an entity in each lane and begins
   * moving them across the canvas.
   */
  start: function() {
    generateAllLanes();
    this.interval = setInterval(moveAllEntities, 20);
  }
};

/**
 * This function will keep track of the current game's score as well
 * as the high score by the user. The high score will be stored in
 * local storage.
 */
function scoreKeep() {}
window.onload = function() {
  gameMap.start();
};
