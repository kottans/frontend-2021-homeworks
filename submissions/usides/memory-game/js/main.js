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

const cards = PICS.flatMap((pict) => {
  const newElem1 = document.createElement('div');
  const newElem2 = document.createElement('div');
  newElem1.classList.add('card');
  newElem2.classList.add('card');
  newElem1.setAttribute('data-card', pict.match(/[^.]+/gi)[0]);
  newElem2.setAttribute('data-card', pict.match(/[^.]+/gi)[0]);
  const template = `
    <div class="back">
      <img src="./img/logo.svg" alt="Logo">
    </div>
    <div class="front">
      <img src="./img/${pict}" alt="Cat Picture">
      <img class='grid' src="./img/grid.png" alt="Grid">
    </div>`;
  newElem1.innerHTML = template;
  newElem2.innerHTML = template;
  return [newElem1, newElem2];
});

const cardClick = function (e) {
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
};

const assignOpenCard = function (card) {
  if (!firstOpen) {
    firstOpen = card;
  } else if (firstOpen !== card) {
    secondOpen = card;
  }
};

const newGame = function () {
  cards.forEach((item) => {
    item.classList.remove('flip', 'block');
  });
  mistCount.textContent = 0;
  secCount.textContent = 0;
  secCountTimer = false;
  pairsOpen = 0;
  setTimeout(() => {
    gameBoard.append(...shuffleCards(cards));
  }, 200);
};

const shuffleCards = function (cards) {
  let arr = [...cards];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const updateTime = function () {
  secCount.textContent = Number(secCount.textContent) + 1;
};

const checkCards = function () {
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
};

const checkWin = function () {
  if (pairsOpen === pairsMax) {
    newGameBtn.classList.add('visible');
    clearInterval(secCountTimer);
  }
};

const init = function () {
  gameBoard.addEventListener('click', cardClick);

  newGameBtn.addEventListener('click', function () {
    this.classList.remove('visible');
    newGame();
  });
  gameBoard.append(...shuffleCards(cards));
};

init();
