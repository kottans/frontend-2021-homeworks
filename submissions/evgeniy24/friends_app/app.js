const REQUEST_URL = 'https://randomuser.me/api/?results=20',
    HEADER = document.querySelector('.header-name'),
    FRIENDS_LIST_WRAP = document.querySelector('.friendsList-wrap'),
    MENU_WRAP = document.querySelector('.menu-wrap'),
    SEARCH_FIELD = document.querySelector('#search'),
    SORTING_MENU = document.querySelector('.sorting-menu'),
    FILTER_MENU = document.querySelector('.filter-menu'),
    MOBILE_MENU_BUTTON = document.querySelector('.button-container');
let friendsList = [],
    searchResultList,
    sortedList,
    errorButton,
    genderNeutralList, filteredByGenderList,
    scrollDepth,
    lettersArr = HEADER.innerHTML.split('');

//convert int to hex
const colToHex = function (c) {
    //colors are bright enough?
    let color = (c < 75) ? c + 75 : c
    let hex = color.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

// colToHex to concatenate a full 6 digit hex code
const rgbToHex = function (r, g, b) {
    return '#' + colToHex(r) + colToHex(g) + colToHex(b);
}

const getRandomColor = function () {
    return rgbToHex(
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    )
}

const randomColor = function () {
    let html = '';
    lettersArr.map(function (letter) {
        let color = getRandomColor();
        return html +=
            `<span style= color:${color}>
          ${letter}
          </span>`
    })
    return html;
}

HEADER.innerHTML = randomColor();


const sendRequest = function (url) {
    return fetch(url)
        .then(handleErrors)
        .then(function (response) {
            return response.json();
        });
}

function handleErrors(response) {
    if (response.status > 400) {
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

    friends.forEach(function (friend) {
        renderFriendsCard(friend);
    });
}

function renderFriendsCard(friend) {
    const FRIEND_CARD = document.createElement('div');
    FRIEND_CARD.innerHTML =
        `
    <div class="cardWrap ${friend.gender === 'male' ? 'malegradient' : 'femalegradient'}">
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
    FRIENDS_LIST_WRAP.append(FRIEND_CARD);
}

SEARCH_FIELD.addEventListener('input', function () {
    let searchName = SEARCH_FIELD.value.toLowerCase();
    if (searchName !== '') {
        searchResultList = friendsList.filter(function (friend) {
            return friend.name.first.toLowerCase().includes(searchName)
        })
        return renderFriendsList(searchResultList);
    } else {
        searchResultList = [...friendsList]
        renderFriendsList(friendsList);
    }
})

SORTING_MENU.addEventListener('click', function (event) {
    if (filteredByGenderList) {
        sortedList = filteredByGenderList;
    } else if (searchResultList) {
        sortedList = searchResultList;
    } else {
        sortedList = [...friendsList];
    }

    const searchByName = function (a, b) {
        const nameA = a.name.first.toUpperCase();
        const nameB = b.name.first.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    }

    const sortByAge = function (a, b) {
        return a.dob.age - b.dob.age;
    }

    if (event.target.value === 'az') {
        sortedList.sort(searchByName);
        renderFriendsList(sortedList);

    } else if (event.target.value === 'za') {
        sortedList.sort((a, b) => searchByName(b, a));
        renderFriendsList(sortedList);

    } else if (event.target.value === 'young') {
        sortedList.sort(sortByAge);
        renderFriendsList(sortedList);

    } else if (event.target.value === 'older') {
        sortedList.sort((a, b) => sortByAge(b, a));
        renderFriendsList(sortedList);
    }
})

FILTER_MENU.addEventListener('click', function (event) {

    if (searchResultList) {
        genderNeutralList = searchResultList;
    } else {
        genderNeutralList = [...friendsList];
    }

    if (event.target.value === 'male') {
        filteredByGenderList = genderNeutralList.filter(function (friend) {
            return friend.gender === 'male';
        })
        renderFriendsList(filteredByGenderList);

    } else if (event.target.value === 'female') {
        filteredByGenderList = genderNeutralList.filter(function (friend) {
            return friend.gender === 'female';
        })
        renderFriendsList(filteredByGenderList);

    } else if (event.target.value === 'all') {
        filteredByGenderList = genderNeutralList;
        renderFriendsList(filteredByGenderList);
    }
})

function renderErrorMessage() {
    FRIENDS_LIST_WRAP.innerHTML =
        `
    <div class="error-message-wrap">
        <p class="error-msg-text">OOPS! Something Bad Happened, please try again</p>
        <button class="radio__button error-button" value="loading-error">Try Again</button>
    </div>
    `
}

MOBILE_MENU_BUTTON.addEventListener('click', function () {
    clickMenuBtn(MOBILE_MENU_BUTTON);
    clickMenuBtn(MENU_WRAP);
    scrollDepth = window.pageYOffset;
    scrollToTop();
});

function clickMenuBtn(elem) {
    elem.classList.toggle('change');
}

function scrollToTop() {
    let timer = 0;
    if (scrollDepth > 100) {
        window.scrollTo(pageXOffset, scrollDepth);
        scrollDepth = scrollDepth - 60;
        timer = setTimeout(scrollToTop, 15);
    } else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
    }

}

FRIENDS_LIST_WRAP.addEventListener('click', function (event) {
    if (event.target.value == 'loading-error') {
        FRIENDS_LIST_WRAP.innerHTML = '';
        startApp();
    }
})
