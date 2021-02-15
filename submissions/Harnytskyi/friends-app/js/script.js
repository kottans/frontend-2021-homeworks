const GRID_OF_CARDS = document.getElementById("allFriends");
const SEARCH_INPUT = document.getElementById('search');
const FILTER_SORT = document.getElementById("filter-sort");
const FILTER_GENDER = document.getElementById("filter-gender");
const ERROR_MESSAGE = document.getElementById("errorMessage");
const MIN_AGE = document.getElementById("minAge");
const MAX_AGE = document.getElementById("maxAge");
const FILTER_AGE = document.getElementById("filter-age");
let friends = [];
let minAge, maxAge;
let gender = {
    male: true,
    female: true
}

let selectedFriends;
function saveUsers(usersArray) {
    friends = usersArray.map(user => {
        return {
            name: `${user.name.first} ${user.name.last}`,
            age: user.dob.age,
            phone: user.cell,
            email: user.email,
            gender: user.gender,
            photo: user.picture.large
        }
    })
}
function filterByGender() {
    if (gender.male == true && gender.female == true)
        selectedFriends = friends;
    else if (gender.male == true && gender.female == false)
        selectedFriends = friends.filter(item => item.gender == "male")
    else if (gender.male == false && gender.female == true)
        selectedFriends = friends.filter(item => item.gender == "female")
    else
        selectedFriends = [];
}
function filterByAge() {
    selectedFriends = selectedFriends.filter(friend => (friend.age >= minAge && friend.age <= maxAge));
}
function displayFriends() {
    GRID_OF_CARDS.innerHTML = selectedFriends.map(item => {
        return `<div id="${item.name}" class="card">
                <img class="photo" src="${item.photo}">
                <p class="name">${item.name}</p>
                <p class="age">Age: ${item.age}</p>
                <a class="phone" href="tel:${item.phone}">${item.phone}</a>
                <div class="email">
                    <a href="mailto:${item.email}">
                        <button class="button-message">SEND MESSAGE</button>
                    </a>
                </div>
            </div>`
    }).join("");
}

function changeFilterStatus(checkbox) {
    gender[checkbox.value] = !gender[checkbox.value];
}
function selectFriends() {
    filterByGender();
    filterByAge();
    findFriends();
    if (selectedFriends.length == 0) {
        GRID_OF_CARDS.innerHTML = "";
        showNotFoundMessage();
    }
    else {
        ERROR_MESSAGE.innerHTML = '';
        displayFriends();
    }
}

function findFriends() {
    let searchRequest = SEARCH_INPUT.value.toUpperCase();
    searchedFriends = selectedFriends.filter(item =>
        (item.name.toUpperCase().includes(searchRequest))
    )
    selectedFriends = searchedFriends;
}

function sortFriends(value) {
    let criterion;
    let order;
    switch (value) {
        case 'alphabet-ascend':
            friends.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'alphabet-descend':
            friends.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'age-ascend':
            friends.sort((a, b) => a.age - b.age);
            break;
        case 'age-descend':
            friends.sort((a, b) => b.age - a.age);
            break;
    }
}

function identifyAgeRange() {
    let minAgeOfFriends = friends[0].age;
    let maxAgeOfFriends = minAgeOfFriends;
    friends.forEach(friend => {
        if (minAgeOfFriends > friend.age)
            minAgeOfFriends = friend.age;
        if (maxAgeOfFriends < friend.age)
            maxAgeOfFriends = friend.age;
    })
    MIN_AGE.value = minAgeOfFriends;
    MAX_AGE.value = maxAgeOfFriends;
    minAge = minAgeOfFriends;
    maxAge = maxAgeOfFriends;
}

function initApp() {
    let targetUrl = "https://randomuser.me/api/?results=30&nat=au,ca,ch,de,dk,es,fr,gb,ie,no,nl,nz,us"

    fetch(targetUrl)
        .then((response) => response.json())
        .then((json) => {
            saveUsers(json.results);
            identifyAgeRange();
            selectedFriends = friends;
            displayFriends();
        })
        .catch(function (error) {
            showErrorMessage(error);
        });
}


function showNotFoundMessage() {
    ERROR_MESSAGE.innerHTML = `Not Found`;
}
function showErrorMessage(error) {
    ERROR_MESSAGE.innerHTML = `Something wrong: <br>${error} <br> Please reload the page`;
}
function checkAgeRangeValidity() {
    maxAge = parseInt(MAX_AGE.value);
    minAge = parseInt(MIN_AGE.value);
    if (maxAge < minAge) {
        FILTER_AGE.classList.add('invalid-value');
        return false;
    }
    else {
        FILTER_AGE.classList.remove('invalid-value');
        return true;
    }
}

FILTER_GENDER.addEventListener('change', (event) => {
    const target = event.target;
    changeFilterStatus(target);
    selectFriends();
})
FILTER_SORT.addEventListener('change', (event) => {
    const target = event.target;
    sortFriends(target.value);
    selectFriends();
})
FILTER_AGE.addEventListener('change', (event) => {
    if (checkAgeRangeValidity())
        selectFriends();
})

initApp();
