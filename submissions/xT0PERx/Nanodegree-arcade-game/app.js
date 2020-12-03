const X_START_POSITION_PLAYER = 200;
const Y_START_POSITION_PLAYER = 395;
const X_START_POSITION_ENEMY = 0;
const Y_START_POSITION_ENEMY = [55, 140, 225];
const SPEED_ENEMY = [100, 200, 300];
const STEP_LEFT_RIGHT = 100;
const STEP_UP_DOWN = 85;
const MAX_STEP_PLAYER = 400;
const MIN_LENGTH_FIELD = 0;
const MAX_LENGTH_FIELD = 500;
const HALF_LENGTH_ENEMY = 50;

let countWin = 0;
// Enemies our player must avoid
var Enemy = function (x, y, speed, objPlayer) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.objPlayer = objPlayer;
  this.sprite = "images/enemy-bug.png";
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x > MAX_LENGTH_FIELD) {
    this.x = -STEP_LEFT_RIGHT;
    this.speed = Math.random() * MAX_LENGTH_FIELD + HALF_LENGTH_ENEMY;
  }

  this.collide();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collide = function () {
  if (
    this.objPlayer.y === this.y &&
    this.objPlayer.x < this.x + HALF_LENGTH_ENEMY &&
    this.objPlayer.x > this.x - HALF_LENGTH_ENEMY
  ) {
    this.objPlayer.goStartPosition();
  }
};
const Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
};
Player.prototype.update = function (dt) {};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (arr) {
  if (arr === "left" && this.x > MIN_LENGTH_FIELD) {
    this.x -= STEP_LEFT_RIGHT;
  } else if (arr === "right" && this.x < MAX_STEP_PLAYER) {
    this.x += STEP_LEFT_RIGHT;
  } else if (arr === "up") {
    this.y -= STEP_UP_DOWN;
    if (this.y < MIN_LENGTH_FIELD) {
      player.goStartPosition();
      alert("Wins: " + ++countWin);
    }
  } else if (arr === "down" && this.y < Y_START_POSITION_PLAYER) {
    this.y += STEP_UP_DOWN;
  }
};

Player.prototype.goStartPosition = function () {
  this.x = X_START_POSITION_PLAYER;
  this.y = Y_START_POSITION_PLAYER;
};

const player = new Player(X_START_POSITION_PLAYER, Y_START_POSITION_PLAYER);

const countEmemies = 3;
const allEnemies = Array(countEmemies)
  .fill()
  .map(function (enemy, index) {
    return new Enemy(
      X_START_POSITION_ENEMY,
      Y_START_POSITION_ENEMY[index],
      SPEED_ENEMY[index],
      player
    );
  });

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
