class Game {
    constructor(selector) {
        this.gameContainer = document.querySelector(selector);
        this.rightAnswers = 0;
        this.openCards = [];
    }

    startGame() {
        this.gameContainer.innerHTML = this.getCards();
        this.addListeners();
    }

    addListeners() {
        this.gameContainer.querySelectorAll('[data-onclick]').forEach(button => {
            const attr = button.getAttribute('data-onclick');
            const methodName = attr.split('(')[0];

            button.addEventListener('click', event => this[methodName](event));
        });
    }

    openCard({ currentTarget: btn }) {
        btn.classList.add('active');

        if (this.openCards.length < 2) {
            this.openCards.push(btn);
        }
        if (this.openCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        if (this.openCards[0].getAttribute('data-id') === this.openCards[1].getAttribute('data-id')) {
            this.addMatch();
        } else {
            this.closeCards();
        }
    }

    addMatch() {
        this.rightAnswers++;
        this.openCards = [];

        if (this.rightAnswers === 4) {
            setTimeout(() => {
                alert('Congratulations!');
                this.startGame();
            }, 400);
        }
    }

    closeCards() {
        const cardsToClose = [...this.openCards];

        setTimeout(() => {
            cardsToClose.forEach(card => card.classList.remove('active'));
        }, 1000);

        this.openCards = [];
    }

    getCards() {
        return this.getShuffledIds().map(id => {
            return `
                <li class="card">
                    <button class="card__btn" data-id="${id}" data-onclick="openCard()">
                        <span class="card__front"></span>
                        <span class="card__back" style="--image: url(${this.getPokemonImageUrl(id)})"></span>
                    </button>
                </li>
            `;
        }).join('');
    }

    getShuffledIds() {
        return this.getIds().sort(() => Math.random() - 0.5);
    }

    getIds() {
        const ids = [1, 2, 3, 4].map(num => this.getRandom(num * 10, (num + 1) * 10));
        return [...ids, ...ids];
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    getPokemonImageUrl(id) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }
}

(new Game('.game')).startGame();