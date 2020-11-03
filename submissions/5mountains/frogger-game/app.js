const playerFrame = {
    borderX: {
        start: 0,
        end: 400
    },
    borderY: {
        start: 0,
        end: 400
    },
};

const enemyFrame = {
    borderX: {
        start: -100,
        end: 505
    }
};

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.stepX = 100;
        this.stepY = 85;
    }

    update() {
        this.checkWin();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(move) {
        switch(move) {
            case 'left':
                this.x -= this.stepX;
                if (this.x < playerFrame.borderX.start) this.x = playerFrame.borderX.start;
                break;
            case 'right':
                this.x += this.stepX;
                if (this.x > playerFrame.borderX.end) this.x = playerFrame.borderX.end;
                break;
            case 'up':
                this.y -= this.stepY;
                break;
            case 'down':
                this.y += this.stepY;
                if (this.y > playerFrame.borderY.end) this.y = playerFrame.borderY.end;
                break;
            default:
                break;
        }
    }

    checkWin() {
        if (this.y < playerFrame.borderY.start) setTimeout(() => {
            this.resetStart();
            alert('You win!');
        }, 10);
    }

    resetStart(){
        this.x = (this.stepX * 2);
        this.y = playerFrame.borderY.end;
    }
}

class Enemy {
    constructor(x, y, player) {
        this.x = x;
        this.y = y;
        this.player = player;
        this.sprite = 'images/enemy-bug.png';
        this.speed = (Math.random() * 200) + 200;
        this.gap = 50;
    }

    update(dt) {
        this.x += this.speed * dt;
        if (this.x > enemyFrame.borderX.end) this.x = enemyFrame.borderX.start;
        this.checkCollisions();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    checkCollisions() {
        if (
            this.x >= this.player.x - this.gap &&
            this.x <= this.player.x + this.gap &&
            this.y >= this.player.y - this.gap &&
            this.y <= this.player.y + this.gap
        ) setTimeout(() => {
              this.player.resetStart();
              alert('You lose!');
        }, 10);
    }
}

const player = new Player(200, 400);

const allEnemies = [];

const EnemySetY = [60, 145, 225];

EnemySetY.forEach(point => allEnemies.push(new Enemy((Math.random()*200), point, player)));

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

