import { nextScene } from './gameScript.js'
import { Card, getCardName } from './cards.js'

const amountOfCards = 16

let currentOpened = null
const amountOfPairs = amountOfCards / 2

let isGameStopped = false

const cards = initiateCards(amountOfPairs)

export function createGameScene () {
  const mainBlock = document.createElement('div')
  mainBlock.classList.add('game-block')
  cards.forEach(card => {
    mainBlock.appendChild(card.makeCard())
  })
  
  mainBlock.addEventListener('click', gameClickHandler)

  return {
    sceneType: "game",
    content: mainBlock
  }
}

function gameClickHandler({ target }) {
  if (isGameStopped) {return}
  const clickedCardElement = target.closest('.flip-container')
  if (!clickedCardElement) return
  const clickedCardID = parseInt(clickedCardElement.id)
  const clickedCard = cards.find(card => card.id === clickedCardID)
  if (clickedCard.isPresent) {
    if (currentOpened === null) {
      currentOpened = clickedCard
      clickedCard.peek()
    } else {
      if (clickedCard.id !== currentOpened.id)
      clickedCard.peek()
      const previouslyOpened = currentOpened
      currentOpened = null
      if (clickedCard.name === previouslyOpened.name) {
        previouslyOpened.disappear()
        clickedCard.disappear()
      } else {
        clickedCard.peek()
        previouslyOpened.peek()
      }
    }
  }
  checkWin()
}

function checkWin() {
  if (!cards.some(card => card.isPresent)) {
    isGameStopped = true
    nextScene()
  }
}

export function initiateCards (amountOfPairs) {
  const preShuffleCards = []
  for (let i = 0; i < amountOfPairs; i++) {
    const currentCard = getCardName()
    const newCard = new Card(currentCard, i)
    const anotherNewCard = new Card(currentCard, i + amountOfPairs)
    preShuffleCards.push(newCard)
    preShuffleCards.push(anotherNewCard)
  }

  return shuffleArray(preShuffleCards)
}

function shuffleArray (arr) {
  return arr.sort(function () { return 0.5 - Math.random() });
}
