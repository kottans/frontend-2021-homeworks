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
        .catch(err => {
            console.log(err);
            alert('ERROR in fetching the url');
        })
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
    const template = `<div class="card-wrapper"><img class="img-card" src="${item.photo}"></img><p>${item.name}</p><p>Age: ${item.age}</p></div>`
    return template;
};

document.querySelector(".gender").addEventListener("click", filterByChoose);
document.querySelector(".age").addEventListener("click", filterByChoose);
document.querySelector(".name").addEventListener("click", filterByChoose);
input.addEventListener('input', filterByChoose);

function filterByChoose({target}) {
    let sortedArr = allFriends;
    if (target.type != 'radio') {
        sortedArr = sortedArr.filter(element =>
            element.name.toLowerCase().includes(target.value.toLowerCase()));
    }
    sortedArr = getSortedFriends(sortedArr, target.value);
    return renderUsers(sortedArr);
}


function getSortedFriends(dataToSort, choosedRadio) {
    if (choosedRadio == 'old-first' || choosedRadio == 'young-first'){
        dataToSort.sort(function(x, y){
            return x.age - y.age;
        });
        if(choosedRadio == 'old-first'){
            dataToSort.reverse();
        }
    } else if (choosedRadio == 'name-AZ' || choosedRadio == 'name-ZA'){
        dataToSort.sort(function(x, y){
            let a = x.name.toUpperCase(),
                b = y.name.toUpperCase();
            return a == b ? 0 : a > b ? 1 : -1;
        });
        if (choosedRadio == 'name-ZA'){
            dataToSort.reverse();
        }
    } else if (choosedRadio == 'all' || choosedRadio == 'female' || choosedRadio == 'male'){
        filterBy = choosedRadio;
    }

    if (filterBy === 'all') {
        return dataToSort;
    } else {
        return dataToSort.filter(element => element.gender === filterBy);
    }
}

function renderUsers(item) {
    CARDS.innerHTML = '';
    let cards = '';
    item.forEach(elem => {
        cards +=createCardItem(elem);
});
    CARDS.innerHTML = cards;
}

document.addEventListener('DOMContentLoaded', initialApp);
