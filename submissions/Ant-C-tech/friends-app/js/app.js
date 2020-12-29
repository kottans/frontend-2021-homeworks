'use strict'

const MAIN = document.querySelector('#main')
const MUSIC_BUTTON = document.querySelector('#musicButton')
const SEARCH = document.querySelector('.search')
const SEARCH_INPUT = document.querySelector('#icon_prefix')
const RESET_BUTTON = document.querySelector('.resetButton')

const API_LINK = 'https://randomuser.me/api/'

const FRIENDS = 50

const APP_AUDIO = new Audio('./audio/you_ve_got_a_friend_in_me.mp3')
APP_AUDIO.loop = true
APP_AUDIO.volume = 0.3

//Classes by AnimateCSS (default speed is 1s)
const SHOW_ELEM_PRIMARY_ANIMATION = 'animate__zoomIn'
const HIDE_ELEM_PRIMARY_ANIMATION = 'animate__zoomOut'
const SHOW_ELEM_SECONDARY_ANIMATION = 'animate__fadeIn'
const HIDE_ELEM_SECONDARY_ANIMATION = 'animate__fadeOut'
const ANIMATION_SPEED = 'animate__faster' //500ms

let friendsSource
let currentFriends = []
let isMusicStoppedByUser = false
let currentContent
let currentAnimationHide
let currentAnimationShow
let currentAnimationSpeed

initApp()

function initApp() {
    getFriends(FRIENDS)
    addListeners()
    createRangeSlider()
}

function getFriends(num) {
    fetch(`${API_LINK}?results=${num}`)
        .then(handleErrors)
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            friendsSource = data.results
        }).then(function() {
            const timeout = setTimeout(() => {
                changeContent(createStartScreen(), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
                clearTimeout(timeout)
            }, 2000)
        })
        .catch(function(error) {
            console.error(error.message)
            changeContent(`<h1 class="container h-100 flexContainerCol errorMes">Something went wrong, we are so sorry :( Please, try to reload the page!</h1>`, SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
        })
}

function addListeners() {
    document.addEventListener('DOMContentLoaded', activateSideNav)
    document.querySelector('.filterButton').addEventListener('click', toFilter)
    RESET_BUTTON.addEventListener('click', resetFilter)
    MAIN.addEventListener('click', function({ target }) {
        if (target.classList.contains('startButton')) {
            changeContent(createFriendsScreen(friendsSource), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
            showSearchBar()
            activeMusic()
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
    let friendsScreen = '<div class="container friends__container"><div class="flexContainerRow">'
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
        friendsScreen += card
    })
    friendsScreen += '</div></div>'
    return friendsScreen
}

function showSearchBar() {
    SEARCH.classList.add(SHOW_ELEM_PRIMARY_ANIMATION)
    SEARCH.classList.add('showElem')
    SEARCH_INPUT.addEventListener('input', lookForFriendByName)
}

function changeContent(content, show, hide, speed) {
    currentContent = content
    currentAnimationHide = hide
    currentAnimationShow = show

    MAIN.classList.remove('scroll')
    if (speed) {
        MAIN.classList.add(speed)
        currentAnimationSpeed = speed
    }
    MAIN.classList.add(hide)
}

function lookForFriendByName() {
    const input = SEARCH_INPUT.value.toLowerCase()

    let foundFriends = currentFriends.length === 0 ?
        friendsSource.filter(defineFilterOrder(input)) :
        currentFriends.filter(defineFilterOrder(input))

    changeContent(createFriendsScreen(foundFriends), SHOW_ELEM_SECONDARY_ANIMATION, HIDE_ELEM_SECONDARY_ANIMATION, ANIMATION_SPEED)
}

function toFilter() {
    //In case user enter to app through sidenav (not using startButton)
    checkMusic()
    showSearchBar()
    closeSideNav()

    const checkedGenderInput = document.querySelector("input[type='radio'][name='gender']:checked")
    let userChooseGender = checkedGenderInput ? [checkedGenderInput.getAttribute("data-gender")] : ['male', 'female']

    const [userChooseMinAge, userChooseMaxAge] = document.getElementById('test-slider').noUiSlider.get()

    currentFriends = friendsSource.filter(friend => (
        userChooseGender.includes(friend.gender) &&
        friend.dob.age >= userChooseMinAge &&
        friend.dob.age <= userChooseMaxAge))

    const checkedSortParameterInput = document.querySelector("input[type='radio'][name='sort']:checked")
    let sortParameter = checkedSortParameterInput ? checkedSortParameterInput.getAttribute("data-sort") : false

    switch (sortParameter) {
        case '0-100':
            currentFriends.sort(defineSortOrder('dob', 'age'))
            break
        case '100-0':
            currentFriends.sort(defineSortOrder('dob', 'age')).reverse()
            break
        case 'name_a-z':
            currentFriends.sort(defineSortOrder('name', 'first'))
            break
        case 'name_z-a':
            currentFriends.sort(defineSortOrder('name', 'first')).reverse()
            break
        case 'lastName_a-z':
            currentFriends.sort(defineSortOrder('name', 'last'))
            break
        case 'lastName_z-a':
            currentFriends.sort(defineSortOrder('name', 'last')).reverse()
            break

        default:
            break
    }

    changeContent(createFriendsScreen(currentFriends), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
}

function resetFilter() {
    //In case user enter to app through sidenav (not using startButton)
    checkMusic()
    showSearchBar()
    closeSideNav()

    currentFriends = []
    const checkedGenderInput = document.querySelector("input[type='radio'][name='gender']:checked")
    const checkedSortParameterInput = document.querySelector("input[type='radio'][name='sort']:checked")
    if (checkedGenderInput) {
        checkedGenderInput.checked = false
    }
    if (checkedSortParameterInput) {
        checkedSortParameterInput.checked = false
    }
    changeContent(createFriendsScreen(friendsSource), SHOW_ELEM_PRIMARY_ANIMATION, HIDE_ELEM_PRIMARY_ANIMATION)
}

function closeSideNav() {
    SEARCH_INPUT.value = ''
    document.querySelector('.search__hint').classList.remove('active')
}

function activateSideNav() {
    const sideNavIco = document.querySelectorAll('.sidenav')
    M.Sidenav.init(sideNavIco, {})
}

function activeMusic() {
    MUSIC_BUTTON.classList.add('musicButton-active')
    MUSIC_BUTTON.classList.toggle('musicButton-animation')
    APP_AUDIO.play()
    MUSIC_BUTTON.addEventListener('click', toggleMusic)
}

function toggleMusic() {
    MUSIC_BUTTON.classList.contains('musicButton-animation') ? APP_AUDIO.pause() : APP_AUDIO.play()
    MUSIC_BUTTON.classList.toggle('musicButton-animation')
}

function checkMusic() {
    if (!isMusicStoppedByUser && !MUSIC_BUTTON.classList.contains('musicButton-active')) {
        activeMusic()
    }
}

function defineSortOrder(fieldName, subFieldName) {
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

function defineFilterOrder(input) {
    return (friend) => friend.name.first.toLowerCase().startsWith(input) || friend.name.last.toLowerCase().startsWith(input)
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}

function showCurrentContent() {
    MAIN.innerHTML = ''
    MAIN.innerHTML = currentContent
    MAIN.classList.remove(currentAnimationHide)
    MAIN.classList.add(currentAnimationShow)
}

function clearAfterAnimation() {
    MAIN.classList.remove(currentAnimationShow)
    MAIN.classList.remove(currentAnimationSpeed)
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
        }
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
        const maxCurrentValueOfRangeSlider = rangeSlider.noUiSlider.get()[1]
        const minCurrentValueOfRangeSlider = rangeSlider.noUiSlider.get()[0]
        maxAgeHint.forEach(point => point.innerHTML = maxCurrentValueOfRangeSlider)
        minAgeHint.forEach(point => point.innerHTML = minCurrentValueOfRangeSlider)
    }
}
