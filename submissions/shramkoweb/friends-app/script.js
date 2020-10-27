const USERS_AMOUNT = 20;
const RANDOM_USER_URL = `https://randomuser.me/api/?results=${USERS_AMOUNT}`;

const SortType = {
    ASCENDING: 'ascending',
    DESCENDING: 'descending',
    'A-Z': 'a',
    'Z-A': 'z',
    DEFAULT: 'default',
};

const Gender = {
    ALL: 'all',
    FEMALE: 'female',
    MALE: 'male',
};

const state = {
    users: [],
    search: '',
    sorting: SortType.DEFAULT,
    gender: Gender.ALL,
};

const listElement = document.querySelector('.friends__list');
const formElement = document.querySelector('.form');
const resetElement = document.querySelector('.form__reset');
const notificationElement = document.querySelector('.notification');

const handleResetClick = () => {
    state.search = '';
    state.sorting = SortType.DEFAULT;
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

const sortAscending = (users) => users.slice().sort((a, b) => a.dob.age - b.dob.age);
const sortDescending = (users) => users.slice().sort((a, b) => b.dob.age - a.dob.age);
const sortByName = (users, isReverse = false) => {
    const sorted = users.slice().sort((a, b) => {
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

    if (isReverse) {
        return sorted.reverse();
    }

    return sorted;
};
const defaultSort = (users) => users;


const sortingTypeMap = {
    [SortType.ASCENDING]: sortAscending,
    [SortType.DESCENDING]: sortDescending,
    [SortType['A-Z']]: (users) => sortByName(users),
    [SortType['Z-A']]: (users) => sortByName(users, true),
    'default': defaultSort,

};

const sortUsers = (users, compareType) => {
    if (compareType === SortType['A-Z'] || compareType === SortType['Z-A']) {
        return sortingTypeMap[compareType](users);
    }

    return sortingTypeMap[compareType](users);
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
    const sorted = sortUsers(state.users, state.sorting);
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
            notificationElement.textContent = error;
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
    formElement.addEventListener('input', debounced(300, handleFormInput));
};

init();
