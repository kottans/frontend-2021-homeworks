const minAge = 0;
const maxAge = 99;
const filter = {
  nameSort: null,
  ageSort: null,
  ageFrom: minAge,
  ageTo: maxAge,
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
    const errorNotification = document.createElement('p');
    errorNotification.classList.add('error-notification')
    errorNotification.innerHTML = `Sorry, couldn't get the data <br> ${error}`;
    document.querySelector('main').prepend(errorNotification)
  }
  return allUsers
}

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

const compareByName = (a, b) => {
  return a.name.first.toLowerCase() <= b.name.first.toLowerCase() ? -1 : 1
};

const compareByAge = (a, b) => {
  return a.dob.age - b.dob.age
};

const sortByName = users => {
  if (filter.nameSort === "asc") {
    return users.sort((a, b) => compareByName(a, b))
  } else {
    return users.sort((a, b) => compareByName(b, a))
  }
};

const sortByAge = users => {
  if (filter.ageSort === "asc") {
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

const handleInput = ({ target }) => {
  const sortByNameButton = document.querySelector('#name-sort');
  const sortByAgeButton = document.querySelector('#age-sort');
  switch (target.id) {
    case 'name-sort':
      if (filter.nameSort === 'asc') {
        filter.nameSort = 'desc';
        sortByNameButton.classList.remove('asc')
        sortByNameButton.classList.add('desc')
      } else {
        filter.nameSort = 'asc';
        sortByNameButton.classList.remove('desc')
        sortByNameButton.classList.add('asc')
      }
      sortByAgeButton.classList.remove('asc', 'desc')
      filter.ageSort = null;
      break;
    case 'age-sort':
      if (filter.ageSort === 'asc') {
        filter.ageSort = 'desc';
        sortByAgeButton.classList.remove('asc')
        sortByAgeButton.classList.add('desc')
      } else {
        filter.ageSort = 'asc';
        sortByAgeButton.classList.remove('desc')
        sortByAgeButton.classList.add('asc')
      }
      sortByNameButton.classList.remove('asc', 'desc')
      filter.nameSort = null;
      break;
    case 'age-from':
      filter.ageFrom = target.value || minAge;
      break;
    case 'age-to':
      filter.ageTo = target.value || maxAge;
      break;
    case 'search-field':
      filter.searchValue = target.value.toLowerCase();
      break;
    case 'gender-male':
    case 'gender-female':
    case 'gender-any':
      filter.gender = target.value;
  }
  filterUsers()
};

const initialize = async () => {
  const filtersBar = document.querySelector('.filters');
  await getUsers()
  renderUsers(allUsers)
  filtersBar.oninput = handleInput;
  document.querySelector('.sort-buttons').onclick = handleInput;
  document.querySelector('.filters-button').onclick = () => {
    filtersBar.classList.toggle('visible')
  }
};

initialize()
