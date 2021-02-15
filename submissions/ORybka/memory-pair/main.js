let cardPairArray = [];
let previousCat;
let wonPair = 1;
let checkedPairs = 1;
const numberOfPairs = 8;
const DELAY = 800;
const cardsContainer = document.querySelector('.all-cards-container');
const wonMessage = document.querySelector('.won-message');
const rightCat = document.querySelector('.cat-right');
const leftCat = document.querySelector('.cat-left');
const cards = ['arya', 'cercei', 'daenerys', 'hodor', 'jamie', 'jon-snow', 'melissandre', 'tyrion'];
const shuffledCards = [...cards, ...cards];
shuffledCards.sort(() => 0.5 - Math.random());

document.addEventListener('DOMContentLoaded', () => {
  createCards();
});

function createCards() {
  shuffledCards.forEach((el) => {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.dataset.cardValue = el;
    card.innerHTML = `
      <div class="flipper">
        <div class="front"></div>
        <div class="back">
          <img src="assets/cards/${el}.jfif" alt="card" class="card-image"/>
        </div>
      </div>  
    `;
    cardsContainer.append(card);
  });
  addClick();
}

function openCard({ target }) {
  const clickedCard = target.closest('.card-container');
  movesNumber();

  if (clickedCard && !clickedCard.classList.contains('flipped')) {
    clickedCard.classList.add('flipped');
    cardPairArray.push(clickedCard);
  }

  if (cardPairArray.length === 2) {
    if (cardPairArray[0].dataset.cardValue === cardPairArray[1].dataset.cardValue) {
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
  ifWon();
}

function addCat() {
  if (window.matchMedia('(min-width: 768px)').matches) {
    if (previousCat === '') {
      rightCat.animate(
        [
          { opacity: '0', right: '20%' },
          { opacity: '0.4', right: '23%', width: '20rem' },
          { opacity: '0.5', right: '25%', width: '20rem' },
          { opacity: '0', right: '20%' },
        ],
        {
          duration: DELAY * 4,
          easing: 'ease-in-out',
        }
      );
      previousCat = 'rightCat';
    } else if (previousCat !== '') {
      leftCat.animate(
        [
          { opacity: '0', left: '20%' },
          { opacity: '0.4', left: '23%', width: '20rem' },
          { opacity: '0.5', left: '25%', width: '20rem' },
          { opacity: '0', left: '20%' },
        ],
        {
          duration: DELAY * 4,
          easing: 'ease-in-out',
        }
      );
      previousCat = '';
    }
  } else if (previousCat === '') {
    rightCat.animate(
      [
        { opacity: '0', right: '0' },
        { opacity: '0.5', right: '0', width: '15rem' },
        { opacity: '0', right: '0' },
      ],
      {
        duration: DELAY * 4,
        easing: 'ease-in-out',
      }
    );
    previousCat = 'rightCat';
  } else if (previousCat !== '') {
    leftCat.animate(
      [
        { opacity: '0', left: '0' },
        { opacity: '0.5', left: '0', width: '15rem' },
        { opacity: '0', left: '0' },
      ],
      {
        duration: DELAY * 4,
        easing: 'ease-in-out',
      }
    );
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

function movesNumber() {
  document.querySelector('.moves').innerHTML = `Number of moves is <strong>${checkedPairs}</strong>`;
}

function ifWon() {
  if (wonPair === numberOfPairs) {
    setTimeout(() => {
      cardsContainer.style.display = 'none';
      cardsContainer.style.opacity = '0';
      document.querySelector('header').style.opacity = '0';
      document.querySelector('footer').style.opacity = '0';
      setTimeout(() => {
        wonMessage.style.display = 'block';
        wonMessage.style.opacity = '1';
        document.querySelector('header').style.opacity = '1';
        document.querySelector('footer').style.opacity = '1';
        document.querySelector('.main-container').style.overflow = 'hidden';
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
