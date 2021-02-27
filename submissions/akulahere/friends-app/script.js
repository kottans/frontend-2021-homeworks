let allUsers;
let currentFilteredUsers;
const currentFilters = [];
const nameSortButton = document.getElementById('name-sort');
const ageSortButton = document.getElementById('age-sort');
const genderFilter = document.querySelector('.gender-filter');
const nameFilter = document.querySelector('.search-field');
const NAME_FILTER = 'name';
const GENDER_FILTER = 'gender';
const ASCENDING_ORDER = 'ascending';
const DESCENDING_ORDER = 'descending';
const buttonArrays = [nameSortButton, ageSortButton];

const filter = {
  gender: 'any',
  nameFilter: null,
};

const compareUserGender = (user) => user.gender === filter.gender ? true : false;
const comparerUserByName = ({ name: { first, last }}) =>
  first.concat(last).toLowerCase().includes(filter.nameFilter.toLowerCase()) ? true : false;

const makeFilter = {
  [NAME_FILTER]: comparerUserByName,
  [GENDER_FILTER]: compareUserGender,
}

const filterUsers = () => {
  currentFilteredUsers = [...allUsers];
  currentFilters.forEach(filter => currentFilteredUsers = currentFilteredUsers.filter(user => makeFilter[filter](user)));
  if (ageSortButton.classList.contains(ASCENDING_ORDER) || ageSortButton.classList.contains(DESCENDING_ORDER)) {
    sortByAge(currentFilteredUsers);
  }
  if (nameSortButton.classList.contains(ASCENDING_ORDER) || nameSortButton.classList.contains(DESCENDING_ORDER)) {
    sortByName(currentFilteredUsers);
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
  if (nameSortButton.classList.contains(ASCENDING_ORDER)) {
    users.sort((a, b) => compareByName(a, b));
  } else {
    users.sort((a, b) => compareByName(b, a));
  }
  return users;
};

const sortByAge = (users) => {
  if (ageSortButton.classList.contains(ASCENDING_ORDER)) {
    users.sort((a, b) => compareByAge(a, b));
  } else {
    users.sort((a, b) => compareByAge(b, a));
  }
  return users;
};

const toggleSortIcon = (buttonClicked) => {
  if (!(buttonClicked.classList.contains(ASCENDING_ORDER) || buttonClicked.classList.contains(DESCENDING_ORDER))) {
    buttonClicked.classList.add(ASCENDING_ORDER);
  } else {
    buttonClicked.classList.toggle(ASCENDING_ORDER);
    buttonClicked.classList.toggle(DESCENDING_ORDER);
  }
  buttonArrays.forEach(button => {
    if (button !== buttonClicked) {
      button.classList.remove(ASCENDING_ORDER);
      button.classList.remove(DESCENDING_ORDER);
    }
  })
}

const initialize = async () => {
  await getUsers();
  renderUsers(allUsers);
};

nameSortButton.addEventListener('click', () => {
  toggleSortIcon(nameSortButton);
  sortByName(currentFilteredUsers);
  renderUsers(currentFilteredUsers);
});

ageSortButton.addEventListener('click', () => {
  toggleSortIcon(ageSortButton);
  sortByAge(currentFilteredUsers);
  renderUsers(currentFilteredUsers);
});

genderFilter.addEventListener('input', ({target}) => {
  filter.gender = target.value;
  if (!currentFilters.includes(GENDER_FILTER)) {
    currentFilters.push(GENDER_FILTER);
  }
  if (target.value === 'any') {
    currentFilters.splice(currentFilters.indexOf(GENDER_FILTER), 1);
  }
  filterUsers();
  renderUsers(currentFilteredUsers);
});


nameFilter.addEventListener('input', ({target}) => {
  filter.nameFilter = target.value;
  if (!currentFilters.includes(NAME_FILTER)) {
    currentFilters.push(NAME_FILTER);
  }
  if (target.value === "") {
    currentFilters.splice(currentFilters.indexOf(NAME_FILTER), 1);
  }
  filterUsers();
  renderUsers(currentFilteredUsers);
})

initialize();
