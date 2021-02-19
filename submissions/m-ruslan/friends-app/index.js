import { fetchSeveralUsers } from "./src/api.js";
import { makeUsersList } from "./src/list.js";
import { initSortAndFilter } from "./src/sorter.js";

const QUANTITY_OF_USERS = 50;
const URL = "https://randomuser.me/api/?results=";

const wrapper = document.getElementById("wrapper");
const form = document.getElementById("options");
const nameSearchInput = document.getElementById("search-by-name");
const ageFromInput = document.getElementById("search-by-age-from");
const ageToInput = document.getElementById("search-by-age-to");
const resetButton = document.getElementById("reset-button");

const drawUsers = (users) => {
  const usersList = makeUsersList(users);
  wrapper.innerHTML = "";
  wrapper.append(usersList);
};

const start = () => {
  fetchSeveralUsers(URL, QUANTITY_OF_USERS).then((users) => {
    drawUsers(users);

    const handleChange = initSortAndFilter(users, drawUsers, "sortersChange");
    const handleNameInput = initSortAndFilter(users, drawUsers, "nameInput");
    const handleAgeInput = initSortAndFilter(users, drawUsers, "ageInput");
    const handleReset = initSortAndFilter(users, drawUsers, "reset");

    form.addEventListener("change", handleChange);
    nameSearchInput.addEventListener("input", handleNameInput);
    ageFromInput.addEventListener("input", handleAgeInput);
    ageToInput.addEventListener("input", handleAgeInput);
    resetButton.addEventListener("click", handleReset);
  });
};

start();
