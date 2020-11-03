class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
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
                if (this.x > 0) this.x -= 100;
                break;
            case 'right':
                if (this.x < 400) this.x += 100;
                break;
            case 'up':
                if (this.y > 0) this.y -= 85;
                break;
            case 'down':
                if (this.y < 380) this.y += 85;
                break;
            default:
                break;
        }
    }

    checkWin() {
        if (this.y < 0) setTimeout(() => {
            this.resetStart();
            alert('You win!');
        }, 10);
    }

    resetStart(){
        this.x = 200;
        this.y = 400;
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = (Math.random() * 200) + 200;
    }

    update(dt) {
        this.x += this.speed * dt;
        if (this.x > ctx.canvas.width) this.x = -100;
        this.checkCollisions();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    checkCollisions() {
        if (
            this.x >= player.x - 50 &&
            this.x <= player.x + 50 &&
            this.y >= player.y - 50 &&
            this.y <= player.y + 50
        ) setTimeout(() => {
              player.resetStart();
              alert('You lose!');
        }, 10);
    }
}

const player = new Player(200, 400);

const allEnemies = [];

(function generateEnemies(){
    const pointY = [60, 145, 225];
    pointY.forEach(point => allEnemies.push(new Enemy((Math.random()*200), point)));
})();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
