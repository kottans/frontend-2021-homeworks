const cardsContainer = document.querySelector('.cards__items'); 
const randomUsersUrl = 'https://randomuser.me/api/?results=36&inc=gender,name,email,phone,picture,dob';  
const form = document.querySelector('.form');
const resetButton = document.querySelector('.form__button');

let users; 
let searchBy = ''; 
let sortBy = ''; 
let filterBy = 'all'; 
 
function getData() {
    fetch(randomUsersUrl)
        .then(answer => answer.json())
        .then((data) => {
            users = data.results;
            createCards(data.results); 
        })
        .catch(err => {
            const textContainer = document.querySelector('.cards'); 
            textContainer.innerHTML = "Uh oh, something has gone wrong. Reload the page"; 
        })
}; 

function initApp() {
    getData(); 
    bindEventListeners(); 
}

function bindEventListeners () {
    form.addEventListener('input', ({ target: { name, value } }) => {
        if (name === 'sortBy') {
            sortBy = value; 
        } else if (name === 'searchBy') {
            searchBy = value; 
        } else if (name === 'filterBy') {
            filterBy = value; 
        }
    
        createCards(getChosenCards()); 
    }); 
    
    resetButton.addEventListener('click', () => createCards(users))
}

function getChosenCards() {
    let newUsers = [...users]; 
    
    if (filterBy !== 'all') {
        newUsers = filterByGender(newUsers); 
    }; 
    if (searchBy) {
        newUsers = filterBySearch(newUsers); 
    }; 
    if (sortBy) {
        newUsers = sort(newUsers); 
    }; 

    return newUsers; 
}

function createCards(dataArray) {
    cardsContainer.innerHTML = dataArray.map(item => {
        return `
            <li class="cards__item card">
                <img class="card__img" alt="user image" src="${item.picture.large}">
                <h2 class="card__title">${item.name.first} ${item.name.last}</h2>
                <p class="card__detail">${item.dob.age} years old </p>
                <h3 class="card__subtitle">Contact details</h3>
                <a class="card__detail card__detail_link" href="mailto:${item.email}">${item.email}</a>
                <a class="card__detail card__detail_link" href="tel:${item.phone}">${item.phone}</a>
            </li>
        `; 
    }).join(''); 
}

function sort(dataArray) {
        if (sortBy === '0-9') {
            dataArray.sort((a,b) => a.dob.age - b.dob.age)
        } else if (sortBy === '9-0') {
            dataArray.sort((a,b) => b.dob.age - a.dob.age)
        } else if (sortBy === 'a-z') {
            dataArray.sort((a,b) => {
                if (a.name.first < b.name.first) {
                    return -1; 
                }
                if (a.name.first > b.name.first) {
                    return 1; 
                }
                return 0; 
            })
        } else if (sortBy === 'z-a') {
            dataArray.sort((a,b) => {
                if (a.name.first > b.name.first) {
                    return -1; 
                }
                if (a.name.first < b.name.first) {
                    return 1; 
                }
                return 0; 
            })
        }

    return dataArray; 
}

function filterByGender(dataArray) {
    return dataArray.filter(el => el.gender === filterBy)
}

function filterBySearch(dataArray) {
    return dataArray.filter(el => el.name.first.toLowerCase().includes(searchBy.toLowerCase()) || 
                            el.name.last.toLowerCase().includes(searchBy.toLowerCase())); 
}

initApp()
