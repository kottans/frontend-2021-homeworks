const blockWidth = 101;
const blockHeight = 83;
const playerYOffset = 10;
const playerXStep = blockWidth / 2;
const playerYStep = blockHeight / 2;
const enemyYOffset = 20;
const enemyMinSpeed = 30;
const enemyMaxSpeed = 200;
const enemyQuantity = 5;
const enemyLinesQuantity = 3;
const scatterX = blockWidth / 2;
const scatterY = blockHeight / 2;
const allEnemies = [];
let player;

let Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = -blockWidth;
  this.y = blockHeight * Math.floor(Math.random() * enemyLinesQuantity + 1) - enemyYOffset;
  this.speed = Math.floor(Math.random() * (enemyMaxSpeed-enemyMinSpeed)) + enemyMinSpeed;
};

Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x > blockWidth * 5) {
    this.x = -blockWidth;
  };
  this.checkCollisions();
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
  if ((Math.abs(this.x - player.x) <= scatterX)&&(Math.abs(this.y - player.y) <= scatterY)) {
    alert('You lose');
    initGameField();
  };
};

let Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = blockWidth * 2;
  this.y = blockHeight * 5 - playerYOffset;
}

Player.prototype.handleInput = function(direction) {
  if (direction == 'left') {
    if (this.x > 1) {
      this.x -= playerXStep;
    };
  } else if (direction == 'right') {
    if (this.x < blockWidth * 4) {
      this.x += playerXStep;
    };
  } else if (direction == 'up') {
    if (this.y >= Math.floor(playerYStep - playerYOffset)) {
      this.y -= playerYStep;
    };
  } else if (direction == 'down') {
    if (this.y < blockHeight * 5 - playerYStep) {
      this.y += playerYStep;
    };
  };
};

Player.prototype.update = function() {
  if (this.y < playerYStep - playerYOffset) {
    setTimeout(function() {
      alert('You win');
      initGameField();
    }, 10);
  };
};

Player.prototype.render = Enemy.prototype.render;

function initGameField() {
  player = new Player();
  for (let i = 0; i < enemyQuantity; i++) {
    allEnemies[i] = new Enemy();
  };
};

initGameField();

document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
