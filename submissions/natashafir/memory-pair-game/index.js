const items = [
    {
        id: 0,
        img_url: './img/colibri.gif'
    },
    {
        id: 1,
        img_url: './img/hello.gif'
    },
    {
        id: 2,
        img_url: './img/hi.gif'
    },
    {
        id: 3,
        img_url: './img/inlove.gif'
    },
    {
        id: 4,
        img_url: './img/love.gif'
    },
    {
        id: 5,
        img_url: './img/play.gif'
    },
    {
        id: 6,
        img_url: './img/sleep.gif'
    },
    {
        id: 7,
        img_url: './img/space.gif'
    }
];

let choosedCards = [];
const sectionMemory = document.getElementById('section__memory');
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

function createCardItem(item) {
    const cardWrapper = document.createElement('div');
    const imgBack = document.createElement('img');
    const imgFront = document.createElement('img');
    cardWrapper.classList.add("memory-card"); //class for CSS
    cardWrapper.appendChild(imgBack);
    cardWrapper.appendChild(imgFront);
    imgBack.src = "./img/img-0.jpg";
    imgFront.src = item.img_url;
    imgBack.classList.add("back-face");
    imgFront.classList.add("front-face");
    cardWrapper.id = item.id;
    return cardWrapper;
}

function createAllCards() {
    let allCards = shuffle([...items, ...items]);
    allCards.forEach(elem => {
        sectionMemory.appendChild(createCardItem(elem));
    });

}
createAllCards();

function flipCard() {
    if (boardLocked) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.id === secondCard.id) {
        hideCards();
        choosedCards.push(firstCard.id);
        checkForWin();
        console.log(choosedCards)
    } else {
        unflipCards();
    }
}

function checkForWin() {
    if (choosedCards.length === 8) {
        setTimeout(() => {alert("You win!")}, 1500);

    }
}

function unflipCards() {
    boardLocked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        boardLocked = false;
    }, 1000);
}

function hideCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('hide');
    secondCard.classList.add('hide');
}

const everyCards = document.querySelectorAll('.memory-card');
everyCards.forEach(items => items.addEventListener('click', flipCard));
