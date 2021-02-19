let users = [];
let sorted = [];
let filtered = [];
let nameSearched = [];
let ageSearched = [];
const state = {
  sortBy: "",
  sortOrder: "",
  filterGenderBy: "",
  searchByName: "",
  ageFrom: "",
  ageTo: "",
};

let drawResult = null;

const getDatasetValue = (elements, key) => {
  const checked = Array.from(elements).find(({ checked }) => checked);
  return checked === undefined ? "" : checked.dataset[key];
};

const getValue = (elements) => {
  const checked = Array.from(elements).find(({ checked }) => checked);
  return checked === undefined ? "" : checked.value;
};

const sortUsers = (users) => {
  if (state.sortOrder === "") return users;

  const sliced = users.slice();
  const runSortingByAge = (a, b) => a.dob.age - b.dob.age;
  const runSortingByName = (a, b) => {
    const aName = `${a.name.first} ${a.name.last}`;
    const bName = `${b.name.first} ${b.name.last}`;
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  };
  const sortingHadlers = {
    desc: {
      name: runSortingByName,
      age: runSortingByAge,
    },
    asc: {
      name: (a, b) => runSortingByName(b, a),
      age: (a, b) => runSortingByAge(b, a),
    },
  };

  return sliced.sort(sortingHadlers[state.sortOrder][state.sortBy]);
};

const filterUsersByGender = (users) => {
  if (state.filterGenderBy === "all" || state.filterGenderBy === "")
    return users;

  return users.filter(({ gender }) => gender === state.filterGenderBy);
};

const findUsersByName = (users) => {
  if (state.searchByName === "") return users;

  return users.filter(
    (user) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .indexOf(state.searchByName) !== -1
  );
};

const findUsersByAge = (users) => {
  if (state.ageFrom === "" && state.ageTo === "") return users;

  return users.filter((user) => {
    if (state.ageFrom !== "" && state.ageTo !== "") {
      return user.dob.age <= state.ageTo && user.dob.age >= state.ageFrom;
    }
    if (state.ageFrom === "") return user.dob.age <= state.ageTo;
    if (state.ageTo === "") return user.dob.age >= state.ageFrom;
  });
};

const updateUsersList = (users) => {
  ageSearched = findUsersByAge(users);
  nameSearched = findUsersByName(ageSearched);
  sorted = sortUsers(nameSearched);
  filtered = filterUsersByGender(sorted);
};

const formChangeListener = ({ currentTarget }) => {
  const selectedSorting = getValue(currentTarget.elements.sorting);
  const selectedOrder = getDatasetValue(
    currentTarget.elements.sorting,
    "order"
  );
  const filteredGender = getDatasetValue(
    currentTarget.elements.gender,
    "gender"
  );
  state.sortOrder = selectedOrder;
  state.sortBy = selectedSorting;
  state.filterGenderBy = filteredGender;

  updateUsersList(users);
  drawResult(filtered);
};

const nameInputListener = ({ currentTarget }) => {
  const searchByName = currentTarget.value.toLowerCase();
  state.searchByName = searchByName;
  updateUsersList(users);
  drawResult(filtered);
};

const ageInputListener = ({ currentTarget }) => {
  if (currentTarget.id === "search-by-age-from") {
    state.ageFrom = currentTarget.value;
  } else {
    state.ageTo = currentTarget.value;
  }
  updateUsersList(users);
  drawResult(filtered);
};

const resetListener = () => {
  resetStateValue();
  drawResult(users);
};

const resetStateValue = () => {
  for (let stateProp in state) {
    state[stateProp] = "";
  }
};

const typesOfHandlers = {
  sortersChange: formChangeListener,
  nameInput: nameInputListener,
  ageInput: ageInputListener,
  reset: resetListener,
};

export const initSortAndFilter = (initData, drawer, type) => {
  users = initData;
  drawResult = drawer;
  return typesOfHandlers[type];
};
