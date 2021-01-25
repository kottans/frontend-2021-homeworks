const allFriends = {
  currentList: [],
  changeList: [],
  numberOfFriends: 72,
};

const REQUEST_URL = "https://randomuser.me/api/1.3/";
const ALL_USERS_CARDS_FILTERS = allFriends.changeList;
const ALL_USERS_CARDS = allFriends.currentList;
const USERS_LIST = document.getElementById("usersList");
const FILTERS_MENU = document.getElementById("filters_menu");
const ABC_BUTTON_FILTER = document.getElementById("Abc");
const ZYX_BUTTON_FILTER = document.getElementById("Zyx");
const MALE_BUTTON_FILTER = document.getElementById("male");
const FEMALE_BUTTON_FILTER = document.getElementById("female");
const YOUNGER_FILTER_BUTTON = document.getElementById("younger-ftr");
const SENIOR_FILTER_BUTTON = document.getElementById("senior-ftr");
const RESET_BUTTON = document.getElementById("reset");
const SEARCH_INPUT = document.querySelector(".searcher");

function initApp() {
  getUsers();
}

initApp();

function getUsers() {
  const url = `${REQUEST_URL}?results=${allFriends.numberOfFriends}`;
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Что-то не так с сервером...");
      }
    })
    .then((data) => {
      saveUsers(data.results);
      createUsersCards(ALL_USERS_CARDS);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

function saveUsers(users) {
  users.forEach(function (el) {
    ALL_USERS_CARDS.push(el);
    ALL_USERS_CARDS_FILTERS.push(el);
  });
}

function createUsersCards(users) {
  const lists = document.createDocumentFragment();

  users.forEach(function (el) {
    const card = document.createElement("li");
    card.classList.add("userCard");
    card.innerHTML = `<span class="name">${el.name.first} ${el.name.last}</span>
    <img src="${el.picture.large}">
    <span class="age">Age: ${el.dob.age}</span>
    <span class="location">Location: ${el.location.city}</span>`;
    lists.appendChild(card);
  });

  USERS_LIST.appendChild(lists);
}

FILTERS_MENU.addEventListener("click", function ({ target }) {
  switch (target) {
    case ABC_BUTTON_FILTER:
      sortingByABC();
      break;
    case ZYX_BUTTON_FILTER:
      sortingByZYX();
      break;
    case YOUNGER_FILTER_BUTTON:
      sortAscending();
      break;
    case SENIOR_FILTER_BUTTON:
      descendingSort();
      break;
    case MALE_BUTTON_FILTER:
      sortingMaleOnly();
      break;
    case FEMALE_BUTTON_FILTER:
      sortingFemaleOnly();
      break;
    case RESET_BUTTON:
      resettingFilters();
      break;
  }
});

function sortingByABC() {
  const abcSearch = ALL_USERS_CARDS_FILTERS.sort((a, b) => {
    if (a.name.first > b.name.first) {
      return 1;
    }
    if (a.name.first < b.name.first) {
      return -1;
    }
    return 0;
  });

  resetCards();
  createUsersCards(abcSearch);
}

function sortingByZYX() {
  const zyxSearch = ALL_USERS_CARDS_FILTERS.sort((a, b) => {
    if (a.name.first < b.name.first) {
      return 1;
    }
    if (a.name.first > b.name.first) {
      return -1;
    }
    return 0;
  });
  resetCards();
  createUsersCards(zyxSearch);
}

function sortAscending() {
  const youngers = ALL_USERS_CARDS_FILTERS.sort(
    (a, b) => a.dob.age - b.dob.age
  );
  resetCards();
  createUsersCards(youngers);
}

function descendingSort() {
  const seniors = ALL_USERS_CARDS_FILTERS.sort((a, b) => b.dob.age - a.dob.age);
  resetCards();
  createUsersCards(seniors);
}

function sortingMaleOnly() {
  const filterMale = ALL_USERS_CARDS_FILTERS.filter(
    (elem) => elem.gender === "male"
  );
  resetCards();
  createUsersCards(filterMale);
}

function sortingFemaleOnly() {
  const filterFemale = ALL_USERS_CARDS_FILTERS.filter(
    (elem) => elem.gender === "female"
  );
  resetCards();
  createUsersCards(filterFemale);
}

function resettingFilters() {
  resetCards();
  createUsersCards(ALL_USERS_CARDS);
}

SEARCH_INPUT.addEventListener("keydown", () => {
  search(ALL_USERS_CARDS_FILTERS);
});

function search(people) {
  resetCards();
  const search = SEARCH_INPUT.value.toLowerCase();

  people = people.filter(
    (elem) =>
      elem.name.first.toLowerCase().match(search) ||
      elem.name.last.toLowerCase().match(search)
  );
  createUsersCards(people);
}

function resetCards() {
  USERS_LIST.innerHTML = "";
}
