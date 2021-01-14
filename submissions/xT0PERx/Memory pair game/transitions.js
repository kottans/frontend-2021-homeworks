const imageses = [
  'images/Alfa-romeo.jpeg',
  'images/Ford.jpeg',
  'images/Mazda.jpeg',
  'images/Nissan.jpeg',
  'images/Peugeot.jpeg',
];

const cardDeck = [...imageses, ...imageses];

function getingSortList() {
  cardDeck.sort(function () {
    return 0.5 - Math.random();
  });
}

let winCount = 0;

//this func must added imgs in all my cards
const gameBoard = document.getElementById('cards_block');
const putImgsInCards = function () {
  const fragment = document.createDocumentFragment().appendChild(gameBoard);

  for (let i = 0; i < cardDeck.length; i++) {
    const img = document.createElement('img');
    img.src = cardDeck[i];
    fragment.children[i].appendChild(img);
  }
  document.querySelector('main').appendChild(fragment);
};

const overturnsCard = function () {
  gameBoard.addEventListener('click', function ({ target }) {
    let check = [];
    if (target.nodeName !== 'DIV') {
      return;
    }

    for (let x = 0; x < gameBoard.childElementCount; x++) {
      if (gameBoard.children[x].className === 'card__clicked') {
        check.push(gameBoard.children[x].className);
      }
    }

    if (check.length === 2) {
      return;
    }

    if (target.classList.contains('card__clicked')) {
      target.classList.remove('card__clicked');
      target.classList.add('card');
    } else if (target.classList.contains('card')) {
      target.classList.remove('card');
      target.classList.add('card__clicked');
    }

    compareImgs();
    checkWin();
  });
};

const comparison = document.createDocumentFragment();
const compareImgs = function () {
  comparison.appendChild(gameBoard);

  const cardsImg = gameBoard.children;
  const checkImg = [];

  for (let x = 0; x < cardsImg.length; x++) {
    if (cardsImg[x].childElementCount === 0) {
      cardsImg[x].delete;
    }
    if (cardsImg[x].classList.contains('card__clicked')) {
      if (cardsImg[x].childElementCount !== 0) {
        checkImg.push(cardsImg[x]);
      }
    }
  }

  if (checkImg.length === 2) {
    const firstImg = checkImg[0].firstChild;
    const secondImg = checkImg[1].firstChild;

    if (firstImg.src === secondImg.src) {
      timer = setTimeout(function () {
        firstImg.remove();
        checkImg[0].classList.remove('card__clicked');
        secondImg.remove();
        checkImg[1].classList.remove('card__clicked');
      }, 400);
      CountingMatchingPairsOfCards();
    }

    if (firstImg.src !== secondImg.src) {
      timer = setTimeout(function () {
        checkImg[0].classList.replace('card__clicked', 'card');
        checkImg[1].classList.replace('card__clicked', 'card');
      }, 400);
    }
  }
  document.querySelector('main').appendChild(gameBoard);
};

function CountingMatchingPairsOfCards() {
  winCount++;
}

function checkWin() {
  if (winCount === 5) {
    setTimeout(function () {
      alert('You are the winner!');
    }, 600);
  }
}

function InitGame() {
  getingSortList();
  putImgsInCards();
  overturnsCard();
}

InitGame();
