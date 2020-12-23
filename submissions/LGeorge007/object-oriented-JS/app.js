//point when character appears
const xStartPositionPlayer = 202;
const yStartPositionPlayer = 400;

//the step to which the character moves when the key is pressed
const stepByX = 98;
const stepByY = 83;

//range of speed
const minSpeed = 100;
const maxSpeed = 1000;

//touch distance
//these values describe when the collide is happen
const xTouchDistance = 80;
const yTouchDistance = 60;

//the frame where the character can move
const playerBorders = {
    x : {
        start: 0,
        end: 400
        },
    y : {
        start: 0,
        end: 400
        }
};

//the frame where enemies move
//start value = -100 for smooth movement
const enemyBordersX = {
        start: -100,
        end: 505
};

const Enemy = function(x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
    this.player = player;
};

Enemy.prototype.getSpeed = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    this.speed = Math.floor(Math.random() * (max - min + 1)) + min;
};

Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;

    //x>510 means that Enemy left the field
    //folowing x=-100 for Enemy was hidden in its appearing point.
    if (this.x > enemyBordersX.end) {
        this.x = enemyBordersX.start;
        this.getSpeed(minSpeed, maxSpeed);
    };

    //check colliding Enemy with player object.
    this.getCollide();
};

Enemy.prototype.getCollide = function() {
    if (this.player.x < this.x + xTouchDistance && this.player.x + xTouchDistance > this.x && this.player.y < this.y + yTouchDistance && yTouchDistance + this.player.y > this.y) {
        this.player.setStartPosition();
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.setStartPosition = function() {
    this.x = xStartPositionPlayer;
    this.y = yStartPositionPlayer;
};

Player.prototype.handleInput = function(keyPressed, stepX, stepY) {

    if (keyPressed == "left" && (this.x-stepX) > playerBorders.x.start) {
        this.x -= stepX;
    };
    if (keyPressed == "right" && (this.x+stepX) < playerBorders.x.end) {
        this.x += stepX;
    };
    if (keyPressed == "up" && this.y > playerBorders.y.start) {
        this.y -= stepY;
    };
    if (keyPressed == "down" && this.y < playerBorders.y.end) {
        this.y += stepY;
    };

    if (this.y < 0 ){
        alert("You win!");
        this.setStartPosition();
    };
};

const player = new Player(xStartPositionPlayer, yStartPositionPlayer);
const allEnemies = [225,145,60].map(yAxis => new Enemy(0, yAxis, minSpeed, player));

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode], stepByX, stepByY);
});
