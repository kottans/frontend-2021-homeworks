'use strict';

(function disableCache() {
  const thisScript = [...document.scripts].find((script) => script.src.match(/main.js/));
  thisScript.src += `?v=${new Date().toISOString()}`;
}());

const IMAGES = [
  'img/mask1.png',
  'img/mask2.png',
  'img/mask3.png',
  'img/mask4.png',
  'img/mask5.png',
  'img/mask6.png',
  'img/mask7.png',
  'img/mask9.png',
  'img/mask10.png',
  'img/mask11.png',
  'img/mask12.png',
  'img/mask13.png',
  'img/mask14.png',
  'img/mask15.png',
  'img/mask16.png'
];

(function preloadImages() {
  const addLink = (href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'image';

    document.head.appendChild(link);
  }

  IMAGES.forEach(item => addLink(item));
}());

const CARD_BACK = `none`; // css value of background-image
const GAME_SIZE = 12;

const MAPPING = new Map(); // div.card => background-image

function setNewGame() {
  if (MAPPING.size) {
    setNewMaping();
  } else {
    mountGame();
    setNewMaping();
    setTimeout(() => {
      alert([
        'It\'s time to learn to distinguish between masks!',
        'Well you know what to do... :)'
      ].join('\n\n'))
    }, 600);
  }

  function mountGame() {
    function createCard() {
      const cardPlace = document.createElement('div');
      cardPlace.className = 'cardPlace';

      const card = document.createElement('div');
      card.className = 'card';
      cardPlace.appendChild(card);

      return cardPlace;
    }

    const mountPoint = document.querySelector('.container');
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= GAME_SIZE; i++) {
      const newCard = createCard();

      fragment.appendChild(newCard);
      MAPPING.set(newCard.firstChild, null);
    }

    mountPoint.appendChild(fragment);
  }

  function setNewMaping() {
    function getImgSelection() {
      const randomImgSet = [...IMAGES]
        .sort(() => 0.5 - Math.random())
        .slice(0, GAME_SIZE / 2);

      return [...randomImgSet, ...randomImgSet].sort(() => 0.5 - Math.random());
    }

    function resetAnimatedProps(card) {
      card.style.transform = `rotateY(0deg)`;
      card.style.backgroundImage = CARD_BACK;
      card.style.display = '';

      return card;
    }

    const newImgSet = getImgSelection();

    MAPPING.forEach((value, card, map) => {
      map.set(card, `url("${newImgSet.pop()}")`);
      resetAnimatedProps(card);
    })
  }
}

setNewGame();

function animateFlip(delay, freq, ...cards) {
  function getCardAngle(card) {
    const transformStr = card.style.transform;
    const angle = transformStr.split('(')[1].split('deg')[0];
    return +angle;
  }

  let angle = getCardAngle(cards[0]);
  const rotateDirection = angle === 0 ? 1 : -1;
  const angleIncrement = 5 * rotateDirection;

  function toggleBGimage() {
    cards.forEach((card) => {
      if (card.style.backgroundImage === CARD_BACK) {
        card.style.backgroundImage = MAPPING.get(card);
      } else {
        card.style.backgroundImage = CARD_BACK;
      }
    })
  }

  function animateFrame() {
    angle += angleIncrement;
    cards.forEach(card => card.style.transform = `rotateY(${angle}deg)`);
  }

  return new Promise((resolve, reject) => {
    function goAnimate() {
      const interval = setInterval(() => {
        animateFrame();

        if (Math.abs(angle) === 90) toggleBGimage();

        if (Math.abs(angle) % 180 === 0) {
          clearInterval(interval);
          resolve();
        };
      }, freq);
    };

    delay ? setTimeout(goAnimate, delay) : goAnimate();
  })
}

function animateDiscard(delay, ...cards) {
  const increment = -5;
  let opacity = 100;
  let shadowSpread = 0;

  return new Promise((resolve, regect) => {
    const goAnimate = setInterval(() => {
      opacity += increment;
      shadowSpread -= increment * 2;

      cards.forEach(card => {
        card.style.opacity = `${opacity}%`
        card.style.boxShadow = `0px 0px 48px ${shadowSpread}px rgba(54,49,255,0.33), 0px 0px 28px 3px rgba(0,0,0,0.4)`;
      });

      if (opacity == 0) {
        cards.forEach(card => {
          card.style.display = "none";
          card.style.opacity = '';
          card.style.boxShadow = '';
        });
        clearInterval(goAnimate);
        resolve();
      }
    }, 20);

    delay ? setTimeout(goAnimate, delay) : goAnimate();
  })
}

function getHandler() {
  const openedCards = [];
  const discardedCards = [];
  let moves = 0;
  let startTime = Date.now();
  let bestScore = 0;

  function checkMatch() {
    return openedCards[0].style.backgroundImage === openedCards[1].style.backgroundImage
  }

  function win() {
    const time = new Date(Date.now() - startTime);
    const currentScore = Math.round(100000000 / (moves * time));

    let comment;
    let pastBestScore = bestScore;

    if (!bestScore) {
      bestScore = currentScore;
      comment = 'Congratulations!'
    } else {
      if (bestScore > currentScore) {
        comment = 'You can better...'
      } else {
        comment = 'This is your new record!!!';
        bestScore = currentScore;
      }
    }

    setTimeout(() => {
      alert([
        pastBestScore ? `Best result: ${pastBestScore}` : '',
        '',
        comment,
        `Moves: ${moves}`,
        `Time: ${time.getMinutes()}min ${time.getSeconds()}sec`,
        `Score: ${currentScore}`
      ].join('\n'));

      discardedCards.length = 0;
      moves = 0;

      setNewGame();
      startTime = Date.now();
    }, 20);
  }

  function openCard(card) {
    openedCards.push(card);
    return animateFlip(0, 6, card);
  }

  function closeCards() {
    const [firstCard, secondCard] = openedCards;
    moves++;

    animateFlip(300, 10, firstCard, secondCard)
      .then(() => openedCards.length = 0);
  }

  function findPair(card) {
    return Array.from(MAPPING)
      .filter((item) => (
        item[0] !== card && item[1] === card.style.backgroundImage
      ))[0][0];
  }

  function discardСards() {
    const [firstCard, secondCard] = openedCards;

    discardedCards.push(...openedCards);
    openedCards.length = 0;

    moves++;
    window.navigator.vibrate(100);
    return animateDiscard(200, firstCard, secondCard);
  }

  return function handler({target}) {
    if (target.className !== 'card') return;
    if (discardedCards.some(card => card === target)) return;
    if (openedCards.some((card) => card === target)) return;
    if (openedCards.length === 2) return;

    if (openedCards.length === 0) {
      openCard(target).then(() => {
        if (discardedCards.length === (GAME_SIZE - 2)) {
          openCard(findPair(target))
            .then(() => discardСards())
            .then(() => win());
        }
      });
    } else if (openedCards.length === 1) {
      openCard(target).then(() => checkMatch() ? discardСards() : closeCards());
    }
  }
}

document.querySelector('.container').addEventListener('click', getHandler());
