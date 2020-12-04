// Enemies our player must avoid
var Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;

  // **if enemy hits the player
  if (
    ((this.x + enemyPadding <= player.x + playerPadding &&
      this.x + colStep - enemyPadding >= player.x + playerPadding) ||
      (this.x + enemyPadding >= player.x + playerPadding &&
        this.x + enemyPadding <= player.x + colStep - playerPadding)) &&
    Math.round(this.y / 10, 0) === Math.round(player.y / 10, 0)
  ) {
    winsBalance -= 1;
    winsBalEl.innerHTML = winsBalance;
    prevTryResult.innerHTML = "<em>You lost previous time<em>";
    player.x = pDefualtXPos;
    player.y = pDefualtYPos;
  }

  // **restarts enemy's running
  if (this.x > colStep * 6) {
    this.x = -colStep;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
  this.sprite = "images/char-boy.png";
  this.x = x;
  this.y = y;
  console.log("Player position:", this.x, this.y);
};
Player.prototype.update = function () {
  // **if player reaches the water (wins)
  if (this.y === -30) {
    winsBalance += 1;
    winsBalEl.innerHTML = winsBalance;
    prevTryResult.innerHTML = "<strong>You won previous time<strong>";
    this.x = pDefualtXPos;
    this.y = pDefualtYPos;
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
  var newPosX, newPosY;
  var maxY = rowStep * 5 - 30;
  var minY = -30;
  var maxX = colStep * 4;
  var minX = 0;

  switch (direction) {
    case "left":
      newPosX = this.x - colStep;
      this.x = newPosX < minX ? this.x : newPosX;
      break;
    case "right":
      newPosX = this.x + colStep;
      this.x = newPosX > maxX ? this.x : newPosX;
      break;
    case "up":
      newPosY = this.y - rowStep;
      this.y = newPosY < minY ? this.y : newPosY;
      break;
    case "down":
      newPosY = this.y + rowStep;
      this.y = newPosY > maxY ? this.y : newPosY;
      break;
    default:
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var rowStep = 83;
var colStep = 101;
var playerPadding = 17;
var enemyPadding = 2;
var pDefualtXPos = colStep * 2;
var pDefualtYPos = rowStep * 5 - 30;

var player = new Player(pDefualtXPos, pDefualtYPos);

var enemy1 = new Enemy(-colStep, rowStep * 3 - 30, 100);
var enemy2 = new Enemy(-colStep, rowStep * 2 - 30, 200);
var enemy3 = new Enemy(-colStep, rowStep * 1 - 30, 300);
var enemy4 = new Enemy(-1000 - colStep, rowStep * 3 - 30, 200);
var enemy5 = new Enemy(-1000 - colStep, rowStep * 2 - 30, 250);
var enemy6 = new Enemy(-1000 - colStep, rowStep * 1 - 30, 300);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// **adding DOM elements for wins and losses balance
var winsBalance = 0;
var winsHeaderEl = document.createElement("h2");
var prevTryResult = document.createElement("p");
var winsBalEl = document.createElement("p");

winsHeaderEl.innerHTML = "Wins and losses balance";
prevTryResult.innerHTML = "This is your first try";
winsBalEl.innerHTML = winsBalance;

document.body.appendChild(winsHeaderEl);
document.body.appendChild(prevTryResult);
document.body.appendChild(winsBalEl);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
