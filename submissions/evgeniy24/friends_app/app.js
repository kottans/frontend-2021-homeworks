const requestURL = 'https://randomuser.me/api/?results=20';
let friendsArr = [],
    friendsListWrap = document.querySelector('.friendsList-wrap'),
    sortMenu = document.querySelector('.filter-sort-menu'),
    searchField = document.querySelector('#search'),
    sortByNameAZ = document.querySelector('.nameSortAZ'),
    sortByNameZA = document.querySelector('.nameSortZA'),
    sortByAgeYO = document.querySelector('.ageSortYoungerFirst'),
    sortByAgeOY = document.querySelector('.ageSortOlderFirst'),
    filterMenu = document.querySelector('.filter-gender'),
    filterByMale = document.querySelector('.filter-gender__male'),
    filterByFemale = document.querySelector('.filter-gender__female'),
    filterByAll = document.querySelector('.filter-gender__all'),
    seachedFriends,
    sortedList,
    errorBtn,
    genderList, genderListMale, genderListFiltered,
    scrollDepth,
    mobileMenuBtn = document.querySelector('.menu-btn-container'),
    filterSortMobileMenu = document.querySelector('.menu-wrap'),
    headerMobile = document.querySelector('.header');

const sendRequest = function(method, url) {
    return fetch(url).then(function(response) {
        return response.json();
    });
}

function start() {
    sendRequest('GET', requestURL)
    .then( function(data) { 
        friendsArr = data.results;
        renderFriendsList(friendsArr);
    })
    .catch( function(err) {
        console.log(err)
        renderErrorMessage();
    });
}

start();

// drawing a list of friends---------------------------
function renderFriendsList(friends) {
    friendsListWrap.innerHTML = '';
    
    friends.forEach(function(friend) {
        renderFriendsCard(friend);
    });
}

// create and add a friend card to the markup-----------
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
    friendsListWrap.append(cardWrap);
}

//find a friend by the name ------------------------------------
searchField.addEventListener('input', function() {
    let searchName = searchField.value.toLowerCase();
    if (searchName !== '') {
            seachedFriends = friendsArr.filter(function(friend) {
            return friend.name.first.toLowerCase().includes(searchName) 
        })
        return renderFriendsList(seachedFriends);
    }  else {
        renderFriendsList(friendsArr);
    }
})

//sorting List of friends --------------------------------------------
sortMenu.addEventListener('click', function(event) {
    if (seachedFriends) {
        sortedList = seachedFriends;
    } else if (genderListFiltered) {
        sortedList = genderListFiltered;
    } else {
        sortedList = [...friendsArr];
    }
    
    if (event.target === sortByNameAZ) {
        sortedList.sort(function(a, b) {
           return (a.name.first > b.name.first) - (a.name.first < b.name.first);
        })
        renderFriendsList(sortedList);

    } else if (event.target === sortByNameZA) {
        sortedList.sort(function(a, b) {
            return (b.name.first > a.name.first) - (b.name.first < a.name.first);
        })
        renderFriendsList(sortedList);

    } else if (event.target === sortByAgeYO) {
        sortedList.sort(function(a, b) {
            return (a.dob.age - b.dob.age)
        })
        renderFriendsList(sortedList);

    } else if (event.target === sortByAgeOY) {
        sortedList.sort(function(a, b) {
            return (b.dob.age - a.dob.age)
        })
        renderFriendsList(sortedList);
    } 
})

filterMenu.addEventListener('click', function(event) {
    if (seachedFriends) {
        genderList = seachedFriends;
    } else {
        genderList = [...friendsArr];
    }

    if (event.target === filterByMale) {
        genderListFiltered = genderList.filter(function(friend) {
           return friend.gender === 'male'; 
        })
        renderFriendsList(genderListFiltered);
        
    } else if (event.target === filterByFemale) {
        genderListFiltered = genderList.filter(function(friend) {
           return friend.gender === 'female'; 
        })
        renderFriendsList(genderListFiltered);

    } else if (event.target === filterByAll) {
        genderListFiltered = [...friendsArr];
        renderFriendsList(genderList);
        }
        
})

// Error block ------------------------------------------------------
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
    friendsListWrap.append(messageErrorWrap);
}

// click on menu-mobile btn show/hode filter-sort menu and menu-btn animation
mobileMenuBtn.addEventListener('click', function() {
    clickMenuBtn(mobileMenuBtn);
    clickMenuBtn(filterSortMobileMenu);
    scrollDepth = window.pageYOffset;
    scrollToTop();
});

function clickMenuBtn(elem) {
    elem.classList.toggle('change');
}

//smooth scrolling up
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

// ErrorBtn reSendRequest -----------------------
friendsListWrap.addEventListener('click', function(event) {
    if (event.target.classList == 'btn error-btn') {
        friendsListWrap.innerHTML = '';
        start();
    }
})