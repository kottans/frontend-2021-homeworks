"use strict";
const hamburgerMenu = document.querySelector(".hamburger_menu");
const mainArea = document.querySelector("main");
const optionForm = document.forms.sorting_n_filtering;
let receivedData = [];
let dataToRender = [];
let filterCriterionSex = () => true;
let filterCriterionAge = () => true;
let filterCriterionName = () => true;
let sortCriterion = () => true;
as_is.checked = true;
all.checked = true;
age_from.value = "";
age_to.value = "";
search_name.value = "";
hamburgerMenu.addEventListener("click", () => hamburgerMenu.classList.toggle("hamburger_menu-opened"));
optionForm.addEventListener("input", changeData);

fetch("https://randomuser.me/api/?nat=gb,us,fr&results=60&inc=gender,name,location,email,picture,dob")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    receivedData = data.results;
    dataToRender = receivedData.slice().filter(filterCriterionSex).filter(filterCriterionAge).filter(filterCriterionName).sort(sortCriterion);
    render();
  });

function render() {
  mainArea.innerHTML = "";
  const contentToRender = document.createDocumentFragment();
  dataToRender.forEach((item) => {
    let card = document.createElement("div");
    let lastNumberOfAge = item.dob.age.toString().slice(-1);
    card.classList.add("friend_card");
    card.innerHTML = `<img src=${item.picture.large} alt="photo" class="friend_card__photo">\
    <div class="friend_card__text friend_card__name">${item.name.first} ${item.name.last}</div>\
    <div class="friend_card__text friend_card__age">${item.dob.age} ${(lastNumberOfAge == "1") ? "год" : (lastNumberOfAge == "2")||(lastNumberOfAge == "3")||(lastNumberOfAge == "4") ? "года" : "лет"}</div>\
    <div class="friend_card__text friend_card__sex">${item.gender == "male" ? "мужчина" : "женщина"}</div>\
    <div class="friend_card__text friend_card__address">${item.location.country}, ${item.location.city}</div>\
    <div class="friend_card__text friend_card__email">${item.email}</div>`;
    contentToRender.append(card);
  });
  mainArea.append(contentToRender);
};

function changeData({target}) {
  if (target.tagName != "INPUT") {
    return;
  };
  if (target.id == "as_is") {
    sortCriterion = () => true;
  } else if (target.id == "nameAZ") {
    sortCriterion = (itemA, itemB) => itemA.name.first > itemB.name.first ? 1 : -1;
  } else if (target.id == "nameZA") {
    sortCriterion = (itemA, itemB) => itemA.name.first < itemB.name.first ? 1 : -1;
  } else if (target.id == "age19") {
    sortCriterion = (itemA, itemB) => itemA.dob.age > itemB.dob.age ? 1 : -1;
  } else if (target.id == "age91") {
    sortCriterion = (itemA, itemB) => itemA.dob.age < itemB.dob.age ? 1 : -1;
  } else if (target.id == "all") {
    filterCriterionSex = () => true;
  } else if (target.id == "man") {
    filterCriterionSex = (item) => item.gender == "male";
  } else if (target.id == "woman") {
    filterCriterionSex = (item) => item.gender == "female";
  } else if ((target.id == "age_from")||(target.id == "age_to")) {
    if ((age_from.value)&&(age_to.value)) {
      filterCriterionAge = (item) => (item.dob.age >= age_from.value)&&(item.dob.age <= age_to.value);
    };
  } else if (target.id == "search_name") {
    filterCriterionName = (item) => (item.name.first.toLowerCase().includes(search_name.value.toLowerCase()))||(item.name.last.toLowerCase().includes(search_name.value.toLowerCase()));
  };
  dataToRender = receivedData.slice().filter(filterCriterionSex).filter(filterCriterionAge).filter(filterCriterionName).sort(sortCriterion);
  render();
};
