'use strict'

const MAIN = document.querySelector('#main')
const MUSIC_BUTTON = document.querySelector('#musicButton')
const SEARCH = document.querySelector('.search')
const SEARCH_INPUT = document.querySelector('#icon_prefix')
const RESET_BUTTON = document.querySelector('.resetButton')

const API_LINK = 'https://randomuser.me/api/'

const FRIENDS_MIN = 30
const FRIENDS_MAX = 50

const APP_AUDIO = new Audio('./audio/you_ve_got_a_friend_in_me.mp3')
APP_AUDIO.loop = true
APP_AUDIO.volume = 0.3

//Classes by AnimateCSS (default speed is 1s)
const SHOW_ELEM_PRIMARY_ANIMATION = 'animate__zoomIn'
const HIDE_ELEM_PRIMARY_ANIMATION = 'animate__zoomOut'
const SHOW_ELEM_SECONDARY_ANIMATION = 'animate__fadeIn'
const HIDE_ELEM_SECONDARY_ANIMATION = 'animate__fadeOut'
const ANIMATION_SPEED = 'animate__faster' //500ms

let FRIENDS_SOURCE
let CURRENT_FRIENDS = []
let IS_MUSIC_STOPPED_BY_USER = false
let CURRENT_CONTENT
let CURRENT_ANIMATION_HIDE
let CURRENT_ANIMATION_SHOW
let CURRENT_ANIMATION_SPEED


initApp()


function initApp() {
    getFriends(getRandomIntInclusive(FRIENDS_MIN, FRIENDS_MAX))
    addListeners()
    createRangeSlider()
}

function getFriends(num) {
    fetch(`${API_LINK}?results=${num}`)
        .then(handleErrors)
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            FRIENDS_SOURCE = data.results
        }).then(function() {
            const timeout = setTimeout(() => {
                changeContent(createStartScreen(), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
                clearTimeout(timeout)
            }, 2000)
        })
        .catch(function(error) {
            console.log(error.message)
            changeContent(`<h1 class="container h-100 flexContainerCol errorMes">Something went wrong, we are so sorry :( Please, try to reload the page!</h1>`, SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
        })
}

function addListeners() {
    document.addEventListener('DOMContentLoaded', activateSideNav)
    document.querySelector('.filterButton').addEventListener('click', toFilter)
    RESET_BUTTON.addEventListener('click', resetFilter)
    MAIN.addEventListener('click', function({ target }) {
        if (target.classList.contains('startButton')) {
            changeContent(createFriendsScreen(FRIENDS_SOURCE), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
            showSearchBar()
            playMusic()
        }
    })
    MAIN.addEventListener('animationend', function() {
        showCurrentContent()
        MAIN.addEventListener('animationend', clearAfterAnimation, { once: true })
    })
}

function createStartScreen() {
    return `<div class="container greeting__container flexContainerCol">
                <h4> Wow!!!</h4 >
                <h4 class="greeting__text" > We found so many people, who want to meet YOU!!!</h4>
                <a id="startButton" class="waves-effect waves-light btn-large hoverable startButton">
                    <i class="material-icons right">announcement</i>
                    Show me them all!
                </a>
            </div>`
}

function createFriendsScreen(friends) {
    let FriendsScreen = '<div class="container friends__container"><div class="flexContainerRow">'
    friends.forEach(friend => {
        const card = `<div class="card">
                            <div class="card-image">
                                <img class="card__img" src="${friend.picture.large}" alt="person photo">
                                <span class="card-title card__title card__title-${friend.gender}">${friend.name.first} ${friend.name.last}</span>
                            </div>
                            <div class="card-content card__content">
                                <p>Hi, I am <span class="card__contentData">${friend.dob.age}</span> years old and I live in <span class="card__contentData">${friend.location.city}, ${friend.location.country}</span>.</p>
                                <p>Call me, I want to be your friend.</p>
                                <a href="tel:${friend.phone}" class="card__contentData">${friend.phone}</a>
                            </div>
                                <div class="card-action">
                                <a class="card__contentData card__contentData-mail href="mailto:${friend.email}">${friend.email}</a>
                            </div>
                        </div>`
        FriendsScreen += card
    })
    FriendsScreen += '</div></div>'
    return FriendsScreen
}

function showSearchBar() {
    SEARCH.classList.add(SHOW_ELEM_PRIMARY_ANIMATION)
    SEARCH.classList.add('showElem')
    SEARCH_INPUT.addEventListener('input', toSearch)
}

function changeContent(content, show, hide, speed) {
    CURRENT_CONTENT = content
    CURRENT_ANIMATION_HIDE = hide
    CURRENT_ANIMATION_SHOW = show

    MAIN.classList.remove('scroll')
    if (speed) {
        MAIN.classList.add(speed)
        CURRENT_ANIMATION_SPEED = speed
    }
    MAIN.classList.add(hide)
}

function toSearch() {
    const input = SEARCH_INPUT.value.toLowerCase()

    let foundFriends = (CURRENT_FRIENDS.length === 0) ?
        FRIENDS_SOURCE.filter(friend => (friend.name.first.toLowerCase().startsWith(input) || friend.name.last.toLowerCase().startsWith(input))) :
        CURRENT_FRIENDS.filter(friend => (friend.name.first.toLowerCase().startsWith(input) || friend.name.last.toLowerCase().startsWith(input)))

    changeContent(createFriendsScreen(foundFriends), SHOW_ELEM_SECONDARY_ANIMATION, HIDE_ELEM_SECONDARY_ANIMATION, ANIMATION_SPEED)
}

function toFilter() {
    //In case user enter to app through sidenav (not using startButton)
    if (!IS_MUSIC_STOPPED_BY_USER) {
        playMusic()
    }
    showSearchBar()
    closeSideNav()

    const checkedGenderInput = document.querySelector("input[type='radio'][name='gender']:checked")
    let userChooseGender = (checkedGenderInput) ? [checkedGenderInput.getAttribute("data-gender")] : ['male', 'female']

    const [userChooseMinAge, userChooseMaxAge] = document.getElementById('test-slider').noUiSlider.get()

    //Filter
    CURRENT_FRIENDS = FRIENDS_SOURCE.filter(friend => (
        userChooseGender.includes(friend.gender) &&
        friend.dob.age >= userChooseMinAge &&
        friend.dob.age <= userChooseMaxAge))

    const checkedSortParameterInput = document.querySelector("input[type='radio'][name='sort']:checked")
    let sortParameter = (checkedSortParameterInput) ? checkedSortParameterInput.getAttribute("data-sort") : false

    //Sort
    switch (sortParameter) {
        case '0-100':
            CURRENT_FRIENDS.sort(byField('dob', 'age'))
            break
        case '100-0':
            CURRENT_FRIENDS.sort(byField('dob', 'age')).reverse()
            break
        case 'name_a-z':
            CURRENT_FRIENDS.sort(byField('name', 'first'))
            break
        case 'name_z-a':
            CURRENT_FRIENDS.sort(byField('name', 'first')).reverse()
            break
        case 'lastName_a-z':
            CURRENT_FRIENDS.sort(byField('name', 'last'))
            break
        case 'lastName_z-a':
            CURRENT_FRIENDS.sort(byField('name', 'last')).reverse()
            break

        default:
            break
    }

    changeContent(createFriendsScreen(CURRENT_FRIENDS), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
}

function resetFilter() {
    //In case user enter to app through sidenav (not using startButton)
    if (!IS_MUSIC_STOPPED_BY_USER) {
        playMusic()
    }
    showSearchBar()
    closeSideNav()

    CURRENT_FRIENDS = []
    if (document.querySelector("input[type='radio'][name='gender']:checked")) {
        document.querySelector("input[type='radio'][name='gender']:checked").checked = false
    }
    if (document.querySelector("input[type='radio'][name='sort']:checked")) {
        document.querySelector("input[type='radio'][name='sort']:checked").checked = false
    }
    changeContent(createFriendsScreen(FRIENDS_SOURCE), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
}

function closeSideNav() {
    SEARCH_INPUT.value = ''
    document.querySelector('.search__hint').classList.remove('active')
}

function activateSideNav() {
    const sideNavIco = document.querySelectorAll('.sidenav')
    M.Sidenav.init(sideNavIco, {})
}

function playMusic() {
    APP_AUDIO.play()
    MUSIC_BUTTON.classList.add('musicButton-active')
    MUSIC_BUTTON.classList.add('musicButton-animation')
    MUSIC_BUTTON.addEventListener('click', stopMusic, { once: true })
}

function stopMusic() {
    APP_AUDIO.pause()
    MUSIC_BUTTON.classList.remove('musicButton-animation')
    MUSIC_BUTTON.addEventListener('click', playMusic, { once: true })
    IS_MUSIC_STOPPED_BY_USER = true
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function byField(fieldName, subFieldName) {
    return (a, b) => {
        if (a[fieldName][subFieldName] > b[fieldName][subFieldName]) {
            return 1
        } else if (a[fieldName][subFieldName] < b[fieldName][subFieldName]) {
            return -1
        } else {
            return 0
        }
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}

function showCurrentContent() {
    MAIN.innerHTML = ''
    MAIN.innerHTML = CURRENT_CONTENT
    MAIN.classList.remove(CURRENT_ANIMATION_HIDE)
    MAIN.classList.add(CURRENT_ANIMATION_SHOW)
}

function clearAfterAnimation() {
    MAIN.classList.remove(CURRENT_ANIMATION_SHOW)
    MAIN.classList.remove(CURRENT_ANIMATION_SPEED)
    MAIN.classList.add('scroll')
}

//noUiSlider
function createRangeSlider() {
    const rangeSlider = document.getElementById('test-slider')
    const rangeSliderSettings = {
        start: [20, 80],
        connect: true,
        step: 1,
        orientation: 'horizontal',
        range: {
            'min': 0,
            'max': 100
        },
        format: {
            to: function(value) {
                return value;
            },
            from: function(value) {
                return Number(value);
            }
        } // Receives a string, should return a number.
    }

    const maxAgeHint = document.querySelectorAll('.maxAge')
    const minAgeHint = document.querySelectorAll('.minAge')

    noUiSlider.create(rangeSlider, rangeSliderSettings)
    setValueOfSortByAgeHint()
    rangeSlider.noUiSlider.on('change', setValueOfSortByAgeHint)
    RESET_BUTTON.addEventListener('click', resetRangeSlider)

    function resetRangeSlider() {
        rangeSlider.noUiSlider.updateOptions(
            rangeSliderSettings
        )
        setValueOfSortByAgeHint()
    }

    function setValueOfSortByAgeHint() {
        //get max and min value of range slider and set them to hints
        maxAgeHint.forEach(point => point.innerHTML = rangeSlider.noUiSlider.get()[1])
        minAgeHint.forEach(point => point.innerHTML = rangeSlider.noUiSlider.get()[0])
    }
}
