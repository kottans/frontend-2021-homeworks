const HUMANS_LINK =
  'https://randomuser.me/api/?nat=us&results=36&inc=gender,name,picture,dob&seed=06b64d62bc01d624a';

const searchBtn = document.getElementById('search-btn');
const rightPane = document.getElementById('right-pane');
const cardsHolder = document.getElementById('cards-holder');
const optionGroup = document.getElementById('option-group');
const sortButtons = document.querySelectorAll('button[data-sort]');
const filterButtons = document.querySelectorAll('button[data-filter]');
const nameInput = document.getElementById('name-input');
const errorNotice = document.getElementById('error-notice');
const loader = document.getElementById('loader');

let humansOriginState;

const currentState = {
  humans: undefined,
  sort: 'a-z',
  filter: 'none',
  searchValue: '',
};

const handleSearcBtn = function () {
  rightPane.classList.toggle('visible');
};

const handleInput = function () {
  currentState.searchValue = this.value.toLowerCase();
  filterHumans(currentState.filter);
  sortHumans(currentState.sort);
  updateCards(currentState.humans);
};

const handleOptionClick = function (e) {
  const button = e.target.closest('button');
  if (!button) return;
  if (button.dataset.sort) {
    sortButtons.forEach((button) => button.classList.remove('active'));
    button.classList.add('active');
    sortHumans(button.dataset.sort);
  }
  if (button.dataset.filter) {
    if (currentState.filter === button.dataset.filter) {
      button.classList.toggle('active');
      filterHumans('none');
    } else {
      filterButtons.forEach((button) => button.classList.remove('active'));
      button.classList.add('active');
      filterHumans(button.dataset.filter);
    }
    sortHumans(currentState.sort);
  }
  updateCards(currentState.humans);
};

const filterHumans = function (filterOption) {
  const searchedName = humansOriginState.filter((elem) =>
    elem.name.first.toLowerCase().startsWith(currentState.searchValue),
  );
  if (filterOption === 'none') {
    currentState.humans = searchedName;
  } else {
    currentState.humans = searchedName.filter(
      (elem) => elem.gender === filterOption,
    );
  }
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
  arr.forEach((elem) => {
    const newElem = document.createElement('div');
    newElem.classList.add('card');
    const template = `
    <p class="u-name">${elem.name.first} ${elem.name.last}</p>
    <div class="splitter">
      <img src="${elem.picture.large}" alt="User Photo">
      <div class="data-group">
        <p class="label">Age</p>
        <p class="data">${elem.dob.age}</p>
        <p class="label">Gender</p>
        <p class="data">${elem.gender}</p>
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
      if (res.status !== 200) {
        throw new Error(`Couldn't fetch data. ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      humansOriginState = data.results;
      currentState.humans = data.results;
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

  searchBtn.addEventListener('click', handleSearcBtn);

  optionGroup.addEventListener('click', handleOptionClick);

  nameInput.addEventListener('input', handleInput);
};

init();
