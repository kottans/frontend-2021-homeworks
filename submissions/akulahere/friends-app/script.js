let allUsers;
let currentFilteredUsers;
const currentFilters = [];
const nameSortButton = document.getElementById('name-sort');
const ageSortButton = document.getElementById('age-sort');
const genderFilter = document.querySelector('.gender-filter');
const nameFilter = document.querySelector('.search-field');

const filter = {
  gender: 'any',
  nameFilter: null,
};

const filterUserByGender = (user) => user.gender === filter.gender;
const filterUserByName = ({ name: { first, last }}) =>
  first.concat(last).toLowerCase().includes(filter.nameFilter.toLowerCase());

const makeFilter = {
  name: filterUserByName,
  gender: filterUserByGender,
}

const filterUsers = () => {
  currentFilteredUsers = [...allUsers];
  if (currentFilters.length > 0) {
     currentFilters.forEach(filter => currentFilteredUsers = currentFilteredUsers.filter(user => makeFilter[filter](user)));
  }
}

const getUsers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=100&inc=name,dob,location,email,gender,picture');
    if (response.ok) {
      const responseJson = await response.json();
      allUsers = responseJson.results;
      currentFilteredUsers = [...allUsers];
    } else {
      throw new Error(response.status);
    }
  }
  catch (error) {
    renderError(error);
  }
}

const renderError = (error) => {
  const errorNotification = document.createElement('p');
  errorNotification.innerHTML = `Network error! Status code: ${error}`;
  document.querySelector('main').prepend(errorNotification);
}

const renderUsers = (users) => {
  const usersList = document.querySelector('.users');
  const fragment = document.createDocumentFragment();
  if (usersList.innerHTML) usersList.innerHTML = '';
  users.forEach(({ name, picture, dob, location, email }) => {
    const card = document.createElement('li');
    card.classList.add('person-card')
    card.innerHTML = `
      <div class="photo-container">
        <img class="photo" src="${picture.large}" alt="User photo">
      </div>
      <div class="user-info">
        <p class="name">${name.first} ${name.last}</p>
         <p class="age">${dob.age} years old</p>
         <p class="location" title="${location.city}">${location.city}</p>
        <a class="email" href="mailto:${email}">${email}</a>
      </div>
    `;
    fragment.append(card)
  });
  usersList.append(fragment)
};

const compareByName = (a, b) => a.name.first.toLowerCase() <= b.name.first.toLowerCase() ? -1 : 1;
const compareByAge = (a, b) => a.dob.age - b.dob.age;

const sortByName = (users) => {
  if (nameSortButton.dataset.sortType !== 'A-Z') {
    nameSortButton.dataset.sortType = 'A-Z';
    users.sort((a, b) => compareByName(a, b));
  } else {
    nameSortButton.dataset.sortType = 'Z-A';
    users.sort((a, b) => compareByName(b, a));
  }
  return users;
};

const sortByAge = (users) => {
  if (ageSortButton.dataset.sortType !== '1-99') {
    ageSortButton.dataset.sortType = '1-99';
    users.sort((a, b) => compareByAge(a, b));
  } else {
    ageSortButton.dataset.sortType = '99-1';
    users.sort((a, b) => compareByAge(b, a));
  }
  return users;
};

const initialize = async () => {
  await getUsers();
  renderUsers(allUsers);
};

nameSortButton.addEventListener('click', () => {
  sortByName(currentFilteredUsers);
  renderUsers(currentFilteredUsers);
});

ageSortButton.addEventListener('click', () => {
  sortByAge(currentFilteredUsers);
  renderUsers(currentFilteredUsers);
});

genderFilter.addEventListener('input', ({target}) => {
  filter.gender = target.value;
  if (!currentFilters.includes('gender')) {
    currentFilters.push('gender');
  }
  if (target.value === 'any') {
    currentFilters.splice(currentFilters.indexOf('gender'), 1);
  }
  filterUsers();
  renderUsers(currentFilteredUsers);
});


nameFilter.addEventListener('input', ({target}) => {
  filter.nameFilter = target.value;
  if (!currentFilters.includes('name')) {
    currentFilters.push('name');
  }
  if (target.value === "") {
    currentFilters.splice(currentFilters.indexOf('name'), 1);
  }
  filterUsers();
  renderUsers(currentFilteredUsers);
})

initialize();
