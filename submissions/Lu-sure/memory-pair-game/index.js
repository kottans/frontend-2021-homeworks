const htmlBoard = document.getElementById('board');
const newGameButton = document.getElementById('new-game');
const cards = [];
const numberOfCards = 12;
const images = [
    {url: 'img/tree0.svg', times: 0},
    {url: 'img/tree1.svg', times: 0},
    {url: 'img/tree2.svg', times: 0},
    {url: 'img/tree3.svg', times: 0},
    {url: 'img/tree4.svg', times: 0},
    {url: 'img/tree5.svg', times: 0}];
const flipDelay = 800;
const greeting = `Got 3, be smart)`;
let score;

class Card {
    constructor(id) {
        this.htmlEl;
        this.htmlElInner;
        this.frontPic = randomizeImage(images);
        this.isOpen = false;
        this.isMatched = false;
        this.id = id;
        this.render();
    }

    openCard() {
        this.flip();
        this.isOpen = true;
    }

    setMatched() {
        this.htmlElInner.classList.add('hide');
        this.isMatched = true;
    }

    flip() {
        this.htmlElInner.classList.add('flip');
    }

    unflip() {
        this.htmlElInner.classList.remove('flip');
    }

    render() {
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('card');
        this.htmlEl.setAttribute('data-idx', this.id);

        const cardBack = document.createElement('div');
        const back = document.createElement('img');
        back.setAttribute('src', 'img/back.jpg');
        back.classList.add('pic');
        cardBack.appendChild(back);
        cardBack.classList.add('card-back');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const pic = document.createElement('img');
        pic.classList.add('pic');
        pic.setAttribute('src', this.frontPic);
        cardFront.appendChild(pic);

        this.htmlElInner = document.createElement('div');
        this.htmlElInner.classList.add('card-inner');
        this.htmlElInner.append(cardBack, cardFront);

        this.htmlEl.appendChild(this.htmlElInner);
    }
}

const htmlScore = document.createElement('p');

const renderScore = () => {
    htmlScore.innerHTML = `Your score:  ${score}.`;
}

const renderNav = function() {
    const wishes = document.createElement('p');
    wishes.innerHTML = greeting;

    const nav = document.querySelector('nav');
    nav.append(htmlScore, wishes);
}

const randomInteger = function(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const randomizeImage = function(images) {
    const rand = randomInteger(0, images.length-1);
    ++ images[rand].times;
    return images[rand].times < 3 ? images[rand].url : randomizeImage(images);
}

const cardsSet = document.createDocumentFragment();

const setCardsSet = function() {
    for (let i = 0; i < numberOfCards; i++) {
        cards[i] = new Card(i);
        cardsSet.appendChild(cards[i].htmlEl);
    }
}

const render = function () {
    setCardsSet();
    htmlBoard.append(cardsSet);

    htmlBoard.addEventListener('click', ( {target} ) => {
        if (cards.filter(card => card.isOpen).length === 2) return;

        const id = target.closest(".card").getAttribute("data-idx");
        const card = cards.find(x => x.id == id);
        if (card.isMatched === true) return;

        card.openCard();
        checkMatch();
    });

    renderScore();
}

const checkMatch = function() {
    const openCards = cards.filter(card => card.isOpen);

    if (openCards.length == 1) return;

    setTimeout(() => {
        if (openCards[0].frontPic === openCards[1].frontPic) {
            openCards.forEach(card => card.setMatched());
            ++score;
        } else {
            openCards.forEach(card => card.unflip());
            --score;
        }
        renderScore();
        openCards.forEach(card => card.isOpen = false);
    }, flipDelay);
}

const startGame = function() {
    htmlBoard.innerHTML = '';
    images.forEach(value => value.times = 0);
    score = 0;
    render();
}

renderNav();
startGame();
newGameButton.addEventListener('click', () => startGame());
