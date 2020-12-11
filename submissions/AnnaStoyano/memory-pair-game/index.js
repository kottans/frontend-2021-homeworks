class Game {
    constructor(cards) {
        this.container = document.querySelector('.container');
        this.cards = cards;
        this.TiME_DELAY = 700;
    }

    render() {
        this.cards.forEach(card => this.container.insertAdjacentElement('beforeend', card.render()));
    }

    checkEqualCards(activeCards) {
        const activeCardsNames = activeCards.map(card => card.cardForDisplay.dataset.name);
        if (activeCardsNames[0] === activeCardsNames[1]) {
            activeCards.forEach(card => card.addOpened());
            return true;
        }
        return false;
    }

    removeActiveCards(cards, isOpened) {
        const TIME_WITHOUT_DELAY = 0;
        const TIME_FOR_DELAY = 600;
        setTimeout(() => cards.forEach(card => card.removeActive()), isOpened ? TIME_WITHOUT_DELAY : TIME_FOR_DELAY);
        return [];
    }

    processClickOnCards() {
        const game = this;
        this.container.addEventListener('click', function ({target}) {
            let activeCards = game.getActiveCards(); // I reassign this variable in next steps. activeCards length === 0;
            const targetCard = target.closest('.card');
            if (activeCards.length < 2 && targetCard.classList.contains('card')) {
                if (!targetCard.classList.contains("opened")) {
                    game.findCard(targetCard).addActive();
                    activeCards = game.getActiveCards(); // Now we know new active cards. activeCards length === 1 or 2;
                }
            }
            if (activeCards.length === 2) {
                const isOpened = game.checkEqualCards(activeCards);
                activeCards = game.removeActiveCards(activeCards, isOpened); // remove all active cards. activeCards length === 0;
            }
            game.checkWin.bind(game)();
        }, false);
    }

    shuffleCard() {
        this.cards.sort(() => 0.5 - Math.random());
    }

    startGame() {
        this.shuffleCard();
        this.render();
        this.processClickOnCards();
    }

    restartGame() {
        this.shuffleCard();
        this.render();
    }

    findCard(cardHTMLelement) {
        let card = this.cards.find(card => card.cardForDisplay.id == cardHTMLelement.id);
        return card;
    }

    getOpenedCards() {
        return this.cards.filter(card => card.cardForDisplay.classList.contains('opened'));
    }

    getActiveCards() {
        return this.cards.filter(card => card.cardForDisplay.classList.contains('active'));
    }

    checkWin() {
        const game = this;
        let openCards = this.getOpenedCards();
        if (openCards.length === this.cards.length) {
            setTimeout(function () {
                const restart = confirm('You WIN!\nRestart Game?');
                if (restart) {
                    game.removeOpenedCard();
                    game.restartGame();
                }
            }, game.TiME_DELAY);
        }
    }

    removeOpenedCard() {
        this.cards.forEach(card => card.cardForDisplay.classList.remove('opened'));
    }
}

class Card {
    constructor(name, img, id) {
        this.cardForDisplay = document.createElement('div');
        this.frontSide = document.createElement('div');
        this.backSide = document.createElement('div');
        this.frontSide.classList.add('front-side');
        this.backSide.classList.add('back-side');
        this.FRONT_CARD_TITLE = 'Happy New Year';
        this.name = name;
        this.id = id;
        this.img = img;
    }

    addActive() {
        this.cardForDisplay.classList.add('active');
    }

    addOpened() {
        this.cardForDisplay.classList.add('opened');
    }

    removeActive() {
        this.cardForDisplay.classList.remove('active');
    }

    render() {
        this.cardForDisplay.classList.add('card');
        this.cardForDisplay.id = this.id;
        this.backSide.style.backgroundImage = `url(${this.img})`;
        this.frontSide.innerHTML = this.FRONT_CARD_TITLE;
        this.cardForDisplay.insertAdjacentElement('afterbegin', this.frontSide);
        this.cardForDisplay.insertAdjacentElement('beforeend', this.backSide);
        this.cardForDisplay.dataset.name = this.name;
        return this.cardForDisplay;
    }
}

const entities = [
    ['pig', 'images/Pig.svg'],
    ['cat', 'images/Cat.svg'],
    ['giraffe', 'images/Giraffe.svg'],
    ['panda', 'images/Panda.svg'],
    ['penguin', 'images/Penguin.svg'],
    ['walrus', 'images/Walrus.svg']
];

const cards = [];
let cardCount = 0;

entities.forEach(item => {
    for (let i = 0; i < 2; i++) {
        cards.push(new Card(item[0], item[1], cardCount)); /* create 2 equal cards*/
        cardCount++;
    }
});

const game = new Game(cards);
game.startGame();
