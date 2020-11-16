const cellHeight = 83;
const cellWidth = 101;
const totalRow = 6;
const totalCol = 5;

class Position {
    minY;
    minX;
    maxY;
    maxX;
    initX;
    initY;
    x;
    y;

    constructor( row, col ) {
        this.initX = (cellWidth * col) - (cellWidth);
        this.initY = (cellHeight * row) - (cellHeight / 2);
        this.x = this.initX;
        this.y = this.initY;
        this.maxY = cellHeight * (totalRow - 1);
        this.maxX = cellWidth * (totalCol - 1);
        this.minY = cellHeight * (row - 1) - this.initY;
        this.minX = 0;
    }

    reset() {
        this.x = this.initX;
        this.y = this.initY;
    }
}

class PositionEnemy extends Position {

    run(speed, dt) {
        this.x += (speed * dt); 
    }
}

class PositionPlayer extends Position {

    moveUp() {
        let newLocY = this.y - cellHeight;
        if (newLocY >= this.minY) {
            this.y = newLocY; 
        }
    }

    moveDown() {
        let newLocY = this.y + cellHeight;
        if (newLocY <= this.maxY) {
            this.y = newLocY; 
        }
    }

    moveRigtht() {
        let newLocX = this.x + cellWidth;
        if (newLocX <= this.maxX) {
            this.x = newLocX; 
        }
    }

    moveLeft() {
        let newLocX = this.x - cellWidth;
        if (newLocX >= this.minX) {
            this.x = newLocX; 
        }
    }
}

class Enemy {

    speed = (Math.floor(Math.random(3) * (400 - 100 + 1)) + 100);
    sprite = 'images/enemy-bug.png';

    constructor ( PositionEnemy ) {
        this.position = PositionEnemy;
    }

    update (dt) {
        if (this.position.x <= this.position.maxX) {
            this.position.run(this.speed, dt);
        } else {
            this.position.reset();
        }
    }

    render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
    }
}

class Player {
    sprite = 'images/char-horn-girl.png';

    constructor ( PositionPlayer ) {
        this.position = PositionPlayer;
    }

    win() {
        if (this.position.y == this.position.minY) {
            setTimeout(() => {
                alert("Congrats! You win!");
                this.position.reset();
            }, 0);
        }
    }

    update () {
        this.win();
    }

    handleInput (keyCode) {

        switch(keyCode) {
            case 'up': 
                this.position.moveUp();
                break;
            case 'down': 
                this.position.moveDown();
                break;
            case 'right': 
                this.position.moveRigtht();
                break;
            case 'left': 
                this.position.moveLeft();
                break;
            default: 
                break;
        }
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
    }
}    

let allEnemies = [
    new Enemy (new PositionEnemy ( 1, 0 )),
    new Enemy (new PositionEnemy ( 2, 0 )),
    new Enemy (new PositionEnemy ( 3, 0 )),
];

let player = new Player( new PositionPlayer( 5, 3 ) );

function checkCollisions() {
    let collisionedEnemies = allEnemies.filter(filterCollisionedEnemies, player);
    
    if (collisionedEnemies.length) {
        player.position.reset();
    }
}

function filterCollisionedEnemies(enemy) {
    let fromPlayerToEnemyX = this.position.x - enemy.position.x;
    let halfCellWidth = (cellWidth / 2);
    let isEqualY = this.position.y === enemy.position.y;

    return (Math.abs(fromPlayerToEnemyX) < halfCellWidth) && isEqualY;
}

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
