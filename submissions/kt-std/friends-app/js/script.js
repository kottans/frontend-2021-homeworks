let FRIENDS_ARRAY = [],
    selectedOption,
    INITIAL_FRIENDS_ARRAY = [];
const USERS_AMOUNT = 24,
    API_URL = `https://randomuser.me/api/?results=${USERS_AMOUNT}`,
    ALLOWED_SEARCH_FILTER_PROPERTIES = ["firstName", "lastName", "email", "username", "country"],
    MIN_AGE_INPUT = document.getElementById("minAge"),
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
    if(FRIENDS_ARRAY.length){
        appendFriendsCards(FRIENDS_ARRAY);
        setTotalCounter(FRIENDS_ARRAY);
        initializeAgeLimits(FRIENDS_ARRAY);
    }    
}

initializeApp();

async function getFriends() {
    return fetch(API_URL)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(getResponseErrorMessage(
                    response.status,
                    response.statusText
                ));
            }
        })
        .then((responseBody) => {
            INITIAL_FRIENDS_ARRAY = INITIAL_FRIENDS_ARRAY.concat(
                flattenFriendProperties(responseBody.results)
            );
            FRIENDS_ARRAY = INITIAL_FRIENDS_ARRAY;
        })
        .catch((error) => {
            const errorText = error.toString().split(" ").slice(1).join(" ");
            appendErrorMessage(`Oh no ... ${errorText} <br> Try to reload the page!`);
            document.querySelector(".main__container").classList.toggle("display-none");
            document.querySelector(".more__button").classList.toggle("display-none");
        });
}

function setTotalCounter(friendsArray) {
    TOTAL_COUNTER.innerText = `${friendsArray.length} Totals`;
    if (!friendsArray.length) {
        appendNoResultsMessage();
    }
}

function initializeAgeLimits(friendsArray) {
    const ageLimits = getAgeLimits(friendsArray);
    setAgeLimits(ageLimits, MIN_AGE_INPUT, 'min');
    setAgeLimits(ageLimits, MAX_AGE_INPUT, 'max');
}

function appendNoResultsMessage() {
    const noResultMessage = document.createElement("h3");
    noResultMessage.innerText = "Sorry! No results found :(";
    noResultMessage.classList.add("no-results");
    CARDS_CONTAINER.appendChild(noResultMessage);
}

function appendFriendsCards(friendsArray) {
    cleanCardsContainer();
    setTotalCounter(friendsArray);
    const fragment = document.createDocumentFragment();
    friendsArray.forEach((friend) => {
        const template = document.createElement("template");
        template.innerHTML = getFriendCardTemplate(friend);
        fragment.appendChild(template.content);
    });
    CARDS_CONTAINER.appendChild(fragment);
}

function appendErrorMessage(errorText) {
    const div = document.createElement("div"),
        img = document.createElement("img");
    div.innerHTML = errorText;
    div.classList.add("error__container");
    img.classList.add("error__image");
    img.src = "assets/error.svg";
    div.appendChild(img);
    document.querySelector(".main__row").classList.toggle("display-none");
    document.querySelector(".more__button").classList.toggle("display-none");
    document.body.append(div);
}

function cleanCardsContainer() {
    CARDS_CONTAINER.innerHTML = "";
}

function flattenFriendProperties(friendsArray) {
    return friendsArray.map((friend) => {
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

function getAgeLimits(friendsArray) {
    const sortedArray = friendsArray.sort((a, b) => a.age - b.age);
    return {
        min: sortedArray[0].age,
        max: sortedArray[sortedArray.length - 1].age,
    };
}

function sortCards(friendsArray) {
    const checkedSortInput = document.querySelector(".list__input:checked");
    if(checkedSortInput){
        SELECT_CONTAINER.attributes["select-modified"].value = true;
        sortCardsArray[checkedSortInput.getAttribute("value")](friendsArray);
    }
}

function updateSelectText(itemToSelect) {
    SELECT_CONTAINER.textContent = itemToSelect.textContent;
    SELECT_CONTAINER.setAttribute("value", itemToSelect.getAttribute("value"));
}

const sortCardsArray = {
    namesDescending: function(friendsArray) {
        friendsArray.sort((a, b) => b.firstName.localeCompare(a.firstName));
    },
    namesAscending: function(friendsArray) {
        friendsArray.sort((a, b) => a.firstName.localeCompare(b.firstName));
    },
    ageDescending: function(friendsArray) {
        friendsArray.sort((a, b) => b.age - a.age);
    },
    ageAscending: function(friendsArray) {
        friendsArray.sort((a, b) => a.age - b.age);
    },
}

function findSubstring(string, substring) {
    return string.toLowerCase().includes(substring.toLowerCase());
}

function findMatchesWithPropertiesValues(
    friendsArray,
    substring
) {
    return friendsArray.filter((friend) => {
        return ALLOWED_SEARCH_FILTER_PROPERTIES
            .filter((property) => findSubstring(friend[property], substring)).length;
    });
}

function filterByGender(friendsArray) {
    let checkboxes = Array.from(document.querySelectorAll(".checkbox:checked"));
    return friendsArray.filter((friend) =>
        checkboxes.some((gender) => friend.gender === gender.value)
    );
}

function filterByAge(friendsArray) {
    if (MIN_AGE_INPUT.value) friendsArray = friendsArray
        .filter((friend) => friend.age >= MIN_AGE_INPUT.value);
    if (MAX_AGE_INPUT.value) friendsArray = friendsArray
        .filter((friend) => friend.age <= MAX_AGE_INPUT.value);
    return friendsArray;
}


function updateCards() {    
    FRIENDS_ARRAY = INITIAL_FRIENDS_ARRAY;
    sortCards(FRIENDS_ARRAY);
    FRIENDS_ARRAY = filterByAge(FRIENDS_ARRAY);
    FRIENDS_ARRAY = filterByGender(FRIENDS_ARRAY);
    if(!isSearchEmpty()) {
        FRIENDS_ARRAY = findMatchesWithPropertiesValues(
            FRIENDS_ARRAY,
            SEARCH_INPUT.value
        );
    }
    appendFriendsCards(FRIENDS_ARRAY);
}

function isSearchEmpty(){
    return !document.getElementById("search").value;
}

function isItemInFocus(e){
    return e.target.contains(e.relatedTarget);
}

function isSelectModified() {
    return SELECT_CONTAINER.attributes["select-modified"].value === "true";
}

function checkOptionsVisibility() {
    return OPTIONS_CONTAINER.classList.contains("visible");
}

function resetPreviouslySelectedOptions(selectedOption) {
    Array.from(OPTIONS_LIST).forEach((option) => {
        if (option.textContent !== selectedOption) {
            document.getElementById(option.htmlFor).checked = false;
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
    document.getElementById(itemToSelect.htmlFor).checked = true;
    updateSelectText(itemToSelect);
}

function focusOnItem(buttonPressed) {
    const optionsListArray = Array.from(OPTIONS_LIST),
        selectedItem = optionsListArray.find(
            (listItem) => listItem.textContent === selectedOption
        );
    let selectedItemIndex = Array.from(OPTIONS_LIST).indexOf(selectedItem);
    if(buttonPressed === "ArrowUp"){
        if (--selectedItemIndex < 0) {
            selectedItemIndex = optionsListArray.length-1;
        }        
    }else{
        if (++selectedItemIndex > optionsListArray.length-1) {
            selectedItemIndex = 0;
        }
    }
    higlightSelectedOption(optionsListArray[selectedItemIndex]);
    selectedOption = optionsListArray[selectedItemIndex].textContent;
    resetPreviouslySelectedOptions(selectedOption);
    removeAriaSelectedAttribute(selectedItem);
}

function observeOptionsListVisibility() {
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
}

observeOptionsListVisibility();

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
    SELECT_CONTAINER.attributes["select-modified"].value = "false";
    document.querySelector("#female").checked = "true";
    document.querySelector("#male").checked = "true";
    document.querySelector("#maxAge").value = "";
    document.querySelector("#minAge").value = "";
    document.querySelector("#search").value = "";
    document.querySelectorAll(".list__input").forEach(input => input.checked = "false");
});
