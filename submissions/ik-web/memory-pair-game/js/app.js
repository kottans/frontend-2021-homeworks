document.addEventListener("DOMContentLoaded", () => {

    const cards = [
        {
            id: 1,
            src: 'img/barbossa.jpg'
        },
        {
            id: 2,
            src: 'img/jack.jpg'
        },
        {
            id: 3,
            src: 'img/davy.jpg'
        },
        {
            id: 4,
            src: 'img/will.jpg'
        },
        {
            id: 5,
            src: 'img/elizabeth.jpg'
        },
        {
            id: 6,
            src: 'img/teach.jpg'
        }
    ];

    const gameName = document.querySelector('#title');
    const playArea = document.querySelector('#play-area');
    const playCardsTotal = cards.length * 2;

    const checkPairDelay = 800;
    const closeCardsDelay = 800;
    const hideCardsDelay = 600;
    const delayEndGame = 900;
    
    function shuffleArr(arr) {
        for(let i = 0; i < arr.length; i++) {
            let k = Math.floor( Math.random() * arr.length);
            [arr[i], arr[k]] = [arr[k], arr[i]];
        }
        return arr;
    }
    
    function createCard(cardId, cardImageSrc) {
        return `
        <div class="card" data-id="${cardId}"> 
            <div class="flipper"> 
                <div class="front">
                    <img src="${cardImageSrc}" class="image" alt="pirate">
                </div>              
                <div class="back"></div>                
            </div>        
        </div>
    `;
    }
    
    function addCardsToPlayArea(cards) {
        const playCards = cards.concat(cards);
        const shuffledCards = shuffleArr(playCards)
        .map(playCard => createCard(playCard.id, playCard.src))
        .join('');

        playArea.innerHTML = shuffledCards;
    }
    
    function clickCard() {
        playArea.addEventListener('click', checkCard);
    }

    function checkCard({target}) {
        let clickTarget = target.closest('div.card');
        if (!clickTarget) return;
        clickTarget.classList.add('open');

        checkPair();
    }

    function checkPair() {
        const openedCards = [...document.querySelectorAll('.open')];
        
        if (openedCards.length === 2) {
            stopClick();
            
            const [firstCard, secondCard] = openedCards;

            if (firstCard.getAttribute('data-id') === secondCard.getAttribute('data-id')) {
                hideCards(openedCards);
            }
            
            closeCards(openedCards);
            setTimeout(clickCard, checkPairDelay);
        }
    }

    function stopClick() {
        playArea.removeEventListener('click', checkCard);
    }

    function hideCards(openedCards) {
        setTimeout(() => {
            openedCards.forEach( (card) => card.classList.add('hide') );
            checkWin();
        }, hideCardsDelay);
    }

    function checkWin() {
        const hiddenCards = document.querySelectorAll('.hide');
        
        if (hiddenCards.length === playCardsTotal) {     
            setTimeout(endGame, delayEndGame);
        }
    }

    function endGame() {
        document.querySelector('.off').classList.remove('off');
        document.querySelector('#btn').addEventListener('click', () => window.location.reload());
        gameName.classList.add('off');
    }

    function closeCards(openedCards) {
        setTimeout(() => {
            openedCards.forEach( (card) => card.classList.remove('open') );
        }, closeCardsDelay);  
    }

    function gameStart() {
        addCardsToPlayArea(cards);
        clickCard();
    }
    
    gameStart();

});
