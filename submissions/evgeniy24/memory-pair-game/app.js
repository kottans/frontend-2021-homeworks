const cards = document.querySelectorAll('.card');
const win = document.querySelector('.win');

let isRolledCard = false;
let lockRoll = false;
let firstCard, secondCard;
let winCondition = 0;

function rollCard() {
    if (lockRoll) return;
    if (this === firstCard) return;
    this.classList.add('roll');

    if (!isRolledCard) {
        //first clicked Card!
        isRolledCard = true;
        firstCard = this;
    } else {;
         //second clicked Card!
        isRolledCard = false;
        secondCard = this;
        //check cards for match!
        checkCardMatch();
    }
}

function checkCardMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        //Cards matched!
        freezeCards();
        checkWinCondition();
        
    } else {
        //Cards didnt match!
        cancelRollCards();
    }
}

function freezeCards() {
    setTimeout (function() {
        firstCard.classList.add('clear');
        secondCard.classList.add('clear');
        firstCard.removeEventListener('click', rollCard);
        secondCard.removeEventListener('click', rollCard);
        winCondition++;
        resetCards();
    }, 700)
    
}

function cancelRollCards() {
    lockRoll = true;
    setTimeout(function() {
        firstCard.classList.remove('roll');
        secondCard.classList.remove('roll');
        resetCards();
        }, 400);
}

function resetCards() {
    isRolledCard = false;
    lockRoll = false;
    firstCard = null;
    secondCard = null;
}

function checkWinCondition() {
    if (winCondition === 6) {
        setTimeout(function() {
            win.classList.add('win_open');
        }, 500)
    };
}

(function resetOrderCards() {
    cards.forEach(function(card) {
        let position = Math.floor(Math.random() * 12);
        card.style.order = position;
    })
})();

cards.forEach(function(card) {
    card.addEventListener('click', rollCard);
})

