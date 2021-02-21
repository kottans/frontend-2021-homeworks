const cardsBack = ['cat', 'dog', 'elephant', 'fox', 'jaguar', 'zebra'];
const winMatchCards = 6; 
const oneMatchCards = 2; 
const delayToCloseCards = 400; 
const delayToHideCards = 400; 
const delayToAlertWin = 600;

class Game {
    constructor() {
        this.cardsContainer = document.querySelector('.cards'); 
        this.matchCards = 0; 
        this.openCards = []; 

        this.fillCards();
        this.addClickHandler();
    }

    fillCards () {
        this.cardsContainer.innerHTML = this.createCards();
    }

    mixCards() {
        return [...cardsBack, ...cardsBack].sort(() =>  0.5 - Math.random());  
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

    addClickHandler () {
        this.cardsContainer.addEventListener('click', ({ target: button }) => {
            const buttonId = button.dataset.id;

            if(buttonId) {
                button.classList.add('active');
                button.setAttribute('disabled', 'disabled'); 

                if (this.openCards.length < oneMatchCards) {
                    this.openCards.push(button);
                }; 
                
                if (this.openCards.length === oneMatchCards) {
                    this.checkCards(); 
                }; 
            }  
        });   
    }

    checkCards () {
        if (this.openCards[0].dataset.id === this.openCards[1].dataset.id) {
            const cardsToHide = [...this.openCards]; 
            this.matchCards++;
            this.openCards = [];
            setTimeout(() => {
                cardsToHide.forEach(card => card.classList.add('hidden')); 
            }, delayToHideCards);
            this.checkForWin(); 
        } else {
            this.closeCards();
        }; 
    }

    closeCards () {
        const cardsToClose = [...this.openCards];
        this.openCards = [];  
        setTimeout(() => {
            cardsToClose.forEach(card => {
                card.classList.remove('active'); 
                card.removeAttribute('disabled'); 
            });
        }, delayToCloseCards);
    }

    checkForWin() {
        if (this.matchCards === winMatchCards) {
            setTimeout(() => {
                alert('Congratulations!')
                this.fillCards();
            }, delayToAlertWin);  
        };
    }
}

new Game();
