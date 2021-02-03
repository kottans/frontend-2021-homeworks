let FRIENDS = [],
    selectedOption,
    INITIAL_FRIENDS = [];
const MIN_AGE_INPUT = document.getElementById("minAge"),
    MAX_AGE_INPUT = document.getElementById("maxAge"),
    CARDS_CONTAINER = document.querySelector(".cards__container"),
    SEARCH_INPUT = document.querySelector("#search"),
    SELECT_CONTAINER = document.querySelector(".select__container"),
    FILTERS_CONTAINER = document.querySelector(".filters__container"),
    OPTIONS_CONTAINER = document.querySelector(".select__list"),
    OPTIONS_LIST = document.querySelectorAll(".list__label"),
    TOTAL_COUNTER = document.querySelector(".amount");


async function initializeApp(){
    await getFriends();
    if(FRIENDS.length){
        appendFriendsCards(FRIENDS);
        setTotalCounter(FRIENDS);
        initializeAgeLimits(FRIENDS);
    }    
}

async function getFriends() {
    const USERS_AMOUNT = 24,
        API_URL = `https://randomuser.me/api/?results=${USERS_AMOUNT}`;
    return fetch(API_URL)
        .then((response) => handleResponseStatus(response))
        .then((responseBody) => {
            addMoreInitialFriends(responseBody);
            FRIENDS = INITIAL_FRIENDS;
        })
        .catch((error) => appendErrorMessage(getErrorText(error)));
}

function handleResponseStatus(response){
    if (response.ok) {
        return response.json();
    } else {
        throwError(response);
    }
}

function throwError(response){
    throw new Error(getResponseErrorMessage(
        response.status,
        response.statusText
    ));
}

function addMoreInitialFriends(responseBody){
    INITIAL_FRIENDS = INITIAL_FRIENDS.concat(
        flattenFriendProperties(responseBody.results)
    );
}

function hideMainContent(){
    document.querySelector(".main__container").classList.toggle("display-none");
    document.querySelector(".more__button").classList.toggle("display-none");
}

function getErrorText(error){
    return error.toString().split(" ").slice(1).join(" ");
}

function setTotalCounter(friends) {
    TOTAL_COUNTER.innerText = `${friends.length} Totals`;
}

function initializeAgeLimits(friends) {
    const ageLimits = getAgeLimits(friends);
    setAgeLimits(ageLimits, MIN_AGE_INPUT, 'min');
    setAgeLimits(ageLimits, MAX_AGE_INPUT, 'max');
}

function appendNoResultsMessage() {
    CARDS_CONTAINER.innerHTML = `<h3 class="no-results">Sorry, no results found ¯\\_(ツ)_/¯</h3>`;
}

function appendFriendsCards(friends) {
    cleanCardsContainer();
    setTotalCounter(friends);
    friends.length 
        ? CARDS_CONTAINER.appendChild(createCardsFragment(friends)) 
        : appendNoResultsMessage();    
}

function createCardsFragment(friends){
    const fragment = document.createDocumentFragment();
    friends.forEach((friend) => {
        const template = document.createElement("template");
        template.innerHTML = getFriendCardTemplate(friend);
        fragment.appendChild(template.content);
    });
    return fragment;
}

function appendErrorMessage(errorText) {
    hideMainContent();
    document.body.innerHTML += `<div class="error__container">
                                    <p>Oh no ... ${errorText}</p>
                                    <p>Try to reload the page!</p>
                                    <img src="assets/error.svg" class="error__image">
                                </div>`; 
}

function cleanCardsContainer() {
    CARDS_CONTAINER.innerHTML = "";
}

function flattenFriendProperties(friends) {
    return friends.map((friend) => {
        return {
            firstName: friend.name.first,
            lastName: friend.name.last,
            email: friend.email,
            gender: friend.gender,
            country: friend.location.country,
            username: friend.login.username,
            phone: friend.phone,
            age: friend.dob.age,
            image: friend.picture.large,
            registeredAge: friend.registered.age,
            registeredDate: friend.registered.date,
        };
    });
}

function getFriendCardTemplate(friend) {
    return `<div class="card__container shadow">
                <div class="card__row around">
                    <a href='mailto:${friend.email}' class="email__button button" 
                       data-title='${friend.email}'></a>
                    <img src="${friend.image}" class="card__image">
                    <a href='tel:${reformatPhoneNumber(friend.phone)}' class="phone__button button" 
                       data-title='${reformatPhoneNumber(friend.phone)}'></a>
                </div>
                <div class="card__row column">
                    <h3 class="card__name">${friend.firstName} ${friend.lastName}</h3>
                    <h5 class="card__username">@${friend.username}</h5>
                </div>
                <div class="card__row gender__container">
                    <h6 class="card__gender">${getGenderIcon(friend.gender)}</h6>
                    <h6 class="card__age">${friend.age}</h6>
                </div>
                <div class="card__row registered__container">
                    <p class="registered__message">Friends since <br> 
                    ${getDate(friend.registeredDate)}</p>
                    <div style="width:${friend.registredAge}%"></div>
                </div>
                <div class="card__row country__row">
                    <h6 class="card__country">${friend.country}</h6>
                </div>
            </div>`;
}

function reformatPhoneNumber(number) {
    return number
        .replace(/[^0-9]+/g, "") //leave only numbers in phone number
        .replace(/.(\d{3})/g, "$1-") // add dashes between groups of digits consisting of 3 numbers
        .replace(/(^\d{3,3})-(.\d+)/, "+($1)-$2") // get first group of 3 digits and place them inside brackets
        .replace(/[-]+$/g, ""); //remove extra dash if it appers after the last group of numbers
}

function getDate(date) {
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function getGenderIcon(gender) {
    return gender === "female"
        ? '<span class="female">♀</span>'
        : '<span class="male">♂</span>';
}

function getResponseErrorMessage(status, statusText) {
    return `<h2 class='error__code'>${status}: ${statusText}</h2>`;
}

function setAgeLimits(ageLimits, limitInput, limit) {
    limitInput.min = ageLimits.min;
    limitInput.max = ageLimits.max;
    limitInput.value = ageLimits[limit];
}

function getAgeLimits(friends) {
    const sortedFriends = friends.sort((a, b) => a.age - b.age);
    return {
        min: sortedFriends[0].age,
        max: sortedFriends[sortedFriends.length - 1].age,
    };
}

function sortCards(friends) {
    const checkedSortInput = document.querySelector(".list__input:checked");
    if(checkedSortInput){
        SELECT_CONTAINER.setAttribute("select-modified", true);
        sortByType[checkedSortInput.getAttribute("value")](friends);
    }
}

function updateSelectText(itemToSelect) {
    SELECT_CONTAINER.textContent = itemToSelect.textContent;
    SELECT_CONTAINER.setAttribute("value", itemToSelect.getAttribute("value"));
}

const sortByType = {
    namesDescending: function(friends) {
        friends.sort((a, b) => b.firstName.localeCompare(a.firstName));
    },
    namesAscending: function(friends) {
        friends.sort((a, b) => a.firstName.localeCompare(b.firstName));
    },
    ageDescending: function(friends) {
        friends.sort((a, b) => b.age - a.age);
    },
    ageAscending: function(friends) {
        friends.sort((a, b) => a.age - b.age);
    },
}

function findSubstring(string, substring) {
    return string.toLowerCase().includes(substring.toLowerCase());
}

function findMatchesWithPropertiesValues(friends, substring) {
    const ALLOWED_SEARCH_FILTER_PROPERTIES = ["firstName", "lastName", "email", "username", "country"];
    return friends.filter((friend) => {
        return ALLOWED_SEARCH_FILTER_PROPERTIES
            .filter((property) => findSubstring(friend[property], substring)).length;
    });
}

function filterByGender(friends) {
    let checkboxes = Array.from(document.querySelectorAll(".checkbox:checked"));
    return friends.filter((friend) =>
        checkboxes.some((gender) => friend.gender === gender.value)
    );
}

function filterByAge(friends) {
    if (MIN_AGE_INPUT.value) friends = friends
        .filter((friend) => friend.age >= MIN_AGE_INPUT.value);
    if (MAX_AGE_INPUT.value) friends = friends
        .filter((friend) => friend.age <= MAX_AGE_INPUT.value);
    return friends;
}


function updateCards() {    
    FRIENDS = INITIAL_FRIENDS;
    sortCards(FRIENDS);
    FRIENDS = filterByAge(FRIENDS);
    FRIENDS = filterByGender(FRIENDS);
    if(!isSearchEmpty()) {
        FRIENDS = findMatchesWithPropertiesValues(
            FRIENDS,
            SEARCH_INPUT.value
        );
    }
    appendFriendsCards(FRIENDS);
}

function isSearchEmpty(){
    return !document.getElementById("search").value;
}

function isItemInFocus(e){
    return e.target.contains(e.relatedTarget);
}

function isSelectModified() {
    return SELECT_CONTAINER.setAttribute("select-modified", "true");
}

function checkOptionsVisibility() {
    return OPTIONS_CONTAINER.classList.contains("visible");
}

function resetPreviouslySelectedOptions(selectedOption) {
    Array.from(OPTIONS_LIST).forEach((option) => {
        if (option.textContent !== selectedOption) {
            option.control.checked = false;
        }else{
            option.control.checked = true;
        }
    });
}

function removeAriaSelectedAttribute(option) {
    option.removeAttribute("aria-selected");
}

function getSelectOption(selectText) {
    return Array.from(OPTIONS_LIST).find(
        (option) => option.textContent === selectText
    );
}

function higlightSelectedOption(itemToSelect) {
    itemToSelect.setAttribute("aria-selected", "true");
    itemToSelect.control.checked = true;
    updateSelectText(itemToSelect);
}

function focusOnItem(buttonPressed) {
    const optionsList = Array.from(OPTIONS_LIST),
        selectedItem = optionsList.find(
            (listItem) => listItem.textContent === selectedOption
        );
    let selectedItemIndex = Array.from(OPTIONS_LIST).indexOf(selectedItem);
    if(buttonPressed === "ArrowUp"){
        if (--selectedItemIndex < 0) {
            selectedItemIndex = optionsList.length-1;
        }        
    }else{
        if (++selectedItemIndex > optionsList.length-1) {
            selectedItemIndex = 0;
        }
    }
    higlightSelectedOption(optionsList[selectedItemIndex]);
    selectedOption = optionsList[selectedItemIndex].textContent;
    resetPreviouslySelectedOptions(selectedOption);
    removeAriaSelectedAttribute(selectedItem);
}

(function observeOptionsListVisibility() {
    const options = { attributes: true, attributesFilter: ["classList"] },
        callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === "attributes") {
                    if (
                        mutation.target.classList.contains("visible") &&
                        !SELECT_CONTAINER.getAttribute("aria-expanded")
                    ) { 
                        resetPreviouslySelectedOptions(selectedOption);                  
                        higlightSelectedOption(getSelectOption(selectedOption));
                        SELECT_CONTAINER.setAttribute("aria-expanded", "true");
                    }
                    if (
                        !mutation.target.classList.contains("visible") &&
                        SELECT_CONTAINER.getAttribute("aria-expanded")
                    ) {
                        SELECT_CONTAINER.removeAttribute("aria-expanded");
                    }
                }
            }
        };
    const observer = new MutationObserver(callback);
    observer.observe(OPTIONS_CONTAINER, options);
})();


document.querySelectorAll(".list__input").forEach(input => {
    input.addEventListener("change", (e) => {
        const selectedItemLabel = document.querySelector(`[for=${e.target.id}]`);
        selectedOption = selectedItemLabel.textContent;
        resetPreviouslySelectedOptions(selectedOption);
        updateSelectText(selectedItemLabel);
        updateCards();
    });
});

document.querySelectorAll(".gender__input, .number").forEach(input => {
    input.addEventListener("change", () => updateCards());
});

document.querySelector("#search").addEventListener("input", () => updateCards());

SELECT_CONTAINER.addEventListener("focusout", (e) => {
    if (!isItemInFocus(e)){
        OPTIONS_CONTAINER.classList.remove("visible");
    }
});

document.addEventListener("keydown", (e) => {
    const {target, code} = e;
    if (target === SELECT_CONTAINER) {
        if (code === "Space" || code === "Enter") {
            e.preventDefault();
            if (!checkOptionsVisibility()) {
                OPTIONS_CONTAINER.classList.add("visible");
                if (isSelectModified()) {
                    higlightSelectedOption(getSelectOption(selectedOption));
                } else {
                    selectedOption = OPTIONS_LIST[0].textContent;
                    higlightSelectedOption(OPTIONS_LIST[0]);
                }
            } else {
                updateCards();
                OPTIONS_CONTAINER.classList.remove("visible");
            }
        }
    }
    if (code === "Escape" && checkOptionsVisibility()) {
        OPTIONS_CONTAINER.classList.remove("visible");
    }
    if (
        checkOptionsVisibility() &&
        (code == "ArrowUp" || code == "ArrowDown")
    ) {
        e.preventDefault();
        focusOnItem(code);
    }
    resetPreviouslySelectedOptions(selectedOption);
});

document.querySelector("#showFiltersButton").addEventListener("click", (e) => {
    FILTERS_CONTAINER.classList.toggle("display");
});

SELECT_CONTAINER.addEventListener("click", (e) => {
    OPTIONS_CONTAINER.classList.toggle("visible");
    if(!SELECT_CONTAINER.getAttribute("value")){
        selectedOption = OPTIONS_LIST[0].textContent;
    }else{
        selectedOption = e.target.textContent;
    }
});

window.addEventListener("beforeunload", () => {
    SELECT_CONTAINER.setAttribute("select-modified", "false");
    document.querySelector("#female").checked = "true";
    document.querySelector("#male").checked = "true";
    document.querySelector("#maxAge").value = "";
    document.querySelector("#minAge").value = "";
    document.querySelector("#search").value = "";
    document.querySelectorAll(".list__input").forEach(input => input.checked = "false");
});

initializeApp();
