const field = document.querySelector('.game');
const cards = document.querySelectorAll('.card');
const win = document.querySelector('.win');

const  cardMaxPositions = 12;

let isRolledCard = false,
    lockRoll = false,
    firstCard, secondCard,
    winCondition = 6,
    currentMatches = 0;

window.onload = resetOrderCards();

field.onclick = function(event) {
    if (event.target.className != 'back') return;
    
    let card = event.target.closest('.card');
    rollCard(card);
}

function rollCard(card) {
    if (lockRoll) return;
    if (card === firstCard) return;
    card.classList.add('roll');

    if (!isRolledCard) {
        //first clicked Card!
        isRolledCard = true;
        firstCard = card;
    } else {
         //second clicked Card!
        isRolledCard = false;
        secondCard = card;
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
        firstCard.classList.add('clear'); 
        firstCard.removeEventListener('click', rollCard);
        secondCard.classList.add('clear');
        secondCard.removeEventListener('click', rollCard);
        currentMatches++;  
        resetCards();
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
    if (currentMatches === winCondition) {
        setTimeout(function() {
            win.classList.add('win_open');
        }, 500)
    };
}

function resetOrderCards() {
    cards.forEach(function(card) {
        let position = Math.floor(Math.random() * cardMaxPositions);
        card.style.order = position;
    })
};
