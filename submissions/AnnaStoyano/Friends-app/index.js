document.addEventListener('DOMContentLoaded', function () {
    const API_PATH = 'https://randomuser.me/api/';
    const USER_COUNT = 20;
    const URL_FOR_SEARCH = `${API_PATH}?results=${USER_COUNT}`;

    fetch(URL_FOR_SEARCH)
        .then(resolve => resolve.json())
        .then(data => {
            const friendsApp = new FriendsApp(data.results);
            friendsApp.start();
        })
        .catch(() => {
            document.location.reload();
        })
});

class FriendsApp {
    constructor(users) {
        this.resultsWrapper = document.querySelector('.result');
        this.cards = users.map(item => new UserCard(item));
        this.dipslayCards = this.cards;
        this.previouseDisplay = this.dipslayCards;
        this.filterByName();
        this.filterByAge();
        this.filterByGender();
        this.filterByCity();
        this.filterByEmail();
        this.reset();
    }

    start() {
        this.render();
    }

    render() {
        this.resultsWrapper.innerHTML = '';
        this.dipslayCards.forEach(({card}) => this.resultsWrapper.insertAdjacentElement('afterbegin', card));
    }

    filterByName() {
        const nameWrapper = document.querySelector('.menu_item-name');
        nameWrapper.addEventListener('click', ({target}) => {
            if (target.classList.contains('name-alphabetically')) {
                this.dipslayCards = this.dipslayCards.sort((a, b) => a.name > b.name ? -1 : 1);
            }
            if (target.classList.contains('name-nonalphabetically')) {
                this.dipslayCards = this.dipslayCards.sort((a, b) => a.name < b.name ? -1 : 1);
            }
            this.render();
        });
    }

    filterByAge() {
        const ageButton = document.querySelector('.age_btn');
        ageButton.addEventListener('click', () => {
            if (ageButton.classList.contains('clicked')) {
                this.dipslayCards = this.dipslayCards.sort((a, b) => a.age < b.age ? -1 : 1);
                ageButton.classList.remove('clicked');
            } else {
                this.dipslayCards = this.dipslayCards.sort((a, b) => a.age > b.age ? -1 : 1);
                ageButton.classList.add('clicked');
            }
            this.render();
        });
    }

    filterByGender() {
        const genderWrapper = document.querySelector('.menu_item-gender');
        genderWrapper.addEventListener('click', ({target}) => {
            if (target.value != 'all' && target.value) {
                this.dipslayCards = this.dipslayCards.filter(card => card.user.gender == target.value);
            }
            this.render();
        });
    }

    filterByCity() {
        const cityInput = document.querySelector('.text-input--city');
        const cityWrapper = document.querySelector('.menu_item-city');
        cityWrapper.addEventListener('click', () => {
            filterByInputText.bind(this)(cityInput, cityWrapper);
        });
    }

    filterByEmail() {
        const emailInput = document.querySelector('.text-input--email');
        const emailWrapper = document.querySelector('.menu_item-email');
        emailWrapper.addEventListener('click', () => {
            filterByInputText.bind(this)(emailInput, emailWrapper);
        });
    }

    reset() {
        const resetButton = document.querySelector('.btn.reset');
        const inputs = document.querySelectorAll('.menu_item_text-input');
        const genderAll = document.querySelector('.radio-input.all');
        resetButton.addEventListener('click', () => {
            this.dipslayCards = this.cards;
            inputs.forEach(input => input.value = '');
            genderAll.checked = true;
            this.render();
        });
    }
}

const filterByInputText = function (input, inputWrapper) {
    inputWrapper.addEventListener('click', () => {
        this.previouseDisplay = this.dipslayCards;
    });
    input.addEventListener('input', ({
        target
    }) => {
        if (input.dataset.value == 'city') {
            this.dipslayCards = this.dipslayCards.filter(card => card.user.location[input.dataset.value].startsWith(target.value));
        } else {
            this.dipslayCards = this.dipslayCards.filter(card => card.user[input.dataset.value].startsWith(target.value));
        }
        this.render();
    });
}

class UserCard {
    constructor(userInfo) {
        this.card = this.createUserCard();
        this.name = `${userInfo.name.first} ${userInfo.name.last}`;
        this.age = `${userInfo['dob'].age} years old`;
        this.city = userInfo['location'].city;
        this.email = userInfo.email;
        this.user = userInfo;
        this.fillUserCard(userInfo);
    }

    createUserCard() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<picture class='user-photo'>\n
                            <source  class='big-user-img user-img' media='(min-width: 600px)'>\n
                            <img class='med-user-img user-img'>\n
                          </picture>\n
                          <h3 class='name'></h3>\n
                          <span class='age'></span>\n
                          <span class='city'></span>\n
                          <span class='email'></span>`;
        return card;
    }

    fillUserCard(userInfo) {
        const name = this.card.querySelector('.name');
        const age = this.card.querySelector('.age');
        const city = this.card.querySelector('.city');
        const email = this.card.querySelector('.email');
        const bigImg = this.card.querySelector('.big-user-img');
        const medImg = this.card.querySelector('.med-user-img');

        name.innerHTML = this.name;
        age.innerHTML = this.age;
        city.innerHTML = this.city;
        email.innerHTML = this.email;
        bigImg.srcset = userInfo.picture.large;
        medImg.src = userInfo.picture.medium;

    }
}
