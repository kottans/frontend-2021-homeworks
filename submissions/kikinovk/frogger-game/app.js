const ENEMY_START_POS_X = -100;
const ENEMY_END_POS_X = 500;
const ENEMY_BLOCK_HEIGHT = 85;
const ENEMY_POS_INDENT = 60;

const PLAYER_START_POS_X = 200;
const PLAYER_START_POS_Y = 400;
const PLAYER_END_POS_Y = -15;
const PLAYER_MIN_POS_X = 0;
const PLAYER_MAX_POS_X = 400;
const PLAYER_MIN_POS_Y = -15;
const PLAYER_MAX_POS_Y = 400;
const PLAYER_STEP_X = 100;
const PLAYER_STEP_Y = 83;

const SPEED_COEFF = 500;

const CLASH_X = 80;
const CLASH_Y = 15;


const PLAYER_CONF = {
    initPosition: {
        x: PLAYER_START_POS_X,
        y: PLAYER_START_POS_Y
    },
    sprite: 'images/char-boy.png'
};

const ENEMY_CONF = [
    {
        initPosition: {
            x: ENEMY_START_POS_X,
            y: ENEMY_POS_INDENT + ENEMY_BLOCK_HEIGHT * 0
        },
        sprite: 'images/enemy-bug.png'
    },
    {
        initPosition: {
            x: ENEMY_START_POS_X,
            y: ENEMY_POS_INDENT + ENEMY_BLOCK_HEIGHT * 0
        },
        sprite: 'images/enemy-bug.png'
    },
    {
        initPosition: {
            x: ENEMY_START_POS_X,
            y: ENEMY_POS_INDENT + ENEMY_BLOCK_HEIGHT * 1
        },
        sprite: 'images/enemy-bug.png'
    },
    {
        initPosition: {
            x: ENEMY_START_POS_X,
            y: ENEMY_POS_INDENT + ENEMY_BLOCK_HEIGHT * 1
        },
        sprite: 'images/enemy-bug.png'
    },
    {
        initPosition: {
            x: ENEMY_START_POS_X,
            y: ENEMY_POS_INDENT + ENEMY_BLOCK_HEIGHT * 2
        },
        sprite: 'images/enemy-bug.png'
    },
    {
        initPosition: {
            x: ENEMY_START_POS_X,
            y: ENEMY_POS_INDENT + ENEMY_BLOCK_HEIGHT * 2
        },
        sprite: 'images/enemy-bug.png',
        speed: 150
    },
];


const Character = function(x,y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function(x, y, sprite, speed) {
    Character.call(this, x, y, sprite);
    this.speed = speed ? speed : this.randomSpeed(SPEED_COEFF);

};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.randomSpeed = function(coeff){
    return Math.random()*coeff;
};

Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    if (this.x >= ENEMY_END_POS_X) {
        this.x = ENEMY_START_POS_X;
        this.speed = this.randomSpeed(SPEED_COEFF);
    }
};

const Player = function(x, y, sprite) {
    Character.call(this, x, y, sprite);
};

Player.prototype = Object.create( Character.prototype);

Player.prototype.reset = function() {
    this.x = PLAYER_START_POS_X;
    this.y = PLAYER_START_POS_Y;
};

Player.prototype.checkCollision = function(enemy) {
    if ( Math.abs(this.y - enemy.y) < CLASH_Y &&  Math.abs(this.x - enemy.x) < CLASH_X) {
        this.reset();
    };
};

Player.prototype.update = function(dt) {
    if (this.y === PLAYER_END_POS_Y) {
        alert('YOU WIN!!');
        this.reset();
    }
};

Player.prototype.handleInput = function(move) {

    let addStep = function(startPosition, min, max, step){
        var newPosition = startPosition + step;
        return newPosition >= max ? max : newPosition  <= min ? min : newPosition
    };
    switch(move) {
        case 'left':
            this.x = addStep(this.x, PLAYER_MIN_POS_X, PLAYER_MAX_POS_X, -PLAYER_STEP_X);
            break;
        case 'up':
            this.y = addStep(this.y, PLAYER_MIN_POS_Y, PLAYER_MAX_POS_Y, -PLAYER_STEP_Y);
            break;
        case 'right':
            this.x = addStep(this.x, PLAYER_MIN_POS_X, PLAYER_MAX_POS_X, PLAYER_STEP_X);
            break;
        case 'down':
            this.y = addStep(this.y, PLAYER_MIN_POS_Y, PLAYER_MAX_POS_Y, PLAYER_STEP_Y);
            break;
    }
};


const allEnemies = ENEMY_CONF.map(enemy => new Enemy(enemy.initPosition.x, enemy.initPosition.y, enemy.sprite));

const player = new Player(PLAYER_CONF.initPosition.x, PLAYER_CONF.initPosition.y, PLAYER_CONF.sprite, PLAYER_CONF.speed);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
