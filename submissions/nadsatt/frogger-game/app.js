const Enemy = function(img, imgIndex, x, y, speed) {
    this.img = img;
    this.imgIndex = imgIndex;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.initialX = -90;
Enemy.imgsOverlayTreshold = 10;
Enemy.width = 98;
Enemy.height = 77;
Enemy.field = {
    leftBorder: -101,
    rightBorder: 505
};

Enemy.getRandomSpeed = function(){
    let min = 50,
        max = 500;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Enemy.prototype.update = function(dt) {
    if(this.x > Enemy.field.rightBorder){
        this.x = Enemy.field.leftBorder;
    }

    this.x += this.speed * dt;
};

Enemy.prototype.render = function() {
    ctx.drawImage(this.img, this.x, this.y);
};

Enemy.prototype.reset = function(){
    this.x = Enemy.initialX;
}

Enemy.prototype.checkCollisions = function(player){
    let precedingEntity = player.x < this.x ? Player : Enemy;

    return Math.abs(this.x - player.x) < precedingEntity.width - Enemy.imgsOverlayTreshold && 
           Math.abs(this.y - player.y) < precedingEntity.height - Enemy.imgsOverlayTreshold;
}

Enemy.prototype.changeImg = function(imgIndex, img){
    this.imgIndex = imgIndex;
    this.img = img;
}

Enemy.prototype.changeSpeed = function(){
    this.speed = Enemy.getRandomSpeed();
}



const Player = function(img, imgIndex, x, y){
    this.horizontalStep = 101;
    this.verticalStep = 83;
    this.img = img;
    this.imgIndex = imgIndex;
    this.x = x;
    this.y = y;
}

Player.initialX = 217;
Player.initialY = 462;
Player.finalY = 47;
Player.width = 67;
Player.height = 86;
Player.field = {
    leftBorder: 116,
    rightBorder: 318,
    upBorder: 130,
    downBorder: 379
};

Player.prototype.handleInput = function(key){
    switch(key){
        case 'left':
            if(this.x >= Player.field.leftBorder){
                this.x -= this.horizontalStep;
            }
            break;   
        case 'right':
            if(this.x <= Player.field.rightBorder){
                this.x += this.horizontalStep;
            }
            break;
        case 'up':
            if(this.y >= Player.field.upBorder){
                this.y -= this.verticalStep;
            }
            break;
        case 'down':
            if(this.y <= Player.field.downBorder){
                this.y += this.verticalStep;
            }
            break;
    }
}

Player.prototype.render = function(){
    ctx.drawImage(this.img, this.x, this.y);
}

Player.prototype.reset = function(){
    this.x = Player.initialX;
    this.y = Player.initialY;
}

Player.prototype.checkWin = function(){
   return this.y === Player.finalY;
}

Player.prototype.changeImg = function(imgIndex, img){
    this.imgIndex = imgIndex;
    this.img = img;
}

