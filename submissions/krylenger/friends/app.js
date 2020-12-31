const url = "https://randomuser.me/api/?results=100";

const cardsContainer = document.querySelector(".cards-container");
const search = document.querySelector(".main__search");
const asideSortForm = document.querySelector('.aside__form');
const buttonReset = document.querySelector(".aside__button--reset");
const asideRangeAgeOutput = document.querySelector(".aside__range-output");

const filtersState = {
  search: null,
  gender: null,
  age: null,
  countries: null,
  sortName: null,
  sortAge: null,
  sortRegistrationDate: null,
};

const fetchUsers = async () => {
  try {
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
  } catch (error) {
    initApp();
  }
};

const createFullName = (firstName, lastName) => `${firstName} ${lastName}`;

const createCard = (user) => {
  const card = document.createElement("div");
  const image = document.createElement("img");
  const cardInfoContainer = document.createElement("div");
  const name = document.createElement("h3");
  const mail = document.createElement("p");
  const location = document.createElement("p");
  const age = document.createElement("p");

  name.textContent = createFullName(user.name.first, user.name.last);
  mail.textContent = user.email;
  location.textContent = user.location.country;
  age.textContent = user.dob.age;

  card.appendChild(image);
  card.appendChild(cardInfoContainer);
  cardInfoContainer.appendChild(name);
  cardInfoContainer.appendChild(mail);
  cardInfoContainer.appendChild(location);
  cardInfoContainer.appendChild(age);

  card.classList.add("card");
  image.classList.add("card__image");
  image.setAttribute("src", user.picture.large);
  image.setAttribute("alt", "profile_picture");
  cardInfoContainer.classList.add("card__info-container");
  name.classList.add("card__name");
  mail.classList.add("card__mail");
  location.classList.add("card__location");
  age.classList.add("card__age");

  return card;
};

const emptyCardsContainer = () => {
  cardsContainer.innerHTML = "";
};

const renderUserCards = (usersData) => {
  emptyCardsContainer();
  const fragment = document.createDocumentFragment();
  usersData.forEach((user) => {
    const userCard = createCard(user);
    fragment.appendChild(userCard);
  });
  cardsContainer.appendChild(fragment);
};

const sortByParam = (usersData, sortingCriteria, direction) => {
  return usersData.sort((firstElem, secondElem) => {
    let a, b;

    switch (sortingCriteria) {
      case "name":
        a = firstElem.name.first;
        b = secondElem.name.first;
        break;
      case "age":
        a = firstElem.dob.age;
        b = secondElem.dob.age;
        break;
      case "registrationDate":
        a = firstElem.registered.date;
        b = secondElem.registered.date;
        break;
    }

    if (a < b) {
      return direction === "ascending" ? -1 : 1;
    }
    if (a > b) {
      return direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
};

const doSearch = (usersData, searchedValue) => {
  return usersData.filter((user) => {
    const fullName = createFullName(user.name.first, user.name.last);
    return fullName.toLocaleLowerCase().includes(searchedValue);
  });
};

const doFilterByGender = (usersData, gender) => {
  if (gender === 'genders-all') {
    return usersData;
  } else {
    return usersData.filter((user) => user.gender === gender);
  }
}

const doFilterByCountry = (usersData, country) =>
  usersData.filter((user) => user.location.country === country);

const doFilterByAge = (usersData, age) =>
  usersData.filter((user) => user.dob.age <= age);

const filterCards = (usersData) => {
  let filteredUsersData = usersData;

  if (filtersState.search) {
    filteredUsersData = doSearch(filteredUsersData, filtersState.search);
  }
  if (filtersState.gender) {
    filteredUsersData = doFilterByGender(filteredUsersData, filtersState.gender);
  }
  if (filtersState.country) {
    filteredUsersData = doFilterByCountry(filteredUsersData, filtersState.country);
  }
  if (filtersState.age) {
    filteredUsersData = doFilterByAge(filteredUsersData, filtersState.age);
  }
  if (filtersState.sortName === "name_AZ") {
    filteredUsersData = sortByParam(filteredUsersData, "name", "ascending");
  }
  if (filtersState.sortName === "name_ZA") {
    filteredUsersData = sortByParam(filteredUsersData, "name", "descending");
  }
  if (filtersState.sortAge === "age_19") {
    filteredUsersData = sortByParam(filteredUsersData, "age", "ascending");
  }
  if (filtersState.sortAge === "age_91") {
    filteredUsersData = sortByParam(filteredUsersData, "age", "descending");
  }
  if (filtersState.sortRegistrationDate === "registrationDate_NEW") {
    filteredUsersData = sortByParam(filteredUsersData, "registrationDate", "ascending");
  }
  if (filtersState.sortRegistrationDate === "registrationDate_OLD") {
    filteredUsersData = sortByParam(filteredUsersData, "registrationDate", "descending");
  }

  renderUserCards(filteredUsersData);
};

const addEventListeners = (usersData) => {

  asideSortForm.addEventListener("input", ({ target }) => {

    switch (target.id) {
      case "name_AZ":
      case "name_ZA":
        filtersState.sortName = target.id;
        filtersState.sortAge, (filtersState.sortRegistrationDate = null);
        break;
      case "age_19":
      case "age_91":
        filtersState.sortAge = target.id;
        filtersState.sortName, (filtersState.sortRegistrationDate = null);
        break;
      case "registrationDate_OLD":
      case "registrationDate_NEW":
        filtersState.sortRegistrationDate = target.id;
        filtersState.sortAge, (filtersState.sortName = null);
        break;
      case 'male':
      case 'female':
      case 'genders-all':
        filtersState.gender = target.id;
        break;
      case 'countries':
        filtersState.country = target.value;
        break;
      case 'rangeAge':
        asideRangeAgeOutput.textContent = target.value;
        filtersState.age = target.value;
        break;
      case 'search':
        filtersState.search = target.value;
        break;
        
    }
    filterCards(usersData);
  });

  buttonReset.addEventListener("click", () => {
    for (let key in filtersState) {
      filtersState[key] = null;
    }
    search.value = "";
    asideRangeAgeOutput.textContent = '0 --> 120';
    renderUserCards(usersData);
  });

  renderUserCards(usersData);
};

const initApp = async () => {
  const usersData = await fetchUsers();
  addEventListeners(usersData);
};

initApp();
