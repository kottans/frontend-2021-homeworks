'use strict'

import questions from './questions.js'
import content from './content.js'

const mapContainer = document.querySelector('.mapContainer')
const map = document.querySelector('.map')
const svg = document.querySelector('svg')
const mapAreas = document.querySelectorAll('.land')
const hintSection = document.querySelector('#hintSection')
const contentSection = document.querySelector('#content')
const country = document.querySelector('#main')


initApp()


function initApp() {
    recalcMap()
    recalcContentBlock()
    addListeners()
    showContent(content.main)
}

function addListeners() {

    window.onresize = function() {
        recalcMap()
        recalcContentBlock()
    }

    for (const land of mapAreas) {
        //Add hint on mouseenter
        land.addEventListener('mouseenter', function(event) {
                hintSection.innerHTML = `${questions[getRandomIntInclusive(0, questions.length - 1)]}`
            })
            //Remove hint on mouseleave
        land.addEventListener('mouseleave', function(event) {
            hintSection.innerHTML = '. . .'
        })
    }

    //Change content on click
    map.addEventListener('click', changeContent)

    //Show main content on click
    country.addEventListener('click', changeContent)
}



function recalcMap() {
    if (document.documentElement.clientWidth >= 1040) {
        const mapContainerWidth = mapContainer.offsetWidth
        const mapHeight = map.getBoundingClientRect()
        map.style.transform = `scale(${(1.35 * mapContainerWidth) / 868})`
        svg.style.height = mapHeight.height + 'px'
    } else {
        map.style.transform = `scale(${(1.35 * (document.documentElement.clientWidth - 50)) / 868})`
        const mapHeight = map.getBoundingClientRect()
        svg.style.height = mapHeight.height + 'px'
    }
}

function recalcContentBlock() {
    contentSection.style.minHeight = mapContainer.offsetHeight + 'px'
}

function showContent(id) {
    const content = createContent(id)
    contentSection.appendChild(content)
    contentSection.classList.remove('content-hide')
}

function hideContent() {
    contentSection.classList.add('content-hide')
}

function changeContent({ target }) {

    if (target.classList.contains('land-active')) {
        return
    }

    //Map visualization
    for (const land of mapAreas) {
        land.classList.remove('land-active')
    }
    target.classList.add('land-active')

    //Change content
    hideContent()
    map.classList.add('map-notActive')
    country.classList.add('mapContainer__title-notActive')
    contentSection.addEventListener('transitionend', function() {
        contentSection.innerHTML = ''
        showContent(content[target.id])
        contentSection.addEventListener('transitionend', function() {
            map.classList.remove('map-notActive')
            country.classList.remove('mapContainer__title-notActive')
        }, { once: true })
    }, { once: true })
}

function createContent(content) {
    let fragment = new DocumentFragment()

    let titleBlock = document.createElement('div')
    let title = document.createElement('div')
    let subtitle = document.createElement('div')

    titleBlock.classList.add('content__titleBlock')
    title.classList.add('content__title')
    subtitle.classList.add('content__subtitle')

    title.textContent = content.title
    subtitle.textContent = content.subtitle

    titleBlock.append(title, subtitle)

    let textBlock = document.createElement('div')
    textBlock.classList.add('content__textBlock')
    for (let item of content.text) {
        let p = document.createElement('p')
        p.textContent = item
        textBlock.appendChild(p)
    }

    let imgBlock = document.createElement('div')
    imgBlock.classList.add('content__imgBlock')
    for (let item of content.media) {
        let figure = document.createElement('figure')
        figure.classList.add('imgBlock__item')
        let img = document.createElement('img')
        img.setAttribute('src', `${item.src}`)
        img.setAttribute('alt', `${item.descript}`)
        let figcaption = document.createElement('figcaption')
        figcaption.classList.add('imgBlock__caption')
        figcaption.textContent = item.descript
        figure.append(img, figcaption)
        imgBlock.appendChild(figure)
    }
    fragment.append(titleBlock, textBlock, imgBlock)

    return fragment
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
