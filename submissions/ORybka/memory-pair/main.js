let cardPairArray = [];
let previousCat;
let wonPair = 1;
let checkedPairs = 1;
const numberOfPairs = 8;
const DELAY = 800;
const cardsContainer = document.querySelector('.all-cards-container');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const wonMessage = document.querySelector('.won-message');
const rightCat = document.querySelector('.cat-right');
const leftCat = document.querySelector('.cat-left');
const cards = [
  { name: 'arya', src: `assets/cards/arya.jfif` },
  { name: 'cercei', src: `assets/cards/cercei.jfif` },
  { name: 'daenerys', src: `assets/cards/daenerys.jfif` },
  { name: 'hodor', src: `assets/cards/hodor.jfif` },
  { name: 'jamie', src: `assets/cards/jamie.jfif` },
  { name: 'jon-snow', src: `assets/cards/jon-snow.jfif` },
  { name: 'melissandre', src: `assets/cards/melissandre.jfif` },
  { name: 'tyrion', src: `assets/cards/tyrion.jfif` },
];

const shuffledCards = [...cards, ...cards];
shuffledCards.sort(() => 0.5 - Math.random());

document.addEventListener('DOMContentLoaded', () => {
  createCards();
});

function createCards() {
  shuffledCards.forEach((el) => {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.dataset.cardValue = el.name;
    card.innerHTML = `
      <div class="flipper">
        <div class="front"></div>
        <div class="back">
          <img src="${el.src}" alt="${el.name}" class="card-image"/>
        </div>
      </div>  
    `;
    cardsContainer.append(card);
  });
  addClick();
}

function openCard({ target }) {
  const clickedCard = target.closest('.card-container');
  addMovesNumber();

  if (clickedCard && !clickedCard.classList.contains('flipped')) {
    clickedCard.classList.add('flipped');
    cardPairArray.push(clickedCard);
  }

  if (cardPairArray.length === 2) {
    const [firstCard, secondCard] = cardPairArray;
    if (firstCard.dataset.cardValue === secondCard.dataset.cardValue) {
      setTimeout(() => {
        addAnimation();
      }, DELAY * 0.5);
      addCat();
      removePair();
    } else {
      flipBack();
    }
    removeClick();
    setTimeout(() => {
      addClick();
    }, DELAY * 1.5);
    checkedPairs++;
  }
}

function flipBack() {
  setTimeout(() => {
    cardPairArray.forEach((card) => {
      card.classList.remove('flipped');
    });
    cardPairArray = [];
  }, DELAY);
}

function removePair() {
  setTimeout(() => {
    cardPairArray.forEach((card) => {
      card.classList.add('hidden');
    });
    cardPairArray = [];
    wonPair++;
  }, DELAY * 1.5);
  checkWin();
}

const animationArray = [
  [
    { opacity: '0', right: '20%' },
    { opacity: '0.4', right: '23%', width: '20rem' },
    { opacity: '0.5', right: '25%', width: '20rem' },
    { opacity: '0', right: '20%' },
  ],
  [
    { opacity: '0', right: '0' },
    { opacity: '0.5', right: '0', width: '15rem' },
    { opacity: '0', right: '0' },
  ],
  {
    duration: DELAY * 4,
    easing: 'ease-in-out',
  },
];

const [smallWidthArray, wideScreenArray, animationOption] = animationArray;

function addAnimationArray(side, forScreenArray) {
  if (side === 'left') {
    forScreenArray.forEach((el) => {
      el.left = el.right;
      delete el.right;
    });
    return forScreenArray;
  }
  if (side === 'right') {
    forScreenArray.forEach((el) => {
      if (el.hasOwnProperty('left')) {
        el.right = el.left;
        delete el.left;
      }
    });
    return forScreenArray;
  }
}

function addCat() {
  if (window.matchMedia('(min-width: 768px)').matches) {
    if (!previousCat) {
      rightCat.animate(addAnimationArray('right', smallWidthArray), animationOption);
      previousCat = 'rightCat';
    } else if (previousCat) {
      leftCat.animate(addAnimationArray('left', smallWidthArray), animationOption);
      previousCat = '';
    }
  } else if (!previousCat) {
    rightCat.animate(addAnimationArray('right', wideScreenArray), animationOption);
    previousCat = 'rightCat';
  } else if (previousCat) {
    leftCat.animate(addAnimationArray('left', wideScreenArray), animationOption);
    previousCat = '';
  }
}

function addAnimation() {
  cardPairArray.forEach((card) => {
    const image = card.querySelector('.card-image');
    image.parentNode.removeChild(image);
    card.querySelector('.back').classList.add('fire');
  });
}

function addMovesNumber() {
  document.querySelector('.moves').innerHTML = `Number of moves is <strong>${checkedPairs}</strong>`;
}

function checkWin() {
  if (wonPair === numberOfPairs) {
    setTimeout(() => {
      cardsContainer.classList.add('none');
      header.classList.add('zero-opacity');
      footer.classList.add('zero-opacity');
      setTimeout(() => {
        wonMessage.classList.add('show');
        header.classList.remove('zero-opacity');
        footer.classList.remove('zero-opacity');
      }, DELAY / 2);
    }, DELAY * 2);
  }
}

function addClick() {
  cardsContainer.addEventListener('click', openCard);
}

function removeClick() {
  cardsContainer.removeEventListener('click', openCard);
}
