'use strict'

import randomQuestions from './questions.js'
import content from './content.js'

//Variables
let mapContainer
let map
let svg
let mapAreas
let hintSection
let contentSection
let country


//Application run
getElements()
recalcMap()
addListeners()
showContent(content.main)


//Functions
function getElements() {
    mapContainer = document.querySelector('.mapContainer')
    svg = document.querySelector('svg')
    map = document.querySelector('.map')
    mapAreas = document.querySelectorAll('.land')
    hintSection = document.querySelector('#hintSection')
    contentSection = document.querySelector('#content')
    country = document.querySelector('#main')
}

function addListeners() {

    window.onresize = recalcMap

    //Add-Remove hint
    for (const iterator of mapAreas) {
        //Add hint on mouseenter, hover
        iterator.addEventListener('mouseenter', function (event) {
            if (event.target.style.fill !== 'rgb(0, 176, 255)') {
                event.target.style.fill = '#ffeb3b'
            }
            hintSection.innerHTML = `${randomQuestions[getRandomIntInclusive(0, 9)]}`
        })
        //Remove hint on mouseleave, hover
        iterator.addEventListener('mouseleave', function (event) {
            if (event.target.style.fill !== 'rgb(0, 176, 255)') {
                event.target.style.fill = '#000'
            }
            hintSection.innerHTML = '. . .'
        })
        //Change content on click
        iterator.addEventListener('click', function (event) {

            //Prohibit double click
            if (event.target.classList.contains('show')) {
                return false
            } else {
                changeContent(event)
                event.target.classList.add('show')
                for (const iterator of mapAreas) {
                    if (iterator != event.target) {
                        iterator.classList.remove('show')
                    }
                }
            }

        })
    }

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

function showContent(param) {
    const content = createContent(param)
    contentSection.appendChild(content)
    contentSection.classList.remove('content-hide')
}

function hideContent() {
    contentSection.classList.add('content-hide')
}

function changeContent(event) {
    hideContent()
    for (let item of mapAreas) {
        item.style.fill = '#000'
    }
    event.target.style.fill = '#00b0ff'
    const target = getTargetId(event)
    contentSection.addEventListener('transitionend', function () {
        contentSection.innerHTML = ''
        showContent(content[target])
    }, { once: true })

}

function getTargetId(event) {
    return event.target.id
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

    titleBlock.appendChild(title)
    titleBlock.appendChild(subtitle)
    fragment.appendChild(titleBlock)

    let textBlock = document.createElement('div')
    textBlock.classList.add('content__textBlock')
    for (let item of content.text) {
        let p = document.createElement('p')
        p.textContent = item
        textBlock.appendChild(p)
    }
    fragment.appendChild(textBlock)

    let imgBlock = document.createElement('div')
    imgBlock.classList.add('content__imgBlock')
    for (let item of content.media) {
        let figure = document.createElement('figure')
        figure.classList.add('imgBlock__item')
        let img = document.createElement('img')
        img.setAttribute('src', `${item.src}`)
        img.setAttribute('alt', `${item.descript}`)
        figure.appendChild(img)
        let figcaption = document.createElement('figcaption')
        figcaption.classList.add('imgBlock__caption')
        figcaption.textContent = item.descript
        figure.appendChild(figcaption)
        imgBlock.appendChild(figure)
    }
    fragment.appendChild(imgBlock)

    return fragment
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
