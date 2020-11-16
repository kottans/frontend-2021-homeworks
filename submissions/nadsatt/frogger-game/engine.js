var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        score = 0;
    
    global.ctx = ctx;
    canvas.width = 505;
    canvas.height = 606;

    const settingsList = doc.querySelector('.settings-list');
    settingsList.after(canvas);

    const scoreSpan = doc.querySelector('.score__value');
    scoreSpan.textContent = score;

    let player,
        allEnemies;

    const fieldImgs = [
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png'  
    ];
    const enemyImgs = [
        'images/enemy-dog.png',
        'images/enemy-bug.png'
    ];
    const playerImgs = [
        'images/char-cat.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png'
    ];
    
    settingsList.addEventListener('click', function({target}){
        if(target.className === 'settings__item'){
            switch (target.dataset.change){
                case 'player':
                    changePlayerImg();
                    break;
                case 'enemies':
                    changeEnemyImgs();
                    break;
                case 'speed':
                    changeEnemiesSpeed();
                    break;
            }
        }
    })

    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
    
        player.handleInput(allowedKeys[e.keyCode]);
    });

    Resources.load(fieldImgs.concat(
        enemyImgs, 
        playerImgs
    ));
    Resources.onReady(init);

    function init() {
        initEntities();
        
        lastTime = Date.now();
        main();
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

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        updateEntities(dt);
        renderField();
        renderEnemies();

        lastTime = now;

        if(checkCollisions()){
            setTimeout(() => {
                alert('You lose!');

                score = 0;
                updateScore();

                reset();
    
            }, 0);
        }
        else if(checkWin()){
            setTimeout(() => {
                alert('You won!');

                score += 1;
                updateScore();

                reset();
            }, 0);
        }
        else {
            win.requestAnimationFrame(main);
        }
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
    }

    function renderField() {
        var rowImages = [
                'images/water-block.png',  
                'images/stone-block.png', 
                'images/stone-block.png', 
                'images/stone-block.png', 
                'images/grass-block.png', 
                'images/grass-block.png',
                'images/char-boy-cropped.png',
                'images/char-cat-girl-cropped.png'
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        ctx.clearRect(0,0,canvas.width,canvas.height);

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
    }

    function renderEnemies() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    function checkCollisions(){
        return allEnemies.some(enemy => enemy.checkCollisions(player));
    }

    function checkWin(){
         return player.checkWin();
    }

    function reset(){
        resetEntities(); 
                
        lastTime = Date.now();
        main();
    }

    function resetEntities(){
        player.reset();
        allEnemies.forEach(enemy => enemy.reset());
    }

    function updateScore(){
        scoreSpan.textContent = score; 
    }

    function changePlayerImg(){
        let imgIndex = player.imgIndex;
        imgIndex = increaseImgIndex(imgIndex, playerImgs);

        img = Resources.get(playerImgs[imgIndex]);

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

    function changeEnemiesSpeed(){
        allEnemies.forEach(enemy => 
            enemy.changeSpeed()
        );
    }
})(this);