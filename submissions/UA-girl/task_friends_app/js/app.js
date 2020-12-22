const URL_FETCH = 'https://randomuser.me/api/?results=100&nat=GB';
const CARDS_PER_PAGE = 10;
const MAX_AGE = 100;
const BREAK_POINT_WIDTH = 467;
const filterSet = document.querySelector('.container-filters');
const pagesWrap = document.querySelector('.pages');
let cards = [];


class Person {
    constructor(name, age, gender, country, city, email, phone, cell, picture, registered) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.country = country;
        this.city = city;
        this.email = email;
        this.phone = phone;
        this.cell = cell;
        this.picture = picture;
        this.registered = registered;
    }

    cardTemplate() {
        this.card = document.createElement('figure');
        this.card.classList.add('card');
        if (this.gender === 'male') {
            this.card.classList.add('male');
        } else {
            this.card.classList.add('female');
        }
        let cardContent = `<picture>
<source media="(min-width: ${BREAK_POINT_WIDTH}px)" srcset="${this.picture.large}">
<img src="${this.picture.medium}" alt="${this.name.first}'s photo" class="card-image">
</picture>
<figcaption class="card-description">
<h3 class="name">
${this.name.first} ${this.name.last}
</h3>
<div class="card-info card-info__general">
<p class="age">${this.age} years old, ${this.gender}</p>
<p class="location">${this.city}, ${this.country}</p>
</div>
<div class="card-info card-info__contacts">
<h4 class="contacts-title">Contact information:</h4>
<a class="email" href="mailto: ${this.email}">${this.email}</a>
<a class="phone" href="tel: ${this.phone}">${this.phone},</a>
<a class="phone" href="tel: ${this.cell}">${this.cell}</a>
</div>
<p class="registration"><span class="card-subtitle">Registered </span>${this.registered.age} years ago</p>
</figcaption>`;
        this.card.innerHTML = cardContent;
    }

    compareAge(other) {
        return this.age - other.age;
    }

    compareName(other) {
        return this.name.first.toLowerCase().localeCompare(other.name.first.toLowerCase());
    }

    compareDateRegistration(other) {
        return Date.parse(this.registered.date) - Date.parse(other.registered.date);
    }
}

class App {
    constructor(container) {
        this.container = container;
        this.filterStates = {
            gender: null,
            age: null
        };
        this.sortingStates = {
            name: null,
            registration: null,
            age: null
        };
        this.cards = [];
        this.currentPage = 0;
        this.rangeAgeLabel = document.querySelector('.label-range');
        this.rangeAgeInput = document.querySelector('.range');
        this.searchNameInput = document.querySelector('.search');
        this.filterInputs = document.querySelectorAll('.radio');
    }

    restoreFromFilter() {
        this.currentPage = 0;
        this.cards = cards.slice();
        for (let [filter, state] of Object.entries(this.filterStates)) {
            if (state) {
                switch (filter) {
                    case 'gender':
                        this.genderFilter(state, false);
                        break;
                    case 'age':
                        this.ageFilter(state || MAX_AGE);
                        break;
                }
            }
        }
        for (let [filter, state] of Object.entries(this.sortingStates)) {
            if (state) {
                this.sortCards(state, filter);
            }
        }
    }

    resetFilterState(updateGender = false) {
        this.filterStates.age = null;
        if (updateGender) {
            this.filterStates.gender = null
        }
    }

    resetSortingState() {
        this.sortingStates = {
            name: null,
            registration: null,
            age: null
        };
    }

    genderFilter(gender, wasToggled = true) {
        this.filterStates.gender = gender;
        if (wasToggled) {
            this.restoreFromFilter();
        } else {
            this.cards = this.cards.filter(person => person.gender === gender);
        }
    }

    ageFilter(maxAge) {
        this.rangeAgeLabel.innerHTML = `Max age: ${maxAge}`;
        if (this.filterStates.age < +maxAge) {
            this.filterStates.age = +maxAge;
            this.restoreFromFilter();
        } else {
            this.filterStates.age = +maxAge;
            this.cards = this.cards.filter(person => person.age <= +maxAge);
        }
    }

    sortCards(value, filterName) {
        this.resetSortingState();
        switch (filterName) {
            case 'age':
                this.cards.sort((person1, person2) => person1.compareAge(person2));
                break;
            case 'name':
                this.cards.sort((person1, person2) => person1.compareName(person2));
                break;
            case 'registration':
                this.cards.sort((person1, person2) => person1.compareDateRegistration(person2));
        }
        this.sortingStates[filterName] = value;
        if (value === 'down') {
            this.cards.reverse()
        }
    }

    nameFilter(name) {
        const nameQuery = name.trim().toLowerCase();
        this.restoreFromFilter();
        this.cards = this.cards.filter(person => person.name.first.toLowerCase()
            .startsWith(nameQuery) || person.name.last.toLowerCase().startsWith(nameQuery));
    }

    disableEnablePageToggler() {
        const [backPage, forwardPage] = document.querySelectorAll('.button-page');
        if ((this.currentPage + 1) * CARDS_PER_PAGE >= this.cards.length) {
            forwardPage.classList.add('disabled');
            forwardPage.setAttribute('disabled', true);
        } else {
            forwardPage.removeAttribute('disabled');
            forwardPage.classList.remove('disabled');
        }
        if (this.currentPage === 0) {
            backPage.classList.add('disabled');
            backPage.setAttribute('disabled', true);
        } else {
            backPage.classList.remove('disabled');
            backPage.removeAttribute('disabled');
        }
        const span = document.querySelector('.page');
        span.textContent = this.currentPage + 1;
    }

    resetApp() {
        this.cards = cards.slice();
        this.resetFilterState(true);
        this.resetSortingState();
        this.rangeAgeLabel.innerHTML = `Max age: ${MAX_AGE}`;
        this.rangeAgeInput.value = MAX_AGE;
        this.searchNameInput.value = '';
        this.filterInputs.forEach(input => input.checked = false)
    }

    displayPeople() {
        this.container.innerHTML = '';
        let cardsRender;
        if (this.cards.length > CARDS_PER_PAGE) {
            cardsRender =
                this.cards.slice(CARDS_PER_PAGE * this.currentPage, CARDS_PER_PAGE * (this.currentPage + 1));
        } else {
            cardsRender = this.cards.slice();
        }
        const fragment = document.createDocumentFragment();
        cardsRender.forEach(person => fragment.append(person.card));
        this.container.appendChild(fragment);
        this.disableEnablePageToggler();
    }

    setupFilters() {
        const app = this;
        filterSet.addEventListener('input', function (event) {
            const target = event.target.closest('input');
            if (!target) {
                return
            }
            const name = target.getAttribute('name');
            const value = target.value;
            switch (name) {
                case 'search':
                    app.nameFilter(value);
                    break;
                case 'sorting':
                    app.sortCards(value, target.dataset.name);
                    break;
                case 'gender':
                    const wasToggled = !!app.filterStates.gender;
                    app.genderFilter(value, wasToggled);
                    break;
                case 'range':
                    app.ageFilter(value);
                    break;
            }
            app.currentPage = 0;
            app.displayPeople();
        });

        filterSet.addEventListener('click', function ({target}) {
            const resetAppButton = target.closest('input.button-reset');
            if (!resetAppButton) {
                return
            }
            app.currentPage = 0;
            app.resetApp();
            app.displayPeople();
        })
    }

    togglePages() {
        const app = this;
        pagesWrap.addEventListener('click', function ({target}) {
            const pageToggler = target.closest('button.button-page');
            if (!pageToggler) {
                return
            }
            if (pageToggler.classList.contains('button-page__back')) {
                app.currentPage = app.currentPage - 1;
            } else if (pageToggler.classList.contains('button-page__forward')) {
                app.currentPage = app.currentPage + 1;
            }
            app.disableEnablePageToggler();
            app.displayPeople();
        });
    }
}


function startApp(peopleData) {
    const app = new App(document.querySelector('.cards'));
    createPeopleList(peopleData);
    app.cards = cards.slice();
    removeOverlay();
    app.displayPeople();
    app.setupFilters();
    app.togglePages();
}

function removeOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('fade');
}

function createPeopleList(data) {
    data.forEach(function (person) {
        const {name, dob: {age}, gender, location: {country, city}, email, phone, cell, picture, registered} = person;
        const newPerson = new Person(name, age, gender, country, city, email, phone, cell, picture, registered);
        newPerson.cardTemplate();
        cards.push(newPerson);
    });
}

fetch(URL_FETCH)
    .then(response => response.json())
    .catch(err => {
        document.querySelector('.smile').classList.add('hidden');
        const overlay = document.querySelector('.overlay');
        overlay.innerHTML = `<h1 class="heading-title">Sorry, something went wrong =( Please, reload the page.</h1>`;
    })
    .then(peopleData => startApp(peopleData.results));
