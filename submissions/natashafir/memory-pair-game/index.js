const items = [
    {
        id: 0,
        imgUrl: './img/colibri.gif'
    },
    {
        id: 1,
        imgUrl: './img/hello.gif'
    },
    {
        id: 2,
        imgUrl: './img/hi.gif'
    },
    {
        id: 3,
        imgUrl: './img/inlove.gif'
    },
    {
        id: 4,
        imgUrl: './img/love.gif'
    },
    {
        id: 5,
        imgUrl: './img/play.gif'
    },
    {
        id: 6,
        imgUrl: './img/sleep.gif'
    },
    {
        id: 7,
        imgUrl: './img/space.gif'
    }
];

const NUMBER_OF_CARDS = 8;
const CHECK_WIN_TIME = 1500;
const UNFLIP_TIME = 1000;
const SECTION_MEMORY = document.getElementById('section__memory');
let choosedCards = [];
let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createAllCards() {
    let allCards = shuffle([...items, ...items]);
    let card = '';
    allCards.forEach(({id, imgUrl}) => {
        card += `<div id="${id}" class="memory-card"><img class="back-face" src="./img/img-0.jpg"><img class="front-face" src="${imgUrl}"></div>`
    });
    SECTION_MEMORY.innerHTML = card;
}
createAllCards();

function flipCard({target}) {
    const cardClicked = target.closest('.memory-card');
    if (boardLocked || cardClicked === firstCard) return;
    cardClicked.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = cardClicked;
    } else {
        hasFlippedCard = false;
        secondCard = cardClicked;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.id === secondCard.id) {
        hideCards();
        choosedCards.push(firstCard.id);
        checkForWin();
    } else {
        unflipCards();
    }
}

function checkForWin() {
    if (choosedCards.length === NUMBER_OF_CARDS) {
        setTimeout(() => {alert("You win!")}, CHECK_WIN_TIME);

    }
}

function unflipCards() {
    boardLocked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        boardLocked = false;
    }, UNFLIP_TIME);
}

function hideCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('hide');
    secondCard.classList.add('hide');
}

SECTION_MEMORY.addEventListener('click', flipCard);
