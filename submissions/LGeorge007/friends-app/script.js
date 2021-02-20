const content = document.querySelector(".content");
const navPanel = document.querySelector(".sidebar");
const menuButton = document.querySelector(".menu-button");
const resetButton = document.querySelector("#reset-button");
const form = document.querySelector("#filters");

const state = {
    unsortedUsers: [],
    sortedUsers: [],
    filterBySex: "",
    filterByName: "",
    sortByAge: "",
    sortByName: ""
};

const toDefaultState = function () {
    state.filterBySex = "all";
    state.filterByName = "",
    state.sortByAge = "age-ascending";
    state.sortByName = "";
    state.sortedUsers = this.unsortedUsers;
}

const sortByAge = function (a, b) {
    return a.dob.age - b.dob.age;
}

const sortByName = function (a, b) {
    return a.name.first.localeCompare(b.name.first);
}

const slideMenu = function () {
    navPanel.classList.toggle("sidebar-toggle");
    content.classList.toggle("content-toggle");
}

const reset = function () {
    toDefaultState();
    processCards();
};

const readChangeForm = function ({ target }) {
    let value = target.value;
    switch (target.name) {
        case "sort-type":
            if (value === "name-ascending" || value === "name-descending") {
                state.sortByName = value;
                state.sortByAge = "";
            };
            if (value === "age-ascending" || value === "age-descending") {
                state.sortByAge = value;
                state.sortByName = "";
            };
            break;
        case "gender":
            state.filterBySex = value;
            break;
        case "name-filter":
            state.filterByName = value.trim().toLowerCase();
            break;
    }
    processCards();
};

const filterUsers = function () {
    if (state.filterBySex === "all") {
        state.sortedUsers = state.unsortedUsers;
    } else {
        state.sortedUsers = state.unsortedUsers.filter(unit => unit.gender == state.filterBySex);
    };
    if (state.filterByName !== "") {
        state.sortedUsers = state.sortedUsers.filter(unit => unit.name.first.toLowerCase().startsWith(state.filterByName));
    }
}

const sortUsers = function () {
    if (state.sortByAge === "age-ascending") state.sortedUsers = state.sortedUsers.sort(sortByAge);
    if (state.sortByAge === "age-descending") state.sortedUsers = state.sortedUsers.sort((a, b) => sortByAge(b, a));
    if (state.sortByName === "name-descending") state.sortedUsers = state.sortedUsers.sort((a, b) => sortByName(b, a));
    if (state.sortByName === "name-ascending") state.sortedUsers = state.sortedUsers.sort(sortByName);
}

const processCards = function () {
    filterUsers();
    sortUsers();
    renderCards(state.sortedUsers);
}

const renderCards = function (users) {
    content.innerHTML = "";
    let fragmentHtml = "";
    for (let unit of users) {
        let mail = `${unit.email.split("@")[0]}<br>@${unit.email.split("@")[1]}`;
        let templateCard = `
                <div class="card">
                    <div class="card-name">
                        <h2>${unit.name.first} ${unit.name.last}</h2>
                    </div>
                    <img src=${unit.picture.large} alt="">
                    <div class="card-description">
                        <p class="card-year">I have ${unit.dob.age} years old.</p>
                        <p class="card-mail">${mail}</p>
                        <p class="phone">${unit.phone}</p>
                        <p class="location">${unit.location.city}</p>
                    </div>
                    <div class="card-sex">
                        <p>${unit.gender}</p>
                    </div>
                </div>`;
        fragmentHtml += templateCard;
    }
    content.innerHTML = fragmentHtml;
}

const showError = function (text) {
    content.innerHTML = `<h2 class="error-message">Server is unavailable<br>Error: ${text}<br>Please try again later...</h2>`;
}

const handleErrors = function (response) {
    if (!response.ok) {
        showError(response.statusText);
        throw Error(response.statusText);
    }
    return response;
}

const getUsersByApi = function () {
    const url = "https://randomuser.me/api/?results=120&inc=gender,name,location,email,phone,picture,dob&appid=YI09-4F4Y-E9IS-OTSH";
    return fetch(url)
        .then(handleErrors)
        .then(response => response.json())
        .then(data => data.results)
        .catch(err => {
            showError(err.message);
            throw Error(err);
        });
}

const addEvents = function () {
    form.addEventListener("input", readChangeForm);
    resetButton.addEventListener("click", reset);
    menuButton.addEventListener("click", slideMenu);
}

async function init() {
    state.unsortedUsers = await getUsersByApi();
    toDefaultState();
    processCards();
    addEvents();
};

init();
