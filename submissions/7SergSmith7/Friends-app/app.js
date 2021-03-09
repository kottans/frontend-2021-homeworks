import "../css/vendor/normalize.css";
import "../css/styles.css";
const AGE = "age";
const NAME = "name";
const GENDER = "gender";
const RESET = "reset-btn";

const contactsField = document.querySelector(".contacts-field");
const optionsMenu = document.querySelector(".options");
const searchInput = document.querySelector(".options__search__inpit");
const filterOptionForm = document.querySelector(".options__blocks__form");

let originalContacts;
let contacts;
let filter = "";

function getContacts() {
  const USERS_URL =
    "https://randomuser.me/api/?inc=gender,phone,picture,dob,location,name&results=25";
  return fetch(USERS_URL)
    .then((res) => {
      if (res.status < 200 && res.status >= 300)
        console.log(
          "Looks like there was a problem. Status Code: " + res.status
        );
      return res.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function getOriginalContacts() {
  return getContacts().then(({ results }) => (originalContacts = results));
}

function renderContactTemplate(contact) {
  const { gender, name, location, dob, phone, picture } = contact;
  return `<div class="contact__item" data-name="${name.first}">
            <img class="contact__image" src=${picture.large} alt=${name.first}>
            <h3 class="contact__title">${name.first} ${name.last}</h3>
            <p class="contact__phone">${phone}</p>   
            <div class="contact__additional">
              <div class="contact__additional__gender">
                <h4 class="additional__gender__title">sex</h4>
                <p class="additional__gender_item">${gender}</p>
              </div>
              <div class="contact__additional__age">
                <h4 class="additional__age__title">age</h4>
                <p class="additional__age_item">${dob.age}</p>
              </div>
              <div class="contact__additional__location">
              <h4 class="additional__location__title">location</h4>   
              <p class="additional__location_item">${location.country}</p>     
              </div>
            </div>
          </div>`;
}

optionsMenu.addEventListener("click", onOptionsClick);
searchInput.addEventListener("change", onChangeSearch);
filterOptionForm.addEventListener("change", onfilterOptionFormClick);

function onfilterOptionFormClick({ target: filterOptionInput }) {
  if (filterOptionInput.name === AGE) {
    sortByAge[filterOptionInput.value]();
  }

  if (filterOptionInput.name === NAME) {
    sortByName[filterOptionInput.value]();
  }
  if (filterOptionInput.name === GENDER) {
    filter = filterOptionInput.value;
  }

  if (filterOptionInput.name === RESET) {
    resetOptions();
  }

  renderContacts(filterByGender(contacts));
}

function resetOptions() {
  filterOptionForm.reset();
  resetToDefaultContacts();
  filter = "";
  searchInput.value = "";
}

function onChangeSearch() {
  contacts = contacts.filter((element) => {
    return element.name.first
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
  });
  renderContacts(contacts);
}

function renderContacts(contacts) {
  contactsField.innerHTML = contacts
    .map((contact) => renderContactTemplate(contact))
    .join("");
}

function onOptionsClick({ target: selectedOption }) {
  if (selectedOption.name == "reset-btn") {
    resetOptions();
    renderContacts(contacts);
  }
}

function compareAge(a, b) {
  return a.dob.age - b.dob.age;
}
const sortByAge = {
  descending: () => {
    contacts.sort((a, b) => compareAge(b, a));
  },
  ascending: () => {
    contacts.sort(compareAge);
  },
};

const sortByName = {
  ascending: () => {
    contacts.sort((a, b) => a.name.first.localeCompare(b.name.first));
  },
  descending: () => {
    contacts.sort((a, b) => b.name.first.localeCompare(a.name.first));
  },
};

function filterByGender() {
  if (filter == "") {
    return contacts;
  } else {
    return contacts.filter((element) => element.gender == filter);
  }
}
function resetToDefaultContacts() {
  contacts = originalContacts.slice(0);
}
function init() {
  getOriginalContacts().then((originalContacts) => {
    resetToDefaultContacts();
    renderContacts(originalContacts);
  });
}
init();
