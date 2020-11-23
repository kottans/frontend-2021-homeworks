let player,
    allEnemies,
    score = 0;

const settingsList = document.querySelector('.settings-list'),
      scoreSpan = document.querySelector('.score__value');

document.addEventListener('keyup', handleArrowKeyUp);
settingsList.addEventListener('click', handleSettingsClick);
scoreSpan.textContent = score;

const enemyImgs = [
    'images/enemy-dog.png',
    'images/enemy-bug.png'
], 
      playerImgs = [
    'images/char-cat.png',
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png'
];

Resources.load(enemyImgs
    .concat(playerImgs)
);
Resources.onReady(initEntities);

function handleSettingsClick({target}){
    if(target.className === 'settings__item'){
        switch (target.dataset.change){
            case 'player':
                changeEntityImgs([player], playerImgs);
                break;
            case 'enemies':
                changeEntityImgs(allEnemies, enemyImgs);
                break;
            case 'speed':
                changeEnemySpeeds();
                break;
        }
    }
}

function handleArrowKeyUp(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

function initEntities(){
    const initialYs = [135, 218, 301];
    let imgIndex = 0;

    player = new Player(
        Resources.get(playerImgs[imgIndex]), 
        imgIndex,
        Player.initialX, 
        Player.initialY
    );
    
    allEnemies = initialYs.map(initialY => 
        new Enemy(
            Resources.get(enemyImgs[imgIndex]), 
            imgIndex,
            Enemy.initialX, 
            initialY, 
            Enemy.getRandomSpeed(),
            player
        )
    );
}

function resetEntities(){
    player.reset();
    allEnemies.forEach(enemy => enemy.reset());
}

function changeEntityImgs(entities, entityImgs){
    let imgIndex = entities[0].imgIndex;
    imgIndex = increaseImgIndex(imgIndex, entityImgs);

    let img = Resources.get(entityImgs[imgIndex]);

    entities.forEach(entity => {
        entity.changeImg(imgIndex, img);
    });
}

function increaseImgIndex(imgIndex, entityImgs){
    return imgIndex === entityImgs.length - 1 ? 0 : ++imgIndex;
}

function changeEnemySpeeds(){
    allEnemies.forEach(enemy => 
        enemy.changeSpeed()
    );
}

function renderScore(){
    scoreSpan.textContent = score; 
}

const Character = function Character(img, imgIndex, x, y){
    this.img = img;
    this.imgIndex = imgIndex;
    this.x = x;
    this.y = y;
}

const Enemy = function Enemy(img, imgIndex, x, y, speed, player) {
    Character.call(this, img, imgIndex, x, y);

    this.speed = speed;
    this.player = player;
};

Enemy.initialX = -90;
Enemy.imgsOverlayTreshold = 10;
Enemy.size = {
    width: 98,
    height: 77
}
Enemy.field = {
    leftBorder: -101,
    rightBorder: 505
};

Enemy.getRandomSpeed = function(){
    let min = 50,
        max = 500;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    this.increaseCoordinates(dt);

    if(this.checkCollisions()){
       this.handleLose();
    }
};

Enemy.prototype.increaseCoordinates = function(dt){
    if(this.x > Enemy.field.rightBorder){
        this.x = Enemy.field.leftBorder;
    }

    this.x += this.speed * dt;
}

Enemy.prototype.checkCollisions = function(){
    let precedingEntity = this.player.x < this.x ? Player : Enemy;

    return Math.abs(this.x - this.player.x) < precedingEntity.size.width - Enemy.imgsOverlayTreshold && 
           Math.abs(this.y - this.player.y) < precedingEntity.size.height - Enemy.imgsOverlayTreshold;
}

Enemy.prototype.handleLose = function(){
    setTimeout(() => {
        resetEntities();
        alert('You lose!');

        score = 0;
        renderScore();
    });
}

Enemy.prototype.render = function() {
    ctx.drawImage(this.img, this.x, this.y);
};

Enemy.prototype.reset = function(){
    this.x = Enemy.initialX;
}

Enemy.prototype.changeImg = function(imgIndex, img){
    this.imgIndex = imgIndex;
    this.img = img;
}

Enemy.prototype.changeSpeed = function(){
    this.speed = Enemy.getRandomSpeed();
}

const Player = function Player (img, imgIndex, x, y){
    Character.call(this, img, imgIndex, x, y);

    this.horizontalStep = 101;
    this.verticalStep = 83;
}

Player.initialX = 217;
Player.initialY = 462;
Player.finalY = 47;
Player.size = {
    width: 67,
    height: 86
}
Player.field = {
    leftBorder: 116,
    rightBorder: 318,
    upBorder: 130,
    downBorder: 379
};
 
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

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

Player.prototype.update = function(){
   if(this.checkWin()){
     this.handleWin();
   }
}

Player.prototype.checkWin = function(){
    return this.y === Player.finalY;
}

Player.prototype.handleWin = function(){
    setTimeout(() => {
        resetEntities();
        alert('You won!');

        score += 1;
        renderScore();
    })
}

Player.prototype.render = function(){
    ctx.drawImage(this.img, this.x, this.y);
}

Player.prototype.reset = function(){
    this.x = Player.initialX;
    this.y = Player.initialY;
}

Player.prototype.changeImg = function(imgIndex, img){
    this.imgIndex = imgIndex;
    this.img = img;
}
