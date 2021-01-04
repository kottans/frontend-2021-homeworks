const URL = "https://randomuser.me/api/?results=16";
const USERS_CONTAINER = document.querySelector(".users-container");

const INIT_GENDER = "all";

let selectedGender = INIT_GENDER;

const showMessage = (message) => `<p class="message">${message}</p>`;

const createUserTemplate = (photo, name, email, gender, age) => {
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
    const response = await fetch(URL);
    const json = await response.json();
    return json.results;
  } catch {
    USERS_CONTAINER.innerHTML += showMessage("oops :( users fetch failed");
  }
}

async function renderApp() {
  const initUsers = await getUsers();
  const users = initUsers.slice();
  const sortByAgeParameters = {
    users: users,
    sortingTriggersContainer: document.querySelector("#age-sort"),
    sortingFunction: sortByAge,
    ascendingTrigger: document.querySelector("#sort-ascending"),
    descendingTrigger: document.querySelector("#sort-descending"),
  };
  const sortByNameParameters = {
    users: users,
    sortingTriggersContainer: document.querySelector("#name-sort"),
    sortingFunction: sortByName,
    ascendingTrigger: document.querySelector("#sort-az"),
    descendingTrigger: document.querySelector("#sort-za"),
  };
  renderUsers(users);
  handleSearch(users);
  handleFilterByGender(users, initUsers);
  handleSort(sortByAgeParameters);
  handleSort(sortByNameParameters);
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
      renderedUsers += createUserTemplate(photo, name, email, gender, age);
    }
  );
  USERS_CONTAINER.innerHTML = "";
  USERS_CONTAINER.innerHTML += renderedUsers;
};

const handleSort = ({
  users,
  sortingTriggersContainer,
  sortingFunction,
  ascendingTrigger,
  descendingTrigger,
}) => {
  sortingTriggersContainer.addEventListener("click", ({ target }) => {
    resetSearch();
    const filteredUsers = checkSelectedState(users);

    if (target === ascendingTrigger) {
      sortingFunction(filteredUsers);
      renderUsers(filteredUsers);
    }
    if (target === descendingTrigger) {
      sortingFunction(filteredUsers).reverse();
      renderUsers(filteredUsers);
    }
  });
};

const checkSelectedState = (users) => {
  let data;
  if (selectedGender === "male") {
    data = filterByGender(users, "male");
  } else if (selectedGender === "female") {
    data = filterByGender(users, "female");
  } else {
    data = users;
  }
  return data;
};
const handleFilterByGender = (users, initUsers) => {
  const maleTrigger = document.querySelector("#gender-male");
  const femaleTrigger = document.querySelector("#gender-female");
  const allGendersTrigger = document.querySelector("#gender-all");
  const genderBlock = document.querySelector("#gender-block");

  genderBlock.addEventListener("click", ({ target }) => {
    if (target === maleTrigger) {
      const men = filterByGender(users, "male");
      updateSelectedGender(men, "male");
    }
    if (target === femaleTrigger) {
      const women = filterByGender(users, "female");
      updateSelectedGender(women, "female");
    }
    if (target === allGendersTrigger) {
      updateSelectedGender(initUsers, "all");
    }
  });
};

const updateSelectedGender = (usersForRender, gender) => {
  resetState();
  resetSearch();
  resetSorting();
  renderUsers(usersForRender);
  selectedGender = gender;
};

const resetState = () => {
  selectedGender = INIT_GENDER;
};

const resetSearch = () => {
  const searchInput = document.querySelector("#search-input");
  searchInput.value = "";
};

const resetSorting = () => {
  const sortingFields = document.querySelectorAll(
    "#sort-ascending, #sort-descending, #sort-az, #sort-za"
  );
  [...sortingFields].forEach((field) => (field.checked = false));
};

const handleResetToDefault = (initUsers) => {
  const resetButton = document.querySelector("#reset-button");
  resetButton.addEventListener("click", () => {
    renderUsers(initUsers);
    resetState();
    resetSearch();
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
  const filteredUsers = checkSelectedState(users);
  if (searchValue) {
    const searchResults = filteredUsers.filter(
      ({ name: { first: firstName } }) => {
        firstName = firstName.toLowerCase();
        return firstName.includes(searchValue);
      }
    );
    renderUsers(searchResults);

    if (searchResults.length === 0) {
      USERS_CONTAINER.innerHTML = "";
      USERS_CONTAINER.innerHTML += showMessage("users not found");
    }
  } else {
    renderUsers(filteredUsers);
  }
};

renderApp();
