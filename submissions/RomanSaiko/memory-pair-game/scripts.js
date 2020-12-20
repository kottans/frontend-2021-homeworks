let cards = [
    {
        id: '0',
        name: 'c.ronaldo',
        path: 'img/c.ronaldo.png'
    },
    {
        id: '1',
        name: 'figo',
        path: 'img/figo.png'
    },
    {
        id: '2',
        name: 'kaka',
        path: 'img/kaka.png'
    },
    {
        id: '3',
        name: 'messi',
        path: 'img/messi.png'
    },
    {
        id: '4',
        name: 'ronaldinho',
        path: 'img/ronaldinho.png'
    },
    {
        id: '5',
        name: 'ronaldo',
        path: 'img/ronaldo.png'
    },
    {
        id: '6',
        name: 'shevchenko',
        path: 'img/shevchenko.png'
    },
    {
        id: '7',
        name: 'zidane',
        path: 'img/zidane.png'
    }
]
cards = cards.concat(cards)
const cardsWrapper = document.getElementById('cards-wrapper')
let amountOfMatches = 0
let firstCard = null
const MILLISECONDS = 1000
const MAX_MATCH_COUNT = 8
let blockCardFlip = false

const initCards = () => {
    let cardsWrapperContent = ''
    const sortedCards = cards.sort(() => 0.5 - Math.random())
    sortedCards.forEach(({id, name, path}) => {
        cardsWrapperContent += `
            <div class="flip-card" data-card="${id}">
                <div class="flip-card-inner">
                    <div class="flip-card-front"></div>
                    <div class="flip-card-back">
                        <img src="${path}" alt="${name}">
                    </div>
                </div>
            </div>
        `
    })
    cardsWrapper.innerHTML = cardsWrapperContent
}

const onCardsWrapperClick = ({target}) => {
    if (target.closest('.flip-card') && !target.closest('.flip-card').classList.contains('flipped')) {
        if (!blockCardFlip) {
            flipCard(target)
        }
    }
}

const flipCard = (target) => {
    if (!firstCard) {
        firstCard = target
    } else {
        checkMatching(target)
        checkGameOver()
    }
    target.closest('.flip-card').classList.add('flipped')
}

const checkMatching = (target) => {
    blockCardFlip = true
    const firstSelectedCard = firstCard.closest('.flip-card')
    const secondSelectedCard = target.closest('.flip-card')
    if (secondSelectedCard.dataset.card === firstSelectedCard.dataset.card) {
        setTimeout(() => {
            firstSelectedCard.classList.add('matched')
            secondSelectedCard.classList.add('matched')
            firstCard = null
            blockCardFlip = false
        }, MILLISECONDS)
        amountOfMatches++
    }
    else {
        setTimeout(() => {
            firstSelectedCard.classList.remove('flipped')
            secondSelectedCard.classList.remove('flipped')
            firstCard = null
            blockCardFlip = false
        },MILLISECONDS)
    }
}

const checkGameOver = () => {
    if(amountOfMatches === MAX_MATCH_COUNT) {
        setTimeout(() => {
            firstCard = null
            amountOfMatches = 0
            alert('Congrats! You won!')
            initCards()
        }, 2000)
    }
}

document.addEventListener('DOMContentLoaded', initCards)
cardsWrapper.addEventListener('click', onCardsWrapperClick)
