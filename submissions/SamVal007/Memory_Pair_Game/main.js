let similarCards = [];
let blockedClick = false;
const images = ['Dart_Weider', 'lyuk-skajuoker', 'R2-D2', 'c-3po',
     'printsessa-leya-organa', 'enakin-skajuoker', 'obi-van-kenobi',
     'dart-sidius', 'kvaj-gon-dzhinn', 'joda'
];
const flippDelay = 900,
    hiddingDelay = 600,
    victoryMessageDelay = 1200,
    enoughCountOfSimilarCards = 2;

const mainAttributes = {
    container: 'container',
    cards: 'cards',
    card: 'card',
    front: 'front_card',
    frontImg: 'img-front_card',
    back: 'back_card',
    backImg: 'img-back_card',
    flipped: 'flipped',
    hidden: 'hidden',

    imgBackLogoUrl: 'img/back_logo.png',
    imgBackLogoAlt: 'logo_card',
    imgFrontLogoUrl: 'img/'
};

const cleanCountArray = () => similarCards = [];

const flippSelectedCards = () => {
    setTimeout(() => {
        document.querySelectorAll(".flipped").forEach((card) => {
            card.classList.remove(mainAttributes.flipped);
            cleanCountArray();
            blockedClick = false;
        });
    }, flippDelay);
};

const hideSimilarCards = () => {
    setTimeout(() => {
        document.querySelectorAll(".flipped").forEach((card) => {
            card.classList.add(mainAttributes.hidden);
            cleanCountArray();
            blockedClick = false;

            checkingForTheVictory();

        });
    }, hiddingDelay);
};

const compareSimilarCards = () => {
    const countCards = similarCards.length;
    if (countCards === enoughCountOfSimilarCards) {
        blockedClick = true;
        const [firstCard, secondCard] = similarCards;
        if (firstCard === secondCard) {
            hideSimilarCards();
        } else {
            flippSelectedCards();
        }
    }
};

const selectCard = ({target}) => {
    if (!blockedClick) {
        const selectedCard = target.closest('.card');
        if (selectedCard && !selectedCard.classList.contains('flipped')) {
            let cadName = target.getAttribute("id");
            selectedCard.classList.add(mainAttributes.flipped);
            similarCards.push(cadName);
            compareSimilarCards();
        }
    }
};

const drawCards = () => {

    const cards = document.createElement('div');
    cards.classList.add(mainAttributes.cards);

    const arrImages = [...images, ...images];
    const shuffleArray = arrImages.sort(function () {
        return 0.5 - Math.random()
    });

    shuffleArray.forEach((item) => {
        const card = document.createElement('div');
        const frontCard = document.createElement('div');
        const backCard = document.createElement('div');
        const frontImg = document.createElement('img');
        const backImg = document.createElement('img');

        frontCard.append(frontImg);
        backCard.append(backImg);
        card.append(backCard);
        card.append(frontCard);
        cards.append(card);

        card.classList.add(mainAttributes.card);
        frontCard.classList.add(mainAttributes.front);
        backCard.classList.add(mainAttributes.back);
        frontImg.classList.add(mainAttributes.frontImg);
        frontImg.src = mainAttributes.imgFrontLogoUrl + `${item}.png`;
        frontImg.alt = `${item}`;
        backImg.classList.add(mainAttributes.backImg);
        backImg.src = mainAttributes.imgBackLogoUrl;
        backImg.alt = mainAttributes.imgBackLogoAlt;
        backImg.id = frontImg.alt;

        let template =
            `<div >
            <div class="picture">
              <img src="${item}">
            </div>
          </div>`;

    });

    return cards;
};

const showCards = () => {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.classList.add(mainAttributes.container);
    container.append(drawCards());
    container.addEventListener("click", selectCard);
    body.append(container);
};

const checkingForTheVictory = () => {
    const counterHiddenCards = document.querySelectorAll(".hidden").length;
    const amountOfCards = ((images.length) * enoughCountOfSimilarCards);
    if (counterHiddenCards === amountOfCards) {
        victoryMessage();
    }
}

const victoryMessage = () => {
    setTimeout(() => {
        if (window.confirm("Bravo!\nYou are the best around stars!\nWanna try again?")) {
            document.body.innerHTML = "";
            showCards();
        } else window.close();
    }, victoryMessageDelay);
};

window.onload = () => {
    if (window.confirm("Do you want to test your memory?\nFind the same images.\nMay the force be with you!")) {
        showCards();
    } else window.close();
};
