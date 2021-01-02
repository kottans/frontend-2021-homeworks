const START = {
    X : 200,
    Y : 390
};

const STEP = {
    X : 100,
    Y : 80
};

const WINDOW_WIDTH = 505;

const Enemy = function(x,y,speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = player;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if(this.x >= WINDOW_WIDTH)
        this.x = -STEP.X;
    else
        this.x += dt * this.speed;

    this.checkCollision();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function() {
    if (this.player.x < this.x + STEP.X/2 &&
        this.player.x + STEP.X/2 > this.x &&
        this.player.y < this.y + STEP.Y/4 &&
        this.player.y + STEP.Y/4 > this.y) {
        this.player.x = START.X;
        this.player.y = START.Y;
    }
}

const Player = function(){
    this.x = START.X;
    this.y = START.Y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    switch (key) {
        case 'left':
            this.x -= STEP.X;
            if(this.x < 0){
                this.x = 0;
            }
            break;
        case 'down':
            this.y += STEP.Y;
            if(this.y > START.X){
                this.y = START.Y;
            }
            break;
        case 'right':
            this.x += STEP.X;
            if(this.x > WINDOW_WIDTH - STEP.X / 5){
                this.x = WINDOW_WIDTH - STEP.X;
            }
            break;
        case 'up':
            this.y -= STEP.Y;
            if (this.y < 0) {
                this.x = START.X;
                this.y = START.Y;
            }
            break;
    }
};

const player = new Player();
function speed(){
    var minVal = 60;
    var maxVal = 200;
    return Math.random() * (200 - 60) + 60;
}

function getEnemyRows() {
    let rows = []
    for(let i = 1; i <= 3; ++i)
        rows.push(i * STEP.Y - STEP.X / 5);
    return rows;
}
const enemyRows = getEnemyRows();

function createEnemies() {
    let enemies = [];
    for(let i = 0; i < enemyRows.length; i++)
        enemies.push( new Enemy(0, enemyRows[i], speed(), player));
    return enemies;
}
const allEnemies = createEnemies();

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
