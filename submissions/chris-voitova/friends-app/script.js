const url = "https://randomuser.me/api/?results=16";
const usersContainer = document.querySelector(".users-container");

const initState = {
  maleGender: false,
  femaleGender: false,
  allGenders: true,
};

let state = Object.assign({}, initState);

const errorMessage = (message) => `<p class="error-message">${message}</p>`;

const userTemplate = (photo, name, email, gender, age) => {
  return `
   <div class="user">
      <img
         class="user__photo"
         src=${photo}
         alt="user-photo"
      />
      <div class="user__info">
         <h3 class="user__name">${name}</h3>
         <a class="user__email" href="mailto:${email}">
           ${email}
         </a>
         <span class="user__gender">gender: ${gender}</span>
         <span class="user__age">age: ${age}</span>
      </div>
   </div>`;
};

async function getUsers() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json.results;
  } catch {
    usersContainer.innerHTML += errorMessage("oops :( users fetch failed");
  }
}

async function app() {
  const initUsers = await getUsers();
  const users = initUsers.slice();
  renderUsers(users);
  handleSearch(users);
  handleFilterByGender(users, initUsers);
  handleSort(users, "#age-sort", sortByAge, [
    "#sort-ascending",
    "#sort-descending",
  ]);
  handleSort(users, "#name-sort", sortByName, [
    "#sort-az",
    "#sort-za"
   ]);
  handleResetToDefault(initUsers);
}

const renderUsers = (users) => {
  let renderedUsers = "";
  users.forEach(
    ({
      picture: { medium: photo },
      name: { first, last },
      email,
      gender,
      dob: { age },
    }) => {
      const name = `${first} ${last}`;
      renderedUsers += userTemplate(photo, name, email, gender, age);
    }
  );
  usersContainer.innerHTML = "";
  usersContainer.innerHTML += renderedUsers;
};

const handleSort = (
  users,
  container,
  sortFunc,
  [ascendingTrigger, descendingTrigger]
) => {
  container = document.querySelector(container);
  ascendingTrigger = document.querySelector(ascendingTrigger);
  descendingTrigger = document.querySelector(descendingTrigger);

  container.addEventListener("click", ({ target }) => {
    const filteredUsers = checkSelectedState(users);

    if (target === ascendingTrigger) {
      sortFunc(filteredUsers);
      renderUsers(filteredUsers);
    }
    if (target === descendingTrigger) {
      sortFunc(filteredUsers).reverse();
      renderUsers(filteredUsers);
    }
  });
};

const checkSelectedState = (users) => {
  let data;
  state.maleGender
    ? (data = filterByGender(users, "male"))
    : state.femaleGender
    ? (data = filterByGender(users, "female"))
    : (data = users);
  return data;
};

const handleFilterByGender = (users, initUsers) => {
  const maleTrigger = document.querySelector("#gender-male");
  const femaleTrigger = document.querySelector("#gender-female");
  const allGendersTrigger = document.querySelector("#gender-all");
  const genderBlock = document.querySelector("#gender-block");

  genderBlock.addEventListener("click", ({ target }) => {
    if (target === maleTrigger) {
      resetState();
      resetSorting();
      const men = filterByGender(users, "male");
      renderUsers(men);
      state.maleGender = true;
    }
    if (target === femaleTrigger) {
      resetState();
      resetSorting();
      const women = filterByGender(users, "female");
      renderUsers(women);
      state.femaleGender = true;
    }
    if (target === allGendersTrigger) {
      resetState();
      resetSorting();
      renderUsers(initUsers);
      state.allGenders = true;
    }
  });
};

const resetState = () => {
  for (let stateItem in state) {
    if (state.hasOwnProperty(stateItem)) {
      state[stateItem] = false;
    }
  }
};

const resetSorting = () => {
  const sortingFields = document.querySelectorAll(
    "#sort-ascending, #sort-descending, #sort-az, #sort-za"
  );
  [...sortingFields].forEach((field) => (field.checked = false));
};

const handleResetToDefault = (initUsers) => {
  const resetBtn = document.querySelector("#reset-btn");
  resetBtn.addEventListener("click", () => {
    renderUsers(initUsers);
    state = initState;
  });
};
const handleSearch = (users) => {
  const searchInput = document.querySelector("#search-input");
  searchInput.addEventListener("input", ({ target: { value } }) => {
    searchUsers(users, value);
  });
};

const sortByAge = (users) => {
  return users.sort((a, b) => a.dob.age - b.dob.age);
};
const sortByName = (users) => {
  return users.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
};
const filterByGender = (users, gender) => {
  return users.filter(({ gender: userGender }) => userGender === gender);
};

const searchUsers = (users, searchValue) => {
  searchValue = searchValue.toLowerCase();
  if (searchValue) {
    const searchResults = users.filter(({ name: { first: firstName } }) => {
      firstName = firstName.toLowerCase();
      return firstName.includes(searchValue);
    });
    renderUsers(searchResults);

    if (searchResults.length === 0) {
      usersContainer.innerHTML = "";
      usersContainer.innerHTML += errorMessage("users not found :(");
    }
  } else {
    renderUsers(users);
  }
};

app();
