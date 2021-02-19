const allSavedUsers = [];
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
    createUsersCards(allSavedUsers);
  });
}

initApp();

function saveUsers(users) {
  users.forEach(function (el) {
    allSavedUsers.push(el);
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

allFilters.addEventListener("click", function ({ target }) {
  let filteredUsers = null;

  if (target.value === "reset") {
    resetFilters();
    return;
  }

  if (target.nodeName !== "INPUT") {
    return;
  }

  if (target.name === "search") {
    return;
  }

  switch (target.value) {
    case "nameAscend":
      filteredUsers = sortByName(allSavedUsers);
      break;
    case "nameDescend":
      filteredUsers = sortByName(allSavedUsers, true);
      break;
    case "younger":
      filteredUsers = sortByAge(allSavedUsers);
      break;
    case "senior":
      filteredUsers = sortByAge(allSavedUsers, true);
      break;
    case "male":
      filteredUsers = sortByGender(allSavedUsers, "male");
      break;
    case "female":
      filteredUsers = sortByGender(allSavedUsers, "female");
      break;
  }

  cleanSelectedInputs();
  deleteAllShowedUsers();
  createUsersCards(filteredUsers);
});

function sortByName(list, isRevers) {
  const result = [...list];
  const runSorting = (a, b) => {
    if (a.name.first > b.name.first) {
      return 1;
    }
    if (a.name.first < b.name.first) {
      return -1;
    }
    return 0;
  };
  result.sort((a, b) => (isRevers ? runSorting(b, a) : runSorting(a, b)));
  return result;
}

function sortByAge(list, isRevers) {
  const result = [...list];
  const runSorting = (a, b) => a.dob.age - b.dob.age;
  result.sort((a, b) => (isRevers ? runSorting(b, a) : runSorting(a, b)));
  return result;
}

function sortByGender(list, gender) {
  let genderFilter = [...list];
  genderFilter = allSavedUsers.filter((elem) => elem.gender === gender);
  return genderFilter;
}

function resetFilters() {
  deleteAllShowedUsers();
  createUsersCards(allSavedUsers);
}
searchInput.addEventListener("keydown", () => {
  if (searchInput.value === "") {
    return;
  }
  deleteAllShowedUsers();
  const featuredUsers = search(allSavedUsers);
  createUsersCards(featuredUsers);
});

function search(people) {
  const search = searchInput.value.toLowerCase();

  const peopleSearch = people.filter(
    (elem) =>
      elem.name.first.toLowerCase().match(search) ||
      elem.name.last.toLowerCase().match(search)
  );
  return peopleSearch;
}

function deleteAllShowedUsers() {
  usersBox.innerHTML = "";
}

function cleanSelectedInputs() {
  const allInputs = document.querySelectorAll(".sort_input");
  allInputs.forEach((element) => {
    element.checked = false;
  });
}
