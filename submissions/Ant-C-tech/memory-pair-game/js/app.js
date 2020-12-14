'use strict'

import hiragana from './hiragana.js'


const BODY = document.querySelector('.body')
const MAIN = document.querySelector('#main')
const HEADER = document.querySelector('#header')
const DESCRIPT = document.querySelector('#descript')

const ANIMATE_CSS_CLASS = 'animate__animated'
const ANIMATE_DELAY = 'animate__delay-3s'
const DESCRIPT_HIDE_ANIMATION = 'animate__zoomOut'
const DESCRIPT_SHOW_ANIMATION = 'animate__zoomIn'
const CARDS_HIDE_ANIMATION = 'animate__rotateOut'

const CARDS_NUMBER = 12;
const GAMEPLAY_DELAY = 1500

const GAME_ICON = 'img/lucky-cat-toy-svgrepo-com.svg'

let TASK = []
let attempts = 0
    //Music
const GAMEPLAY_AUDIO = new Audio('./audio/Japanese_Countryside.mp3')
GAMEPLAY_AUDIO.loop = true
GAMEPLAY_AUDIO.volume = 0.3


initApp()


function initApp() {
    setTask()
    const timeout = setTimeout(() => {
        changeContent(createGreeting())
        clearTimeout(timeout)
    }, GAMEPLAY_DELAY);
}

function setTask() {
    TASK.push(hiragana[_getRandomIntInclusive(0, hiragana.length - 1)])
    while (TASK.length < CARDS_NUMBER / 2) {
        const currentItem = hiragana[_getRandomIntInclusive(0, hiragana.length - 1)]
        let flag = false
        for (const item of TASK) {
            if (item.jap === currentItem.jap) {
                flag = true
            }
        }
        if (flag === false) {
            TASK.push(currentItem)
        }
    }
    TASK = TASK.concat(TASK)
}

function createGreeting() {
    const greeting = document.createElement('h3')
    greeting.textContent = 'Kottans present'
    greeting.classList.add('greeting')

    greeting.addEventListener('click', function() {
        GAMEPLAY_AUDIO.play()
        changeContent(createStartGameScr(), showHeader)
    }, { once: true })

    return greeting
}

function createStartGameScr() {
    const startBtnWrapper = new DocumentFragment()

    const startBtnIco = document.createElement('img')
    startBtnIco.setAttribute('src', GAME_ICON)
    startBtnIco.setAttribute('alt', 'mentor')
    startBtnIco.classList.add('startBtnIco')

    const startBtn = document.createElement('h3')
    startBtn.textContent = 'Start Game'
    startBtn.classList.add('startBtn')

    startBtnWrapper.append(startBtnIco, startBtn)
    startBtn.addEventListener('click', () => {
        changeContent(createGameField(), phoneAdaptation)
        hideElem(DESCRIPT, DESCRIPT_HIDE_ANIMATION, false)
        window.addEventListener('resize', phoneAdaptation)
    }, { once: true })

    return startBtnWrapper
}

function createGameField() {
    const gameField = document.createElement('div')
    gameField.classList.add('cardsContainer')

    for (let index = 0; index < CARDS_NUMBER; index++) {
        const cardContent = TASK.splice(_getRandomIntInclusive(0, TASK.length - 1), 1)

        const card = document.createElement('div')
        card.className = `card ${ANIMATE_CSS_CLASS}`
        card.setAttribute('data-value', cardContent[0].jap)

        const cardBack = document.createElement('img')
        cardBack.setAttribute('src', 'img/card-back2.jpg')
        cardBack.setAttribute('alt', 'japanese ornament')
        cardBack.classList.add('cardBack')

        const cardFace = document.createElement('div')
        cardFace.classList.add('cardFace')
        const japText = document.createElement('p')
        japText.innerText = cardContent[0].jap
        japText.classList.add('japText')
        const engText = document.createElement('p')
        engText.innerText = cardContent[0].eng
        engText.classList.add('engText')
        cardFace.append(japText, engText)
        card.append(cardBack, cardFace)

        gameField.appendChild(card)
    }

    gameField.addEventListener('click', ({ target }) => {
        if (target.classList.contains('cardsContainer') || target.classList.contains('card')) {
            return false
        } else {
            target.parentElement.classList.add('notActive')
            target.parentElement.classList.add('card-rotate')
            target.classList.add('cardBack-rotate')
            target.addEventListener('transitionend', function() {
                target.nextSibling.classList.add('cardFace-rotate')
            }, { once: true })
            checkAnswer()
        }
    })

    return gameField
}

function createCongratulationScr() {
    const congratulationWrapper = new DocumentFragment()

    const congratulationIco = document.createElement('img')
    congratulationIco.setAttribute('src', GAME_ICON)
    congratulationIco.setAttribute('alt', 'mentor')
    congratulationIco.classList.add('congratulationIco')

    const congratulation = document.createElement('h3')
    congratulation.textContent = 'Congratulation!!!'
    congratulation.classList.add('congratulation')

    const congratulationText = document.createElement('p')
    congratulationText.innerHTML = `It took you <span class="attempts">${attempts}</span> attempts!`
    congratulationText.classList.add('congratulationText')

    const congratulationSubText = document.createElement('p')
    congratulationSubText.textContent = `Now, you maybe feel yourself true ninja or maybe even samurai... But remember...`
    congratulationSubText.classList.add('congratulationSubText')

    const newGameBtn = document.createElement('h3')
    newGameBtn.textContent = 'A samurai has no goal, only a path...'
    newGameBtn.classList.add('newGame')

    congratulationWrapper.append(congratulationIco, congratulation, congratulationText, congratulationSubText, newGameBtn)

    newGameBtn.addEventListener('click', function() {
        TASK = []
        attempts = 0
        setTask()
        window.addEventListener('resize', phoneAdaptation)
        phoneAdaptation()
        changeContent(createGameField())
    }, { once: true })

    return congratulationWrapper
}

function changeContent(content, callback) {
    MAIN.classList.add('main-hide')
    MAIN.addEventListener('transitionend', function() {
        MAIN.innerHTML = ''
        MAIN.append(content)
        if (callback) {
            callback()
        }
        MAIN.classList.remove('main-hide')
    }, { once: true })
}

function showElem(elem, effect, delay) {
    if (delay) {
        elem.classList.add(ANIMATE_DELAY)
    } else {
        elem.classList.remove(ANIMATE_DELAY)
    }
    elem.style.display = 'block'
    elem.classList.add(effect)
    elem.addEventListener('animationend', function() {
        elem.classList.remove(effect)
    }, { once: true })
}

function hideElem(elem, effect, delay) {
    if (delay) {
        elem.classList.add(ANIMATE_DELAY)
    } else {
        elem.classList.remove(ANIMATE_DELAY)
    }
    elem.classList.add(effect)
    elem.addEventListener('animationend', function() {
        elem.style.display = 'none'
        elem.classList.remove(effect)
    }, { once: true })
}

function checkAnswer() {
    MAIN.classList.add('notActive')
    const openCards = document.querySelectorAll('.card-rotate')
    if (openCards.length === 2) {
        if (openCards[0].getAttribute('data-value') === openCards[1].getAttribute('data-value')) {
            for (const card of openCards) {
                card.classList.add('played')
                const timeOut = setTimeout(() => {
                    card.classList.add(CARDS_HIDE_ANIMATION)
                    card.addEventListener('animationend', function() {
                        card.classList.remove('card-rotate')
                        MAIN.classList.remove('notActive')
                    }, { once: true })
                    clearTimeout(timeOut)
                }, 1000);
            }
            attempts++
            isWin()
        } else {
            for (const card of openCards) {
                const timeOut = setTimeout(() => {
                    card.classList.remove('card-rotate')
                    card.children[1].classList.remove('cardFace-rotate')
                    card.children[1].addEventListener('transitionend', function() {
                        card.children[0].classList.remove('cardBack-rotate')
                        card.classList.remove('notActive')
                        MAIN.classList.remove('notActive')
                    }, { once: true })
                    clearTimeout(timeOut)
                }, 1000);
            }
            attempts++
        }
    } else {
        MAIN.classList.remove('notActive')
    }
}

function isWin() {
    const playedCards = document.querySelectorAll('.played')
    if (playedCards.length === CARDS_NUMBER) {
        window.removeEventListener('resize', phoneAdaptation)
        const timeout = setTimeout(() => {
            changeContent(createCongratulationScr())
            BODY.style.width = 'auto'
            BODY.classList.remove('body-gamefield')
            clearTimeout(timeout)
        }, GAMEPLAY_DELAY);
    }
}

function showHeader() {
    HEADER.classList.add('header-show')
    showElem(DESCRIPT, DESCRIPT_SHOW_ANIMATION, true)
}

function phoneAdaptation() {
    const mql = window.matchMedia("(orientation: landscape)");
    if (mql.matches && document.documentElement.clientWidth <= 1025) {
        BODY.style.width = document.documentElement.clientHeight + 'px'
        BODY.classList.add('body-gamefield')
    } else {
        BODY.style.width = 'auto'
        BODY.classList.remove('body-gamefield')
    }
}

function _getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
