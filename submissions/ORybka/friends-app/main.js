let filteredUsers = '';
const cardsContainer = document.querySelector('.users-container');
const sortInput = document.querySelectorAll('.radio-input');
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

const fetchUsers = async () => {
  const usersUrl = 'https://randomuser.me/api/?results=30';

  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(usersUrl);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const { results } = await response.json();
        return results;
      }
    } catch (e) {
      console.error(e);
    }
  }
};

const initApp = async () => {
  const usersData = await fetchUsers();
  fillCardContainer(usersData);
  enableInputsToSort(usersData);
  searchByUserName(usersData);
  resetUsers(usersData);
};

function fillCardContainer(data) {
  let userCard;
  cardsContainer.innerHTML = '';
  data.forEach((card) => {
    userCard = createCard(card);
    cardsContainer.appendChild(userCard);
  });
}

function createCard({ picture, name, dob, email, phone, gender, location }) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <div class="card-image-container">
      <img class="card-image" src="https://picsum.photos/200/300?random=${dob.age}" alt="card-image" >
    </div>
    <div class="user-image-container">
      <img class="user-image" src="${picture.large}" alt="user-image" >
    </div>
    <div class="col user-information">
      <h3 class="user-name">${name.first} ${name.last}</h3>
      <p class="user-age">${dob.age} years old</p>
      <div class="row contact-information">
        <a class="user-email" href="mailto:${email}">
          <span class="material-icons">email</span>
        </a>
        <a class="user-phone" href="tel:${phone}">
          <span class="material-icons">phone</span>
        </a>
        <a class="user-location" href="https://www.google.com.ua/maps/place/${location.city}" target="_blank">
          <span class="material-icons">location_on</span>
        </a>
      </div>
    </div>
  `;
  setCardBackground(card, gender);
  return card;
}

function setCardBackground(card, gender) {
  return (card.className = `user-card ${gender}`);
}

const enableInputsToSort = (data) => {
  sortInput.forEach((el) =>
    el.addEventListener('click', () => {
      if (el.name === 'byAgeDescending' || el.name === 'byAgeAscending' || el.name === 'byNameAZ' || el.name === 'byNameZA') {
        sortUsers(data, el.name);
        fillCardContainer(filteredUsers);
      } else {
        filterByGender(data, el.name);
        fillCardContainer(filteredUsers);
      }
    })
  );
};

function sortUsers(data, name) {
  const sortFunctions = {
    byAgeAscending: (a, b) => sortByAge(a, b),
    byAgeDescending: (a, b) => sortByAge(b, a),
    byNameAZ: (a, b) => sortByName(a, b),
    byNameZA: (a, b) => sortByName(b, a),
  };
  if (sortFunctions[name]) {
    filteredUsers = [...data].sort(sortFunctions[name]);
    return filteredUsers;
  }
}

function sortByAge(a, b) {
  return a.dob.age - b.dob.age;
}

function sortByName(a, b) {
  const userA = a.name.first.toLowerCase();
  const userB = b.name.first.toLowerCase();
  if (userA > userB) {
    return 1;
  }
  if (userA < userB) {
    return -1;
  }
  return 0;
}

function filterByGender(data, name) {
  filteredUsers = [...data];
  if (name === 'byGenderFemale') {
    filteredUsers = data.filter((user) => user.gender === 'female');
  } else if (name === 'byGenderMale') {
    filteredUsers = data.filter((user) => user.gender === 'male');
  }
  return filteredUsers;
}

const searchInput = document.querySelector('#user-names');
const searchByUserName = (data) => {
  filteredUsers = [...data];
  searchInput.addEventListener('input', () => {
    filteredUsers = data.filter((user) => user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) || user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()));
    if (filteredUsers.length === 0) {
      document.querySelector('.users-container').innerHTML = `
        <h2 class="no-matches-title">No matches...</h2>
      `;
    } else {
      fillCardContainer(filteredUsers);
    }
  });
};

const resetUsers = (data) => {
  document.querySelector('.reset-button').addEventListener('click', (e) => {
    e.preventDefault();
    fillCardContainer(data);
  });
};
