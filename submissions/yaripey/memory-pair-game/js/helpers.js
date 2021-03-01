import { Card, getCardName } from './cards.js'

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

const shuffleArray = function (arr) {
  return arr.sort(function () { return 0.5 - Math.random() });
}
