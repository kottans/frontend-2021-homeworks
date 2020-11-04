const defaultPlayerState = {
  sprite: 'images/char-boy.png',
  x: 200,
  y: 400,
  speed: 10,
}

const enemySprite = 'images/enemy-bug.png';
const enemySize = 100;
const minCollisionDistance = 70;

const playingArea = {
  minX: 0, 
  minY: -10,
  maxX: 400,
  maxY: 400,
}

// Actor is parent class for Enemies abd Player
const Actor = function({sprite, x, y, speed}) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.speed = speed;
}
Actor.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
const Enemy = function({x, y, speed, player}) {
    Actor.call(this,{sprite: enemySprite, x, y,speed});
};
Enemy.prototype = Object.create( Actor.prototype);
Enemy.prototype.constructor = Actor;
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x > playingArea.maxX + enemySize) {
    this.x = -enemySize;
  }
  if (Math.abs(this.x - player.x) < minCollisionDistance
        && Math.abs(this.y - player.y) < minCollisionDistance) {
          player.reset(defaultPlayerState);
          alert('You lose!');
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (state) {
  Actor.call(this,state);
};
Player.prototype = Object.create( Actor.prototype);
Player.prototype.constructor = Actor;
Player.prototype.update = function() {

};

Player.prototype.reset = function({sprite, x, y, speed}) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.speed = speed;  
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      this.x -= this.speed;
      if (this.x < playingArea.minX) {
        this.x = playingArea.minX + this.speed;
      }
      break;
    case 'right':
      this.x += this.speed;
      if (this.x > playingArea.maxX) {
        this.x = playingArea.maxX - this.speed;
      }
      break;
    case 'up':
      this.y -= this.speed;
      if (this.y <= playingArea.minY) {
        alert('You won!');
        this.x = defaultPlayerState.x;
        this.y = defaultPlayerState.y;
      }
      break;
    case 'down':
      this.y += this.speed;
      if (this.y > playingArea.maxY) {
        this.y = playingArea.maxY - this.speed;
      }
      break;
    default:
  }
};

// Now instantiate your objects.

// Place the player object in a variable called player
const player = new Player(defaultPlayerState);

// Place all enemy objects in an array called allEnemies
const allEnemies = [  
  new Enemy({
    x: -150,
    y: 60,
    speed: 100,
    player: player,
  }),
  new Enemy({
    x: -450,
    y: 145,
    speed: 80,
    player: player,
  }),
  new Enemy({
    x: -100,
    y: 228,
    speed: 60,
    player: player,
  }),
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
