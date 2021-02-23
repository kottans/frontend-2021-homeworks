const allSavedUsers = {
  current: [],
  changed: [],
};
const countUsers = 72;
const usersBox = document.getElementById("usersList");
const allFilters = document.getElementById("filters_menu");
const searchInput = document.querySelector(".searcher");

function getUsers() {
  const url = `https://randomuser.me/api/1.3/?results=${countUsers}`;

  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((data) => data.results)
    .catch((err) => {
      console.error(err.message);
    });
}

function initApp() {
  getUsers().then((users) => {
    saveUsers(users);
    createUsersCards(allSavedUsers.changed);
  });
}

initApp();

function saveUsers(users) {
  users.forEach(function (el) {
    allSavedUsers.current.push(el);
    allSavedUsers.changed.push(el);
  });
}

function createUsersCards(users) {
  const listsFragment = document.createDocumentFragment();

  users.forEach(function (el) {
    const card = document.createElement("li");
    card.classList.add("userCard");
    let template = `<span class="name">${el.name.first} ${el.name.last}</span>
     <img src="${el.picture.large}">
     <span class="age">Age: ${el.dob.age}</span>
     <span class="location">Location: ${el.location.city}</span>`;
    card.insertAdjacentHTML("beforeEnd", template);
    listsFragment.append(card);
  });

  usersBox.appendChild(listsFragment);
}

allFilters.addEventListener("change", function ({ target }) {
  let filteredUsers = null;

  if (target.value === "reset") {
    resetFilters();
    return;
  }

  if (target.name === "search") {
    return;
  }

  const sortedCases = {
    sort_by_alphabet: (users) => nameSorters[target.value](users),
    sort_by_age: (users) => ageSorters[target.value](users),
    sort_by_gender: (users) => sortByGender(target.value, users),
  };

  filteredUsers = sortedCases[target.name](allSavedUsers.changed);

  cleanSelectedInputs();
  deleteAllShowedUsers();
  createUsersCards(filteredUsers);
});

const compareNames = (firstUsers, secondUsers) => {
  if (firstUsers.name.first > secondUsers.name.first) {
    return 1;
  }
  if (firstUsers.name.first < secondUsers.name.first) {
    return -1;
  }
  return 0;
};

const compareAge = (firstUsers, secondUsers) =>
  firstUsers.dob.age - secondUsers.dob.age;

const nameSorters = {
  nameAscend: (users) => users.sort(compareNames),
  nameDescend: (users) => users.sort((a, b) => compareNames(b, a)),
};

const ageSorters = {
  younger: (users) => users.sort(compareAge),
  senior: (users) => users.sort((a, b) => compareAge(b, a)),
};

const sortByGender = (gender, users) =>
  users.filter((elem) => elem.gender === gender);

function resetFilters() {
  deleteAllShowedUsers();
  createUsersCards(allSavedUsers.current);
}
searchInput.addEventListener("keydown", () => {
  deleteAllShowedUsers();
  const featuredUsers = seekNames(allSavedUsers.changed);
  createUsersCards(featuredUsers);
});

function seekNames(people) {
  const search = searchInput.value.toLowerCase();

  return people.filter(
    (elem) =>
      elem.name.first.toLowerCase().match(search) ||
      elem.name.last.toLowerCase().match(search)
  );
}

function deleteAllShowedUsers() {
  usersBox.innerHTML = "";
}

function cleanSelectedInputs() {
  const allInputs = document.querySelectorAll(".sort_input");
  allInputs.forEach((element) => (element.checked = false));
}
