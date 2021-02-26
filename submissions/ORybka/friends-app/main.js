let newUsers = '';
const cardsContainer = document.querySelector('.users-container');
const sortInput = document.querySelectorAll('.sorting-input');
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
  resetUsers([...usersData]);
};

function fillCardContainer(data) {
  let userCard;
  cardsContainer.innerHTML = '';
  data.forEach((card) => {
    userCard = createCard(card);
    cardsContainer.innerHTML += userCard;
  });
}

function createCard({ picture, name, dob, email, phone, gender, location }) {
  const card = `
    <div class="user-card ${gender}">
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
    </div>
  `;
  return card;
}

const enableInputsToSort = (data) => {
  sortInput.forEach((el) =>
    el.addEventListener('click', () => {
      newUsers = sortUsers(data, el.id);
      if (el.checked && el.classList.contains('gender')) {
        newUsers = filterByGender(newUsers, el.id);
      }
      fillCardContainer(newUsers);
    })
  );
};

function sortUsers(data, id) {
  if (id === 'byAgeAscending' || id === 'byAgeDescending') {
    data.sort((a, b) => a.dob.age - b.dob.age);
    return id === 'byAgeAscending' ? data : data.reverse();
  }
  if (id === 'byNameAZ' || id === 'byNameZA') {
    data.sort((a, b) => a.name.first.localeCompare(b.name.first));
    return id === 'byNameAZ' ? data : data.reverse();
  }
  return data;
}

function filterByGender(data, id) {
  if (id === 'byGenderFemale') {
    return data.filter((user) => user.gender === 'female');
  }
  if (id === 'byGenderMale') {
    return data.filter((user) => user.gender === 'male');
  }
  return data;
}

const searchInput = document.querySelector('#user-names');
const searchByUserName = (data) => {
  newUsers = [...data];
  searchInput.addEventListener('input', () => {
    newUsers = data.filter((user) => user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) || user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()));
    if (newUsers.length === 0) {
      document.querySelector('.users-container').innerHTML = `
        <h2 class="no-matches-title">No matches...</h2>
      `;
    } else {
      fillCardContainer(newUsers);
    }
  });
};

const resetUsers = (data) => {
  document.querySelector('.reset-button').addEventListener('click', (e) => {
    e.preventDefault();
    fillCardContainer(data);
  });
};
