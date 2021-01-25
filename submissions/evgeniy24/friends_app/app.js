const REQUEST_URL  = 'https://randomuser.me/api/?results=20',
    FRIENDS_LIST_WRAP = document.querySelector('.friendsList-wrap'),
    MENU_WRAP = document.querySelector('.menu-wrap'),
    SORTING_MENU = document.querySelector('.filter-sort-menu'),
    SEARCH_FIELD = document.querySelector('#search'),
    SORT_BY_NAME_AZ = document.querySelector('.nameSortAZ'),
    SORT_BY_NAME_ZA = document.querySelector('.nameSortZA'),
    SORT_BY_AGE_YO = document.querySelector('.ageSortYoungerFirst'),
    SORT_BY_AGE_OY = document.querySelector('.ageSortOlderFirst'),
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
    

const sendRequest = function(method, url) {
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
    sendRequest('GET', REQUEST_URL)
    .then( function(data) { 
        friendsList = data.results;
        renderFriendsList(friendsList);
    })
    .catch( function(err) {
        renderErrorMessage();
    });
}

startApp();

// drawing a list of friends---------------------------
function renderFriendsList(friends) {
    FRIENDS_LIST_WRAP.innerHTML = '';
    
    friends.forEach(function(friend) {
        renderFriendsCard(friend);
    });
}

// create friends card, add card to the markup-----------
function renderFriendsCard(friend) {
    const cardWrap = document.createElement('div');
    const mainInfo = document.createElement('div');
    const friendsName = document.createElement('a');
    const moreWrap = document.createElement('div');
    const friendPhotoWrap = document.createElement('div')
    const friendPhoto = document.createElement('img');
    const friendAge = document.createElement('p');
    const friendEmail = document.createElement('a');
    const friendPhone = document.createElement('a');
    const friendCity = document.createElement('a');

    cardWrap.classList.add('cardWrap');
    (friend.gender === 'male') ? cardWrap.classList.add('malegradient') : cardWrap.classList.add('femalegradient') 
    mainInfo.classList.add('mainInfo');
    moreWrap.classList.add('moreWrap');
    friendPhotoWrap.classList.add('cardWrap__photo-wrap');
    friendPhoto.classList.add('cardWrap__photo-img');
    friendsName.classList.add('mainInfo__friendsName');
    friendAge.classList.add('mainInfo__age');
    friendEmail.classList.add('moreWrap__email');
    friendPhone.classList.add('moreWrap__phone');
    friendCity.classList.add('mainInfo__city');
    
    friendsName.textContent = `${friend.name.first} ${friend.name.last}`;
    friendAge.textContent = `Age: ${friend.dob.age}`;
    friendEmail.textContent = `email: ${friend.email}`;
    friendPhone.textContent = `phone: ${friend.phone}`;
    friendCity.textContent = `City: ${friend.location.city}`;

    friendPhoto.setAttribute('src', friend.picture.medium);
    friendsName.setAttribute('href', `https://www.facebook.com/search/top?q=${friend.name.first}%20${friend.name.last}`);
    friendsName.setAttribute('target', '_blank');
    friendEmail.setAttribute('href', `mailto:${friend.email}`);
    friendPhone.setAttribute('href', `tel:>${friend.phone}`);
    friendCity.setAttribute('href', `https://www.google.com/maps/place/${friend.location.city}$`);
    friendCity.setAttribute('target', '_blank');

    moreWrap.append(friendPhone, friendEmail);
    mainInfo.append(friendsName, friendAge, friendCity);
    friendPhotoWrap.append(friendPhoto);
    cardWrap.append(friendPhotoWrap, mainInfo, moreWrap);
    FRIENDS_LIST_WRAP.append(cardWrap);
}

//find a friend by the name ------------------------------------
SEARCH_FIELD.addEventListener('input', function() {
    let searchName = SEARCH_FIELD.value.toLowerCase();
    if (searchName !== '') {
            searchResultList = friendsList.filter(function(friend) {
            return friend.name.first.toLowerCase().includes(searchName) 
        })
        return renderFriendsList(searchResultList);
    }  else {
        renderFriendsList(friendsList);
    }
})

//sorting List of friends --------------------------------------------
SORTING_MENU.addEventListener('click', function(event) {
    if (searchResultList) {
        sortedList = searchResultList;
    } else if (filteredByGenderList) {
        sortedList = filteredByGenderList;
    } else {
        sortedList = [...friendsList];
    }
    
    if (event.target === SORT_BY_NAME_AZ) {
        sortedList.sort(function(a, b) {
           return (a.name.first > b.name.first) - (a.name.first < b.name.first);
        })
        renderFriendsList(sortedList);

    } else if (event.target === SORT_BY_NAME_ZA) {
        sortedList.sort(function(a, b) {
            return (b.name.first > a.name.first) - (b.name.first < a.name.first);
        })
        renderFriendsList(sortedList);

    } else if (event.target === SORT_BY_AGE_YO) {
        sortedList.sort(function(a, b) {
            return (a.dob.age - b.dob.age)
        })
        renderFriendsList(sortedList);

    } else if (event.target === SORT_BY_AGE_OY) {
        sortedList.sort(function(a, b) {
            return (b.dob.age - a.dob.age)
        })
        renderFriendsList(sortedList);
    } 
})

//filtering list of friends by gender
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
        filteredByGenderList = [...friendsList];
        renderFriendsList(filteredByGenderList);
        }
        
})

// showing user message when data loading error ------------------------------------------------------
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

// show/hide filter and sorting menus on mobile devices
MOBILE_MENU_BUTTON.addEventListener('click', function() {
    clickMenuBtn(MOBILE_MENU_BUTTON);
    clickMenuBtn(MENU_WRAP);
    scrollDepth = window.pageYOffset;
    scrollToTop();
});

function clickMenuBtn(elem) {
    elem.classList.toggle('change');
}

//smooth scrolling to top
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

// when error - reSend Request to server -----------------------
FRIENDS_LIST_WRAP.addEventListener('click', function(event) {
    if (event.target.classList == 'btn error-btn') {
        FRIENDS_LIST_WRAP.innerHTML = '';
        start();
    }
})