const USERS_AMOUNT = 20;
const RANDOM_USER_URL = `https://randomuser.me/api/?results=${USERS_AMOUNT}`;

const SortType = {
    ASCENDING: 'ascending',
    DESCENDING: 'descending',
};

const Gender = {
    ALL: 'all',
    FEMALE: 'female',
    MALE: 'male',
};

const state = {
    users: [],
    search: '',
    age: null,
    name: null,
    gender: Gender.ALL,
};

const listElement = document.querySelector('.friends__list');
const formElement = document.querySelector('.form');
const resetElement = document.querySelector('.form__reset');

const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
};

const handleResetClick = () => {
    state.search = '';
    state.age = null;
    state.name = null;
    state.gender = Gender.ALL;

    render(state);
};

const filterByGender = (users, gender) => {
    if (gender === Gender.ALL) {
        return users;
    }

    return users.filter(user => user.gender === gender);
};

const filterByQuery = (users, query) => {
    if (query === '') {
        return users;
    }

    return users.filter(
        user => user.name.first
            .toLowerCase()
            .includes(query)
    );
};

const sortByName = (users, sortType) => {
    switch (sortType) {
        case 'a':
            return users.sort((a, b) => {
                const firstNAme = a.name.first.toUpperCase();
                const secondName = b.name.first.toUpperCase();

                if (firstNAme < secondName) {
                    return -1;
                }
                if (firstNAme > secondName) {
                    return 1;
                }

                return 0;
            });
        case 'z':
            return users.sort((a, b) => {
                const firstNAme = a.name.first.toUpperCase();
                const secondName = b.name.first.toUpperCase();

                if (firstNAme < secondName) {
                    return 1;
                }
                if (firstNAme > secondName) {
                    return -1;
                }

                return 0;
            });
        default:
            return users;
    }
};

const sortBy = (users, sortType) => {
    switch (sortType) {
        case SortType.ASCENDING:
            return users.sort((a, b) => a.dob.age - b.dob.age);
        case SortType.DESCENDING:
            return users.sort((a, b) => b.dob.age - a.dob.age);
        default:
            return users;
    }
};

const renderCard = (data) => {
    const { name, dob, gender, email, picture } = data;

    const markup = `
        <li class="friends__item">
          <section class="friend-card">
            <div class="friend-card__image-wrapper">
              <img class="friend-card__image" src=${picture.large} alt=${name.first}>
            </div>
            <h3 class="friend-card__title">${name.first} ${name.last}</h3>
            <a class="friend-card__mail" href="mailto:${email}">${email}</a>        
            <p class="friend-card__sex">Gender - ${gender}</p>
            <p class="friend-card__age">Age - ${dob.age}</p>
          </section>
        </li>
    `;

    return createElement(markup);
};

const renderCards = (cards, target) => {
    const fragment = document.createDocumentFragment();
    cards.forEach(card => fragment.appendChild(renderCard(card)));

    target.appendChild(fragment);
};

const render = (state) => {
    listElement.innerHTML = '';
    const sorted = sortBy(sortByName(state.users, state.name), state.age);
    const filteredByQuery = filterByQuery(sorted, state.search);
    const filteredUsers = filterByGender(filteredByQuery, state.gender);
    renderCards(filteredUsers, listElement);
};

const loadUsers = (url) => {
    return fetch(url)
        .then(res => res.json())
        .then(({ results }) => {
            state.users = results;
            return results;
        }).catch((error) => {
            console.log(error);
        });
};

const handleFormInput = (evt) => {
    state[evt.target.name] = evt.target.value;

    render(state);
};

const init = async () => {
    await loadUsers(RANDOM_USER_URL);
    render(state);

    resetElement.addEventListener('click', handleResetClick);
    formElement.addEventListener('input', handleFormInput);
};

init();
