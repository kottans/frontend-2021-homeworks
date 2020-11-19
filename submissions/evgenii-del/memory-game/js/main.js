const cards = [
    {
        id: 1,
        img: 'images/card1.jfif'
    },
    {
        id: 2,
        img: 'images/card2.jfif'
    },
    {
        id: 3,
        img: 'images/card3.jfif'
    },
    {
        id: 4,
        img: 'images/card4.jfif'
    },
    {
        id: 5,
        img: 'images/card5.jfif'
    },
    {
        id: 6,
        img: 'images/card6.jfif'
    },
    {
        id: 7,
        img: 'images/card7.jfif'
    },
    {
        id: 8,
        img: 'images/card8.jfif'
    }
];
const cards_container = document.querySelector('.js-cards_container');
const finalText = 'Вы победили! Хотите начать игру снова?';
const finalStep = 8;
let hasFlipped, playing = false;
let firstCard, secondCard, curStep;

const createItem = (card) => {
    const block = document.createElement('div');
    block.classList.add('flip-container');
    block.innerHTML = `
            <div class="flipper card" data-id="${card.id}">
                <div class="front">
                    <img src="images/card-front.jfif" alt="card-front">
                </div>
                <div class="back">
                    <img src="${card.img}" alt="${card.img}">
                </div>
            </div>
        `;
    return block;
}

const renderItems = (cards) => {
    const fragment = document.createDocumentFragment();
    cards.forEach((card) => {
        const block = createItem(card);
        fragment.append(block);
    })
    cards_container.append(fragment);
}

const flipCard = (target) => {
    if (target.classList.contains('card')) {
        target.classList.add('flipped');
        if (!hasFlipped) {
            hasFlipped = true;
            firstCard = target;
        } else {
            hasFlipped = false;
            secondCard = target;
            if (firstCard.dataset.id === secondCard.dataset.id) {
                rightCards();
                setTimeout(countSteps, 300);
            } else {
                wrongCards();
            }
        }
    }
}

const countSteps = () => {
    if (curStep === finalStep) {
        const restart = confirm(finalText);
        if (restart) {
            restartGame();
        }
    }
}

const rightCards = () => {
    firstCard.classList.remove('card');
    secondCard.classList.remove('card');
    curStep++;
}

const wrongCards = () => {
    playing = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        playing = false;
    }, 500);
}

const restartGame = () => {
    curStep = 0;
    cards_container.innerHTML = "";
    const newArray = [...cards, ...cards].sort(() => 0.2 - Math.random());
    renderItems(newArray);
}

document.addEventListener('DOMContentLoaded', () => {
    cards_container.addEventListener('click', ({target}) => {
        if (playing) return;
        flipCard(target);
    })
    restartGame();
})
