const doc = document.documentElement,
    fragment = new DocumentFragment(),
    infoSpan = document.querySelector('.header__info-block'),
    failsNumberSpan = document.querySelector('.header__fails-number'),
    winsNumberSpan = document.querySelector('.header__wins-number'),
    gameboardCard = document.querySelector('.gameboard-card'),
    gameCardsGroup = document.querySelector('.game-cards-group'),
    resetButton = document.querySelector('.gameboard-card__reset-button'),
    catImg = document.querySelector('.footer__cat-img');

const uniqueGameCardsNumber = 8,
    maxOpenedGameCardsNumber = 2,
    maxSolvedGameCardsNumber = 16;

const initCatImgWidth = '30vw',
    catImgGrowthFactor = 1.1,
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

const cardFlippingTime = 400
    gameCardDisplayingTime = 450,
    gameCardMovingTime = 1000,
    catSoundTime = 1000,
    catSoundDelay = gameCardDisplayingTime + gameCardMovingTime/2,
    openingGameboardCardDelay = gameCardDisplayingTime + gameCardMovingTime;

let firstGameCard,
    secondGameCard;

let openedGameCardsNumber = 0,
    solvedGameCardsNumber = 0,
    winsNumber = -1,
    failsNumber,
    catSoundIndex = 0,
    infoMessageIndex = 0;

const catSounds = [
    './sounds/cat-sound-1.mp3',
    './sounds/cat-sound-2.mp3',
    './sounds/cat-sound-3.mp3'
    ].map(src => new Audio(src));

const infoMessages = [
    'Aaah, just look at that kitty in the corner. Looks so skinny. Play game to fix it!',
    'Knowing that cat is hungry isn\'t enough - we must apply. Wishing to open cards is not enough - we must do.',
    'The only limits that exist are the ones in your own mind. You can feed this cat faster!',
    'We generate fears not to open the cards while we sit. We overcome them by action.',
    'Stop limiting your potential. Realize that there’s an unlimited amount of food you cat give to this cat.',
    'Push yourself, because no one else is going to feed this cat for you.',
    'Great food never come from comfort zones.',
    'Don’t stop when you’re tired. Stop when this cat won\'t be hungry.',
    'Ouch, this cat ate too much..'
];

const createGameCards = function(){
    for(let i = 0; i < uniqueGameCardsNumber; i++){
        let card1 = createGameCard(i + 1);
        let card2 = createGameCard(i + 1);

        fragment.append(card1, card2);
    }

    gameCardsGroup.append(fragment);
};

const createGameCard = function(i){
    const card = document.createElement('div');
    const cardInnerHtml =  `
                    <div class="card__front game-card__front">
                        <img class="game-card__img" src="./images/front.jpg" alt="kfc-logo">
                    </div>
                    <div class="card__back game-card__back">
                        <img class="game-card__img" src="./images/back-${i}.png" alt="kfc-product-${i}">
                    </div>`;

    card.classList.add('card', 'game-card');
    card.setAttribute('data-back-img-id', i);
    card.insertAdjacentHTML('beforeend', cardInnerHtml);

    return card;
};

const initGame = function(){
    resetGameCards();
    resetCatImgWidth();
    solvedGameCardsNumber = 0;

    shuffleGameCards();

    renderInfo();
    renderWinsNumber(++winsNumber);
    renderFailsNumber(failsNumber = 0);
};

const resetGameCards = function(){
    const cards = gameCardsGroup.querySelectorAll('.game-card');

    moveOpenedGameCardsFromCorner(cards);
    positionOpenedGameCardsRelatively(cards);

    setTimeout(closeOpenedGameCards.bind(null, ...cards), cardFlippingTime);
};

const moveOpenedGameCardsFromCorner = function(cards){
    cards.forEach(card =>
        card.classList.remove('first-game-card--in-corner',
                              'second-game-card--in-corner')
    );
};

const positionOpenedGameCardsRelatively = function(cards){
    cards.forEach(card =>
        card.classList.remove('first-game-card--abs-positioned',
                              'second-game-card--abs-positioned')
    );
};

const closeOpenedGameCards = function(...cards){
    cards.forEach(card =>
        card.classList.remove('card--flipped')
    );
};

const resetCatImgWidth = function(){
    catImg.style.width = initCatImgWidth;
};

const shuffleGameCards = function(){
    let cardsArr = Array.from(gameCardsGroup.children);
    cardsArr.sort(() => Math.random() - 0.5);

    cardsArr.forEach((card, i) => {
        card.dataset.gridCell = i + 1;
        fragment.append(card);
    });

    gameCardsGroup.append(fragment);
};

const renderInfo = function(){
    if(infoMessageIndex === infoMessages.length) infoMessageIndex = 0;
    infoSpan.textContent = infoMessages[infoMessageIndex++];
};

const renderWinsNumber = function(winsNumber){
    winsNumberSpan.textContent = winsNumber;
};

const renderFailsNumber = function(failsNumber){
    failsNumberSpan.textContent = failsNumber;
};

const handleGameCardsGroupClick = function({target: {parentElement: {parentElement: el}}}){
    if(el.classList.contains('game-card') && !twoGameCardsOpened()){
        const card = el;

        if(!firstGameCard){
            openGameCard(card);
            firstGameCard = card;
        }
        else if(firstGameCard !== card){
            openGameCard(card);
            secondGameCard = card;
            handleOpeningSecondGameCard();
        }
    }
};

const twoGameCardsOpened = function(){
    return openedGameCardsNumber === 2;
};

const openGameCard = function(card){
    card.classList.add('card--flipped');
    openedGameCardsNumber++;
};

const handleOpeningSecondGameCard = function(){
    if(!sameGameCardsOpened()){
        handleOpeningDiffGameCards();
    }
    else {
        handleOpeningSameGameCards();
    }
};

const sameGameCardsOpened = function(){
    return secondGameCard.dataset.backImgId === firstGameCard.dataset.backImgId;
};

const handleOpeningDiffGameCards = function(){
    setTimeout(
        closeOpenedGameCards.bind(null, firstGameCard, secondGameCard),
        gameCardDisplayingTime
    );

    resetOpenedGameCardsInfo();
    renderFailsNumber(++failsNumber);
};

const handleOpeningSameGameCards = function(){
    positionOpenedGameCardsAbsolutely();

    setTimeout(
        moveOpenedGameCardsInCorner.bind(null, firstGameCard, secondGameCard),
        gameCardDisplayingTime
    );
    setTimeout(increaseCatImgWidth, gameCardDisplayingTime);
    setTimeout(() => {
        playCatSound();
        renderInfo();
    }, catSoundDelay)

    resetOpenedGameCardsInfo();

    solvedGameCardsNumber+= 2;
    if(allGameCardsSolved()) {
        setTimeout(openGameboardCard, openingGameboardCardDelay);
    }
};

const openGameboardCard = function(){
    gameboardCard.classList.add('card--flipped');
};

const positionOpenedGameCardsAbsolutely = function(){
    doc.style.setProperty('--first-game-card-abs-left', firstGameCard.offsetLeft + 'px');
    doc.style.setProperty('--first-game-card-abs-top', firstGameCard.offsetTop + 'px');

    doc.style.setProperty('--second-game-card-abs-left', secondGameCard.offsetLeft + 'px');
    doc.style.setProperty('--second-game-card-abs-top', secondGameCard.offsetTop + 'px');

    firstGameCard.classList.add('first-game-card--abs-positioned');
    secondGameCard.classList.add('second-game-card--abs-positioned');
};

const moveOpenedGameCardsInCorner = function(firstGameCard, secondGameCard){
    doc.style.setProperty('--first-game-card-corner-left', - gameboardCard.offsetLeft + 'px');
    doc.style.setProperty('--first-game-card-corner-top', vh - gameboardCard.offsetTop - parseFloat(getComputedStyle(firstGameCard).height) + 'px');

    doc.style.setProperty('--second-game-card-corner-left', - gameboardCard.offsetLeft + 'px');
    doc.style.setProperty('--second-game-card-corner-top', vh - gameboardCard.offsetTop - parseFloat(getComputedStyle(secondGameCard).height) + 'px');

    firstGameCard.classList.add('first-game-card--in-corner');
    secondGameCard.classList.add('second-game-card--in-corner');
};

const resetOpenedGameCardsInfo = function(){
    firstGameCard = null;
    secondGameCard = null;
    openedGameCardsNumber = 0;
};

const increaseCatImgWidth = function(){
    const catImgWidth = parseFloat(getComputedStyle(catImg).width);
    catImg.style.width = catImgWidth * catImgGrowthFactor + 'px';
};

const playCatSound = function(){
    if(catSoundIndex === catSounds.length) catSoundIndex = 0;
    catSounds[catSoundIndex++].play();
};

const allGameCardsSolved = function(){
    return solvedGameCardsNumber === maxSolvedGameCardsNumber;
};

const handleResetButtonClick = function(){
    closeGameboardCard();
    initGame();
}

const closeGameboardCard = function(){
    gameboardCard.classList.remove('card--flipped');
};

document.addEventListener("DOMContentLoaded", () => {
    createGameCards();

    gameCardsGroup.addEventListener('click', handleGameCardsGroupClick);
    resetButton.addEventListener('click', handleResetButtonClick);

    initGame();
});
