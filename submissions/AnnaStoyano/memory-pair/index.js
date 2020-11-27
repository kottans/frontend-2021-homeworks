class Game {
    constructor(cards) {
        this.container = document.querySelector('.container');
        this.cards = cards;
    }

    render() {
        this.cards.forEach(card => {
            this.container.insertAdjacentElement('beforeend', card.render());
        });
    }

    checkOpenCards() {
        let game = this;
        let activeCardsNames;
        this.container.addEventListener('click', function (event) {
            event.stopPropagation();
            let activeCards = game.cards.filter(card => card.cardForDisplay.classList.contains('active'));
            if (activeCards.length == 2) {
                activeCardsNames = activeCards.map(card => card.cardForDisplay.attributes['data-name'].value);
                setTimeout(function () {
                    if (activeCardsNames[0] == activeCardsNames[1]) {
                        activeCards.forEach(card => card.cardForDisplay.classList.add('opened'));
                    }
                    activeCards.forEach(card => card.cardForDisplay.classList.remove('active'));
                    setTimeout(game.checkWin.bind(game), 700); /* In order to card has time to change background color before confirm*/
                }, 700);
            }
        });
    }

    shuffleCard() {
        this.cards.sort(() => 0.5 - Math.random());
    }

    startGame() {
        this.shuffleCard();
        this.render();
        this.checkOpenCards();
        this.checkWin();
    }

    checkWin() {
        let openCards = game.cards.filter(card => card.cardForDisplay.classList.contains('opened'));
        if (openCards.length == this.cards.length) {
            let restart = confirm('You WIN!\nRestart Game?');
            if (restart) {
                this.removeOpenedCard();
                this.startGame();
            }
        }
    }

    removeOpenedCard() {
        this.cards.forEach(card => card.cardForDisplay.classList.remove('opened'));
    }
}

class Card {
    constructor(name, img) {
        this.cardForDisplay = document.createElement('div');
        this.frontSide = document.createElement('div');
        this.backSide = document.createElement('div');
        this.frontSide.classList.add('front-side');
        this.backSide.classList.add('back-side');
        this.name = name;
        this.img = img;

        (() => {
            const targetCard = this;
            this.cardForDisplay.addEventListener('click', function () {
                if (!targetCard.cardForDisplay.classList.contains('opened'))
                    targetCard.cardForDisplay.classList.add('active');
            });
        })();
    }

    render() {
        this.cardForDisplay.classList.add('card');
        this.backSide.style.backgroundImage = `url(${this.img})`;
        this.frontSide.innerHTML = 'Happy New Year';
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
entities.forEach(item => {
    for (let i = 0; i < 2; i++) {
        cards.push(new Card(item[0], item[1])); /* create 2 equal cards*/
    }
});

const game = new Game(cards);
game.startGame();
