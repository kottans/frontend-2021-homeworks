class Game {
    constructor() {
        this.cardsContainer = document.querySelector('.cards'); 
        this.cardsBack = ['cat', 'dog', 'elephant', 'fox', 'jaguar', 'zebra'];
        this.matchCards = 0; 
        this.winMatchCards = 6; 
        this.oneMatchCards = 2; 
        this.openCards = []; 
        this.delayToCloseCards = 400; 
        this.delayToHideCards = 400; 
        this.delayToAlertWin = 600;

        this.fillCards();
        this.addClickHendler();
    }

    fillCards () {
        this.cardsContainer.innerHTML = this.createCards();
    }

    mixCards () {
        return this.cardsBack.concat(this.cardsBack).sort(() =>  0.5 - Math.random());  
    }

    createCards () {
        return this.mixCards().map(card => {
            return `
            <li class='card'>
                <button class='card__btn' data-id='${card}'>
                    <img class='card__front' src='assets/cards-front.jpg' alt='card-front'>
                    <img class='card__back' src='assets/${card}.jpg' alt='card-back'>
                </button>
            </li>`
        }).join(''); 
    }; 

    addClickHendler () {
        this.cardsContainer.addEventListener('click', ({ target: button }) => {
            console.log('listener');
            const buttonId = button.dataset.id;

            if(buttonId) {
                button.classList.add('active');

                if (this.openCards.length < this.oneMatchCards) {
                    this.openCards.push(button);
                }; 
                
                if (this.openCards.length === this.oneMatchCards) {
                    this.checkCards(); 
                }; 
            }  
        });   
    }

    checkCards () {
        if (this.openCards[0].dataset.id === this.openCards[1].dataset.id) {
            const cardsToHide = [].concat(this.openCards); 
            this.matchCards++;
            this.openCards = [];
            setTimeout(() => {
                cardsToHide.forEach(card => card.classList.add('hidden')); 
            }, this.delayToHideCards);
            this.checkForWin(); 
        } else {
            this.closeCards();
        }; 
    }

    closeCards () {
        const cardsToClose = [].concat(this.openCards);
        this.openCards = [];  
        setTimeout(() => {
            cardsToClose.forEach(card => card.classList.remove('active'));
        }, this.delayToCloseCards);
    }

    checkForWin() {
        if (this.matchCards === this.winMatchCards) {
            setTimeout(() => {
                alert('Congratulations!')
                this.fillCards();
            }, this.delayToAlertWin);  
        };
    }
}

new Game();
