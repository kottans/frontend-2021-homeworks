const content = document.querySelector(".content");
const navPanel = document.querySelector(".sidebar");
const button = document.querySelector(".menu-button");
const form = document.querySelector('.filters');
const searchInput = document.getElementById('search-input');
const resetButton = document.getElementById('reset-button');
const url = 'https://randomuser.me/api/?results=120&inc=gender,name,location,email,phone,picture,dob&appid=YI09-4F4Y-E9IS-OTSH';
const state = {
    gotResult: [],
    filterBySex: "",
    filterByName: "",
    sortByAge: "",
    sortByName: "",
    toDefault(arr) {
        this.filterBySex = "all";
        this.filterByName = "",
        this.sortByAge = "ascending";
        this.sortByName = "none";
        this.gotResult = arr;
    }
};
let result = [];

const sortByAge = (a, b) => a.dob.age <= b.dob.age ? -1 : 1;
const sortByName = (a, b) => a.name.first.toLowerCase() >= b.name.first.toLowerCase() ? 1 : -1;

const slideMenu = function() {
    navPanel.classList.toggle("sidebar-toggle");
    content.classList.toggle("content-toggle");
}

const controlToDefault = function() {
    form.elements[1].checked = "true";
    form.elements[9].checked = "true";
    searchInput.value = "";
}

const handleInput = function () {
    state.filterByName = this.value.trim().toLowerCase();
    processCard(state);
};

const reset = function() {
    state.toDefault();
    controlToDefault();
    processCard(state);
};

const processForm = function({currentTarget}){
    state.sortByName = "none";
    state.sortByAge = "none";
    let selectedSex;
    let elements = currentTarget.elements;
    let selectedChoice = Array.from(elements.sortBy).filter(({checked}) => checked);
    switch(selectedChoice[0].id) {
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
    selectedSex = Array.from(currentTarget.elements.gender).filter(({checked}) => checked);
    state.filterBySex = selectedSex[0].dataset.gender;
    processCard(state);
};

const processCard = function (state){
    if (state.filterBySex === "all"){
        state.gotResult = result;
    };
    if (state.filterBySex === "male"){
        state.gotResult = result.filter( unit => unit.gender == "male");
    };
    if (state.filterBySex === "female"){
        state.gotResult = result.filter( unit => unit.gender == "female");
    };

    if (state.filterByName !== "") {
        state.gotResult = state.gotResult.filter( elem => elem.name.first.toLowerCase().startsWith(state.filterByName) );
    }

    if (state.sortByAge === "ascending"){
        state.gotResult.sort((a, b) => sortByAge(a, b));
    };
    if (state.sortByAge === "descending"){
        state.gotResult.sort((a, b) => sortByAge(b, a));
    };
    if (state.sortByName === "descending"){
        state.gotResult.sort((a, b) => sortByName(b, a));
    };
    if (state.sortByName === "ascending"){
        state.gotResult.sort((a, b) => sortByName(a, b));
    };

    renderCard(state.gotResult);
}

const renderCard = function(arr) {
    content.innerHTML ="";
    for (let unit of arr) {
        let newCard = document.createElement('div');
        newCard.classList.add('card');
        let mail = `${unit.email.split("@")[0]}<br>@${unit.email.split("@")[1]}`;
        let templateCard = `
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
                </div>`;
        newCard.innerHTML += templateCard;
        content.appendChild(newCard);
    }
}

const init = function() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        result = data.results;
        state.toDefault(result.slice());
    })
    .then(() => {
        processCard(state)
    })
    .then(() => {
        form.addEventListener("change", processForm);
        searchInput.addEventListener("input", handleInput);
        resetButton.addEventListener("click", reset);
        button.addEventListener("click", slideMenu);
    })
    .catch(err => console.error(err));
};

init();
