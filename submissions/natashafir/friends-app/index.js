const URL = 'https://randomuser.me/api/?results=50';
const CARDS = document.querySelector('.cards');
let filterBy = 'all';
let allFriends = [];
let friends = [];
let sortedFriends;
const input = document.querySelector('input');

function initialApp() {
    fetch(URL)
        .then(response => response.json())
        .then((data) => (allFriends = data.results))
        .then(() => userTemplate(allFriends))
        .then(()=> renderUsers(allFriends))
}

function userTemplate(array) {
    allFriends = array.map(user => {
            return {
                name: `${user.name.first} ${user.name.last}`,
                age: user.dob.age,
                gender: user.gender,
                photo: user.picture.large
            }
        });
}

function createCardItem(item) {
    const BR = document.createElement("br")
    const cardWrapper = document.createElement('div');
    const img = document.createElement('img');
    const name = document.createElement('p');
    const userName = document.createTextNode(item.name);
    const age = document.createElement('p');
    const userAge = document.createTextNode(item.age);
    const gender = document.createElement('p');
    const userGender = document.createTextNode(item.gender);

    cardWrapper.classList.add('card-wrapper');
    img.classList.add('img-card');

    CARDS.appendChild(cardWrapper);
    cardWrapper.appendChild(img);
    cardWrapper.appendChild(name);
    name.appendChild(userName);
    name.appendChild(BR);
    cardWrapper.appendChild(age);
    name.appendChild(userAge);
    cardWrapper.appendChild(gender);

    img.src = item.photo;
}


document.querySelector(".gender").addEventListener("click", filterByGender);
document.querySelector(".age").addEventListener("click", filterByGender);
document.querySelector(".name").addEventListener("click", filterByGender);
input.addEventListener('input', filterByGender);


function filterByGender({target}) {
    let sortedArr = [...allFriends];
    if (target.type != 'radio') {
        sortedArr = sortedArr.filter(element =>
            element.name.toLowerCase().includes(target.value.toLowerCase()));
    }
    sortedArr = getSortedFriends(sortedArr, target.value);
    return renderUsers(sortedArr);
}


function getSortedFriends(dataToSort, choosedGender) {
    if (choosedGender == 'ageo' || choosedGender == 'agey'){
        dataToSort.sort(function(x,y){
            return x.age - y.age;
        });
        if(choosedGender == 'ageo'){
            dataToSort.reverse();
        }
    } else if (choosedGender == 'namea' || choosedGender == 'namez'){
        dataToSort.sort(function(x,y){
            let a = x.name.toUpperCase(),
                b = y.name.toUpperCase();
            return a == b ? 0 : a > b ? 1 : -1;
        });
        if (choosedGender == 'namez'){
            dataToSort.reverse();
        }
    } else if (choosedGender == 'all' || choosedGender == 'female' || choosedGender == 'male'){
        filterBy = choosedGender;
    }

    if (filterBy === 'all') {
        return dataToSort;
    } else {
        return dataToSort.filter(element => element.gender === filterBy);
    }
}

function renderUsers(item) {
    CARDS.innerHTML = '';
    item.forEach(elem => {
        createCardItem(elem);
});
}

document.addEventListener('DOMContentLoaded', initialApp);
