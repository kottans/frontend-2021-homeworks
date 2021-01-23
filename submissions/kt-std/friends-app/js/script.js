let FRIENDS_ARRAY = [],
    selectedOption,
    INITIAL_FRIENDS_ARRAY = [];
const USERS_AMOUNT = 24,
    API_URL = `https://randomuser.me/api/?results=${USERS_AMOUNT}`,
    MIN_AGE_INPUT_ID = "minAge",
    MAX_AGE_INPUT_ID = "maxAge",
    CARDS_CONTAINER = document.querySelector(".cards__container"),
    SELECT_CONTAINER = document.querySelector(".select__container"),
    FILTERS_CONTAINER = document.querySelector(".filters__container"),
    OPTIONS_CONTAINER = document.querySelector(".select__list"),
    OPTIONS_LIST = document.querySelectorAll(".list__label"),
    TOTAL_COUNTER = document.querySelector(".amount");



function getFriends() {
    fetch(API_URL)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                appendErrorMessage(
                    getResponseErrorMessage(
                        response.status,
                        response.statusText
                    )
                );
                return response.json();
            }
        })
        .then((responseBody) => {
            if (responseBody !== undefined) {
                INITIAL_FRIENDS_ARRAY = INITIAL_FRIENDS_ARRAY.concat(
                    flattenFriendProperties(responseBody.results)
                );
                FRIENDS_ARRAY = INITIAL_FRIENDS_ARRAY;
                appendFriendsCards(FRIENDS_ARRAY);
                setTotalCounter(FRIENDS_ARRAY);
                initializeAgeLimits(FRIENDS_ARRAY);
            }
        })
        .catch((error) => {
            appendErrorMessage(`${error} <br> Try to reload the page!`);
            document.querySelector(".main__container").classList.toggle("display-none");
            document.querySelector(".more__button").classList.toggle("display-none");
        });
}

getFriends();

function setTotalCounter(friendsArray) {
    TOTAL_COUNTER.innerText = `${friendsArray.length} Totals`;
    if (!friendsArray.length) {
        appendNoResultsMessage();
    }
}

function initializeAgeLimits(friendsArray) {
    const ageLimits = getAgeLimits(friendsArray);
    setAgeLimits(ageLimits, MIN_AGE_INPUT_ID);
    setAgeLimits(ageLimits, MAX_AGE_INPUT_ID);
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
    return `<h1 class='error__message'>Sorry, an error occured!</h1>
            <h2 class='error__code'>${status}: ${statusText}</h2>`;
}

function setAgeLimits(ageLimits, limitInputId) {
    const limitInput = document.getElementById(limitInputId);
    limitInput.min = ageLimits.min;
    limitInput.max = ageLimits.max;
    if (limitInputId === MIN_AGE_INPUT_ID) limitInput.value = ageLimits.min;
    if (limitInputId === MAX_AGE_INPUT_ID) limitInput.value = ageLimits.max;
}

function getAgeLimits(friendsArray) {
    const sortedArray = friendsArray.sort((a, b) => a.age - b.age);
    return {
        min: sortedArray[0].age,
        max: sortedArray[sortedArray.length - 1].age,
    };
}

function sortCards(e, friendsArray) {
    if (
        e.target.classList.contains("list__label") ||
        e.target.classList.contains("select__container")
    ) {
        SELECT_CONTAINER.attributes["select-modified"].value = true;
        sortCardsArray(e.target.getAttribute("value"), friendsArray);
    }
}

function updateSelectText(itemToSelect) {
    SELECT_CONTAINER.textContent = itemToSelect.textContent;
    SELECT_CONTAINER.setAttribute("value", itemToSelect.getAttribute("value"));
}

function sortCardsArray(condition, friendsArray) {
    switch (condition) {
        case "namesDescending":
            FRIENDS_ARRAY.sort((a, b) => b.firstName.localeCompare(a.firstName));
            break;
        case "namesAscending":
            FRIENDS_ARRAY.sort((a, b) => a.firstName.localeCompare(b.firstName));
            break;
        case "ageDescending":
            FRIENDS_ARRAY.sort((a, b) => b.age - a.age);
            break;
        case "ageAscending":
            FRIENDS_ARRAY.sort((a, b) => a.age - b.age);
            break;
    }
}

function findSubstring(string, substring) {
    return string.toLowerCase().indexOf(substring.toLowerCase()) >= 0;
}

function findMatchesWithPropertiesValues(
    propertiesList,
    friendsArray,
    substring
) {
    return friendsArray.filter((friend) => {
        return propertiesList
            .map((property) => findSubstring(friend[property], substring))
            .some((el) => el);
    });
}

function filterByGender(e, friendsArray) {
    let checkboxes = Array.from(document.querySelectorAll(".checkbox:checked"));
    return friendsArray.filter((friend) =>
        checkboxes.some((gender) => friend.gender === gender.value)
    );
}

function filterByAge(friendsArray) {
    const min = document.getElementById(MIN_AGE_INPUT_ID),
        max = document.getElementById(MAX_AGE_INPUT_ID);
    if (max.value) friendsArray = friendsArray.filter((friend) => friend.age <= max.value);
    if (min.value) friendsArray = friendsArray.filter((friend) => friend.age >= min.value);
    return friendsArray;
}

function checkFiltersChanged(event) {
    return ["list__label", "select__container", "number", "checkbox"]
        .some((filter) => {
            if (!(event.type === "click" &&  event.target.classList.contains("select__container"))) {
                return event.target.classList.contains(filter);
            }
        });
}

function updateCards(event) {
    if (checkFiltersChanged(event)) {
        FRIENDS_ARRAY = INITIAL_FRIENDS_ARRAY;
        sortCards(event, FRIENDS_ARRAY);
        FRIENDS_ARRAY = filterByAge(FRIENDS_ARRAY);
        FRIENDS_ARRAY = filterByGender(event, FRIENDS_ARRAY);
        appendFriendsCards(FRIENDS_ARRAY);
    }
}

function isSelectModified() {
    return SELECT_CONTAINER.attributes["select-modified"].value === "true";
}

function checkOptionsVisibility() {
    return OPTIONS_CONTAINER.classList.contains("visible");
}

function resetPreviouslySelectedOptions(selectedOption) {
    Array.from(OPTIONS_LIST).forEach((option) => {
        if (option.textContent != selectedOption) {
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
        ),
        selectedItemIndex = Array.from(OPTIONS_LIST).indexOf(selectedItem);
    if (buttonPressed === "ArrowUp") {
        switch (true) {
            case !isFirstListItem(selectedItemIndex):
                higlightSelectedOption(optionsListArray[selectedItemIndex - 1]);
                selectedOption = optionsListArray[selectedItemIndex - 1].textContent;
                resetPreviouslySelectedOptions(selectedOption);
                removeAriaSelectedAttribute(selectedItem);
                break;
            case !isFirstListItem(selectedItemIndex):
                break;
        }
    } else if (buttonPressed === "ArrowDown") {
        switch (true) {
            case !isLastListItem(selectedItemIndex, optionsListArray):
                higlightSelectedOption(optionsListArray[selectedItemIndex + 1]);
                selectedOption = optionsListArray[selectedItemIndex + 1].textContent;
                resetPreviouslySelectedOptions(selectedOption);
                removeAriaSelectedAttribute(selectedItem);
                break;
            case isLastListItem(selectedItemIndex, optionsListArray):
                break;
        }
    }
}

function isLastListItem(selectedItemIndex, optionsArray){
    return selectedItemIndex === optionsArray.length - 1;
}
function isFirstListItem(selectedItemIndex){
    return selectedItemIndex === 0;
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
                        updateSelectText(getSelectOption(selectedOption));
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

SELECT_CONTAINER.addEventListener("focusout", (e) => {
    if (
        checkOptionsVisibility() &&
        e.relatedTarget !== null &&
        !e.relatedTarget.classList.contains("list__value") &&
        !e.relatedTarget.classList.contains("select__container")
    )
        OPTIONS_CONTAINER.classList.toggle("visible");
});

document.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.target === SELECT_CONTAINER) {
        if (keyEvent.code === "Space" || keyEvent.code === "Enter") {
            keyEvent.preventDefault();
            if (!checkOptionsVisibility()) {
                OPTIONS_CONTAINER.classList.add("visible");
                if (isSelectModified()) {
                    higlightSelectedOption(getSelectOption(selectedOption));
                } else {
                    selectedOption = OPTIONS_LIST[0].textContent;
                    higlightSelectedOption(OPTIONS_LIST[0]);
                }
            } else {
                updateCards(keyEvent);
                OPTIONS_CONTAINER.classList.remove("visible");
            }
        }
    }
    if (keyEvent.code === "Escape" && checkOptionsVisibility()) {
        OPTIONS_CONTAINER.classList.remove("visible");
    }
    if (
        checkOptionsVisibility() &&
        (keyEvent.code == "ArrowUp" || keyEvent.code == "ArrowDown")
    ) {
        keyEvent.preventDefault();
        focusOnItem(keyEvent.code);
    }
    resetPreviouslySelectedOptions(selectedOption);
});

document.querySelector("#showFiltersButton").addEventListener("click", (e) => {
    FILTERS_CONTAINER.classList.toggle("display");
});

document.addEventListener("click", (e) => {
    if (checkOptionsVisibility()) {
        if (e.target != OPTIONS_CONTAINER && e.target != SELECT_CONTAINER) {
            OPTIONS_CONTAINER.classList.toggle("visible");
        }
    }
});

document.querySelector("#sort").addEventListener("click", (e) => {
    if (
        e.target.classList.contains("list__label") ||
        e.target.classList.contains("select__container")
    ) {
        selectedOption = !SELECT_CONTAINER.getAttribute("value")  
            ? OPTIONS_LIST[0].textContent 
            : e.target.textContent;
        OPTIONS_CONTAINER.classList.toggle("visible");
    }
});

document.querySelector("#search").addEventListener("input", (e) => {
    const inputString = e.target.value,
        filteredArray = findMatchesWithPropertiesValues(
            ["firstName", "lastName", "email", "username", "country"],
            FRIENDS_ARRAY,
            inputString
        );
    appendFriendsCards(filteredArray);
});

FILTERS_CONTAINER.addEventListener("click", (e) => updateCards(e));

document.querySelectorAll(".number").forEach((ageInput) => {
    ageInput.addEventListener("change", (event) => {
        updateCards(event);
    });
});

window.addEventListener("beforeunload", () => {
    ["#search", "#minAge", "#maxAge"].forEach(
        (element) => (document.querySelector(element).value = "")
    );
    SELECT_CONTAINER.attributes["select-modified"].value = "false";
    document.querySelector("#female").checked = "true";
    document.querySelector("#male").checked = "true";
});
