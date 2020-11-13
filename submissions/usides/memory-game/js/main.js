const gameBoard = document.getElementById('gameBoard');
const newGameBtn = document.getElementById('newGameBtn');
const mistCount = document.getElementById('mistCount');
const secCount = document.getElementById('secCount');
const meowSound = new Audio('./sounds/meow.mp3');
const lockSound = new Audio('./sounds/lock.mp3');

const PICS = [
  'crim_01.jpg',
  'crim_02.jpg',
  'crim_03.jpg',
  'crim_04.jpg',
  'crim_05.jpg',
  'crim_06.jpg',
];

const pairsMax = PICS.length;
let pairsOpen = 0;
let firstOpen = null;
let secondOpen = null;
let secCountTimer = null;

gameBoard.addEventListener('click', cardClick);

newGameBtn.addEventListener('click', function () {
  this.classList.remove('visible');
  newGame();
});

const cards = PICS.flatMap((pict) => {
  const newElem1 = document.createElement('div');
  const newElem2 = document.createElement('div');
  newElem1.classList.add('card');
  newElem2.classList.add('card');
  newElem1.setAttribute('data-card', pict.match(/[^.]+/gi)[0]);
  newElem2.setAttribute('data-card', pict.match(/[^.]+/gi)[0]);
  const template = `<div class="back"><img src="./img/logo.svg" alt="Logo"></div><div class="front"><img src="./img/${pict}" alt="Cat Picture">
    <img class='grid' src="./img/grid.png" alt="Grid"></div>`;
  newElem1.innerHTML = template;
  newElem2.innerHTML = template;
  return [newElem1, newElem2];
});

function cardClick(e) {
  const card = e.target.closest('.card');
  if (!card) return;
  if (!secCountTimer) {
    secCountTimer = setInterval(updateTime, 1000);
  }

  if (firstOpen && secondOpen) return;
  if (card.classList.contains('block')) return;
  assignOpenCard(card);

  card.classList.add('flip');
  if (firstOpen && secondOpen) checkCards();

  function assignOpenCard(card) {
    if (!firstOpen) {
      firstOpen = card;
    } else if (firstOpen !== card) {
      secondOpen = card;
    }
  }
}

function newGame() {
  cards.forEach((item) => {
    item.classList.remove('flip', 'block');
  });
  mistCount.textContent = 0;
  secCount.textContent = 0;
  secCountTimer = false;
  pairsOpen = 0;
  setTimeout(() => {
    shuffleCards();
    gameBoard.append(...cards);
  }, 200);
}

const shuffleCards = function () {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
};

function updateTime() {
  secCount.textContent = Number(secCount.textContent) + 1;
}

function checkCards() {
  if (firstOpen.dataset.card !== secondOpen.dataset.card) {
    meowSound.play();
    mistCount.textContent = Number(mistCount.textContent) + 1;
    setTimeout(() => {
      firstOpen.classList.remove('flip');
      secondOpen.classList.remove('flip');
      firstOpen = null;
      secondOpen = null;
    }, 800);
  } else {
    lockSound.play();
    pairsOpen += 1;
    firstOpen.classList.add('block');
    secondOpen.classList.add('block');
    firstOpen = null;
    secondOpen = null;
    checkWin();
  }
}

function checkWin() {
  if (pairsOpen === pairsMax) {
    newGameBtn.classList.add('visible');
    clearInterval(secCountTimer);
  }
}

(function init() {
  shuffleCards();
  gameBoard.append(...cards);
})();
