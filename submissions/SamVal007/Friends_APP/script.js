const CONTAINER = document.getElementById('container');
const MENU_FORMS = document.getElementById('menu_forms');
const SEARCH_FIELD = document.getElementById('searchField');
const URL = 'https://randomuser.me/api/?results=40';
const btn = document.querySelector('.resetButton');
console.log(btn);

let persons = [];
let displayList = [];
const putPersonsInDisplayList = () => {displayList = persons;};

function makeFriendList() {
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
      putPersonsInDisplayList();
    })

    .then(function () { // without this .then i dodnt how to load displayCards() on DOMContentLoaded
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
////// Sorting Logic ////
const compareAge = (firstFriend, secondFriend) => {
  return firstFriend.dob.age - secondFriend.dob.age;
};

const compareName = (firstFriend, secondFriend) => {
  return firstFriend.name.last < secondFriend.name.last ? -1 : 1;
};

const ageSorters = {
  ageLow: () => persons.sort((a, b) => compareAge(b, a)),
  ageHigh: () => persons.sort(compareAge)
};

const nameSorters = {
  nameDesc: () => persons.sort((a, b) => compareName(b, a)),
  nameAsc: () => persons.sort(compareName)
};
const filtrByMale = () => {
  displayList = persons.filter(el => el.gender === 'male');
};
const filtrByFemale = () => {
  displayList = persons.filter(el => el.gender === 'female');
};
//////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function () {
  makeFriendList();
  //displayCards(); //I dodnt know why, but if put displayCards() here -> it doesnt work

  SEARCH_FIELD.addEventListener('input', function () {
    let searchStr = '';
    searchStr = SEARCH_FIELD.value.toLowerCase().trim();
    displayList = persons.filter(elem => elem.name.last.toLowerCase().includes(searchStr));
    displayCards();
  })

  MENU_FORMS.addEventListener('change', ({target: radioButton}) => {
    putPersonsInDisplayList();
    console.log(radioButton);
    console.log(radioButton.name);
    console.log(radioButton.id);
    if (radioButton.name === 'genderField') {
      if (radioButton.id === 'genderAll') putPersonsInDisplayList();
      if (radioButton.id === 'genderMale') filtrByMale();
      if (radioButton.id === 'genderFemale') filtrByFemale();
    }
    if (radioButton.name === "nameField") {
      nameSorters[radioButton.value]();
    }
    if (radioButton.name === "ageField") {
      ageSorters[radioButton.value]();
    }

    displayCards();
  })

  btn.addEventListener('click', () =>{
    putPersonsInDisplayList();
    displayCards();
  })

});
