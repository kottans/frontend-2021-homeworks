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
let cardItems = null

const initCards = () => {
    let cardsWrapperContent = ''
    const cardsContent = cards.sort(() => 0.5 - Math.random())
    cardsContent.forEach(item => {
        cardsWrapperContent += `
            <div class="flip-card" data-card="${item.id}">
                <div class="flip-card-inner">
                    <div class="flip-card-front"></div>
                    <div class="flip-card-back">
                        <img src="${item.path}" alt="${item.name}">
                    </div>
                </div>
            </div>
        `
    })
    cardsWrapper.innerHTML = cardsWrapperContent
    cardItems = document.querySelectorAll('.flip-item')
}

const cardsWrapperHandler = ({target}) => {
    if (target.closest('.flip-card') && !target.closest('.flip-card').classList.contains('flipped')) {
        flipCard(target)
    }
}

const flipCard = (target) => {
    if (!firstCard) {
        firstCard = target
    }
    else {
        checkMatching(target)
        isGameOver()
    }
    target.closest('.flip-card').classList.add('flipped')
}

const checkMatching = (target) => {
    if (target.closest('.flip-card').dataset.card === firstCard.closest('.flip-card').dataset.card) {
        setTimeout(() => {
            firstCard.closest('.flip-card').classList.add('matched')
            target.closest('.flip-card').classList.add('matched')
            firstCard = null
        }, 1000)
        amountOfMatches++
    }
    else {
        setTimeout(() => {
            firstCard.closest('.flip-card').classList.remove('flipped')
            target.closest('.flip-card').classList.remove('flipped')
            firstCard = null
        },1000)
    }
}

const isGameOver = () => {
    if(amountOfMatches === 8) {
        setTimeout(() => {
            firstCard = null
            amountOfMatches = 0
            alert('Congrats! You won!')
            initCards()
        }, 2000)
    }
}

document.addEventListener('DOMContentLoaded', initCards)
cardsWrapper.addEventListener('click', cardsWrapperHandler)
