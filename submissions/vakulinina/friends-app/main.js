const sortByNameButton = document.querySelector('#name-sort');
const sortByAgeButton = document.querySelector('#age-sort');
const MIN_AGE = 0;
const MAX_AGE = 99;
const ASCENDING_ORDER = 'ascending';
const DESCENDING_ORDER = 'descending';
const filter = {
  nameSort: null,
  ageSort: null,
  ageFrom: MIN_AGE,
  ageTo: MAX_AGE,
  gender: 'any',
  searchValue: null
};
let allUsers

const getUsers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=16&inc=name,dob,location,email,gender,picture');
    if (!response.ok) {
      throw new Error(response.status)
    }
    const json = await response.json();
    allUsers = json.results;
  } catch (error) {
    renderError(error)
  }
};

const renderUsers = users => {
  const usersList = document.querySelector('.users');
  const fragment = document.createDocumentFragment();
  if (usersList.innerHTML) usersList.innerHTML = '';
  users.forEach(({ name, picture, dob, location, email }) => {
    const card = document.createElement('li');
    card.classList.add('user-card')
    card.innerHTML = `
    <div class="photo-wrap">
      <img class="photo" src="${picture.large}" alt="User photo">
    </div>
    <div class="user-info">
      <p class="name">${name.first} ${name.last}</p>
      <div class="row-wrap">
        <p class="age">${dob.age} years old</p>
        <p class="location" title="${location.city}">${location.city}</p>
      </div>
      <a class="email" href="mailto:${email}">${email}</a>
    </div>
    `;
    fragment.append(card)
  });
  usersList.append(fragment)
};

const renderError = error => {
  const errorNotification = document.createElement('p');
  errorNotification.classList.add('error-notification')
  errorNotification.innerHTML = `Sorry, couldn't get the data <br> ${error}`;
  document.querySelector('main').prepend(errorNotification)
};

const compareByName = (a, b) => {
  return a.name.first.toLowerCase() <= b.name.first.toLowerCase() ? -1 : 1
};

const compareByAge = (a, b) => {
  return a.dob.age - b.dob.age
};

const sortByName = users => {
  if (filter.nameSort === ASCENDING_ORDER) {
    return users.sort((a, b) => compareByName(a, b))
  } else {
    return users.sort((a, b) => compareByName(b, a))
  }
};

const sortByAge = users => {
  if (filter.ageSort === ASCENDING_ORDER) {
    return users.sort((a, b) => compareByAge(a, b))
  } else {
    return users.sort((a, b) => compareByAge(b, a))
  }
};

const filterByAge = users => {
  const [ageFrom, ageTo] = [filter.ageFrom, filter.ageTo].sort((a, b) => a - b);
  return users.filter(({ dob: { age } }) => (age >= ageFrom && age <= ageTo))
};

const filterByGender = users => {
  return users.filter(user => user.gender === filter.gender)
};

const doSearch = users => {
  return users.filter(({ name: { first, last }, location: { city } }) => {
    const fullName = `${first.toLowerCase()} ${last.toLowerCase()}`;
    return fullName.includes(filter.searchValue) || city.toLowerCase().includes(filter.searchValue)
  })
};

const filterUsers = () => {
  let filteredUsers = [...allUsers];
  if (filter.ageSort) {
    filteredUsers = sortByAge(filteredUsers);
  }
  if (filter.nameSort) {
    filteredUsers = sortByName(filteredUsers);
  }
  if (filter.ageFrom || filter.ageTo) {
    filteredUsers = filterByAge(filteredUsers);
  }
  if (filter.gender !== 'any') {
    filteredUsers = filterByGender(filteredUsers);
  }
  if (filter.searchValue) {
    filteredUsers = doSearch(filteredUsers);
  }
  renderUsers(filteredUsers)
};

const setNameSortOrder = () => {
  if (filter.nameSort === ASCENDING_ORDER) {
    filter.nameSort = DESCENDING_ORDER;
    sortByNameButton.classList.replace(ASCENDING_ORDER, DESCENDING_ORDER)
  } else {
    filter.nameSort = ASCENDING_ORDER;
    sortByNameButton.classList.remove(DESCENDING_ORDER)
    sortByNameButton.classList.add(ASCENDING_ORDER)
  }
  sortByAgeButton.classList.remove(ASCENDING_ORDER, DESCENDING_ORDER)
  filter.ageSort = null;
};

const setAgeSortOrder = () => {
  if (filter.ageSort === ASCENDING_ORDER) {
    filter.ageSort = DESCENDING_ORDER;
    sortByAgeButton.classList.replace(ASCENDING_ORDER, DESCENDING_ORDER)
  } else {
    filter.ageSort = ASCENDING_ORDER;
    sortByAgeButton.classList.remove(DESCENDING_ORDER)
    sortByAgeButton.classList.add(ASCENDING_ORDER)
  }
  sortByNameButton.classList.remove(ASCENDING_ORDER, DESCENDING_ORDER)
  filter.nameSort = null;
};

const handleInput = ({ target }) => {
  const filters = {
    'name-sort': setNameSortOrder,
    'age-sort': setAgeSortOrder,
    'age-from': () => filter.ageFrom = target.value || MIN_AGE,
    'age-to': () => filter.ageTo = target.value || MAX_AGE,
    'search-field': () => filter.searchValue = target.value.toLowerCase()
  };

  if (filters[target.id]) {
    filters[target.id]()
  } else {
    filter.gender = target.value;
  }

  filterUsers();
};

const initialize = async () => {
  const filtersBar = document.querySelector('.filters');
  await getUsers()
  renderUsers(allUsers)
  filtersBar.addEventListener('input', handleInput)
  document.querySelector('.filters-button').addEventListener('click', () => {
    filtersBar.classList.toggle('visible');
  });
};

initialize()
