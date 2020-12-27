"use strict";
const hamburgerMenu = document.querySelector(".hamburger_menu");
const mainArea = document.querySelector("main");
const optionForm = document.forms.sorting_n_filtering;
const ageFromOption = document.querySelector("#age_from");
const ageToOption = document.querySelector("#age_to");
const searchNameOption = document.querySelector(".filter_name");
const resetButton = document.querySelector(".reset_button");
const renewButton = document.querySelector(".renew_button");
const requestString = "https://randomuser.me/api/?nat=gb,us,fr&results=60&inc=gender,name,location,email,picture,dob";
let receivedData = [];
let dataToShow = [];
let filterCriterionSex = () => true;
let filterCriterionAge = () => true;
let filterCriterionName = () => true;
let sortCriterion = () => false;
hamburgerMenu.addEventListener("click", () => hamburgerMenu.classList.toggle("hamburger_menu-opened"));
resetButton.addEventListener("click", resetApp);
renewButton.addEventListener("click", renewApp);
optionForm.addEventListener("input", filterCards);
prepareData();

function prepareData() {
  fetch(requestString)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    receivedData = data.results;
    prepareCardsArea(receivedData);
  })
  .catch((err) => {
    mainArea.innerHTML = "There was some error, try again!";
    console.error("there was some error:", err);
  });
};

function resetApp() {
  prepareForm();
  prepareCardsArea(receivedData);
};
  
function prepareForm() {
  optionForm.reset();
  filterCriterionSex = () => true;
  filterCriterionAge = () => true;
  filterCriterionName = () => true;
  sortCriterion = () => false;
};

function renewApp() {
  prepareForm();
  prepareData();
};

function filterCards({target}) {
  changeFilters(target);
  dataToShow = receivedData.slice().filter(filterCriterionAge).filter(filterCriterionName).filter(filterCriterionSex).sort(sortCriterion);
  prepareCardsArea(dataToShow);
};

function sexString(age) {
  const lastNumberOfAge = age.toString().slice(-1);
  const numberForYearWord = "1";
  const numbersForYearsWord = ["2", "3", "4"];
  return (lastNumberOfAge == numberForYearWord) ? "год" : (numbersForYearsWord.includes(lastNumberOfAge)) ? "года" : "лет";
};

function prepareCardsArea(arrayToShow) {
  mainArea.innerHTML = "";
  const contentToRender = document.createDocumentFragment();
  arrayToShow.forEach((item) => {
    let card = document.createElement("div");
    card.classList.add("friend_card");
    card.innerHTML = `<img src=${item.picture.large} alt="photo" class="friend_card__photo">\
    <div class="friend_card__text friend_card__name">${item.name.first} ${item.name.last}</div>\
    <div class="friend_card__text friend_card__age">${item.dob.age} ${sexString(item.dob.age)}</div>\
    <div class="friend_card__text friend_card__sex">${item.gender == "male" ? "мужчина" : "женщина"}</div>\
    <div class="friend_card__text friend_card__address">${item.location.country}, ${item.location.city}</div>\
    <div class="friend_card__text friend_card__email">${item.email}</div>`;
    contentToRender.append(card);
  });
  mainArea.append(contentToRender);
};

function changeFilters(target) {
  if (target.tagName != "INPUT") {
    return;
  };
  switch (target.id) {
    case "as_is":
      sortCriterion = () => false;
      break;
    case "nameAZ":
      sortCriterion = (itemA, itemB) => itemA.name.first > itemB.name.first ? 1 : -1;
      break;
    case "nameZA":
      sortCriterion = (itemA, itemB) => itemA.name.first < itemB.name.first ? 1 : -1;
      break;
    case "age19":
      sortCriterion = (itemA, itemB) => itemA.dob.age > itemB.dob.age ? 1 : -1;
      break;
    case "age91":
      sortCriterion = (itemA, itemB) => itemA.dob.age < itemB.dob.age ? 1 : -1;
      break;
    case "all":
      filterCriterionSex = () => true;
      break;
    case "man":
      filterCriterionSex = (item) => item.gender == "male";
      break;
    case "woman":
      filterCriterionSex = (item) => item.gender == "female";
      break;
    case "age_from":
    case "age_to":
      if ((ageFromOption.value)&&(ageToOption.value)) {
        filterCriterionAge = (item) => (item.dob.age >= ageFromOption.value)&&(item.dob.age <= ageToOption.value);
      };
      break;
    case "search_name":
      filterCriterionName = (item) => (item.name.first.toLowerCase().includes(searchNameOption.value.toLowerCase()))||(item.name.last.toLowerCase().includes(searchNameOption.value.toLowerCase()));
  };
};
