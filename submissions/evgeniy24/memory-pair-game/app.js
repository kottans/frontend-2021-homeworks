const cards = document.querySelectorAll('.card');
const win = document.querySelector('.win');

let isRolledCard = false;
let firstCard, secondCard;
let winCondition = 0;

function rollCard() {
    this.classList.add('roll');

    if (!isRolledCard) {
        //first clicked Card!
        isRolledCard = true;
        firstCard = this;
        console.log(this);
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
    firstCard.removeEventListener('click', rollCard);
    secondCard.removeEventListener('click', rollCard);
    winCondition++;
}

function cancelRollCards() {
    setTimeout(function() {
        firstCard.classList.remove('roll');
        secondCard.classList.remove('roll');
        }, 400)
}

function checkWinCondition() {
    if (winCondition === 6) {
        setTimeout(function() {
            win.classList.add('win_open');
        }, 500)
    };
}

cards.forEach(function(card) {
    card.addEventListener('click', rollCard);
})

