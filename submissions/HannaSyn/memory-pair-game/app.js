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
  countCards = cards.length;
}

function resetField() {
  playingField.innerHTML = '';
  fillField();
}

function flipCards({target}) {
  const cardClicked = target.closest('.card.closed');
  if (!cardClicked) {
    return
  }
  cardClicked.classList.remove('closed');
  cardClicked.classList.add('flipped');

  if (!firstClicked) {
    firstClicked = cardClicked;
  } else {
    checkIdentity(cardClicked);
    playingField.classList.add('blocked');
  }
}

function checkIdentity(secondClicked) {
  const isIdentity = secondClicked.dataset.id == firstClicked.dataset.id;
  setTimeout(() => {
    playingField.classList.remove('blocked');
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
    getWin();
  }
}

function closeCards ( elem ) {
  elem.classList.remove('flipped');
  elem.classList.add('closed');
}

function getWin() {
  const winnerContent = `<div class="winner">
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
