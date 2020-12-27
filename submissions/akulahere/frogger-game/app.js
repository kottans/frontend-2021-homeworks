const playerStartX = 200;
const playerStartY = 400;
const stepX = 100;
const stepY = 85;
const finishLineY = 0;
const rightBorder = 500;
const enemyStartX = 0;
const enemyMinSpeed = 100;
const enemyMaxSpeed = 400;
const enemyStartYPositions = [60, 145, 230]

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRound100(val) {
  return Math.round(val / 100) * 100;
}

var Enemy = function (y) {
  this.x = enemyStartX;
  this.y = y;
  this.speed = getRandomInteger(enemyMinSpeed, enemyMaxSpeed);
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x > rightBorder) {
    this.x = enemyStartX;
  }
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let Player = function (x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function () {
  allEnemies.forEach(enemy => {
    if ((makeRound100(this.x) === makeRound100(enemy.x)) && (this.y === enemy.y)) {
      alert('You lose');
      this.x = playerStartX;
      this.y = playerStartY;
    };
  })
  if (this.y < finishLineY) {
    setTimeout(() => {
      this.y = playerStartY;
      alert('You win!');
    }, 10);
  }
};

Player.prototype.handleInput = function (key) {
  if (key === 'left' && this.x - stepX >= 0) {
    this.x -= stepX;
  } else if (key === 'right' && this.x + stepX <= rightBorder - stepX) {
    this.x += stepX;
  } else if (key === 'down' && this.y + stepY <= playerStartY) {
    this.y += stepY;
  } else if (key === 'up' && this.y > 0) {
    this.y -= stepY;
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const allEnemies = [];
for (let i = 0; i < 3; i++) {
  allEnemies.push(new Enemy(enemyStartYPositions[i]));
}

let player = new Player(playerStartX, playerStartY);


document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
