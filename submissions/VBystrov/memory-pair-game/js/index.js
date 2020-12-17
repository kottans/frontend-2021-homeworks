import { backCover } from '../js/back.js';
const amountCards = 25;
const rows = 4;
const columns = 6;
const cardsInGame = (rows * columns) / 2;
const showCardsTime = 1500;
const delayCardShow = 300;

class Game {
  constructor(field) {
    this.field = field;
    this.allCards = [];
    this.reversedCards = [];
    this.fieldLocked = false;

    for (let i = 0; i < amountCards; i++) {
      this.allCards.push(i.toString(10).padStart(3, '0'));
    }
  }

  start() {
    this.field.innerHTML = '';
    this.pickCards();
    this.shuffleCards();
    this.placeCards();
    this.revealAllCards();
  }

  pickCards() {
    for (let i = this.allCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.allCards[i], this.allCards[j]] = [
        this.allCards[j],
        this.allCards[i],
      ];
    }
    this.pickedCards = this.allCards.slice(0, cardsInGame);
  }

  shuffleCards() {
    this.cards = [];
    for (let i = 0; i < this.pickedCards.length; i++) {
      this.cards.push(this.pickedCards[i], this.pickedCards[i]);
    }

    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  placeCards() {
    for (let i = 0; i < this.cards.length; i++) {
      this.field.innerHTML += this.createCardElement(this.cards[i]);
    }
  }

  *reverseAllCards() {
    for (let i = 0; i < this.field.children.length; i++) {
      this.field.children[i].classList.toggle('reverse');
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
  const game = new Game(field);
  game.start();

  field.addEventListener('click', (e) => {
    const card = e.target.closest('.card');

    if (game.reversedCards.includes(card) || !card || game.fieldLocked) {
      return;
    }
    card.classList.toggle('reverse');

    if (!(game.reversedCards.length & 1)) {
      game.reversedCards.push(card);
      return;
    } else {
      if (
        card.attributes.cardCode.value ===
        game.reversedCards[game.reversedCards.length - 1].attributes.cardCode
          .value
      ) {
        card.classList.add('pair');
        game.reversedCards[game.reversedCards.length - 1].classList.add('pair');
        game.reversedCards.push(card);
        if (game.reversedCards.length >= cardsInGame * 2) {
          setTimeout(game.start.bind(game), 3000);
        }
      } else {
        game.fieldLocked = true;
        setTimeout(() => {
          card.classList.toggle('reverse');
          game.reversedCards.pop().classList.toggle('reverse');
          game.fieldLocked = false;
        }, showCardsTime);
      }
    }
  });
});
