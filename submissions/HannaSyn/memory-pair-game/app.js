const characters = [
  {
    id: 1,
    backImg: 'assets/Rick.png'
  },
  {
    id: 2,
    backImg: 'assets/Summer.png'
  },
  {
    id: 3,
    backImg: 'assets/Morty.png'
  },
  {
    id: 4,
    backImg: 'assets/missix.png'
  },
  {
    id: 5,
    backImg: 'assets/Jerry.png'
  },
  {
    id: 6,
    backImg: 'assets/Beth.png'
  },
  {
    id: 7,
    backImg: 'assets/pickle-rick.png'
  },
  {
    id: 8,
    backImg: 'assets/tele.png'
  }
]

const playingField = document.querySelector('.playing-field');
const cards = [...characters, ...characters];
const cardsCollection = document.getElementsByClassName('card');
const timeoutCheck = 1000;
const timeoutReset = 2000;

let firstClicked = null;
let countCards = cards.length;

const playingFieldBlocked = () => playingField.classList.add('blocked');
const playingFieldUnblocked = () => playingField.classList.remove('blocked');
const shuffleCards = () => cards.sort(function() { return 0.5 - Math.random() });

function createCards() {
  let card = '';
  cards.forEach(({id, backImg}) => {
    card += `<div data-id="${id}" class="card closed"><div class="front"><img src="assets/cover.jpg" alt="cover"></div><div class="back"><img src="${backImg}" alt="back"></div></div>`
  })
  playingField.innerHTML = card;
};

function fillField() {
  shuffleCards();
  createCards();
}

function resetField() {
  playingField.innerHTML = '';
  fillField();
}

function flipCards(e) {
  let target = e.target;
  let cardClicked = target.closest('.card.closed');
  if (!cardClicked) {
    return
  }
  cardClicked.classList.remove('closed');
  cardClicked.classList.add('flipped');

  if (!firstClicked) {
    firstClicked = cardClicked;
  } else {
    checkIdentity(cardClicked);
    playingFieldBlocked();
  }
}

function checkIdentity(secondClicked) {
  let isIdentity = secondClicked.dataset.id == firstClicked.dataset.id;
  setTimeout(() => {
    playingFieldUnblocked();
  }, timeoutCheck)

  if (!isIdentity) {
    setTimeout(() => {
      closeCards(firstClicked);
      closeCards(secondClicked);
      firstClicked = null;
    }, timeoutCheck);
  } else {
    secondClicked.classList.add('opened');
    firstClicked.classList.add('opened');
    firstClicked = null;
    countCards -= 2;
    win();
  }
}

function closeCards ( elem ) {
  elem.classList.remove('flipped');
  elem.classList.add('closed');
}

function win() {
  let winnerContent = `<div class="winner">
  <p>Wubba Lubba Dub Dub!</p>
</div>`
  if (countCards === 0) {
    playingField.insertAdjacentHTML('afterbegin', winnerContent);
    setTimeout (() => {
      resetField();
    }, timeoutReset)
  }
}

document.addEventListener("DOMContentLoaded", function() {
  fillField();

  playingField.addEventListener('click', flipCards);
})
