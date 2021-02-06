const REQUEST_URL  = 'https://randomuser.me/api/?results=20',
    FRIENDS_LIST_WRAP = document.querySelector('.friendsList-wrap'),
    MENU_WRAP = document.querySelector('.menu-wrap'),
    SORTING_MENU = document.querySelector('.filter-sort-menu'),
    SEARCH_FIELD = document.querySelector('#search'),
    SORT_BY_NAME_AZ = document.querySelector('.nameSortAZ'),
    SORT_BY_NAME_ZA = document.querySelector('.nameSortZA'),
    SORT_YOUNGER_FIRST = document.querySelector('.ageSortYoungerFirst'),
    SORT_OLDER_FIRST = document.querySelector('.ageSortOlderFirst'),
    FILTER_MENU = document.querySelector('.filter-gender'),
    FILTER_BY_MALE = document.querySelector('.filter-gender__male'),
    FILTER_BY_FEMALE = document.querySelector('.filter-gender__female'),
    FILTER_BY_ALL = document.querySelector('.filter-gender__all'),
    MOBILE_MENU_BUTTON = document.querySelector('.button-container');
let friendsList = [],  
    searchResultList,
    sortedList,
    errorButton,
    genderNeutralList, filteredByGenderList,
    scrollDepth;
    
const sendRequest = function(url) {
    return fetch(url)
        .then(handleErrors)
        .then(function(response) {
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
    .then( function(data) { 
        friendsList = data.results;
        renderFriendsList(friendsList);
    })
    .catch( function(err) {
        renderErrorMessage();
    });
}

startApp();

function renderFriendsList(friends) {
    FRIENDS_LIST_WRAP.innerHTML = '';
    
    friends.forEach(function(friend) {
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

SEARCH_FIELD.addEventListener('input', function() {
    let searchName = SEARCH_FIELD.value.toLowerCase();
    if (searchName !== '') {
            searchResultList = friendsList.filter(function(friend) {
            return friend.name.first.toLowerCase().includes(searchName) 
        })
        return renderFriendsList(searchResultList);
    }  else {
        searchResultList = [...friendsList]
        renderFriendsList(friendsList);
    }
})

SORTING_MENU.addEventListener('click', function(event) {
    if (searchResultList) {
        sortedList = searchResultList;
    } else if (filteredByGenderList) {
        sortedList = filteredByGenderList;
    } else {
        sortedList = [...friendsList];
    }

    const sortByName = function(a, b) {
        const nameA = a.name.first.toUpperCase();
        const nameB = b.name.first.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    }

    const sortByAge = function(a, b) {
        return a.dob.age - b.dob.age;
    }
    
    if (event.target === SORT_BY_NAME_AZ) {
        sortedList.sort(sortByName);
        renderFriendsList(sortedList);

    } else if (event.target === SORT_BY_NAME_ZA) {
        sortedList.sort((a, b) => sortByName(b, a));
        renderFriendsList(sortedList);

    } else if (event.target === SORT_YOUNGER_FIRST) {
        sortedList.sort(sortByAge);
        renderFriendsList(sortedList);

    } else if (event.target === SORT_OLDER_FIRST) {
        sortedList.sort((a, b) => sortByAge(b, a));
        renderFriendsList(sortedList);
    } 
})

FILTER_MENU.addEventListener('click', function(event) {
    if (searchResultList) {
        genderNeutralList = searchResultList;
    } else {
        genderNeutralList = [...friendsList];
    }

    if (event.target === FILTER_BY_MALE) {
        filteredByGenderList = genderNeutralList.filter(function(friend) {
           return friend.gender === 'male'; 
        })
        renderFriendsList(filteredByGenderList);
        
    } else if (event.target === FILTER_BY_FEMALE) {
        filteredByGenderList = genderNeutralList.filter(function(friend) {
           return friend.gender === 'female'; 
        })
        renderFriendsList(filteredByGenderList);

    } else if (event.target === FILTER_BY_ALL) {
        filteredByGenderList = genderNeutralList;
        renderFriendsList(filteredByGenderList);
        }
        
})

function renderErrorMessage() {
    const messageErrorWrap =  document.createElement('div');
    const messageError = document.createElement('p');
    const tryMoreBtn = document.createElement('button');

    messageErrorWrap.classList.add('error-message-wrap')
    tryMoreBtn.classList.add('btn');
    tryMoreBtn.classList.add('error-btn');
    messageError.classList.add('error-msg-text');

    messageError.textContent = 'OOPS! Something Bad Happened, please try again';
    tryMoreBtn.textContent = 'Try Again';


    messageErrorWrap.append(messageError, tryMoreBtn);
    FRIENDS_LIST_WRAP.append(messageErrorWrap);
}

MOBILE_MENU_BUTTON.addEventListener('click', function() {
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
        window.scrollTo(0,0);
    }
   
} 

FRIENDS_LIST_WRAP.addEventListener('click', function(event) {
    if (event.target.classList == 'btn error-btn') {
        FRIENDS_LIST_WRAP.innerHTML = '';
        startApp();
    }
})
