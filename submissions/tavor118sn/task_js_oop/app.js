const CELL = {
  WIDTH: 101,
  HEIGHT: 83,
};

const PLAYING_AREA = {
  START_X: 0,
  START_Y: 0,
  END_X: 404,
  END_Y: 500,
};

const PLAYER_INFO = {
  SPRITE: 'images/char-boy.png',
  START_X_POSITION: CELL.WIDTH * 2,
  START_Y_POSITION: CELL.HEIGHT * 5 - 15,
  WIDTH: 80,
  HEIGHT: 40,
};

const ENEMY_Y_CORRECTION = 13;
const ENEMY_INFO = {
  SPRITE: 'images/enemy-bug.png',
  START_X_POSITION: CELL.WIDTH * -1,
  START_Y_POSITION: [
    2 * (CELL.HEIGHT) - ENEMY_Y_CORRECTION,
    3 * (CELL.HEIGHT) - ENEMY_Y_CORRECTION,
    4 * (CELL.HEIGHT) - ENEMY_Y_CORRECTION,
  ],
  MIN_SPEED: 50,
  MAX_SPEED: 200,
  WIDTH: 80,
  HEIGHT: 40,

};

let generateSpeed = function () {
  return Math.floor(Math.random() * ENEMY_INFO.MAX_SPEED) + ENEMY_INFO.MIN_SPEED;
};


let Character = function (sprite, x, y) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
};

Character.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy
let Enemy = function (counter, player) {
  Character.call(
    this,
    ENEMY_INFO.SPRITE,
    ENEMY_INFO.START_X_POSITION,
    ENEMY_INFO.START_Y_POSITION[counter],
  );
  this.speed = generateSpeed();
  this.player = player;
};
Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x > PLAYING_AREA.END_X) {
    this.x = ENEMY_INFO.START_X_POSITION;
    this.speed = generateSpeed();
  }

  if (
    this.x < this.player.x + PLAYER_INFO.WIDTH &&
    this.x > this.player.x - ENEMY_INFO.WIDTH &&
    this.y < this.player.y + PLAYER_INFO.HEIGHT &&
    this.y > this.player.y - ENEMY_INFO.WIDTH
  ) {
    alert('You lose!');
    this.player.reset();
  }
};

// Player
let Player = function () {
  Character.call(
    this,
    PLAYER_INFO.SPRITE,
    PLAYER_INFO.START_X_POSITION,
    PLAYER_INFO.START_Y_POSITION,
  );
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.update = function () {

};

Player.prototype.handleInput = function (keyCode) {

  let newCoordinates = {
    // type => [new x, new y]
    left: [this.x - CELL.WIDTH, this.y],
    up: [this.x, this.y - CELL.HEIGHT],
    right: [this.x + CELL.WIDTH, this.y],
    down: [this.x, this.y + CELL.HEIGHT],
  };
  let [newX, newY] = newCoordinates[keyCode];

  if (PLAYING_AREA.START_X <= newX && newX <= PLAYING_AREA.END_X) {
    this.x = newX;
  }
  if (newY < PLAYING_AREA.END_Y) {
    this.y = newY;
  }
  if (newY < PLAYING_AREA.START_Y) {
    alert('Congratulation! You win!');
    this.reset();
  }

};

Player.prototype.reset = function () {
  this.x = PLAYER_INFO.START_X_POSITION;
  this.y = PLAYER_INFO.START_Y_POSITION;
};

// create characters
let player = new Player();

const allEnemies = [];
for (let i = 0; i < 3; i++) {
  const enemy = new Enemy(i, player);
  allEnemies.push(enemy);
}

document.addEventListener('keyup', function (e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
