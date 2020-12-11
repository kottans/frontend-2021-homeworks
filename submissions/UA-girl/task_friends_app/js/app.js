const URL_FETCH = 'https://randomuser.me/api/?results=100&nat=GB';
const CARDS_PER_PAGE = 10;
const filterSet = document.querySelector('.container-filters');
const pages = document.querySelector('.pages');
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
<source media="(min-width: 467px)" srcset="${this.picture.large}">
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
<p class="email">${this.email}</p>
<p class="phone">${this.phone}, ${this.cell}</p>
</div>
<p class="registration"><span class="card-subtitle">Registered </span>${this.registered.age} years ago</p>
</figcaption>`;
        this.card.innerHTML = cardContent;
    }

    ageCompare(other) {
        return this.age - other.age;
    }

    nameCompare(other) {
        return this.name.first.toLowerCase().localeCompare(other.name.first.toLowerCase());
    }

    dateRegistrationCompare(other) {
        return Date.parse(this.registered.date) - Date.parse(other.registered.date);
    }
}

class App {
    constructor(container) {
        this.container = container;
        this.filterStates = {
            gender: {
                toggled: false,
                gender: null,
            },
            age: {
                toggled: false,
                age: null,
                prevAge: 100,
            },
        };
        this.sortingState = {
            name: {
                toggled: false,
                direction: null,
            },
            registration: {
                toggled: false,
                direction: null
            },
            age: {
                toggled: false,
                direction: null,
            }
        };
        this.cards = [];
        this.currentPage = 0;
    }

    restoreFromFilter() {
        this.currentPage = 0;
        this.cards = cards.slice();
        for (let [filter, state] of Object.entries(this.filterStates)) {
            if (state.toggled) {
                switch (filter) {
                    case 'gender':
                        this.genderFilter(state.gender, false);
                        break;
                    case 'age':
                        this.ageFilter(state.age);
                        break;
                }
            }
        }
        for (let [filter, state] of Object.entries(this.filterStates)) {
            if (state.toggled) {
                switch (filter) {
                    case 'age':
                        this.sortByAge(state.direction);
                        break;
                    case 'name':
                        this.sortByName(state.direction);
                        break;
                    case 'registration':
                        this.sortByRegistrationDate(state.direction);
                        break;
                }
            }
        }
    }

    resetFilterState(updateGender = false) {
        this.filterStates.age = {
            toggled: false,
            age: null,
            prevAge: 100,
        };
        if (updateGender) {
            this.filterStates.gender = {
                toggled: false,
                gender: null,
                direction: null
            }
        }
    }

    resetSortingState() {
        this.sortingState = {
            name: {
                toggled: false,
                direction: null,
            },
            registration: {
                toggled: false,
                direction: null
            },
            age: {
                toggled: false,
                direction: null,
            }
        };
    }

    genderFilter(gender, change = true) {
        this.filterStates.gender.toggled = true;
        this.filterStates.gender.gender = gender;
        this.currentPage = 0;
        if (change) {
            return this.restoreFromFilter()
        }
        this.cards = this.cards.filter(person => person.gender === gender);
    }

    ageFilter(maxAge) {
        const prevAge = this.filterStates.age.prevAge;
        const currAge = this.filterStates.age.age;
        this.resetFilterState();
        this.currentPage = 0;
        this.filterStates.age.toggled = true;
        document.querySelector('.label-range').innerHTML = `Max age: ${maxAge}`;
        if (+ maxAge > prevAge) {
            this.filterStates.age.prevAge = 100;
            this.filterStates.age.age = + maxAge;
            return this.restoreFromFilter();
        }
        if (currAge) {
            this.filterStates.age.prevAge = currAge;
        }
        this.filterStates.age.age = + maxAge;
        this.cards = this.cards.filter(person => person.age <= + maxAge);
    }

    nameFilter(name) {
        name = name.trim().toLowerCase();
        this.resetFilterState();
        this.currentPage = 0;
        this.cards = this.cards.filter(person => person.name.first.toLowerCase().startsWith(name));
    }

    sortByAge(isFromLowest) {
        this.cards.sort((person1, person2) => person1.ageCompare(person2));
        this.resetSortingState();
        this.sortingState.age.toggled = true;
        this.sortingState.age.direction = isFromLowest;
        this.currentPage = 0;
        if (isFromLowest === 'down') {
            this.cards.reverse()
        }
    }


    sortByName(isFromLowest) {
        this.cards.sort((person1, person2) => person1.nameCompare(person2));
        this.resetSortingState();
        this.sortingState.name.toggled = true;
        this.sortingState.name.direction = isFromLowest;
        this.currentPage = 0;
        if (isFromLowest === 'down') {
            this.cards.reverse()
        }
    }

    sortByRegistrationDate(isFromLowest) {
        this.cards.sort((person1, person2) => person1.dateRegistrationCompare(person2));
        this.resetSortingState();
        this.sortingState.registration.toggled = true;
        this.sortingState.registration.direction = isFromLowest;
        this.currentPage = 0;
        if (isFromLowest === 'down') {
            this.cards.reverse()
        }
    }

    disableEnablePageToggler() {
        const [backPage, forwPage] = document.querySelectorAll('.button-page');
        if ((this.currentPage + 1) * CARDS_PER_PAGE >= this.cards.length)  {
            forwPage.classList.add('disabled');
            forwPage.setAttribute('disabled', true);
        } else {
            forwPage.removeAttribute('disabled');
            forwPage.classList.remove('disabled');
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
        document.querySelector('.label-range').innerHTML = `Max age: 100`;
        document.querySelector('.range').value = 100;
        this.currentPage = 0;
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

    addListenersFilters() {
        const app = this;
        ['click', 'input', 'change', 'keyup'].forEach(e => filterSet.addEventListener(e, function (event) {
            const target = event.target.closest('input');
            if (!target) {
                return
            }
            const name = target.getAttribute('name');
            const value = target.value;
            switch (name) {
                case 'search':
                    if (event.keyCode === 8 || event.keyCode === 46) {
                        app.restoreFromFilter()
                    }
                    app.nameFilter(value);
                    break;
                case 'abc':
                    app.sortByName(value);
                    break;
                case 'gender':
                    app.genderFilter(value);
                    break;
                case 'age':
                    app.sortByAge(value);
                    break;
                case 'range':
                    app.ageFilter(value);
                    break;
                case 'registration':
                    app.sortByRegistrationDate(value);
                    break;
                case 'reset':
                    app.resetApp();
                    break
            }
            app.displayPeople();
        }))
    }

    addEventListenersPages() {
        const app = this;
        pages.addEventListener('click', function({target}) {
            const t = target.closest('button.button-page');
            if (!t) {
                return
            }
            if (t.classList.contains('button-page__back')){
                app.currentPage = app.currentPage - 1;
            } else if(t.classList.contains('button-page__forward')){
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
    app.addListenersFilters();
    app.addEventListenersPages();
}

function removeOverlay() {
    const o = document.querySelector('.overlay');
    o.classList.add('fade');
}

function createPeopleList(data) {
    data.forEach(function (person) {
        const {name, dob: {age}, gender, location: {country, city}, email, phone, cell, picture, registered} = person;
        let newPerson = new Person(name, age, gender, country, city, email, phone, cell, picture, registered);
        newPerson.cardTemplate();
        cards.push(newPerson);
    });
}

fetch(URL_FETCH)
    .then(response => {
        return response.json();
    })
    .catch(err => {
        document.querySelector('.smile').classList.add('hidden');
        const overlay = document.querySelector('.overlay');
        overlay.innerHTML = `<h1 class="heading-title">Sorry, something went wrong =( Please, reload the page.</h1>`;
    })
    .then(peopleData => startApp(peopleData.results));
