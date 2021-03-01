import "../css/vendor/normalize.css";
import "../css/styles.css";

const contactsField = document.querySelector(".contacts-field");
const optionsMenu = document.querySelector(".options");
const searchInput = document.querySelector(".options__search__inpit");
let originalContacts;
let contacts;
let filter = "";

function getContacts() {
  const USERS_URL =
    "https://randomuser.me/api/?inc=gender,phone,picture,dob,location,name&results=25";
  return fetch(USERS_URL)
    .then((res) => {
      if (res.status !== 200)
        console.log(
          "Looks like there was a problem. Status Code: " + res.status
        );
      return res.json();
    })
    .then(({ results }) => (originalContacts = results))
    .catch((error) => {
      console.error("Error:", error);
    });
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

function onChangeSearch() {
  contacts.filter((element) => {
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

function onOptionsClick(e) {
  const selectedOption = e.target;

  if (selectedOption.classList.value.includes("options__blocks__reset-btn")) {
    resetOptions();
    renderContacts(contacts);
  } else {
    if (selectedOption.value.includes("name-sort")) {
      sortByName(contacts);
      if (selectedOption.value.includes("ascending"))
        contacts = contacts.reverse();
    }

    if (selectedOption.value.includes("age-sort")) {
      contacts.sort((a, b) => a.dob.age - b.dob.age);
      if (selectedOption.value.includes("less")) contacts = contacts.reverse();
    }
    if (selectedOption.value.includes("gender-filter")) {
      if (selectedOption.value.includes("woman")) filter = "female";
      else filter = "male";
    }
    renderContacts(filterByGender(contacts, filter));
  }
}
function resetOptions() {
  resetToDefaultContacts();
  filter = "";
  searchInput.value = "";
}

function sortByName(contact) {
  contact.sort(function (a, b) {
    if (a.name.first > b.name.first) {
      return -1;
    }
    if (a.name.first < b.name.first) {
      return 1;
    }
    return 0;
  });
}

function filterByGender(contacts, gender) {
  if (gender == "") {
    return contacts;
  } else {
    return contacts.filter((element) => element.gender == gender);
  }
}
function resetToDefaultContacts() {
  contacts = originalContacts.slice(0);
}
function init() {
  getContacts().then((originalContacts) => {
    resetToDefaultContacts();
    renderContacts(originalContacts);
  });
}
init();
