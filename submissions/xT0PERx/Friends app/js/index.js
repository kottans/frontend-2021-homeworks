const friendsList = {
  current: [],
  changed: [],
  count: 72,
};

const ALL_USERS_CARDS_FILTERS = friendsList.changed;
const ALL_USERS_CARDS = friendsList.current;
const USERS_LIST = document.getElementById("usersList");
const FILTERS_MENU = document.getElementById("filters_menu");
const NAME_ASCEND_BUTTON_FILTER = document.getElementById("name-ascend");
const NAME_DESCEND_BUTTON_FILTER = document.getElementById("name-descend");
const MALE_BUTTON_FILTER = document.getElementById("male");
const FEMALE_BUTTON_FILTER = document.getElementById("female");
const YOUNGER_FILTER_BUTTON = document.getElementById("younger-ftr");
const SENIOR_FILTER_BUTTON = document.getElementById("senior-ftr");
const RESET_BUTTON = document.getElementById("reset");
const SEARCH_INPUT = document.querySelector(".searcher");

function initApp() {
  getUsers().then((users) => {
    saveUsers(users);
    createUsersCards(ALL_USERS_CARDS);
  });
}

initApp();

function getUsers() {
  const url = `https://randomuser.me/api/1.3/?results=${friendsList.count}`;

  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => data.results)
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
    case NAME_ASCEND_BUTTON_FILTER:
      sortByAscendName();
      break;
    case NAME_DESCEND_BUTTON_FILTER:
      sortByDescendName();
      break;
    case YOUNGER_FILTER_BUTTON:
      sortAscend();
      break;
    case SENIOR_FILTER_BUTTON:
      descendSort();
      break;
    case MALE_BUTTON_FILTER:
      sortByMale();
      break;
    case FEMALE_BUTTON_FILTER:
      sortByFemale();
      break;
    case RESET_BUTTON:
      resetFilters();
      break;
  }
});

function sortByAscendName() {
  const increaseSearch = ALL_USERS_CARDS_FILTERS.sort((a, b) => {
    if (a.name.first > b.name.first) {
      return 1;
    }
    if (a.name.first < b.name.first) {
      return -1;
    }
    return 0;
  });

  resetCards();
  createUsersCards(increaseSearch);
}

function sortByDescendName() {
  const decreaseSearch = ALL_USERS_CARDS_FILTERS.sort((a, b) => {
    if (a.name.first < b.name.first) {
      return 1;
    }
    if (a.name.first > b.name.first) {
      return -1;
    }
    return 0;
  });
  resetCards();
  createUsersCards(decreaseSearch);
}

function sortAscend() {
  const youngers = ALL_USERS_CARDS_FILTERS.sort(
    (a, b) => a.dob.age - b.dob.age
  );
  resetCards();
  createUsersCards(youngers);
}

function descendSort() {
  const seniors = ALL_USERS_CARDS_FILTERS.sort((a, b) => b.dob.age - a.dob.age);
  resetCards();
  createUsersCards(seniors);
}

function sortByMale() {
  const filterMale = ALL_USERS_CARDS_FILTERS.filter(
    (elem) => elem.gender === "male"
  );
  resetCards();
  createUsersCards(filterMale);
}

function sortByFemale() {
  const filterFemale = ALL_USERS_CARDS_FILTERS.filter(
    (elem) => elem.gender === "female"
  );
  resetCards();
  createUsersCards(filterFemale);
}

function resetFilters() {
  resetCards();
  createUsersCards(ALL_USERS_CARDS);
}

SEARCH_INPUT.addEventListener("keydown", () => {
  search(ALL_USERS_CARDS_FILTERS);
});

function search(people) {
  resetCards();
  const search = SEARCH_INPUT.value.toLowerCase();

  const newPeople = people.filter(
    (elem) =>
      elem.name.first.toLowerCase().match(search) ||
      elem.name.last.toLowerCase().match(search)
  );
  createUsersCards(newPeople);
}

function resetCards() {
  USERS_LIST.innerHTML = "";
}

// function sortWithAppliedFilters() {}
