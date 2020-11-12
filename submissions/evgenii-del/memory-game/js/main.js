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
let step = 0;
let hasFlipped = false;
let playing = false;
let firstCard, secondCard;

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
    let fragment = document.createDocumentFragment();
    cards.forEach((card) => {
        let block = createItem(card);
        fragment.append(block);
    })
    cards_container.append(fragment);
}

const flipCard = (target) => {
    if (target.classList.value === 'flipper card') {
        target.classList.add('flipped');
        if (!hasFlipped) {
            hasFlipped = true;
            firstCard = target;
        } else {
            hasFlipped = false;
            secondCard = target;
            if (firstCard.dataset.id === secondCard.dataset.id) {
                rightCards();
                setTimeout(() => {
                    if (step === 8) {
                        alert('Вы победили!');
                    }
                }, 300);
            } else {
                wrongCards();
            }
        }
    }
}

const rightCards = () => {
    firstCard.classList.remove('card');
    secondCard.classList.remove('card');
    step++;
}

const wrongCards = () => {
    playing = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        playing = false;
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    cards_container.addEventListener('click', (event) => {
        const target = event.target;
        if (playing) return;
        flipCard(target);
    })

    const newArray = [...cards, ...cards].sort(() => 0.2 - Math.random());
    renderItems(newArray);
})
