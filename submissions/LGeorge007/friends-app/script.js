const content = document.querySelector(".content");
const navPanel = document.querySelector(".sidebar");
const button = document.querySelector(".menu-button");
const form = document.querySelector('#filters');
const searchInput = document.getElementById('search-input');
const resetButton = document.getElementById('reset-button');

const state = {
    unsortedUsers: [],
    sortedUsers: [],
    filterBySex: "",
    filterByName: "",
    sortByAge: "",
    sortByName: ""
};

const setStateToDefault = function () {
    this.filterBySex = "all";
    this.filterByName = "",
    this.sortByAge = "ascending";
    this.sortByName = "none";
    this.sortedUsers = this.unsortedUsers;
}

const toDefaultState = setStateToDefault.bind(state);

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

const toDefaultForm = function () {
    document.querySelectorAll(".initial").forEach(e => e.checked="true");
    searchInput.value = "";
}

const handleInput = function () {
    state.filterByName = this.value.trim().toLowerCase();
    processCards(state);
};

const reset = function () {
    toDefaultState();
    toDefaultForm();
    processCards(state);
};

const toInteractWithForm = function () {
    state.sortByName = "none";
    state.sortByAge = "none";
    let selectedSex = [...form.elements.gender].filter(({ checked }) => checked);
    let selectedChoice = [...form.elements.sortBy].filter(({ checked }) => checked);
    switch (selectedChoice[0].value) {
        case "age-ascending":
            state.sortByAge = "ascending";
            break;
        case "age-descending":
            state.sortByAge = "descending";
            break;
        case "name-ascending":
            state.sortByName = "ascending";
            break;
        case "name-descending":
            state.sortByName = "descending";
            break;
    };
    state.filterBySex = selectedSex[0].value;
    processCards(state);
};

const filterUsers = function() {
    if (state.filterBySex === "all") {
        state.sortedUsers = state.unsortedUsers;
    } else {
        state.sortedUsers = state.unsortedUsers.filter(unit => unit.gender == state.filterBySex);
    };
    if (state.filterByName !== "") {
        state.sortedUsers = state.sortedUsers.filter(unit => unit.name.first.toLowerCase().startsWith(state.filterByName));
    }
}

const sortUsers = function() {
    if (state.sortByAge === "ascending") state.sortedUsers.sort(sortByAge);
    if (state.sortByAge === "descending") state.sortedUsers.sort((a, b) => sortByAge(b, a));
    if (state.sortByName === "descending") state.sortedUsers.sort((a, b) => sortByName(b, a));
    if (state.sortByName === "ascending") state.sortedUsers.sort(sortByName);
}

const processCards = function (state) {
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

const showError = function(text) {
    document.body.innerHTML = `<h2 class="error-message">Server is unavailable<br>Error: ${text}<br>Please try again later...</h2>`;
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

const addEvents = function() {
    form.addEventListener("change", toInteractWithForm);
    searchInput.addEventListener("input", handleInput);
    resetButton.addEventListener("click", reset);
    button.addEventListener("click", slideMenu);
}

async function init() {
    state.unsortedUsers = await getUsersByApi();
    toDefaultState();
    processCards(state);
    addEvents();
};

init();
