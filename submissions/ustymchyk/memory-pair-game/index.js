class Game {
    constructor(selector) {
        this.gameContainer = document.querySelector(selector);

        this.congratulationText = 'Congratulations!';
        this.delayBeforeCongratulations = 300;
        this.delayBeforeCloseCards = 500;
        this.rightAnswers = 0;
        this.rightAnswersForWin = 4;
        this.matchingForRightAnswer = 2;

        this.openCards = [];
    }

    startGame() {
        this.gameContainer.innerHTML = this.getCards();
        this.gameContainer.addEventListener('click', event => {
            this.onClick(event);
        });
    }

    onClick({ target }) {
        const btn = target.closest('button');

        if (btn) {
            this[btn.dataset.onclick](btn);
        };
    }

    openCard(btn) {
        btn.classList.add('active');

        if (this.openCards.length < this.matchingForRightAnswer) {
            this.openCards.push(btn);
        }
        if (this.openCards.length === this.matchingForRightAnswer) {
            this.checkMatch();
        }
    }

    checkMatch() {
        this.openCards[0].dataset.id === this.openCards[1].dataset.id ? this.addMatch() : this.closeCards();
    }

    addMatch() {
        this.rightAnswers++;
        this.openCards = [];

        if (this.rightAnswers === this.rightAnswersForWin) {
            setTimeout(() => {
                alert(this.congratulationText);

                this.startGame();
            }, this.delayBeforeCongratulations);
        }
    }

    closeCards() {
        const cardsToClose = [...this.openCards];

        setTimeout(() => {
            cardsToClose.forEach(card => card.classList.remove('active'));
        }, this.delayBeforeCloseCards);

        this.openCards = [];
    }

    getCards() {
        return this.getShuffledIds().map(id => {
            return `
                <li class="card">
                    <button class="card__btn" data-id="${id}" data-onclick="openCard">
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
