const URL = "https://randomuser.me/api/?results=16";
const USERS_CONTAINER = document.querySelector(".users-container");

const ALL_GENDERS = "all";
const MALE_GENDER = "male";
const FEMALE_GENDER = "female";

const INIT_GENDER = ALL_GENDERS;

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
    if (response.ok) {
      const json = await response.json();
      return json.results;
    }
  } catch {
    USERS_CONTAINER.innerHTML += showMessage("oops :( users fetch failed");
    throw Error(response.statusText);
  }
}

async function renderApp() {
  const initUsers = await getUsers();
  const users = initUsers.slice();
  const sortByAgeParameters = {
    users,
    sortingTriggersContainer: document.querySelector("#age-sort"),
    sortingFunction: sortByAge,
  };
  const sortByNameParameters = {
    users,
    sortingTriggersContainer: document.querySelector("#name-sort"),
    sortingFunction: sortByName,
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

const handleSort = ({ users, sortingTriggersContainer, sortingFunction }) => {
  sortingTriggersContainer.addEventListener(
    "click",
    ({ target: { value: targetValue } }) => {
      resetSearch();
      const filteredUsers = checkSelectedState(users);
      const ascendingSorting = "ascending";
      const descendingSorting = "descending";

      if (targetValue === ascendingSorting) {
        sortingFunction(filteredUsers);
      }
      if (targetValue === descendingSorting) {
        sortingFunction(filteredUsers).reverse();
      }
      renderUsers(filteredUsers);
    }
  );
};

const checkSelectedState = (users) => {
  let result;
  if (selectedGender === MALE_GENDER) {
    result = filterByGender(users, MALE_GENDER);
  } else if (selectedGender === FEMALE_GENDER) {
    result = filterByGender(users, FEMALE_GENDER);
  } else {
    result = users;
  }
  return result;
};
const handleFilterByGender = (users, initUsers) => {
  const genderBlock = document.querySelector("#gender-block");

  genderBlock.addEventListener(
    "click",
    ({ target: { value: targetValue } }) => {
      if (targetValue === MALE_GENDER) {
        const men = filterByGender(users, MALE_GENDER);
        updateSelectedGender(men, MALE_GENDER);
      }
      if (targetValue === FEMALE_GENDER) {
        const women = filterByGender(users, FEMALE_GENDER);
        updateSelectedGender(women, FEMALE_GENDER);
      }
      if (targetValue === ALL_GENDERS) {
        updateSelectedGender(initUsers, ALL_GENDERS);
      }
    }
  );
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
  const formattedSearchValue = searchValue.toLowerCase();
  const filteredUsers = checkSelectedState(users);
  if (formattedSearchValue) {
    const searchResults = filteredUsers.filter(
      ({ name: { first: firstName } }) => {
        return firstName.toLowerCase().includes(formattedSearchValue);
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
