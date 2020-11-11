const gameBoard = document.getElementById('gameBoard');
const newGameBtn = document.getElementById('newGameBtn');
const mistCount = document.getElementById('mistCount');
const secCount = document.getElementById('secCount');
const meowSound = new Audio('./sounds/meow.mp3');
const lockSound = new Audio('./sounds/lock.mp3');

const pics = [
  'crim_01.jpg',
  'crim_02.jpg',
  'crim_03.jpg',
  'crim_04.jpg',
  'crim_05.jpg',
  'crim_06.jpg',
];

const cards = [];
let PairsQty = pics.length;
let PairsOpen = 0;
let firstOpen = false;
let secondOpen = false;
let secCountTimer = false;

createCards();
shuffleCards();

gameBoard.addEventListener('click', function (e) {
  const card = e.target.closest('.card');
  if (!secCountTimer) {
    secCountTimer = setInterval(updateTime, 1000);
  }
  if (!card) return;
  if (card.classList.contains('block')) return;
  if (firstOpen && secondOpen) return;
  if (!firstOpen) {
    firstOpen = card;
  } else if (firstOpen === card) {
    return;
  } else {
    secondOpen = card;
    checkCards();
  }
  card.classList.add('flip');
});

newGameBtn.addEventListener('click', function () {
  this.classList.remove('visible');
  newGame();
});

function newGame() {
  cards.forEach((item) => {
    item.classList.remove('flip');
    item.classList.remove('block');
  });
  mistCount.textContent = 0;
  secCount.textContent = 0;
  secCountTimer = false;
  PairsOpen = 0;
  setTimeout(() => {
    shuffleCards();
  }, 200);
}

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
      firstOpen = false;
      secondOpen = false;
    }, 800);
  } else {
    PairsOpen += 1;
    firstOpen.classList.add('block');
    secondOpen.classList.add('block');
    firstOpen = false;
    secondOpen = false;
    lockSound.play();
    if (PairsOpen === PairsQty) {
      newGameBtn.classList.add('visible');
      clearInterval(secCountTimer);
    }
  }
}

function createCards() {
  pics.forEach((pict) => {
    for (let i = 1; i <= 2; i++) {
      const newElem = document.createElement('div');
      newElem.classList.add('card');
      newElem.setAttribute('data-card', pict.slice(0, -4));
      newElem.innerHTML = `<div class="back"><img src="./img/logo.svg" alt="Logo"></div><div class="front"><img src="./img/${pict}" alt="Cat Picture">
      <img class='grid' src="./img/grid.png" alt="Grid"></div>`;
      cards.push(newElem);
    }
  });
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  cards.forEach((item) => {
    gameBoard.appendChild(item);
  });
}
