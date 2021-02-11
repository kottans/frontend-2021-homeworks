class Card {
    constructor(image, index) {
        this.image_file = image.file
        this.div = document.createElement('div')
        this.div.id = `card${index}`
        this.div.classList.add('card')
        this.div.innerHTML = [`<div class='back' id='back${index}'></div>`,
                              `<div class='face'>`,
                                `<img class='card_image' src='./images/${image.file}' alt='${image.alt} image'>`,
                              `</div>`].join('')
    }
    open() {this.div.classList.add('opened')}
    close() {this.div.classList.remove('opened')}
    hide() {this.div.classList.add('hidden')}
    static match(card1, card2) {
        if (card1.image_file === card2.image_file) return true
        else return false
    }
}
class Deck {
    constructor(imagesArray, cardsQuantityInDeal, showResult) {
        //imagesArray - all available images (file name and alt text) to select from for a deal
        //showResult - callback function to call on full deck match
        this.imagesArray = imagesArray
        this.cardsQuantityInDeal = cardsQuantityInDeal
        this.showResult = showResult
        this.currentDealCards = []
        this.opened = []
        this.matched_quantity = 0
        this.flip_count = 0
        this.shuffle()
    }
    shuffle() {
        let currentDealImages = shuffleArray(this.imagesArray).slice(0, this.cardsQuantityInDeal / 2)
        currentDealImages = shuffleArray(currentDealImages.concat(currentDealImages))
        this.currentDealCards = currentDealImages.map((image, index) => new Card(image, index))
        this.opened = []
        this.matched_quantity = 0
        this.flip_count = 0
    }
    placeOnBoard(board) {
        board.innerHTML = ''
        this.currentDealCards.forEach(card => board.appendChild(card.div))
    }
    openCard(cardId) {
        this.flip_count++
        if (this.opened.length===2) this._closeOpened()
        this.currentDealCards[cardId].open()
        this.opened.push(this.currentDealCards[cardId])
        this._checkOpenedMatch()
    }
    _checkOpenedMatch() {
        const [firstCard, secondCard] = this.opened
        if (firstCard && secondCard) {
            if (Card.match(firstCard, secondCard)) {
                this.matched_quantity += 2
                this._hideOpened()
                if (this.matched_quantity === CARDS_QUANTITY) this.showResult(this.flip_count)
            }
        }
    }
    _closeOpened() {
        while(this.opened.length) this.opened.pop().close()
    }
    _hideOpened() {
        while(this.opened.length) this.opened.pop().hide()
    }
}
function cardNumber(elemenId) {
    if (elemenId.slice(0,4)==='back') return elemenId.slice(4)
    else return undefined
}
function shuffleArray(sourceArray) {
    let result = sourceArray.map(element => {
        return {item: element, randomValue: Math.random()}})
    result.sort((a,b) => a.randomValue - b.randomValue)
    return result.map(element => element.item)
}
function startGame() {
    BOARD.classList.add('game_grid')
    BOARD.classList.remove('game_message')
    DECK.shuffle()
    DECK.placeOnBoard(BOARD)
}
function showResult(count) {
    BOARD.classList.remove('game_grid')
    BOARD.classList.add('game_message')
    BOARD.innerHTML = [`<p class='message'>Congratulation!</p>`,
                       `<p class='message'>You flipped ${count} times to win</p>`,
                       `<p class='message'>Try to improve this result</p>`,
                       `<p class='message'>with <a class='message_link' href='#' id='start_game'>another deck</a></p>`].join('')
}

const IMAGES = [{file: 'big_ben.png', alt: 'Big Ben'}, {file: 'chichen_itza.png', alt: 'Chichen Itza'},
                {file: 'colossus.png', alt: 'Colossus'}, {file: 'eiffel_tower.png', alt: 'Eiffel Tower'},
                {file: 'forbidden_city.png', alt: 'Forbidden City'}, {file: 'oracle.png', alt: 'Oracle'},
                {file: 'oxford_university.png', alt: 'Oxford University'}, {file: 'petra.png', alt: 'Petra'},
                {file: 'pyramids.png', alt: 'Pyramids'}, {file: 'ruhr_valley.png', alt: 'Ruhr Valley'},
                {file: 'sophia.png', alt: 'Sophia'}, {file: 'stonehenge.png', alt: 'Stonehenge'},
                {file: 'sydney_opera_house.png', alt: 'Sydney Opera House'}]
const BOARD = document.getElementById('board')
const CARDS_QUANTITY = 16
const DECK = new Deck(IMAGES, CARDS_QUANTITY, showResult)

BOARD.addEventListener('click', evt => {
    if (evt.target.id==='start_game') {
        evt.preventDefault()
        startGame()
    } else {
        let cardId = cardNumber(evt.target.id)
        if (cardId) DECK.openCard(cardId)
    }
})
startGame()
