const dx = 101;
const dy = 80;
const collision_offset = 60;
const player_start_x = dx * 2;
const player_start_y = dy * 5;

function calculateRandomSpeed() {
    return Math.random() * (300 - 50) + 50;
}

class Character {

    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }

    render() {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }
}


class Enemy extends Character {

    constructor(x, y, player, speed, image = 'images/enemy-bug.png') {
        super(x, y, image);
        this.player = player;
        this.speed = calculateRandomSpeed();
    }

    update(dt) {
        if (this.x > ctx.canvas.width) {
            this.x = 0;
            this.speed = calculateRandomSpeed();
        } else {
            this.x += this.speed * dt;
        }
    }

    findCollision() {
        if (this.x > this.player.x - collision_offset &&
            this.x < this.player.x + collision_offset &&
            this.y > this.player.y - collision_offset &&
            this.y < this.player.y + collision_offset) {
            window.requestAnimationFrame(() => {
                if (confirm('Unfortunately, you lose!\nRestart the game')) {
                    this.player.x = player_start_x;
                    this.player.y = player_start_y;
                }
            });
        }
    }
}

    class Player extends Character {

    constructor(x = player_start_x, y = player_start_y, image = 'images/char-boy.png') {
        super(x, y, image);
    }

    isWinner() {
        if (this.y <= 0) {
            window.requestAnimationFrame(() => {
                if (confirm('Congratulations, you won!\nRestart the game')) {
                    this.x = player_start_x;
                    this.y = player_start_y;
                }
            });
        }
    }

    handleInput(key) {
        switch (key) {
            case 'left':
                if (this.x > 0) {
                    this.x -= dx;
                }
                break;
            case 'right':
                if (this.x + dx < ctx.canvas.width) {
                    this.x += dx;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= dy;
                }
                break;
            case 'down':
                if (this.y + dy * 2 < ctx.canvas.height - 46) {
                    this.y += dy;
                }
                break;
        }
    }
}

const player = new Player();
const allEnemies = Array.from(Array(3).keys()).map(y => new Enemy(0, (y * dy) + 60, player));

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
