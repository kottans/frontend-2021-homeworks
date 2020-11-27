const searchInput = document.querySelector('.search-input');
const sortAge = document.querySelector('.sort-age');
const sortName = document.querySelector('.sort-name');
const mainContent = document.querySelector('.main-content');
const filterGender = document.querySelector('.gender-filter');
const ageAscending = document.getElementById('age-ascending');
const ageDescending = document.getElementById('age-descending');
const nameAscending = document.getElementById('name-ascending');
const nameDescending = document.getElementById('name-descending');
const url = 'https://randomuser.me/api/?results=30';
let users = [];

const loadUsers = async () => {
  try {
    const res = await fetch(url);
    const { results } = await res.json();
    users = results;
  }
  catch(error) {
    mainContent.innerHTML = `<p>Oops! Here is the error ${error}</p>`;
  }
}

function renderCards(arr) {
  let card = '';
  
  arr.forEach(({name, picture, dob, email}) => {
    const template = `<div class="card">
      <div class="card__content">
        <figure class="card__photo">
          <img src=${picture.large} alt="photo">
        </figure>
        <div class="card__info">
          <p class="card__name">${name.first} ${name.last}</p>
          <p class="card__age">${dob.age} y.o.</p>
          <a href="mailto:${email}" class="card__email">${email}</a>
        </div>
      </div>
    </div>`
    card += template;
  })
  mainContent.innerHTML = card;
}

function filterBySearch(arr, str) {
  return arr.filter( el => `${el.name.first}${el.name.last}`.toLowerCase().includes(str.toLowerCase()));
}

function filterByGender(value, arr) {
  if (value === 'all') {
    return arr;
  } 
  return arr.filter(el => el.gender === value);
}

function findChecked(element) {
  let checked;
  const inputs = element.querySelectorAll('input');
  for (let input of inputs) {
    if (input.checked) {
      checked = input;   
    }
  }
  return checked;
}

function sortByNameAsc(arr) {
	return arr.sort(function(a, b){
    return a.name.first.toLowerCase() < b.name.first.toLowerCase() ? -1 : 1;
  })
}

function sortByNameDesc(arr) {
	return arr.sort(function(a, b){
    return a.name.first.toLowerCase() > b.name.first.toLowerCase() ? -1 : 1;
	})
}

function sortByAgeAsc(arr) {
	return arr.sort(function(a, b){
    return a.dob.age < b.dob.age ? -1 : 1;
	})
}

function sortByAgeDesc(arr) {
	return arr.sort(function(a, b){
    return a.dob.age > b.dob.age ? -1 : 1;
	})
}

function showFilteredUsers() {
  let filteredArr = users;
  if (searchInput.value !== '') {
    filteredArr = filterBySearch(filteredArr, searchInput.value);
  }
  const gender = findChecked(filterGender);
  if (gender) {
    filteredArr = filterByGender(gender.value, filteredArr);
  }
  if (ageAscending.checked) {
    sortByAgeAsc(filteredArr);
  }
  if (nameAscending.checked) {
    sortByNameAsc(filteredArr);
  }
  if (ageDescending.checked) {
    sortByAgeDesc(filteredArr);
  }
  if (nameDescending.checked) {
    sortByNameDesc(filteredArr);
  }
  renderCards(filteredArr);
}

const initApp = async () => {
  await loadUsers();
  renderCards(users);
}

document.addEventListener("DOMContentLoaded", function() {
  initApp();

  sortName.addEventListener('click', showFilteredUsers);
  sortAge.addEventListener('click', showFilteredUsers);
  searchInput.addEventListener('input', showFilteredUsers);
  filterGender.addEventListener('click', showFilteredUsers);
})
