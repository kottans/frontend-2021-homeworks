const WIDTH = 505;
const BLOCK_HEIGHT = 77;
const STEP = 90;
const MAX_SPEED = 400;
const MIN_SPEED = 100;
const PLAYER_CONF = {
    startPosX : 200, 
    startPosY : 400,
};

const ENEMY_CONF = {
    quantity : 3,
    startPosX : -100,
    startPosY : [1,2,3].map(rowNumber => rowNumber * BLOCK_HEIGHT),
};

let Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/cat.gif';
};

let allEnemies =  Array.from(Array(ENEMY_CONF.quantity),
(val, index) => new Enemy(ENEMY_CONF.startPosX,ENEMY_CONF.startPosY[index],getRandomNumber(MIN_SPEED,MAX_SPEED)));

Enemy.prototype.update = function(dt) {
    this.x > WIDTH ? this.x = ENEMY_CONF.startPosX : this.x = this.x + this.speed * dt;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function() {
    this.x = PLAYER_CONF.startPosX;
    this.y = PLAYER_CONF.startPosY;
    this.sprite = 'images/fish.gif';
};
Player.prototype.setDefault = function () {
    this.x = PLAYER_CONF.startPosX;
    this.y = PLAYER_CONF.startPosY;
};

Player.prototype.update = function() {
    if (this.y < 0) {
        alert('WINNER, you saved the fish!');
        player.setDefault();
    }
   // handles collision with the Player
   allEnemies.forEach(function(enemy) {
    if ( Math.round(enemy.x / STEP) === Math.round(player.x / STEP) && 
         Math.round(enemy.y / BLOCK_HEIGHT) === Math.round(player.y / BLOCK_HEIGHT) ) {
            alert('you lose! =(');
            player.setDefault();
    }
   });
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) { 
    let move = {
        'up':  () => {      
            if (this.y > 0) this.y -= STEP;
        },
        'down': () => {
            if (this.y < PLAYER_CONF.startPosY) this.y += STEP;
        },
        'left': () => {
            if (this.x > STEP) this.x -= STEP;
        },
        'right': () => {
            if (this.x < STEP*4) this.x += STEP;
        },
        'default' : () => {
            return false;
        }
    };
    return (move[key] || move['default'])();
};
 
let player = new Player();

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

