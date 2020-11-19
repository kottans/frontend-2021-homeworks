const imageses = [
  'images/Alfa-romeo.jpeg',
  'images/Ford.jpeg',
  'images/Mazda.jpeg',
  'images/Nissan.jpeg',
  'images/Peugeot.jpeg',
];
//my random array with my img
const cardDeck = imageses.concat(imageses);
cardDeck.sort(function () {
  return 0.5 - Math.random();
});

//how many pairs of images matched
let winCount = 0;

//this func must added imgs in all my cards
const allCardsOnTheDesk = document.querySelector('main');
const putImgsInCards = function () {
  const fragment = document
    .createDocumentFragment()
    .appendChild(allCardsOnTheDesk);

  for (let i = 0; i < cardDeck.length; i++) {
    const img = document.createElement('img');
    img.src = cardDeck[i];
    fragment.children[i].appendChild(img);
  }
  document.body.appendChild(fragment);
};

// this function flips the cards

const overturnsCard = function () {
  allCardsOnTheDesk.addEventListener('click', function (event) {
    const target = event.target;

    if (target.nodeName !== 'DIV') {
      return;
    }

    if (target.classList.contains('card__clicked') === true) {
      target.classList.remove('card__clicked');
      target.classList.add('card');
    } else if (target.classList.contains('card') === true) {
      target.classList.remove('card');
      target.classList.add('card__clicked');
    }

    compareImgs();
  });
};

// this func compares two showed imgs
const fragmentForCompaires = document.createDocumentFragment();
const compareImgs = function () {
  fragmentForCompaires.appendChild(allCardsOnTheDesk);

  const cardsImg = allCardsOnTheDesk.children;
  const checkImg = [];

  for (let x = 0; x < cardsImg.length; x++) {
    if (cardsImg[x].childElementCount === 0) {
      cardsImg[x].delete;
    }
    if (cardsImg[x].classList.contains('card__clicked') === true) {
      if (cardsImg[x].childElementCount !== 0) {
        checkImg.push(cardsImg[x]);
      }
    }
  }
  //clicked no more than two cadrs
  if (checkImg.length > 2) {
    for (let x = 0; x < cardsImg.length; x++) {
      if (cardsImg[x].classList.contains('card__clicked')) {
        cardsImg[x].classList.remove('card__clicked');
        cardsImg[x].classList.add('card');
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
      checkWin();
    }

    if (firstImg.src !== secondImg.src) {
      timer = setTimeout(function () {
        checkImg[0].classList.replace('card__clicked', 'card');
        checkImg[1].classList.replace('card__clicked', 'card');
      }, 400);
    }
  }
  document.body.appendChild(allCardsOnTheDesk);
};

// displays a message about victory
function checkWin() {
  winCount++;
  if (winCount === 5) {
    setTimeout(function () {
      alert('You are the winner!');
    }, 600);
  }
}
putImgsInCards();
overturnsCard();
