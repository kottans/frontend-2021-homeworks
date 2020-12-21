import { warning, greetings } from './scenes.js'
import { Game } from './game.js'

// Starting scenes before the main game starts
const script = [warning, greetings]

var game = new Game();
game.startGame(script)

export { game }
