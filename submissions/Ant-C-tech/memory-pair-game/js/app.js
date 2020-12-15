'use strict'

import hiragana from './hiragana.js'

let _task = []
let _attempts = 0

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
const MOBILE_BREAKPOINT = 1025

const GREETING_TEXT = 'Kottans present'
const START_GAME_TEXT = 'Start Game'
const CONGRATULATIONS_TITLE = 'Congratulation!!!'
const CONGRATULATIONS_SUBTITLE_PART1 = `It took you <span class="attempts">`
const CONGRATULATIONS_SUBTITLE_PART2 = `</span> attempts!`
const CONGRATULATIONS_SUBTEXT = `Now, you maybe feel yourself true ninja or maybe even samurai... But remember...`
const CONGRATULATIONS_TEXT = `A samurai has no goal, only a path...`

const GAME_ICON = 'img/lucky-cat-toy-svgrepo-com.svg'
const GAME_ICON_ALT = 'cat'
const CARD_BACK = 'img/card-back2.jpg'
const CARD_BACK_ALT = 'japanese ornament'

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
    addListeners()
}

function setTask() {
    const taskElemIndexInHiragana = []
    for (let index = 0; index < hiragana.length - 1; index++) {
        taskElemIndexInHiragana.push(index)
    }
    while (taskElemIndexInHiragana.length > CARDS_NUMBER / 2) {
        taskElemIndexInHiragana.splice(_getRandomIntInclusive(0, taskElemIndexInHiragana.length - 1), 1)
    }
    for (const index of taskElemIndexInHiragana) {
        _task.push(hiragana[index])
        _task.unshift(hiragana[index])
    }
}

function addListeners() {
    MAIN.addEventListener('click', function({ target }) {
        if (target.classList.contains('greeting')) {
            GAMEPLAY_AUDIO.play()
            changeContent(createStartGameScr(), showHeader)
        } else if (target.classList.contains('startBtn')) {
            changeContent(createGameField(), phoneAdaptation)
            hideElem(DESCRIPT, DESCRIPT_HIDE_ANIMATION, false)
            window.addEventListener('resize', phoneAdaptation)
        } else if (target.classList.contains('cardsContainer') || target.classList.contains('card')) {
            return false
        } else if (target.classList.contains('cardBack')) {
            target.parentElement.classList.add('notActive')
            target.parentElement.classList.add('card-rotate')
            target.classList.add('cardBack-rotate')
            target.addEventListener('transitionend', function() {
                target.nextElementSibling.classList.add('cardFace-rotate')
            }, { once: true })
            checkAnswer()
        } else if (target.classList.contains('newGameBtn')) {
            _task = []
            _attempts = 0
            setTask()
            window.addEventListener('resize', phoneAdaptation)
            phoneAdaptation()
            changeContent(createGameField())
        }
    })
}

function createGreeting() {
    const greeting = `<h3 class="greeting">${GREETING_TEXT}</h3>`
    return greeting
}

function createStartGameScr() {
    const startBtnWrapper = `<img class="startBtnIco" src="${GAME_ICON}" alt="${GAME_ICON_ALT}">
                            <h3 class="startBtn">${START_GAME_TEXT}</h3>`
    return startBtnWrapper
}

function createGameField() {
    let gameField = '<div class="cardsContainer">'

    for (let index = 0; index < CARDS_NUMBER; index++) {
        const cardContent = _task.splice(_getRandomIntInclusive(0, _task.length - 1), 1)
        const card = `<div class="card ${ANIMATE_CSS_CLASS}" data-value="${cardContent[0].jap}">
                        <img class="cardBack" src="${CARD_BACK}" alt="${CARD_BACK_ALT}">
                        <div class="cardFace">
                            <p class="japText">${cardContent[0].jap}</p>
                            <p class="engText">${cardContent[0].eng}</p>
                        </div>
                    </div>`
        gameField += card
        if (index === CARDS_NUMBER - 1) {
            gameField += '</div>'
        }
    }
    return gameField
}

function createCongratulationScr() {
    const congratulationWrapper = `<img class="congratulationIco" src="${GAME_ICON}" alt="cat">
                                    <h3 class="congratulation">${CONGRATULATIONS_TITLE}</h3>
                                    <p class="congratulationText">${CONGRATULATIONS_SUBTITLE_PART1}${_attempts}${CONGRATULATIONS_SUBTITLE_PART2}</p>
                                    <p class="congratulationSubText">${CONGRATULATIONS_SUBTEXT}</p>
                                    <h3 class="newGameBtn">${CONGRATULATIONS_TEXT}</h3>`
    return congratulationWrapper
}

function changeContent(content, callback) {
    MAIN.classList.add('main-hide')
    MAIN.addEventListener('transitionend', function() {
        MAIN.innerHTML = ''
        MAIN.innerHTML = content
        callback && callback()
        MAIN.classList.remove('main-hide')
    }, { once: true })
}

function showElem(elem, effect, delay) {
    if (delay) {
        elem.classList.add(ANIMATE_DELAY)
    } else {
        elem.classList.remove(ANIMATE_DELAY)
    }
    elem.classList.add('d-block')
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
        elem.classList.add('d-none')
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
            _attempts++
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
            _attempts++
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
    if (mql.matches && document.documentElement.clientWidth <= MOBILE_BREAKPOINT) {
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
