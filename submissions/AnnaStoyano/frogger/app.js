const canvas = {
    width:505,
    height:450
}
class Entity {
    constructor(option){
        this.x = option.x;
        this.level = 1;
        this.y = option.y;
        this.speed = option.speed;
        this.sprite = option.sprite;
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

} 

// Enemies our player must avoid
class Enemy extends Entity{
    constructor(option){
        super(option);
        this.sprite = 'images/enemy-bug.png';
        this.player = option.player
    }

    update(dt){
        this.x += this.speed * dt * (this.level * 0.8);
        if(this.x >= canvas.width){
            this.x = -90;
        }
        let lose = this.checkCollision();
        if(lose){
            player.enemies.forEach(enemy=>enemy.level = 1);
        }
        this.increaseLevel();   
    }
    
    increaseLevel(){
        if(this.player.level!=this.level){
            this.level++;
        }
    }

    checkCollision(){
        let positionX = Math.floor(this.x);
        if(positionX-50<player.x && player.x<positionX+50){
            if(this.y-55<player.y && player.y<this.y+20){
                alert(`You lose!\nYour level is ${this.player.level}`);
                player.restartPosition();
                player.level = 1;
                return true;
            }
        }
        return false
    }
}

class Player extends Entity{
    constructor(option){
        super(option);
        this.startX = this.x;
        this.startY = this.y;
        this.sprite = 'images/char-boy.png';
    }
    update(){
        this.checkWin();
        this.checkWallCollision();
    }
    checkWin(){
        if(this.y < -10){
            alert(`You win!\nYour level is ${this.level}`);
            this.level++;
            this.restartPosition();
        }
    }
    checkWallCollision(){
        if(this.x < -30){
            this.x = -20;
        }
        else if (this.x > canvas.width-80){
            this.x = canvas.width-85;
        }
        else if(this.y > canvas.height-5){
            this.y = canvas.height-5;
        }
    }
    restartPosition(){
        this.x = this.startX ;
        this.y = this.startY;
    }
    handleInput(key){
        switch(key){
            case 'left':
                this.x -= 20;
                break;
            case 'right':
                this.x += 20;
                break;
            case 'up':
                this.y -= 20;
                break;
            case 'down':
                this.y += 20;
                break; 
        }
    }
}

const player = new Player({x:200,y:404,speed:7})
const enemies = [{x:30,y:120,speed:60,player:player},{x:15,y:220,speed:30,player:player},{x:0,y:50,speed:20,player:player}]
const allEnemies = enemies.map(item=> new Enemy(item));
player.enemies = allEnemies;

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
