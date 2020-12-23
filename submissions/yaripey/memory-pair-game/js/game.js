import { Element, getElementName } from './elements.js'
import { showArrayOfElements, shuffleArray, selectProperTarget } from './utility.js'
import { congratulations } from './scenes.js'

// The main game class
const Game = function () {

  // Stores element that is opened right now
  this.currentOpened = null

  // Amount of pairs of cards;
  this.amountOfPairs = 16 / 2;

  // Scene counter, initial value is -1 because the function increments it at first.
  this.currentScene = -1;

  this.mainContainer = document.querySelector('.container')
  this.stop = false;
  this.musicMuted = false;
}

// Function for the elements array initialisation
Game.prototype.initiateElements = function () {
  const preShuffleElements = [];
  for (let i = 0; i < this.amountOfPairs; i++) {
    const currentElement = getElementName()
    const newElem = new Element(currentElement, i)
    const anotherNewElem = new Element(currentElement, i + this.amountOfPairs)
    preShuffleElements.push(newElem)
    preShuffleElements.push(anotherNewElem)
  }
  this.elements = shuffleArray(preShuffleElements)

}

// Game initialisation function
// Also stores the main game logic
Game.prototype.startGame = function (scenesArray) {
  this.initiateElements()

  const mainGame = new Scene()

  mainGame.mainBlock = document.createElement('div')
  mainGame.mainBlock.setAttribute('class', 'game-block')
  this.elements.forEach(elem => {
    mainGame.mainBlock.appendChild(elem.makeElement())
  })
  mainGame.container.appendChild(mainGame.mainBlock)

  this.mainContainer.addEventListener('click', ({ target }) => {
    if (this.stop) { return }
    if (!(target.classList.contains('game') || target.classList.contains('game-block'))) {
      target = selectProperTarget(target)
      if (target) {
        const clickedElement = this.elements.find(elem => {
          return elem.id === parseInt(target.id)
        })
        if (clickedElement.present) {
          if (this.currentOpened === null) {
            this.currentOpened = clickedElement
            clickedElement.peek()
          } else {
            if (clickedElement.id !== this.currentOpened.id) {
              clickedElement.peek()
              const previouslyOpened = this.currentOpened
              this.currentOpened = null;
              if (clickedElement.name === previouslyOpened.name) {
                previouslyOpened.dissapear()
                clickedElement.dissapear()
              } else {
                clickedElement.peek()
                previouslyOpened.peek()
              }
            }
          }
        }
      }
      this.checkWin()
    }
  })

  this.scenes = scenesArray;
  this.scenes.push(mainGame)
  this.scenes.push(congratulations)
  this.nextScene()
}

// Creation and start of the background music and mute button
Game.prototype.startMusic = function () {
  this.music = document.createElement('audio')
  this.music.setAttribute('src', 'src/music.mp3')
  this.music.setAttribute('loop', '')
  this.music.volume = 0.05
  document.querySelector('body').appendChild(this.music)
  this.music.play()

  this.muteButton = document.createElement('button')
  this.muteButton.classList.add('mute')
  this.muteButton.addEventListener('click', () => {
    this.muteButton.classList.toggle('muted')
    if (this.musicMuted) {
      this.unmuteMusic()
    } else {
      this.muteMusic()
    }
  })

  document.querySelector('body').appendChild(this.muteButton)
}

// Mute and unmute functions
Game.prototype.muteMusic = function () {
  this.music.volume = 0;
  this.musicMuted = true;
}

Game.prototype.unmuteMusic = function () {
  this.music.volume = 0.05;
  this.musicMuted = false;
}

// Function that serves for scene shifting purposes
Game.prototype.nextScene = function () {
  if (this.currentScene !== -1) {
    this.scenes[this.currentScene].container.classList.toggle('prepared')
  }
  this.currentScene++;

  setTimeout(() => {
    this.scenes[this.currentScene].initiate()
    setTimeout(() => {
      this.scenes[this.currentScene].container.classList.toggle('prepared')
    }, 200)
  }, 200)

  console.log('Current scene is:', this.currentScene)
}

Game.prototype.checkWin = function () {
  if (!this.elements.some(elem => elem.present)) {
    this.nextScene()
    this.stop = true
  }
}

const Scene = function () {
  this.anchorElement = document.querySelector('.container');
  this.container = document.createElement('div')
  this.container.setAttribute('class', 'game prepared')
  this.active = false;
}

Scene.prototype.initiate = function () {
  const currentContainer = document.querySelector('.game')
  this.anchorElement.replaceChild(this.container, currentContainer)
}

Scene.prototype.close = function () {
  this.container.classList.add('closed')
}

export { Scene, Game }
