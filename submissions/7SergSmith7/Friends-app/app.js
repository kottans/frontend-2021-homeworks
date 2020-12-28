import "../css/vendor/normalize.css";
import "../css/styles.css";

const USERS_URL =
  "https://randomuser.me/api/?inc=gender,phone,picture,dob,location,name&results=25";

const contactsField = document.querySelector(".contacts-field");
const optionsMenu = document.querySelector(".options");

let originalContacts;
let contacts;
let filter = "";

function getContacts(url) {
  return fetch(url)
    .then((res) => res.json())
    .then(({ results }) => (originalContacts = results))
    .then((originalContacts) => {
      copyData();
      renderContacts(originalContacts);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
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

function renderContacts(contacts) {
  contactsField.innerHTML = contacts
    .map((contact) => renderContactTemplate(contact))
    .join("");
}
optionsMenu.addEventListener("click", onOptionsClick);

function onOptionsClick(e) {
  const searchInput = document.querySelector(".options__search__inpit");
  const selectedOption = e.target.classList.value;

  switch (selectedOption) {
    case "name-sort__z-a":
      sortName(contacts);
      renderContacts(sortWithFilter(contacts, filter));

      break;
    case "name-sort__a-z":
      sortName(contacts);
      contacts = contacts.reverse();
      renderContacts(sortWithFilter(contacts, filter));

      break;
    case "age-sort__more":
      sortAge(contacts);

      renderContacts(sortWithFilter(contacts, filter));

      break;
    case "age-sort__less":
      sortAge(contacts);
      contacts = contacts.reverse();
      renderContacts(sortWithFilter(contacts, filter));

      break;
    case "gender-filter__man":
      filter = "male";
      renderContacts(filterGender(contacts, filter));

      break;
    case "gender-filter__woman":
      filter = "female";
      renderContacts(filterGender(contacts, filter));
      break;
    case "options__blocks__reset-btn":
      resetOptions();
      break;
    case "options__search__icon":
      renderContacts(searchName(searchInput));
      break;
    default:
      break;
  }
}
function resetOptions() {
  copyData();
  filter = "";
  searchInput.value = "";
  renderContacts(contacts);
}

function sortAge(contact) {
  contacts = contact.sort((a, b) => a.dob.age - b.dob.age);
}

function sortName(contact) {
  contacts = contact.sort(function (a, b) {
    if (a.name.first > b.name.first) {
      return -1;
    }
    if (a.name.first < b.name.first) {
      return 1;
    }
    return 0;
  });
}
function filterGender(contacts, gender) {
  return contacts.filter((element) => element.gender == gender);
}

function searchName(input) {
  if (input.value)
    return originalContacts.filter(
      (element) => element.name.first == input.value
    );
}

function sortWithFilter(contacts, gender) {
  if (gender == "") return contacts;
  else return filterGender(contacts, gender);
}
function copyData() {
  contacts = originalContacts.map((a) => ({ ...a }));
}
function init() {
  getContacts(USERS_URL);
}
init();
