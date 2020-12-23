document.addEventListener('DOMContentLoaded', function () {
    const API_PATH = 'https://randomuser.me/api/';
    const USER_COUNT = 20;
    const URL_FOR_SEARCH = `${API_PATH}?results=${USER_COUNT}`;

    fetch(URL_FOR_SEARCH)
        .then(resolve => resolve.json())
        .then(data => {
            const friendsApp = new FriendsApp(data.results);
            friendsApp.start();
        });
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
    }

    start() {
        this.render(this.dipslayCards);
    }

    render() {
        this.resultsWrapper.innerHTML = '';
        this.dipslayCards.forEach(({card}) => this.resultsWrapper.insertAdjacentElement('afterbegin', card));
    }

    filterByName() {
        this.filterByNameAlphabet();
        this.filterByNameNonAlphabet();
    }

    filterByNameAlphabet() {
        const alphabetBtn = document.querySelector('.name-alphabetically');
        alphabetBtn.addEventListener('click', () => {
            this.dipslayCards = this.dipslayCards.sort((a, b) => a.name > b.name ? -1 : 1);
            this.render();
        });
    }

    filterByNameNonAlphabet() {
        const nonAlphabetBtn = document.querySelector('.name-nonalphabetically');
        nonAlphabetBtn.addEventListener('click', () => {
            this.dipslayCards = this.dipslayCards.sort((a, b) => a.name > b.name ? 1 : -1);
            this.render();
        });
    }

    filterByAge() {
        const ageBtn = document.querySelector('.age_btn');
        ageBtn.addEventListener('click', () => {
            if (!ageBtn.classList.contains('LowToHigh')) { // if button is clicked show from low to high
                this.dipslayCards = this.dipslayCards.sort((a, b) => a.age > b.age ? -1 : 1);
                ageBtn.classList.add('LowToHigh'); // adding class helps to find out clicking on button
            } else {
                this.dipslayCards = this.dipslayCards.sort((a, b) => a.age > b.age ? 1 : -1); // if button isn't clicked show from high to low
                ageBtn.classList.remove('LowToHigh');
            }
            this.render();
        });
    }

    filterByGender() {
        const manRadio = document.querySelector('.radio-input.man');
        const womanRadio = document.querySelector('.radio-input.woman');
        const allRadio = document.querySelector('.radio-input.all');
        const genderWrapper = document.querySelector('.menu_item-gender');
        genderWrapper.addEventListener('click', () => {
            if (womanRadio.checked) {
                this.dipslayCards = this.dipslayCards.filter(card => card.user.gender == 'female');
            }
            if (manRadio.checked) {
                this.dipslayCards = this.dipslayCards.filter(card => card.user.gender == 'male');
            }
            if (allRadio.checked) {
                this.dipslayCards = this.cards;
            }
            this.render();
        });
    }

    filterByCity() {
        const cityInput = document.querySelector('.text-input--city');
        const cityWrapper = document.querySelector('.menu_item-city');
        cityWrapper.addEventListener('click', () => {
            this.previouseDisplay = this.dipslayCards;
        });
        cityInput.addEventListener('input', ({target}) => {
            this.dipslayCards = this.dipslayCards.filter(card => card.user.location.city.startsWith(target.value));
            if (this.dipslayCards.length == 0 || target.value == '') {
                this.dipslayCards = this.previouseDisplay;
            }
            this.render();
        });
    }

    filterByEmail() {
        const emailInput = document.querySelector('.text-input--email');
        const emailWrapper = document.querySelector('.menu_item-email');
        emailWrapper.addEventListener('click', () => {
            this.previouseDisplay = this.dipslayCards;
        });
        emailInput.addEventListener('input', ({target}) => {
            this.dipslayCards = this.dipslayCards.filter(card => card.user.email.includes(target.value));
            if (this.dipslayCards.length == 0 || target.value == '') {
                this.dipslayCards = this.previouseDisplay;
            }
            this.render();
        });
    }
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
        card.innerHTML =
            "<picture class='user-photo'>" +
            "<source  class='big-user-img user-img' media='(min-width: 600px)'>" +
            "<img class='med-user-img user-img'>" +
            "</picture>" +
            "<h3 class='name'></h3>" +
            "<span class='age'></span>" +
            "<span class='city'></span>" +
            "<span class='email'></span>";
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
