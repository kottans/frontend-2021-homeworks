'use strict'

const MAIN = document.querySelector('#main')
const MUSIC_BTN = document.querySelector('#musicBtn')
const SEARCH = document.querySelector('.search')
const SEARCH_INPUT = document.querySelector('#icon_prefix')
const RESET_BTN = document.querySelector('.resetBtn')

const API_LINK = 'https://randomuser.me/api/'

const APP_DELAY = 3000
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
let isMusicStoppedByUser = false


initApp()


function initApp() {
    getFriends(getRandomIntInclusive(FRIENDS_MIN, FRIENDS_MAX))
    addListeners()
    createRangeSlider()
}

function getFriends(num) {
    fetch(`${API_LINK}?results=${num}`)
        .then(function(resp) {
            return resp.json()
        }).then(function(data) {
            FRIENDS_SOURCE = data.results
        }).then(function() {
            const timeout = setTimeout(() => {
                changeContent(createStartScreen(), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
                clearTimeout(timeout)
            }, APP_DELAY)
        })
        .catch(function(error) {
            console.log(error.message)
            changeContent(`<h1 class="container h-100 flexContainerCol errorMes">Something went wrong, we are so sorry :( Please, reload the page!</h1>`, SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
        })
}

function addListeners() {
    document.addEventListener('DOMContentLoaded', activateSideNav)
    document.querySelector('.filterBtn').addEventListener('click', toFilter)
    RESET_BTN.addEventListener('click', resetFilter)
    MAIN.addEventListener('click', function({ target }) {
        if (target.classList.contains('startBtn')) {
            changeContent(createFriendsScreen(FRIENDS_SOURCE), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
            showSearchBar()
            playMusic()
        }
    })
}

function createStartScreen() {
    return `<div class="container greeting__container flexContainerCol">
                <h4> Wow!!!</h4 >
                <h4 class="greeting__text" > We found so many people, who want to meet YOU!!!</h4>
                <a id="startBtn" class="waves-effect waves-light btn-large hoverable startBtn">
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

//Function is waiting to get content for display and some classes of AnimateCSS to animation including animation speed (optional)
function changeContent(content, show, hide, speed) {

    //Preparation displayed content for animation of hiding
    MAIN.classList.remove('scroll') //Hide scrollbar (for esthetic purpose)
    if (speed) {
        MAIN.classList.add(speed) // Adding class that will define speed of animation(optional)
    }

    //Hiding displayed content using AnimateCSS class
    MAIN.classList.add(hide)

    //Waiting for end of animation of hiding content...
    MAIN.addEventListener('animationend', function() {
            //...and then...
            MAIN.innerHTML = '' //Clear content
            MAIN.innerHTML = content //Add new content
            MAIN.classList.remove(hide) //Clean up unnecessary class

            //Start animation of showing new content
            MAIN.classList.add(show)

            //Waiting for end of animation of showing content...
            MAIN.addEventListener('animationend', function() {
                    //...and then...
                    MAIN.classList.add('scroll') //Show scrollbar back
                    MAIN.classList.remove(show) //Clean up unnecessary class
                    if (speed) {
                        MAIN.classList.remove(speed) //Clean up unnecessary class
                    }

                }, { once: true }) // Use listeners once and automatically removing after invoke
        }, { once: true }) //in order not to accumulate listeners after each function's call

}

function toSearch() {
    const input = SEARCH_INPUT.value.toLowerCase()

    let foundFriends = (CURRENT_FRIENDS.length === 0) ?
        FRIENDS_SOURCE.filter(friend => (friend.name.first.toLowerCase().startsWith(input) || friend.name.last.toLowerCase().startsWith(input))) :
        CURRENT_FRIENDS.filter(friend => (friend.name.first.toLowerCase().startsWith(input) || friend.name.last.toLowerCase().startsWith(input)))

    changeContent(createFriendsScreen(foundFriends), SHOW_ELEM_SECONDARY_ANIMATION, HIDE_ELEM_SECONDARY_ANIMATION, ANIMATION_SPEED)
}

function toFilter() {
    //In case user enter to app through sidenav (not using startBtn)
    if (!isMusicStoppedByUser) {
        playMusic()
    }
    showSearchBar()
    closeSideNav()

    let userChooseGender = (document.querySelector("input[type='radio'][name='gender']:checked")) ? [document.querySelector("input[type='radio'][name='gender']:checked").getAttribute("data-gender")] : ['male', 'female']
    const [userChooseMinAge, userChooseMaxAge] = document.getElementById('test-slider').noUiSlider.get()
        //Filter
    CURRENT_FRIENDS = FRIENDS_SOURCE.filter(friend => (userChooseGender.includes(friend.gender) && friend.dob.age >= userChooseMinAge && friend.dob.age <= userChooseMaxAge))

    let sortParameter = (document.querySelector("input[type='radio'][name='sort']:checked")) ? document.querySelector("input[type='radio'][name='sort']:checked").getAttribute("data-sort") : false
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
    //In case user enter to app through sidenav (not using startBtn)
    if (!isMusicStoppedByUser) {
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
    MUSIC_BTN.classList.add('musicBtn-active')
    MUSIC_BTN.classList.add('musicBtn-animation')
    MUSIC_BTN.addEventListener('click', stopMusic, { once: true })
}

function stopMusic() {
    APP_AUDIO.pause()
    MUSIC_BTN.classList.remove('musicBtn-animation')
    MUSIC_BTN.addEventListener('click', playMusic, { once: true })
    isMusicStoppedByUser = true
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function byField(fieldName, subFieldName) {
    return (a, b) => a[fieldName][subFieldName] > b[fieldName][subFieldName] ? 1 : a[fieldName][subFieldName] < b[fieldName][subFieldName] ? -1 : 0;
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
        format: wNumb({
            decimals: 0
        })
    }

    const maxAgeHint = document.querySelectorAll('.maxAge')
    const minAgeHint = document.querySelectorAll('.minAge')

    noUiSlider.create(rangeSlider, rangeSliderSettings)
    setValueOfSortByAgeHint()
    rangeSlider.noUiSlider.on('change', setValueOfSortByAgeHint)
    RESET_BTN.addEventListener('click', resetRangeSlider)

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
