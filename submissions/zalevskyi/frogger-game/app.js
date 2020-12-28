/***Geometry of collisions***/
class Point2D {
    constructor(x,y) {
        this.x=x
        this.y=y
    }
    static distance(p1, p2) {
        return Math.hypot(p1.x - p2.x, p1.y - p2.y)
    }
}
class Circle {
    // center - is an instance of Point2D
    constructor(center, radius) {
        this.center = center
        this.radius = radius
    }
    //checks overlap between two instances of Circle
    static isOverlap(c1, c2) {
        return c1.radius + c2.radius > Point2D.distance(c1.center, c2.center)
    }
}
/***Game Entities***/
//Basic sprite class to render, change position and check collisions
class Sprite {
    constructor(image, position) {
        // image - url of the sprite image
        // position - Point2D instance of upper-left image corner
        this.image = image
        this.setInitialPosition()
        this.allPoints = [this.position, ...this.collisionCircles.map(circle => circle.center)]
        this.changePosition(position.x - this.position.x, position.y - this.position.y)
    }
    setInitialPosition() {
        this.position = new Point2D(0, 0)
        this.collisionCircles = collisionCirclesFactory(this.image)
    }
    render() {
        ctx.drawImage(Resources.get(this.image), this.position.x, this.position.y);
    }
    //changes absolute position of sprite image and all its collision circles
    changePosition(delta_x, delta_y) {
        this.allPoints.forEach(point => {
            point.x += delta_x
            point.y += delta_y
        })
    }
    //checks collision between two sprites
    static isCollision(s1, s2) {
        return s1.collisionCircles.reduce((result, s1_circle) =>
                result || s2.collisionCircles.reduce((result, s2_circle) =>
                    result || Circle.isOverlap(s1_circle, s2_circle), false), false
            )
    }
}
class Collectable extends Sprite {
    constructor(image, position) {
        super(image, position)
        this.timeToAppear = false
        this.timeToDisappear = false
    }
    render() {
        if (this.timeToAppear && this.timeToAppear<Date.now()) this.appear()
        if (this.timeToDisappear && this.timeToDisappear<Date.now()) this.disappear()
        super.render()
    }
    appear() {
        this.changePosition(Math.random()*404 - this.position.x, 0)
        this.timeToAppear = false
        this.timeToDisappear = Date.now() + 1000 * 6
    }
    disappear() {
        this.changePosition(OFF_SCREEN_X - this.position.x, 0)
        this.timeToAppear = Date.now() + 1000 * 3
        this.timeToDisappear = false
    }
}
//Sprite that can move on its own
class Actor extends Sprite {
    constructor(image, position, speed) {
        super(image, position)
        this.speed = speed
        this.moveStatus = {'down': false, 'up': false, 'right': false, 'left': false}
    }
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers
    update(dt) {
        let move_x = this.moveStatus['right']-this.moveStatus['left']
        let move_y = this.moveStatus['down']-this.moveStatus['up']
        if (move_x!==0 && move_y!==0) {
            move_x = move_x / Math.sqrt(2)
            move_y = move_y / Math.sqrt(2)
        }
        this.changePosition(dt * this.speed * move_x, dt * this.speed * move_y)
    }
    //Enables movement in specific direction
    move(code) {
        this.moveStatus[code] = true
    }
    //Stops movement in specific direction
    stop(code) {
        this.moveStatus[code] = false
    }
}
//Sprite that moves to the right and once it is gone from playground
//it is restarted on the left edge of playground
class Enemy extends Actor {
    constructor(image, position, speedMin, speedMax) {
        super(image, position, speedMin)
        this.speedMin = speedMin
        this.speedMax = speedMax
        this.timeToGo = false
    }
    update(dt) {
        if (this.moveStatus['right']===false) {
            if (this.timeToGo && this.timeToGo < Date.now()) {
                this.moveStatus['right'] = true
                this.timeToGo = false
            }
        }
        super.update(dt)
        if (this.position.x > ENEMY_POSITION_LIMITS['x_right']) this.restart()
    }
    restart() {
        this.moveStatus['right'] = false
        this.timeToGo = Date.now() + 1000 * (2 + Math.random() * 2)
        this.changePosition(OFF_SCREEN_X - this.position.x, 0)
        this.speed = this.speedMin + Math.random() * (this.speedMax - this.speedMin)
    }
}
//Main game sprite controled by person that can collect objects and be hitted by enemies
class Player extends Actor {
    constructor(image, position, speed, allCollectables, allEnemies) {
        super(image, position, speed)
        this.score = 0
        this.allCollectables = allCollectables
        this.allEnemies = allEnemies
    }
    update(dt) {
        super.update(dt)
        this.adjustPositionWithinLimits()
        this.checkWin()
        this.checkCollectablesCollision()
        this.checkEnemiesCollision()
    }
    render() {
        super.render()
        if (gameIsOn) {
            this.renderScore()
        } else if (gameIsOver) {
            this.renderGameEnd()
        } else {
            this.renderRules()
            this.renderSkinSelection()
        }
    }
    //controls player position withing playground
    adjustPositionWithinLimits() {
        if (this.position.x < PLAYER_POSITION_LIMITS.x_left) {
            this.changePosition(PLAYER_POSITION_LIMITS.x_left - this.position.x, 0)
        }
        else if (this.position.x > PLAYER_POSITION_LIMITS.x_right) {
            this.changePosition(PLAYER_POSITION_LIMITS.x_right - this.position.x, 0)
        }
        if (this.position.y > PLAYER_POSITION_LIMITS.y_bottom) {
            this.changePosition(0, PLAYER_POSITION_LIMITS.y_bottom - this.position.y)
        }
    }
    checkWin() {
        if (this.position.y < PLAYER_POSITION_LIMITS.y_top) {
            this.score += 1
            this.changePosition(PLAYER_POSITION_START.x - this.position.x,
                                PLAYER_POSITION_START.y - this.position.y)
        }
    }
    checkCollectablesCollision() {
        this.allCollectables.forEach(c => {
            if (Sprite.isCollision(c, this)) {
                c.disappear()
                this.score += 1
            }
        })
    }
    checkEnemiesCollision() {
        this.allEnemies.forEach(e => {
            if (Sprite.isCollision(e, this)) {
                this.endGame()
            }
        })
    }
    endGame() {
        this.allEnemies.forEach(e => {
            e.moveStatus['right']=false
            //prevent rare case when some enemy reached right edge
            //and will restart movement from the left
            //but game is already over due to player collision with other enemy instance
            if (e.position.x > ENEMY_POSITION_LIMITS['x_right']) {
                e.changePosition(OFF_SCREEN_X - e.position.x, 0)
            }
        })
        this.allCollectables.forEach(c => {
            c.timeToAppear=false
            c.timeToDisappear=false
        })
        for (let direction in this.moveStatus) this.moveStatus[direction] = false
        gameIsOver = true
        gameIsOn = false
    }
    renderRules() {
        ctx.fillStyle = 'whitesmoke'
        ctx.fillRect(50, 155, 405, 200)
        ctx.font = '25px san-serif'
        ctx.fillStyle = 'navy'
        ctx.textAlign = 'center'
        ctx.fillText('Gain one point for reaching water', 252, 185)
        ctx.fillText('Collect stars for additional points', 252, 215)
        ctx.fillText('Use arrows to move', 252, 245)
        ctx.fillStyle = 'red'
        ctx.fillText('Game ends when a bug hits you', 252, 275)
        ctx.fillStyle = 'green'
        ctx.fillText('Select character with arrows', 252, 305)
        ctx.fillText('Or press Space to start', 252, 335)
    }
    renderSkinSelection() {
        ctx.drawImage(Resources.get(IMAGES['selector']), PLAYER_POSITION_START.x, PLAYER_POSITION_START.y)
        super.render()
    }
    changeSkin(change) {
        let skin_index = (IMAGES['player'].indexOf(this.image) + change) % IMAGES['player'].length
        if (skin_index < 0) skin_index = IMAGES['player'].length + skin_index
        this.image = IMAGES['player'][skin_index]
    }
    renderScore() {
        ctx.textAlign = 'left'
        ctx.font = '30px san-serif'
        ctx.fillText(`Score: ${this.score}`, SCORE_POSITION.x, SCORE_POSITION.y)
    }
    renderGameEnd() {
        ctx.fillStyle = 'whitesmoke'
        ctx.fillRect(50, 410, 405, 110)
        ctx.font = '25px san-serif'
        ctx.fillStyle = 'navy'
        ctx.textAlign = 'center'
        ctx.fillText('Game is Over', 252, 440)
        ctx.fillText(`Your score: ${this.score}`, 252, 470)
        ctx.fillText('Press Space to continue', 252, 500)
    }
}
//Returns array of new collision circles instances for an image
function collisionCirclesFactory(image) {
    const RESULT = []
    switch(image) {
        case 'images/char-boy.png':
        case 'images/char-cat-girl.png':
        case 'images/char-horn-girl.png':
        case 'images/char-pink-girl.png':
        case 'images/char-princess-girl.png':
            RESULT.push(new Circle(new Point2D(50, 94), 33))
            RESULT.push(new Circle(new Point2D(50, 122), 17))
            break
        case 'images/enemy-bug.png':
            RESULT.push(new Circle(new Point2D(30, 110), 30))
            RESULT.push(new Circle(new Point2D(52, 110), 33))
            RESULT.push(new Circle(new Point2D(75, 106), 23))
            break
        case 'images/Star.png':
            RESULT.push(new Circle(new Point2D(51, 74), 9))
            RESULT.push(new Circle(new Point2D(26, 94), 9))
            RESULT.push(new Circle(new Point2D(73, 94), 9))
            RESULT.push(new Circle(new Point2D(33, 122), 9))
            RESULT.push(new Circle(new Point2D(63, 122), 9))
            break
    }
    return RESULT
}
function startGame() {
    gameIsOn = true
    allCollectables.forEach(c => c.appear())
    allEnemies.forEach(e => e.restart())
    player.score = 0
}
function clearPlayground() {
    allCollectables.forEach(c => c.changePosition(OFF_SCREEN_X - c.position.x, 0))
    allEnemies.forEach(e => e.changePosition(OFF_SCREEN_X - e.position.x, 0))
    player.changePosition(PLAYER_POSITION_START.x - player.position.x, PLAYER_POSITION_START.y - player.position.y)
}

const MOVE_KEYS = {'ArrowUp': 'up', 'ArrowDown': 'down', 'ArrowLeft': 'left', 'ArrowRight': 'right'}
const SKIN_KEYS = {'ArrowUp': -1, 'ArrowDown': 1, 'ArrowLeft': -1, 'ArrowRight': 1}
const IMAGES = {
    player: ['images/char-boy.png',
             'images/char-cat-girl.png',
             'images/char-horn-girl.png',
             'images/char-pink-girl.png',
             'images/char-princess-girl.png'],
    selector: 'images/Selector.png',
    collectable: 'images/Star.png',
    enemy: 'images/enemy-bug.png'
}
const PLAYER_POSITION_START = new Point2D(202, 375)
const PLAYER_POSITION_LIMITS = {x_left: -16, x_right: 420, y_top: 0, y_bottom: 405}
const OFF_SCREEN_X = -101
const ENEMY_ROW_Y = [60, 145, 230]
const COLLECTABLE_ROW_Y = [73, 158]
const ENEMY_POSITION_LIMITS = {x_right: 505}
const SCORE_POSITION = new Point2D(10, 40)
const BASE_SPEED = 50

let gameIsOn = false
let gameIsOver = false
let allEnemies = []
let allCollectables = []
let player

//Initialize game
Resources.load([...IMAGES['player'], IMAGES['selector'], IMAGES['collectable'], IMAGES['enemy']])
player = new Player(IMAGES['player'][0], PLAYER_POSITION_START, BASE_SPEED * 2, allCollectables, allEnemies)
for (let i=0; i<6; i++) {
    allEnemies.push(new Enemy(IMAGES['enemy'], new Point2D(OFF_SCREEN_X, ENEMY_ROW_Y[i%3]), BASE_SPEED, BASE_SPEED*3))
}
for (let i=0; i<2; i++) {
    allCollectables.push(new Collectable(IMAGES['collectable'], new Point2D(OFF_SCREEN_X, COLLECTABLE_ROW_Y[i])))
}
document.addEventListener('keydown', function(e) {
    if (gameIsOn) {
        player.move(MOVE_KEYS[e.code])
    } else if (gameIsOver) {
        if (e.code === 'Space') {
            gameIsOver = false
            clearPlayground()
        }
    } else {
        if (SKIN_KEYS[e.code] !== undefined) player.changeSkin(SKIN_KEYS[e.code])
        if (e.code === 'Space') startGame()
    }
})
document.addEventListener('keyup', function(e) {
    if (gameIsOn) player.stop(MOVE_KEYS[e.code])
})
