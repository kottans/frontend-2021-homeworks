document.addEventListener('DOMContentLoaded', function () {
    const API_PATH = 'https://randomuser.me/api/';
    const USER_COUNT = 20;
    const URL_FOR_SEARCH = `${API_PATH}?results=${USER_COUNT}`;

    fetch(URL_FOR_SEARCH)
        .then(resolve => resolve.json())
        .then(data => {
            const users = data.results;
            const friendsApp = new FriendsApp(users);
            friendsApp.start();
        });
});

class FriendsApp {
    constructor(users) {
        this.resultsWrapper = document.querySelector('.result');
        this.cards = users.map(item => new UserCard(item));
        this.dipslayCards = this.cards;
        this.prevDisplay = this.dipslayCards;
        this.filterByName();
        this.filterByAge();
        this.filterByGender();
        this.filterByCity();
        this.filterByEmail();
    }

    start() {
        this.render(this.dipslayCards);
    }

    render() {
        this.resultsWrapper.innerHTML = '';
        this.dipslayCards.forEach(card => this.resultsWrapper.insertAdjacentElement('afterbegin', card.card));
    }

    filterByName() {
        this.filterByNameAlphabetically();
        this.filterByNameNonAlphabetically();
    }

    filterByNameAlphabetically() {
        const app = this;
        const nameAlphabeticallyBtn = document.querySelector('.name-alphabetically');
        nameAlphabeticallyBtn.addEventListener('click', function () {
            app.dipslayCards = app.dipslayCards.sort((a, b) => a.name > b.name ? -1 : 1);
            app.render();
        });
    }

    filterByNameNonAlphabetically() {
        const app = this;
        const nameNonAlphabeticallyBtn = document.querySelector('.name-nonalphabetically');
        nameNonAlphabeticallyBtn.addEventListener('click', function () {
            app.dipslayCards = app.dipslayCards.sort((a, b) => a.name > b.name ? 1 : -1);
            app.render();
        });
    }

    filterByAge() {
        const app = this;
        const ageBtn = document.querySelector('.age_btn');
        ageBtn.addEventListener('click', function () {
            if (!ageBtn.classList.contains('LowToHigh')) {
                app.dipslayCards = app.dipslayCards.sort((a, b) => a.age > b.age ? -1 : 1);
                ageBtn.classList.add('LowToHigh');
            } else {
                app.dipslayCards = app.dipslayCards.sort((a, b) => a.age > b.age ? 1 : -1);
                ageBtn.classList.remove('LowToHigh');
            }
            app.render();
        });
    }

    filterByGender() {
        const app = this;
        const manCheckbox = document.querySelector('.checkbox-input.man');
        const womanCheckbox = document.querySelector('.checkbox-input.woman');
        const genderWrapper = document.querySelector('.menu_item-gender');
        genderWrapper.addEventListener('click', function () {
            if (womanCheckbox.checked && manCheckbox.checked) {
                app.dipslayCards = app.cards;
            }
            if (manCheckbox.checked && !womanCheckbox.checked) {
                app.dipslayCards = app.dipslayCards.filter(card => card.user.gender == 'male');
            }
            if (womanCheckbox.checked && !manCheckbox.checked) {
                app.dipslayCards = app.dipslayCards.filter(card => card.user.gender == 'female');
            }
            if (!womanCheckbox.checked && !manCheckbox.checked) {
                app.dipslayCards = app.cards;
            }
            app.render();
        });
    }

    filterByCity() {
        const app = this;
        const cityInput = document.querySelector('.text-input--city');
        const cityWrapper = document.querySelector('.menu_item-city');
        cityWrapper.addEventListener('click', function () {
            app.prevDisplay = app.dipslayCards;
        });
        cityInput.addEventListener('input', function ({target}) {
            app.dipslayCards = app.dipslayCards.filter(card => card.user['location']['city'].includes(target.value));
            if (app.dipslayCards.length == 0 || target.value == '') {
                app.dipslayCards = app.prevDisplay;
            }
            app.render();
        });
    }

    filterByEmail() {
        const app = this;
        const emailInput = document.querySelector('.text-input--email');
        const emailWrapper = document.querySelector('.menu_item-email');
        emailWrapper.addEventListener('click', function () {
            app.prevDisplay = app.dipslayCards;
        });
        emailInput.addEventListener('input', function ({target}) {
            app.dipslayCards = app.dipslayCards.filter(card => card.user.email.includes(target.value));
            if (app.dipslayCards.length == 0 || target.value == '') {
                app.dipslayCards = app.prevDisplay;
            }
            app.render();
        });
    }
}

class UserCard {
    constructor(data) {
        this.card = this.createUserCard();
        this.name = `${data.name.first} ${data.name.last}`;
        this.age = `${data['dob'].age} years old`;
        this.city = data['location'].city.capitalizeFirstLetter();
        this.email = data.email;
        this.user = data;
        this.fillUserCard(data);
    }

    createUserCard() {
        const card = document.createElement('div');
        card.classList.add('card');
        const picture = document.createElement('picture');
        picture.classList.add('user-photo');
        const imgBig = document.createElement('source');
        imgBig.media = "(min-width: 600px)";
        imgBig.classList.add('big-user-img');
        imgBig.classList.add('user-img');
        const imgMed = document.createElement('img');
        imgMed.classList.add('med-user-img');
        imgMed.classList.add('user-img');
        const name = document.createElement('h3');
        name.classList.add("name");
        const age = document.createElement('span');
        age.classList.add("age");
        const city = document.createElement('span');
        city.classList.add("city");
        const email = document.createElement('span');
        email.classList.add("email");

        picture.insertAdjacentElement('afterbegin', imgBig);
        picture.insertAdjacentElement('beforeend', imgMed);
        card.insertAdjacentElement('afterbegin', picture);
        card.insertAdjacentElement('beforeend', name);
        card.insertAdjacentElement('beforeend', age);
        card.insertAdjacentElement('beforeend', city);
        card.insertAdjacentElement('beforeend', email);

        return card;
    }

    fillUserCard(data) {
        const name = this.card.querySelector('.name');
        const age = this.card.querySelector('.age');
        const city = this.card.querySelector('.city');
        const email = this.card.querySelector('.email');
        const bigImg = this.card.querySelector('.big-user-img');
        const medImg = this.card.querySelector('.med-user-img');

        name.innerHTML = this.name;
        age.innerHTML = this.age;
        city.innerHTML = this.city.capitalizeFirstLetter();
        email.innerHTML = this.email;
        bigImg.srcset = data.picture.large;
        medImg.src = data.picture.medium;

    }

}

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
