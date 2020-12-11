let friendsArr = [];
const main = document.querySelector(".js-main");
const gender = document.querySelector(".js-gender");
const age = document.querySelector(".js-age");
const name = document.querySelector(".js-name");
const reset = document.querySelector(".js-reset");
let nameProp, ageProp, genderProp, searchProp;


const createBlock = (friend) => {
    const block = document.createElement("div");
    block.classList.add("card");
    block.innerHTML = `
                <div class="card__img">
                    <img src="${friend.picture.medium}" alt="avatar">
                </div>
                <div class="card__content">
                    <div class="card__top">
                        <p>${friend.name.first}</p>
                        <p>${friend.name.last}</p>
                    </div>
                    <div>
                        <p>Number:</p>
                        <p>${friend.phone}</p>
                    </div>
                    <div class="card__bottom">
                        <p>Age: ${friend.dob.age}</p>
                        <p>Gender: ${friend.gender}</p>
                    </div>
                </div>
        `;
    return block;
}

const renderItems = (friends) => {
    main.innerHTML = "";
    let fragment = document.createDocumentFragment();
    friends.forEach((friend) => {
        const block = createBlock(friend);
        fragment.append(block);
    })
    main.append(fragment);
}

const fetchFriends = () => {
    const headers = {
        dataType: 'json'
    }
    return fetch('https://randomuser.me/api/?inc=gender,name,phone,dob,picture&results=12', headers)
        .then(response => response.json())
}

const sortByName = (arr, type) => {
    let newFriendsArr = [...arr].sort((prev, next) => {
        if (prev.name.first < next.name.first) return -1;
        if (prev.name.first > next.name.first) return 1;
    });
    if (type === 'abc') {
        return newFriendsArr;
    } else if (type === 'cba') {
        return newFriendsArr.reverse();
    }
}

const sortByAge = (arr, type) => {
    let newFriendsArr = arr.sort((prev, next) => prev.dob.age - next.dob.age);
    if (type === 'asc') {
        return newFriendsArr;
    } else if (type === 'des') {
        return newFriendsArr.reverse();
    }
}

const filterBySex = (arr, sex) => {
    if (sex === 'male') {
        return arr.filter(friend => friend.gender === 'male');
    } else if (sex === 'female') {
        return arr.filter(friend => friend.gender === 'female');
    } else {
        return arr;
    }
}

const filterBySearch = (arr, value) => {
    return arr.filter(friend => {
        const name = `${friend.name.first.toLowerCase()} ${friend.name.last.toLowerCase()}`;
        return name.includes(value);
    })
}

const filterFriends = () => {
    let newFriendsArr = [...friendsArr];

    if (genderProp) {
        newFriendsArr = filterBySex(newFriendsArr, genderProp);
    }
    if (ageProp) {
        newFriendsArr = sortByAge(newFriendsArr, ageProp);
    }
    if (nameProp) {
        newFriendsArr = sortByName(newFriendsArr, nameProp);
    }
    if (searchProp) {
        newFriendsArr = filterBySearch(newFriendsArr, searchProp);
    }

    renderItems(newFriendsArr);
}

const runApp = (data) => {
    renderItems(data);
    friendsArr = data;

    document.querySelector('.js-search').addEventListener('keyup', ({target}) => {
        searchProp = target.value.toLowerCase();
        filterFriends();
    });

    gender.addEventListener('change', ({target}) => {
        genderProp = target.value;
        filterFriends();
    });

    age.addEventListener('change', ({target}) => {
        searchProp = null;
        nameProp = null;
        ageProp = target.value;
        filterFriends();
    });

    name.addEventListener('change', ({target}) => {
        searchProp = null;
        ageProp = null;
        nameProp = target.value;
        filterFriends();
    });

    reset.addEventListener('click', () => {
        searchProp = null;
        nameProp = null;
        ageProp = null;
        genderProp = null;
        filterFriends();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchFriends().then((response) => runApp(response.results));
})
