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
    //--------------------------------------------
    const playArea = document.querySelector('#play-area');
    const gameName = document.querySelector('#title');
    const playCardsTotal = cards.length * 2;
    const closeCardsDelay = 800;
    const hideCardsDelay = 100;
    const checkPairDelay = 800;
    const delayEndGame = 800;
    
    //--------------------------------------------
    function ShuffleArr(arr) {
        for(let i = 0; i < arr.length; i++) {
            let k = Math.floor( Math.random() * arr.length);
            [arr[i], arr[k]] = [arr[k], arr[i]];
        }
        return arr;
    }
    
    function createCard(id, src) {
        return `
        <div class="card" data-id="${id}"> 
            <div class="flipper"> 
                <div class="front">
                    <img src="${src}" class="image">
                </div>              
                <div class="back"></div>                
            </div>        
        </div>
    `;
    }
    
    function addCardsToPlayArea(arr) {
        const playCards = arr.concat(arr);
        let playCardsToStr = '';
    
        ShuffleArr(playCards).forEach((item) => playCardsToStr += createCard(item['id'], item['src']));
        playArea.innerHTML = playCardsToStr;
    }
    
    //--------------------------------------------
    function clickCard({target}) {
        let clickTarget = target.closest('div.card');
        if (!clickTarget) return;
        clickTarget.classList.add('open');
    
        checkPair();
    }
    
    function stopClick() {
        playArea.removeEventListener('click', clickCard);
    }
    
    //--------------------------------------------
    function checkPair() {
        const allCards = [...document.querySelectorAll('.card')];
        const pair = allCards.filter( (item) => item.classList.contains('open'));
        
        if (pair.length === 2) {
            stopClick();
            
            if (pair[0].getAttribute('data-id') === pair[1].getAttribute('data-id')) {
                hideCards(pair);
            }
            
            closeCards(pair);
        }
        setTimeout(playGame, checkPairDelay);
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
    
    //--------------------------------------------
    function closeCards(arr) {
        setTimeout(() => {
            arr.forEach( (item) => item.classList.remove('open') )
        }, closeCardsDelay);  
    }
    
    function hideCards(arr) {
        setTimeout(() => {
            arr.forEach( (item) => item.classList.add('hide') );
            checkWin();
        }, hideCardsDelay);
    }
    
    //--------------------------------------------
    function playGame() {
        playArea.addEventListener('click', clickCard);
    }
    
    //--------------------------------------------
    function gameStart() {
        addCardsToPlayArea(cards);
        playGame();
    }
    
    //--------------------------------------------
    gameStart();

});
