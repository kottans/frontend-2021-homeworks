const HUMANS_LINK =
  'https://randomuser.me/api/?nat=us&results=36&inc=gender,name,picture,dob&seed=06b64d62bc01d624a';
const OK_STATUS = 200;
const DEBOUNCE_DELAY = 500;

const searchBtn = document.getElementById('search-btn');
const rightPane = document.getElementById('right-pane');
const cardsHolder = document.getElementById('cards-holder');
const optionGroup = document.getElementById('option-group');
const filterButtons = document.querySelectorAll('button[data-filter]');
const nameInput = document.getElementById('name-input');
const errorNotice = document.getElementById('error-notice');
const loader = document.getElementById('loader');

let humansOriginState;
const noFilter = 'none';

const currentState = {
  humans: undefined,
  sort: 'a-z',
  filter: noFilter,
  searchValue: '',
};

const handleSearchButton = function () {
  rightPane.classList.toggle('visible');
};

let timer;
const handleInput = function () {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    currentState.searchValue = this.value.toLowerCase();
    filterHumans(currentState.filter);
    sortHumans(currentState.sort);
    updateCards(currentState.humans);
    timer = null;
  }, DEBOUNCE_DELAY);
};

const handleOptionClick = function ({ target }) {
  const button = target.closest('button');
  if (!button) return;
  const { dataset } = button;
  if (dataset.sort) {
    const prevActiveSortBtn = document.querySelector(
      'button[data-sort].active',
    );
    prevActiveSortBtn.classList.remove('active');
    button.classList.add('active');
    sortHumans(dataset.sort);
  }
  if (dataset.filter) {
    if (currentState.filter === dataset.filter) {
      button.classList.toggle('active');
      filterHumans(noFilter);
    } else {
      const prevActiveFilterBtn = document.querySelector(
        'button[data-filter].active',
      );
      if (prevActiveFilterBtn) prevActiveFilterBtn.classList.remove('active');
      button.classList.add('active');
      filterHumans(dataset.filter);
    }
    sortHumans(currentState.sort);
  }
  updateCards(currentState.humans);
};

const filterHumans = function (filterOption) {
  const humansFilteredByName = humansOriginState.filter((elem) =>
    elem.name.first.toLowerCase().startsWith(currentState.searchValue),
  );
  currentState.humans =
    filterOption === noFilter
      ? humansFilteredByName
      : humansFilteredByName.filter(({ gender }) => gender === filterOption);
  currentState.filter = filterOption;
};

const sortByAge = (a, b) => (a.dob.age <= b.dob.age ? 1 : -1);
const sortByName = (a, b) =>
  a.name.first.toLowerCase() >= b.name.first.toLowerCase() ? 1 : -1;

const sortHumans = function (sortOption) {
  switch (sortOption) {
    case 'a-z':
      currentState.humans.sort((a, b) => sortByName(a, b));
      break;

    case 'z-a':
      currentState.humans.sort((a, b) => sortByName(b, a));
      break;

    case 'young':
      currentState.humans.sort((a, b) => sortByAge(b, a));
      break;

    case 'old':
      currentState.humans.sort((a, b) => sortByAge(a, b));
      break;
  }

  currentState.sort = sortOption;
};

const updateCards = function (arr) {
  cardsHolder.innerHTML = '';
  const fragment = document.createDocumentFragment();
  arr.forEach(({ name, picture, dob, gender }) => {
    const newElem = document.createElement('div');
    newElem.classList.add('card');
    const template = `
    <p class="u-name">${name.first} ${name.last}</p>
    <div class="splitter">
      <img src="${picture.large}" alt="User Photo">
      <div class="data-group">
        <p class="label">Age</p>
        <p class="data">${dob.age}</p>
        <p class="label">Gender</p>
        <p class="data">${gender}</p>
      </div>
    </div>`;
    newElem.innerHTML = template;
    fragment.appendChild(newElem);
  });
  cardsHolder.appendChild(fragment);
};

const getHumans = function () {
  return fetch(HUMANS_LINK)
    .then((res) => {
      if (res.status !== OK_STATUS) {
        throw new Error(`Couldn't fetch data. ${res.status}`);
      }
      return res.json();
    })
    .then(({ results }) => {
      humansOriginState = results;
      currentState.humans = results;
      loader.classList.add('hide');
    })
    .catch((err) => {
      errorNotice.innerHTML = `Sorry! We couldn't get data. <br> The problem is: ${err} !`;
    });
};

const init = async () => {
  await getHumans();
  sortHumans(currentState.sort);
  updateCards(currentState.humans);

  searchBtn.addEventListener('click', handleSearchButton);

  optionGroup.addEventListener('click', handleOptionClick);

  nameInput.addEventListener('input', handleInput);
};

init();
