const htmlBoard = document.getElementById('board');
const newGameButton = document.getElementById('new-game');
const cards = [];
const images = [
    {url: 'img/tree0.svg', times: 0},
    {url: 'img/tree1.svg', times: 0},
    {url: 'img/tree2.svg', times: 0},
    {url: 'img/tree3.svg', times: 0},
    {url: 'img/tree4.svg', times: 0},
    {url: 'img/tree5.svg', times: 0}];
let score;

class Card {
    constructor() {
        this.htmlEl;
        this.htmlElInner;
        this.frontPic = randomImg(images);
        this.isOpen = false;
        this.render();
    }

    openCard() {
        this.htmlElInner.classList.add('flip');
        this.isOpen = true;
    }

    render() {
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('card');

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
        this.htmlElInner.addEventListener('click', () => {
            if (cards.filter(card => card.isOpen).length === 2) return;
            this.openCard();
            checkMatch();
        });

        this.htmlEl.appendChild(this.htmlElInner);
    }
}

const htmlScore = document.createElement('p');

const renderScore = () => {
    htmlScore.innerHTML = `Your score:  ${score}.`;
}

const wishes = document.createElement('p');
wishes.innerHTML = `Got 3, be smart)`;

const nav = document.querySelector('nav');
nav.append(htmlScore, wishes);

const randomInteger = function(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const randomImg = function(images) {
    let rand = randomInteger(0, images.length-1);
    ++ images[rand].times;
    return images[rand].times < 3 ? images[rand].url : randomImg(images);
}

const render = function () {
    for (let i = 0; i < 12; i++) {
        cards[i] = new Card();
        htmlBoard.appendChild(cards[i].htmlEl);
    }
    renderScore();
}

const checkMatch = function() {
    let openCards = cards.filter(card => card.isOpen);
    if (openCards.length == 1) return;

    setTimeout(() => {
        if (openCards[0].frontPic === openCards[1].frontPic) {
            openCards.forEach(card => card.htmlElInner.innerHTML = '');
            ++score;
        } else {
            openCards.forEach(card => card.htmlElInner.classList.remove('flip'));
            --score;
        }
        renderScore();
        openCards.forEach(card => card.isOpen = false);
    }, 800);
}

const startGame = function() {
    htmlBoard.innerHTML = '';
    images.forEach(value => value.times = 0);
    score = 0;
    render();

}

startGame();
newGameButton.addEventListener('click', () => startGame());
