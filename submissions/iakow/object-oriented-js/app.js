const ENEMY_CONF = {
  rows: { 'top': 60, 'middle': 145, 'bottom': 230 },
  initialX: -80,
  sprite: 'images/enemy-bug.png',
  victorySound: new Audio('sound/eralash-konec.mp3'),
};

const PLAYER_CONF = {
  initialX: 200,
  initialY: 400,
  sprite: 'images/char-boy.png',
  victorySound: new Audio('sound/win.mp3'),
};


const Character = function (sprite, initialX, initialY) {
  this.sprite = sprite;
  this.x = initialX;
  this.y = initialY;
}

Character.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Character.prototype.update = function () { };


const Enemy = function (row, sendLocation, checkMovePermission) {
  Character.call(this, ENEMY_CONF.sprite, ENEMY_CONF.initialX, ENEMY_CONF.rows[row]);

  this.speed = Math.random() * 4 + 2;
  this.sendLocation = sendLocation;
  this.checkMovePermission = checkMovePermission;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
  if (this.checkMovePermission()) {
    this.x += this.speed;

    if (this.x > 500) this.x = ENEMY_CONF.initialX;

    this.sendLocation(this.x, this.y);
  }
}


const Player = function (sendLocation, checkMovePermission) {
  Character.call(this, PLAYER_CONF.sprite, PLAYER_CONF.initialX, PLAYER_CONF.initialY);

  this.sendLocation = sendLocation;
  this.checkMovePermission = checkMovePermission;

  this.sendLocation(this.x, this.y);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function (key) {
  if (this.checkMovePermission()) {
    const move = {
      'up': () => { if (this.y >= 72) this.y -= 82 },
      'down': () => { if (this.y < 400) this.y += 82 },
      'left': () => { if (this.x > 0) this.x -= 100 },
      'right': () => { if (this.x < 400) this.x += 100 },
    };

    if (move.hasOwnProperty(key)) {
      move[key]();
      this.sendLocation(this.x, this.y);
    }
  }
}


const Controller = function () {
  this.freezeGame = false;
  this.playerLocation = { x: PLAYER_CONF.initialX, y: PLAYER_CONF.initialY };

  this.checkMovePermission = () => !this.freezeGame;

  this.reset = () => {
    this.freezeGame = true;

    setTimeout(() => {
      player = new Player(this.checkPlayerLocation, this.checkMovePermission);

      allEnemies = [
        new Enemy('top', this.checkEnemyLocation, this.checkMovePermission),
        new Enemy('middle', this.checkEnemyLocation, this.checkMovePermission),
        new Enemy('bottom', this.checkEnemyLocation, this.checkMovePermission)
      ];

      this.freezeGame = false;
    }, 1400);
  };

  this.checkEnemyLocation = (x, y) => {
    if (Math.abs(y - this.playerLocation.y) > 12) {
      return;
    } else if (Math.abs(x - this.playerLocation.x) > 80) {
      return;
    } else {
      this.enemyWin();
    }
  };

  this.checkPlayerLocation = (x, y) => {
    if (y < 0) this.playerWin();

    this.playerLocation = { x, y };
  };

  this.playerWin = () => {
    PLAYER_CONF.victorySound.play();
    this.reset();
  };

  this.enemyWin = () => {
    ENEMY_CONF.victorySound.play();
    this.reset();
  }
};


const controller = new Controller();

let player = new Player(controller.checkPlayerLocation, controller.checkMovePermission);

let allEnemies = [
  new Enemy('top', controller.checkEnemyLocation, controller.checkMovePermission),
  new Enemy('middle', controller.checkEnemyLocation, controller.checkMovePermission),
  new Enemy('bottom', controller.checkEnemyLocation, controller.checkMovePermission)
];

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
