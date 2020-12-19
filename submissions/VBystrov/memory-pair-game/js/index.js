import { backCover } from '../js/back.js';
const amountCards = 25;
const rows = 4;
const columns = 6;
const cardsInGame = (rows * columns) / 2;
const showCardsTime = 1500;
const delayCardShow = 300;

class Game {
  constructor(cardsContainer, newGameButton) {
    this.cardsContainer = cardsContainer;
    this.newGameButton = newGameButton;
    this.allCardCodes = [];
    this.pairedCards = [];
    this.fieldLocked = false;

    this.addAllCardCodes();

    this.newGameButton.addEventListener('click', () => {
      this.start();
    });

    this.cardsContainer.addEventListener('click', (e) => {
      const card = e.target.closest('.card');

      if (this.pairedCards.includes(card) || !card || this.fieldLocked) {
        return;
      }
      this.reverseCards(card);

      if (!(this.pairedCards.length & 1)) {
        this.pairedCards.push(card);
        return;
      } else {
        if (
          this.isCardsPair(card, this.pairedCards[this.pairedCards.length - 1])
        ) {
          this.pairedCards.push(card);
          this.pairedCards.slice(-2).forEach((newPairCard) => {
            newPairCard.classList.add('pair');
          });

          if (this.pairedCards.length >= cardsInGame * 2) {
            this.newGameButton.disabled = false;
          }
        } else {
          this.reverseNotPairedCards(card);
        }
      }
    });
  }

  start() {
    this.newGameButton.disabled = true;
    this.pickCards();
    this.shuffleCards();
    this.placeCards();
    this.revealAllCards();
  }

  addAllCardCodes() {
    for (let i = 0; i < amountCards; i++) {
      this.allCardCodes.push(i.toString(10).padStart(3, '0'));
    }
  }

  pickCards() {
    for (let i = this.allCardCodes.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.allCardCodes[i], this.allCardCodes[j]] = [
        this.allCardCodes[j],
        this.allCardCodes[i],
      ];
    }
    this.pickedCardCodes = this.allCardCodes.slice(0, cardsInGame);
  }

  shuffleCards() {
    this.shuffledCardCodes = [];
    for (let i = 0; i < this.pickedCardCodes.length; i++) {
      this.shuffledCardCodes.push(
        this.pickedCardCodes[i],
        this.pickedCardCodes[i]
      );
    }

    for (let i = this.shuffledCardCodes.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.shuffledCardCodes[i], this.shuffledCardCodes[j]] = [
        this.shuffledCardCodes[j],
        this.shuffledCardCodes[i],
      ];
    }
  }

  isCardsPair(card1, card2) {
    return card1.attributes.cardCode.value === card2.attributes.cardCode.value;
  }

  reverseCards(...cards) {
    cards.forEach((card) => {
      card.classList.toggle('reverse');
    });
  }

  reverseNotPairedCards(card) {
    this.fieldLocked = true;
    setTimeout(() => {
      this.reverseCards(card, this.pairedCards.pop());
      this.fieldLocked = false;
    }, showCardsTime);
  }

  placeCards() {
    this.cardsContainer.innerHTML = '';
    for (let i = 0; i < this.shuffledCardCodes.length; i++) {
      this.cardsContainer.innerHTML += this.createCardElement(
        this.shuffledCardCodes[i]
      );
    }
  }

  *reverseAllCards() {
    for (let i = 0; i < this.cardsContainer.children.length; i++) {
      this.reverseCards(this.cardsContainer.children[i]);
      yield;
    }
    return;
  }

  revealAllCards() {
    this.fieldLocked = true;
    const opener = this.reverseAllCards();
    const openerTimerId = setInterval(() => {
      let next = opener.next();
      if (next.done) {
        clearInterval(openerTimerId);
      }
    }, delayCardShow);

    setTimeout(() => {
      const closer = this.reverseAllCards();
      const closerTimerId = setInterval(() => {
        let next = closer.next();
        if (next.done) {
          clearInterval(closerTimerId);
          this.fieldLocked = false;
        }
      }, delayCardShow);
    }, delayCardShow * columns * 2);
  }

  createCardElement(cardCode) {
    const placeholder = `<svg class="placeholder" viewBox="0 0 1 1"></svg>`;
    const image = `<div class="image img-${cardCode} side">${placeholder}</div>`;
    const back = `<div class="back side">${backCover}</div>`;
    const card = `<div class="card" cardCode="${cardCode}"><div class="flipper">${image} ${back}</div></div>`;
    return card;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const field = document.getElementById('field');
  const newGameButton = document.getElementById('btn-new_game');
  const game = new Game(field, newGameButton);
});
