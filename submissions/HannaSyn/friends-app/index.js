const searchInput = document.querySelector('.search-input');
const sortAge = document.querySelector('.sort-age');
const sortName = document.querySelector('.sort-name');
const container = document.querySelector('.container');
const filterGender = document.querySelector('.gender-filter');
const female = document.getElementById('female');
const male = document.getElementById('male');
const allGenders = document.getElementById('all');
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
    container.innerHTML = `<p>Oops! Here is the error ${error}</p>`
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
    card += template
  })
  container.innerHTML = card
}

function filterBySearch(arr, str) {
  let filteredArr = [];

  arr.forEach(el => {
    let fullName = `${el.name.first}${el.name.last}`;
    let isIncludesFullname = fullName.includes(str.toLowerCase());
    if (isIncludesFullname) {
      filteredArr.push(el)
    } 
  })

  return filteredArr
}

function filterByGender(value, arr) {
  let filteredArr = [];

  if (value == 'all') {
    return arr
  } else {
    arr.filter(el => el.gender == value ? filteredArr.push(el) : filteredArr)
  }
  return filteredArr
}

function sortByNameAsc(arr) {
	arr.sort(function(a, b){
    if(a.name.first.toLowerCase() < b.name.first.toLowerCase()) { return -1; }
    if(a.name.first.toLowerCase() > b.name.first.toLowerCase()) { return 1; }
    return 0;
  })
	return arr;
}

function sortByNameDesc(arr) {
	arr.sort(function(a, b){
    if(a.name.first.toLowerCase() > b.name.first.toLowerCase()) { return -1; }
    if(a.name.first.toLowerCase() < b.name.first.toLowerCase()) { return 1; }
    return 0;
	})
	return arr;
}

function sortByAgeAsc(arr) {
	arr.sort(function(a, b){
    if(a.dob.age < b.dob.age) { return -1; }
    if(a.dob.age > b.dob.age) { return 1; }
    return 0;
	})
	return arr;
}

function sortByAgeDesc(arr) {
	arr.sort(function(a, b){
    if(a.dob.age > b.dob.age) { return -1; }
    if(a.dob.age < b.dob.age) { return 1; }
    return 0;
	})
	return arr;
}

function showFilteredUsers() {
  let filteredArr = users;
  if (searchInput.value !== '') {
    filteredArr = filterBySearch(filteredArr, searchInput.value)
  }
  if (female.checked) {
    filteredArr = filterByGender(female.value, filteredArr)
  }
  if (male.checked) {
    filteredArr = filterByGender(male.value, filteredArr)
  }
  if (allGenders.checked) {
    filteredArr = filterByGender(allGenders.value, filteredArr)
  }
  if (ageAscending.checked) {
    sortByAgeAsc(filteredArr)
  }
  if (nameAscending.checked) {
    sortByNameAsc(filteredArr)
  }
  if (ageDescending.checked) {
    sortByAgeDesc(filteredArr)
  }
  if (nameDescending.checked) {
    sortByNameDesc(filteredArr)
  }
  renderCards(filteredArr)
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
