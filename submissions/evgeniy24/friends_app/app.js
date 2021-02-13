const REQUEST_URL = 'https://randomuser.me/api/?results=20',
    FRIENDS_LIST_WRAP = document.querySelector('.friendsList-wrap'),
    HEADER = document.querySelector('.header-name');

let friendsList = [],
    searchResultList,
    sortedList,
    genderNeutralList,
    filteredByGenderList,
    scrollDepth,
    lettersArr = HEADER.innerHTML.split('');

const colToHex = function (c) {

    let color = (c < 75) ? c + 75 : c
    let hex = color.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

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
    const friendCard = document.createElement('div');
    friendCard.innerHTML =
        `
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

SEARCH_FIELD = document.querySelector('#search');

SEARCH_FIELD.addEventListener('input', function (event) {
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
})

const sortByName = function (a, b) {
    const nameA = a.name.first.toUpperCase();
    const nameB = b.name.first.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
}

const sortByAge = function (a, b) {
    return a.dob.age - b.dob.age;
}

SORTING_MENU = document.querySelector('.sorting-menu');

SORTING_MENU.addEventListener('click', function (event) {
    if (filteredByGenderList) {
        sortedList = filteredByGenderList;
    } else if (searchResultList) {
        sortedList = searchResultList;
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
})

FILTER_MENU = document.querySelector('.filter-menu');

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

    } else if (event.target.value === 'female') {
        filteredByGenderList = genderNeutralList.filter(function (friend) {
            return friend.gender === 'female';
        })

    } else if (event.target.value === 'all') {
        return filteredByGenderList = genderNeutralList;
    }

    renderFriendsList(filteredByGenderList)
})
/* FILTER_MENU.addEventListener('click', function (event) {
    let genderNeutralList;

    if (searchResultList) {
        genderNeutralList = searchResultList;
    } else {
        genderNeutralList = [...friendsList];
    }

    if (event.target.value === 'male') {
        filteredByGenderList = genderNeutralList.filter(function (friend) {
            return friend.gender === 'male';
        });

    } else if (event.target.value === 'female') {
        filteredByGenderList = genderNeutralList.filter(function (friend) {
            return friend.gender === 'female';
        });

    } else if (event.target.value === 'all') {
        filteredByGenderList = genderNeutralList;
    }

    renderFriendsList(filteredByGenderList);
}) */

function renderErrorMessage() {
    FRIENDS_LIST_WRAP.innerHTML =
        `
    <div class="error-message-wrap">
        <p class="error-msg-text">OOPS! Something Bad Happened, please try again</p>
        <button class="radio__button error-button" value="loading-error">Try Again</button>
    </div>
    `
}

MOBILE_MENU_BUTTON = document.querySelector('.button-container');

MOBILE_MENU_BUTTON.addEventListener('click', function (event) {
    const menuWrap = document.querySelector('.menu-wrap');

    toggleClass(event.target, menuWrap);
    scrollDepth = window.pageYOffset;
    scrollToTop();
});

function toggleClass(...elem) {
    elem.forEach((e) => e.classList.toggle('change'));
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
