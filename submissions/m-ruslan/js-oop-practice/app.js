// Enemies our player must avoid
const Enemy = function (x, y, speed, player) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.player = player;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;

  // **check for collision
  this.collision();

  // **restarts enemy's running
  this.restartRunning();
};

Enemy.prototype.collision = function () {
  if (
    ((this.x + ENEMY_PADDING <= this.player.x + PLAYER_PADDING &&
      this.x + COL_STEP - ENEMY_PADDING >= this.player.x + PLAYER_PADDING) ||
      (this.x + ENEMY_PADDING >= this.player.x + PLAYER_PADDING &&
        this.x + ENEMY_PADDING <= this.player.x + COL_STEP - PLAYER_PADDING)) &&
    Math.round(this.y / 10, 0) === Math.round(this.player.y / 10, 0)
  ) {
    winsBalance -= 1;
    winsBalEl.innerHTML = winsBalance;
    prevTryResult.innerHTML = "<em>You lost previous time<em>";
    this.player.x = PLAYER_CONF.initialPos.x;
    this.player.y = PLAYER_CONF.initialPos.y;
  }
};

Enemy.prototype.restartRunning = function () {
  if (this.x > COL_STEP * 6) {
    [this.x, this.y, this.speed] = generateEnemyPosAndSpeed();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y, sprite) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
};

Player.prototype.update = function () {
  // **if player reaches the water (wins)
  this.wins();
};

Player.prototype.wins = function () {
  if (this.y === -30) {
    winsBalance += 1;
    winsBalEl.innerHTML = winsBalance;
    prevTryResult.innerHTML = "<strong>You won previous time<strong>";
    this.x = PLAYER_CONF.initialPos.x;
    this.y = PLAYER_CONF.initialPos.y;
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
  let newPosX, newPosY;
  const MAX_Y = ROW_STEP * 5 - ROW_OFFSET;
  const MIN_Y = -ROW_OFFSET;
  const MAX_X = COL_STEP * 4;
  const MIN_X = 0;

  switch (direction) {
    case "left":
      newPosX = this.x - COL_STEP;
      this.x = newPosX < MIN_X ? this.x : newPosX;
      break;
    case "right":
      newPosX = this.x + COL_STEP;
      this.x = newPosX > MAX_X ? this.x : newPosX;
      break;
    case "up":
      newPosY = this.y - ROW_STEP;
      this.y = newPosY < MIN_Y ? this.y : newPosY;
      break;
    case "down":
      newPosY = this.y + ROW_STEP;
      this.y = newPosY > MAX_Y ? this.y : newPosY;
      break;
    default:
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const ROW_STEP = 83;
const COL_STEP = 101;
const PLAYER_PADDING = 17;
const ENEMY_PADDING = 2;
const ROW_OFFSET = 30;
const PLAYER_CONF = {
  initialPos: {
    x: COL_STEP * 2,
    y: ROW_STEP * 5 - ROW_OFFSET,
  },
  sprite: "images/char-boy.png",
};

let player = new Player(
  PLAYER_CONF.initialPos.x,
  PLAYER_CONF.initialPos.y,
  PLAYER_CONF.sprite
);
let allEnemies = [];
const ENEMIES_QUANTITY = 10;

const generateEnemyPosAndSpeed = () => {
  let initialXPos = -randomInt(1, 10) * 100;
  let initialYPos = randomInt(1, 3) * ROW_STEP - ROW_OFFSET;
  let speed = randomInt(0, 5) * 50 + 150;
  return [initialXPos, initialYPos, speed];
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

for (let i = 0; i < ENEMIES_QUANTITY; i++) {
  let enemy = {};
  [enemy.xPos, enemy.yPos, enemy.speed] = generateEnemyPosAndSpeed();
  allEnemies.push(new Enemy(enemy.xPos, enemy.yPos, enemy.speed, player));
}

// **adding DOM elements for wins and losses balance
let winsBalance = 0;
const winsHeaderEl = document.createElement("h2");
const prevTryResult = document.createElement("p");
const winsBalEl = document.createElement("p");
const winsDiv = document.createElement("div");

winsHeaderEl.innerHTML = "Wins and losses balance";
prevTryResult.innerHTML = "This is your first try";
winsBalEl.innerHTML = winsBalance;

winsDiv.appendChild(winsHeaderEl);
winsDiv.appendChild(prevTryResult);
winsDiv.appendChild(winsBalEl);

document.body.appendChild(winsDiv);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
