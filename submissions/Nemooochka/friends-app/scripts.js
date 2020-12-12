const urlData = 'https://randomuser.me/api/?results=20';
let users;
const cardsWrapBlock = document.querySelector('.wrap-cards');

const inputNameSearch = document.querySelector('.filter-name');
const elemSortingByName = document.querySelector('.sort-by_name');
const elemSortingByAge = document.querySelector('.sort-by_age');
const elemFilteringByGender = document.querySelector('.wrap-filter');

async function getData() {
    try {
        let response = await fetch(urlData);
        users = await response.json();
        users = users.results;

        renderCards(users);
        checkUrl();
    } catch (err) {
        cardsWrapBlock.innerHTML = `<div class="error">Ooops, something went wrong. Try to reload <i class="far fa-smile-beam"></i></div>`;
    }
}

function generateCard({name, gender, email, location, picture, dob}) {
    return `<div class="card-content">
                <div class="card-photo" style="background-image: url(${picture.large})"></div>
                <div class="card-title">
                    <div class="name">
                        <span class="name-first">${name.first}</span>
                        <span class="name-last">${name.last}</span>
                    </div>
                    <div>${email}</div>
                </div>
                <div class="card-bottom">
                    <div class="card__block">
                        <h3>Gender</h3>
                        <p>${gender}</p>
                    </div>
                    <div class="card__block">
                        <h3>Age</h3>
                        <p class="age">${dob.age}</p>
                    </div>
                    <div class="card__block">
                        <h3>Country</h3>
                        <p>${location.country}</p>
                    </div>
                </div>
            </div>
            `;
}

function renderCards(arrayCards) {
    const cards = document.createDocumentFragment();
    cardsWrapBlock.innerHTML = '';

    arrayCards.map((elem, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('card-number', index);
        card.innerHTML = generateCard(elem);
        cards.appendChild(card);
    });

    cardsWrapBlock.appendChild(cards);
}

function filterByName({target}) {
    let inputNameValue = target.value.toLowerCase();

    if (inputNameValue.length > 1) {
        users.map((elem, index) => {
            let userName = elem.name.first + ' ' + elem.name.last;
            userName = userName.toLowerCase();
            let currentCard = document.querySelector("[card-number='" + index + "']");
            if (!userName.includes(inputNameValue)) {
                currentCard.classList.add('hidden-by-name');
            } else {
                currentCard.classList.remove('hidden-by-name');
            }
        });
    } else {
        const cardsArray = Array.from(cardsWrapBlock.childNodes);
        cardsArray.map(elem => elem.classList.remove('hidden-by-name'));
    }
}

function getCardsChildNodesArr() {
    let cardsChildNodes = cardsWrapBlock.childNodes;
    return [...cardsChildNodes];
}

function updUrl(filterName, value) {
    const parsedUrl = new URL(window.location.href);
    parsedUrl.searchParams.set(filterName, value);

    window.history.pushState(filterName,
        null, parsedUrl);
}

function checkUrl() {
    const parsedUrl = new URL(window.location.href);
    const state = window.history.state;
    if (state === 'filterByGender') {
        filterByGender(parsedUrl.searchParams.get("filterByGender"));
    } else {
        updUrl('filterByGender', 'all');
        activateFilterByGenderIcon('all');
    }
}

function onPopStepUrl() {
    window.onpopstate = function () {
        checkUrl();
    };
}

function activateFilterByGenderIcon(filterValue) {
    document.querySelector(`[filter-gender='${filterValue}']`).checked = true;
}

function clickFilterByGender({target}) {
    if (target.classList.contains('filter-gender')) {
        let filterValue = target.getAttribute('filter-gender');

        updUrl('filterByGender', filterValue);

        filterByGender(filterValue);
    }
}

function filterByGender(filterValue) {
    activateFilterByGenderIcon(filterValue);
    if (filterValue === 'all') {
        let cardsChildNodesArr = getCardsChildNodesArr();
        cardsChildNodesArr.map(elem => elem.classList.remove('hidden'));
    } else {
        users.map((elem, index) => {
            let currentCard = document.querySelector("[card-number='" + index + "']");
            if (elem.gender !== filterValue) {
                currentCard.classList.add('hidden');
            } else {
                currentCard.classList.remove('hidden');
            }
        });
    }
}


function sortByName({currentTarget}) {
    let cardsChildNodesArr = getCardsChildNodesArr();

    let sortedArr = cardsChildNodesArr.sort((a, b) => {
        let first = a.querySelector('.name-first').textContent;
        let second = b.querySelector('.name-first').textContent;

        if (currentTarget.classList.contains('down')) {
            if (first < second) return -1;
            else if (first > second) return 1;
            return 0;
        } else {
            if (first > second) return -1;
            else if (first < second) return 1;
            return 0;
        }
    });

    sortedArr.map((elem, index) => elem.style.order = index);

    currentTarget.classList.toggle('down');
    currentTarget.classList.add('active');
    elemSortingByAge.classList.remove('active');
}

function sortByAge({currentTarget}) {
    let cardsChildNodesArr = getCardsChildNodesArr();

    let sortedArr = cardsChildNodesArr.sort((a, b) => {
        let first = a.querySelector('.age').textContent;
        let second = b.querySelector('.age').textContent;

        if (currentTarget.classList.contains('down')) {
            return first - second;
        } else {
            return second - first;
        }
    });

    sortedArr.map((elem, index) => elem.style.order = index);

    currentTarget.classList.toggle('down');
    currentTarget.classList.add('active');
    elemSortingByName.classList.remove('active');
}

document.addEventListener("DOMContentLoaded", function () {
    getData();
    onPopStepUrl();

    inputNameSearch.addEventListener('keyup', filterByName);
    elemSortingByName.addEventListener('click', sortByName);
    elemSortingByAge.addEventListener('click', sortByAge);
    elemFilteringByGender.addEventListener('click', clickFilterByGender);
});