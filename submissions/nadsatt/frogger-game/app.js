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
                changePlayerImg();
                break;
            case 'enemies':
                changeEnemyImgs();
                break;
            case 'speed':
                changeEnemySpeeds();
                break;
        }
    }
}

function handleArrowKeyUp(e) {
    var allowedKeys = {
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
            Enemy.getRandomSpeed()
        )
    );
}

function resetEntities(){
    player.reset();
    allEnemies.forEach(enemy => enemy.reset());
}

function changePlayerImg(){
    let imgIndex = player.imgIndex;
    imgIndex = increaseImgIndex(imgIndex, playerImgs);

    let img = Resources.get(playerImgs[imgIndex]);

    player.changeImg(imgIndex, img);
}

function changeEnemyImgs(){
    let imgIndex = allEnemies[0].imgIndex;
    imgIndex = increaseImgIndex(imgIndex, enemyImgs);

    let img = Resources.get(enemyImgs[imgIndex]);

    allEnemies.forEach(enemy => {
        enemy.changeImg(imgIndex, img);
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
    let precedingEntity = player.x < this.x ? Player : Enemy;

    return Math.abs(this.x - player.x) < precedingEntity.width - Enemy.imgsOverlayTreshold && 
           Math.abs(this.y - player.y) < precedingEntity.height - Enemy.imgsOverlayTreshold;
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
