const canvasWidth = 505;  
const startX = 200; 
const startY = 400; 
const stepX = 100; 
const stepY = 85; 
const minX = 0; 
const maxX = minX + 4 * stepX; 
const minY = -25; 
const maxY = startY;  
const startEnemyX = -110 + Math.floor((Math.random()) * (-50));

const Enemy = function(x, y) {
    this.x = x; 
    this.y = y; 
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += dt * 200; 
    this.checkEnemyLocation(); 
    this.checkCollision(); 
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkEnemyLocation = function() {
    if (this.x > canvasWidth) {
        this.x = startEnemyX;  
    }
}; 

Enemy.prototype.checkCollision = function() {
    if(Math.abs(player.x - this.x) < 80 && this.y === player.y) {
        setTimeout(() => {
            alert ('You lost'); 
            player.restart();
        },0) 
    };
}; 

const Player = function(x, y) {
    this.x = x; 
    this.y = y; 
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    this.checkWin(); 
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {

    switch(key) {
        case 'left': {
            const nextX = this.x - stepX;

            if (nextX >= minX) {
                this.x = nextX;
            }
            break; 
        }
        case 'up': {
            const nextY = this.y - stepY; 

            if (nextY >= minY) {
                this.y = nextY;
            }
            break; 
        }
        case 'right': {
            const nextX = this.x + stepX;
            
            if (nextX <= maxX) {
                this.x = nextX; 
            } 
            break;
        }
        case 'down': {
            const nextY = this.y + stepY;

            if(nextY <= maxY) {
                this.y = nextY;
            }  
            break;
        } 
    }
}; 

Player.prototype.restart = function() {
    this.x = startX; 
    this.y = startY; 
}; 

Player.prototype.checkWin = function() {
    if (this.y === minY) {
        setTimeout(() => {
            alert('You won!'); 
            this.restart(); 
        }, 0)
    }
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

const getEnemyY = (row) => startY - row * stepY; 

const allEnemies = [
    new Enemy(-150, getEnemyY(2)), 
    new Enemy (-300, getEnemyY(3)), 
    new Enemy (-50, getEnemyY(4))
]; 

const player = new Player(startX, startY); 
