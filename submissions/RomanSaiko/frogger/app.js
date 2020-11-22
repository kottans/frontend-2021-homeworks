const gameArea = {
    minX: 0,
    minY: 0,
    maxX: 400,
    maxY: 400
}

const playerProps = {
    sprite: 'images/char-boy.png',
    x: gameArea.maxX / 2,
    y: gameArea.maxY,
    speed: 40
}

const enemySize = 100;
const minDeadDistance = 75;

const Character = function({sprite, x, y, speed}) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
}

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function({x, y, speed, player}) {
    Character.call(this, {sprite: 'images/enemy-bug.png', x, y,speed});
    this.player = player;
};

Enemy.prototype = Object.create(Character.prototype);
Object.setPrototypeOf(Enemy, Character);
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > gameArea.maxX + enemySize) {
        this.x = -enemySize;
    }
    if (Math.abs(this.x - this.player.x) < minDeadDistance && Math.abs(this.y - this.player.y) < minDeadDistance) {
        this.player.reset(playerProps);
        alert('You lost! Try again!');
    }
};

const Player = function (state) {
    Character.call(this, state);
};

Player.prototype = Object.create( Character.prototype);
Object.setPrototypeOf(Player, Character);
Player.prototype.update = function() {};

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
            if (this.x < gameArea.minX) {
                this.x = gameArea.minX;
            }
            break;
        case 'right':
            this.x += this.speed;
            if (this.x > gameArea.maxX) {
                this.x = gameArea.maxX;
            }
            break;
        case 'up':
            this.y -= this.speed;
            if (this.y <= gameArea.minY) {
                alert('Congratulations! You won!');
                this.x = playerProps.x;
                this.y = playerProps.y;
            }
            break;
        case 'down':
            this.y += this.speed;
            if (this.y > gameArea.maxY) {
                this.y = gameArea.maxY;
            }
            break;
        default:
    }
};

const player = new Player(playerProps);
const enemy1 = new Enemy({x: -150, y: 60, speed: 90, player: player});
const enemy2 = new Enemy({x: -250, y: 145, speed: 70, player: player});
const enemy3 = new Enemy({x: -50, y: 230, speed: 50, player: player});

const allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
