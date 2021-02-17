const REQUEST_URL = 'https://randomuser.me/api/?results=20',
    FRIENDS_LIST_WRAP = document.querySelector('.friendsList-wrap'),
    HEADER = document.querySelector('.header-name');

let friendsList = [],
    searchResultList,
    sortedList,
    filteredByGenderList,
    scrollDepth;

const sendRequest = function (url) {
    return fetch(url)
        .then(handleErrors)
        .then(function (response) {
            return response.json();
        });
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function startApp() {
    sendRequest(REQUEST_URL)
        .then(function (data) {
            friendsList = data.results;
            renderFriendsList(friendsList);
        })
        .catch(function (err) {
            renderErrorMessage();
        });
}

startApp();

function renderFriendsList(friends) {
    FRIENDS_LIST_WRAP.innerHTML = '';

    friends.forEach(renderFriendsCard);
}

function renderFriendsCard(friend) {
    const friendCard = document.createElement('div');
    friendCard.innerHTML = ` 
    <div class="cardWrap ${friend.gender === 'male' ? 'purple-gradient' : 'yellow-gradient'}">
        <div class="cardWrap__photo-wrap">
            <img
                class="cardWrap__photo-img"
                src= "${friend.picture.medium}"
                alt="${friend.name.first} ${friend.name.last}"
            />
        </div>
        <div class="mainInfo">
            <a
                class="mainInfo__friendsName"
                href="https://www.facebook.com/search/top?q=${friend.name.first}%20${friend.name.last}"
                target="_blank">
                ${friend.name.first} ${friend.name.last}
            </a>
            <p class="mainInfo__age">
                Age: ${friend.dob.age}
            </p>
            <a
                class="mainInfo__city"
                href="https://www.google.com/maps/place/${friend.location.city}$"
                target="_blank">
                    City: ${friend.location.city}
            </a>
        </div>
        <div class="moreWrap">
            <a class="moreWrap__phone" 
                href="tel:>${friend.phone}">
                phone: ${friend.phone}
            </a>
            <a class="moreWrap__email" 
                href="mailto:${friend.email}">
                email: ${friend.email}
            </a>
        </div>
    </div>
    `
    FRIENDS_LIST_WRAP.append(friendCard);
}

function renderErrorMessage() {
    FRIENDS_LIST_WRAP.innerHTML =
        `
    <div class="error-message-wrap">
        <p class="error-msg-text">OOPS! Something Bad Happened, please try again</p>
        <button class="radio__button error-button" value="loading-error">Try Again</button>
    </div>
    `
}

FRIENDS_LIST_WRAP.addEventListener('click', function (event) {
    if (event.target.value == 'loading-error') {
        FRIENDS_LIST_WRAP.innerHTML = '';
        startApp();
    }
})

const searchByName = function (event) {
    let searchName = event.target.value.toLowerCase();
    if (searchName !== '') {
        searchResultList = friendsList.filter(function (friend) {
            return friend.name.first.toLowerCase().includes(searchName)
        })
        return renderFriendsList(searchResultList);
    } else {
        searchResultList = [...friendsList]
        renderFriendsList(searchResultList);
    }
}

const SEARCH_FIELD = document.querySelector('#search');

SEARCH_FIELD.addEventListener('input', searchByName);

const sortingFriends = function (event) {
    if (searchResultList) {
        sortedList = searchResultList;
    } else if (filteredByGenderList) {
        sortedList = filteredByGenderList;
    } else {
        sortedList = [...friendsList];
    }

    if (event.target.value === 'ascending') {
        sortedList.sort(sortByName);

    } else if (event.target.value === 'descending') {
        sortedList.sort((a, b) => sortByName(b, a));

    } else if (event.target.value === 'young-first') {
        sortedList.sort(sortByAge);

    } else if (event.target.value === 'old-first') {
        sortedList.sort((a, b) => sortByAge(b, a));
    }

    renderFriendsList(sortedList);
}

const sortByName = function (a, b) {
    const nameA = a.name.first.toUpperCase();
    const nameB = b.name.first.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
}

const sortByAge = function (a, b) {
    return a.dob.age - b.dob.age;
}

const SORTING_MENU = document.querySelector('.sorting-wrap');

SORTING_MENU.addEventListener('click', sortingFriends);

const filterFriends = function (event) {
    let unFilteredList,
        inputValue = event.target.closest('input').value;

    if (searchResultList) {
        unFilteredList = searchResultList;
    } else {
        unFilteredList = [...friendsList];
    }

    switch (inputValue) {
        case 'male':
        case 'female':
            filteredByGenderList = filterByGender(inputValue, unFilteredList);
            break;
        case 'all':
            filteredByGenderList = friendsList;
    }

    renderFriendsList(filteredByGenderList);
}

const filterByGender = function (gender, friendsList) {
    return friendsList.filter((friend) => friend.gender === gender);
};

const FILTER_MENU = document.querySelector('.filter-menu');

FILTER_MENU.addEventListener('input', filterFriends);

const hideMenu = function (event) {
    const menuWrap = document.querySelector('.menu-wrap');

    toggleClass(event.target, menuWrap);
    scrollDepth = window.pageYOffset;
    scrollToTop();
}

function toggleClass(...elem) {
    elem.forEach((e) => e.classList.toggle('change'));
}

function scrollToTop() {
    const limitDepth = 100,
        scrollStep = 60,
        scrollStepPause = 15;
    let timer = 0;
    if (scrollDepth > limitDepth) {
        window.scrollTo(pageXOffset, scrollDepth);
        scrollDepth = scrollDepth - scrollStep;
        timer = setTimeout(scrollToTop, scrollStepPause);
    } else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
    }

}

const MOBILE_MENU_BUTTON = document.querySelector('.button-container');

MOBILE_MENU_BUTTON.addEventListener('click', hideMenu);




