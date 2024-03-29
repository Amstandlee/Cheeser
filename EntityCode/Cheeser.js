'use strict';
/**
 * This file is where the game begins and where all functions are called from.
 */

/*This is an array that stores each entity in lanes
1 through 5.*/
let lanes5 = [];

/*This is an array that stores each entity in lanes
6 through 10.*/
let lanes10 = [];

/*These are the cheeses. When the player saves all 5
from the cupboard, they win the round*/
let cheesesSaved = 0;

/*This is an array that stores the cheese objects*/
let cheeses = [];

/*This is the amount of time before death*/
let time = 60;

/*This is the timer shown on the gameboard*/
let timer;

/*This is the score of the player*/
let score = 0;

/*This is the highest score*/
let highScore = 0;

/*This is the image of the score*/
let scoreImage;

/*This is the image of the highScore*/
let highScoreImage;

/*This is the current speed factor of entities*/
let level = 1;

/*This is an object that stores functions that effect
the game's map*/
let gameMap = {
  /**
   * This function will clear the canvas so that all entities
   * can have their positions updated.
   */
  clearEntities: function (type) {
    let canvas = document.getElementById('kitchen');
    let ctx = canvas.getContext('2d');
    type == 0
      ? ctx.clearRect(0, 0, canvas.width, canvas.height)
      : ctx.clearRect(player.x, player.y, player.width, player.height);
  },
  /**
   * This function creates an entity in each lane and begins
   * moving them across the canvas. Then the player is created
   * and can be moved using the arrow keys or wasd.
   */
  start: function () {
    generateAllLanes();
    player = newPlayer(PLAYERPROP.size, PLAYERPROP.x, PLAYERPROP.y);
    timer = new timeLeft();
    scoreImage = new scoreKeep('Current Score: ', score, 30, 26);
    highScoreImage = new scoreKeep('High Score: ', highScore, 230, 26);
    this.interval = setInterval(moveAllEntities, 20);
    countDown.toDeath();
    window.addEventListener('keydown', function (e) {
      gameMap.key = e.keyCode;
    });
    window.addEventListener('keyup', function () {
      gameMap.key = false;
    });
  },
  /*The player has gotten a cheese*/
  save: function (index) {
    if (cheesesSaved < 5) {
      cheesesSaved++;
      cheeses.splice(index, 1);
      countDown.gotCheese();
      player.x = PLAYERPROP.x;
      player.y = PLAYERPROP.y;
      countDown.toDeath();
      if (cheesesSaved == 5) {
        cheeses.splice(index, 1);
        countDown.gotCheese();
        setTimeout(function () {
          gameMap.stop();
        }, 20);
        setTimeout(function () {
          gameMap.nextLevel();
        }, 3000);
      }
    }
  },
  /*The player has died. Respawn*/
  dead: function () {
    if (lives > 0) {
      player.x = PLAYERPROP.x;
      player.y = PLAYERPROP.y;
      lives--;
      time = 60;
      livesImages.pop();
      /*Game Over*/
    } else {
      livesImages.pop();
      gameMap.clearEntities(1);
      setTimeout(function () {
        gameMap.stop();
      }, 20);
      alert('Game Over!');
    }
  },
  /*Starts next level*/
  nextLevel: function () {
    if (lives < 2) {
      lives++;
      newLifeDraw();
    }
    alert('New Level!');
    level += 0.2;
    cheesesSaved = 0;
    cutTheCheese();
    this.interval = setInterval(moveAllEntities, 20);
    countDown.toDeath();
  },
  /*Stops all movement*/
  stop: function () {
    clearInterval(this.interval);
  }
};

/*This code effects the timers and will kill the player
if they take more than 60 seconds to get a cheese*/
let countDown = {
  toDeath: function () {
    this.interval = setInterval(function () {
      gameMap.dead();
    }, 60000);
    this.timer = setInterval(function () {
      time -= 1;
    }, 1000);
  },
  /*Player got cheese, so they need to be reset*/
  gotCheese: function () {
    clearInterval(this.interval);
    clearInterval(this.timer);
    score += calculateBonus();
    scoreImage.update(score);
    playerMove.max = PLAYERPROP.y;
    time = 60;
  }
};

/*This takes time left in run and multiplies it by 8;
this value is then added to the player's score.*/
function calculateBonus() {
  return time * 8;
}

function timeLeft() {
  let canvas = document.getElementById('kitchen');
  let ctx = canvas.getContext('2d');
  ctx.font = '20px Arial';
  ctx.fillText('Time until death: ' + time, PLAYERPROP.x, 734);
  this.update = function () {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Time until death: ' + time, PLAYERPROP.x, 734);
  };
}

/**
 * This function will keep track of the current game's score as well
 * as the high score by the user. The high score will be stored in
 * local storage.
 */
function scoreKeep(text, points, x, y) {
  let canvas = document.getElementById('kitchen');
  let ctx = canvas.getContext('2d');
  ctx.font = '20px Arial';
  ctx.fillText(text + points, x, y);
  this.update = function (points) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text + points, x, y);
  };
}

/**
 * This function will update the highscore using local storage. If there is no
 * current high score, it will be set to the current score. If the score is
 * greater than the highscore, the highscore will equal score.
 */
function updateHighScore() {
  if (!localStorage.getItem('highScore') || score > highScore) {
    highScore = score;
    highScoreImage.update(highScore);
    localStorage.setItem('highScore', highScore);
  } else {
    highScore = localStorage.getItem('highScore');
    highScoreImage.update(highScore);
  }
}
/**
 * This function causes the game to begin when the page loads.
 */
window.onload = function () {
  drawLives();
  gameMap.start();
};
