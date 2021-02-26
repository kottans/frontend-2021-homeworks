const CONTAINER = document.getElementById('container');
const SIDEBAR = document.getElementById('menu_forms');
const SEARCH_FIELD = document.getElementById('searchField');
const URL = 'https://randomuser.me/api/?results=40';

let persons = [];
let displayList = [];

function getPeopleData() {
  let response = fetch(URL)

    .then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse;
        }
      })

    .then(data => data.json())

    .then(function (data) {
      persons = data.results;
      displayList = persons;
    })

    .then(function () {
      displayCards();
    })

    .catch(function (error) {
      console.log('We have an error: ', error);
      alert('Please, check your internet connection and try again');
    })
}

function getTemplate(person) {
  return `<div class="card">
            <div class="picture">
              <img src="${person.picture.large}">
            </div>
            <h1>${person.name.last} ${person.name.first}</h1>
            <div class="cardInfo">
              <p><span class="text_title">Age:</span> ${person.dob.age}</p>
              <p><span class="text_title">Gender:</span> ${person.gender}</p>
              <p><span class="text_title">Phone:</span> ${person.phone}</p>
              <p><span class="text_title">Country:</span> ${person.location.country}</p>
              <p><span class="text_title">City:</span> ${person.location.city}</p>
            </div>
          </div>`
}

function displayCards() {
  CONTAINER.innerHTML = '';
  let cardMarkup = '';
  cardMarkup += displayList.reduce((accumulator, currentValue) => accumulator.concat(getTemplate(currentValue)), '');
  CONTAINER.insertAdjacentHTML('afterbegin', cardMarkup);
}

document.addEventListener('DOMContentLoaded', function () {
  getPeopleData();

  SIDEBAR.addEventListener('click', function (event) {
    let radio = event.target.closest('.rdBtn');
    let btn = event.target.closest('button');

    if (radio) {

      switch (radio.id) {
        case 'genderAll':
          displayList = persons;
          break;
        case 'genderMale':
          displayList = persons.filter(el => el.gender === 'male');
          break;
        case 'genderFemale':
          displayList = persons.filter(el => el.gender === 'female');
          break;
        case 'nameAsc':
          displayList.sort((b, a) => a.name.last > b.name.last ? -1 : 1);
          break;
        case 'nameDesc':
          displayList.sort((b, a) => a.name.last < b.name.last ? -1 : 1);
          break;
        case 'ageLow':
          displayList.sort((a, b) => a.dob.age - b.dob.age);
          break;
        case 'ageHigh':
          displayList.sort((b, a) => a.dob.age - b.dob.age);
          break;
      }

    } else if (btn) {
      displayList = persons;
    }
    displayCards();
  })

  SEARCH_FIELD.addEventListener('input', function (e) {
    let searchStr = '';
    searchStr = SEARCH_FIELD.value.toLowerCase().trim();
    displayList = persons.filter(elem => elem.name.last.toLowerCase().includes(searchStr));
    displayCards();
  })
});
