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
    enemy = new Enemy (new PositionEnemy ( 1, 0 )),
    enemy = new Enemy (new PositionEnemy ( 2, 0 )),
    enemy = new Enemy (new PositionEnemy ( 3, 0 )),
];

let player = new Player( new PositionPlayer( 5, 3 ) );

function checkCollisions() {

    allEnemies.forEach(function(enemy) {
        let checkDiffPlayerX = player.position.x - enemy.position.x < (cellWidth / 2) && player.position.x - enemy.position.x >= 0;
        let checkDiffEnemyX = enemy.position.x - player.position.x < (cellWidth / 2) && enemy.position.x - player.position.x >= 0;
        let checkEqualY = player.position.y === enemy.position.y;

        if ((checkDiffPlayerX && checkEqualY) || ( checkDiffEnemyX && checkEqualY)) {
            
            return player.position.reset();
        }
    });

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
