const randomUsersUrl = 'https://randomuser.me/api/?results=36&inc=gender,name,email,phone,picture,dob';  

let users; 
let searchBy = ''; 
let sortBy = ''; 
let filterBy = 'all'; 
 
function getData() {
    fetch(randomUsersUrl)
        .then(answer => answer.json())
        .then(( { results } ) => {
            users = results;
            createCards(results); 
        })
        .catch(() => {
            const textContainer = document.querySelector('.cards'); 
            textContainer.innerHTML = "Uh oh, something has gone wrong. Reload the page"; 
        })
}; 

function initApp() {
    getData(); 
    bindEventListeners(); 
}

function bindEventListeners () {
    const form = document.querySelector('.form');
    const resetButton = document.querySelector('.form__button');

    form.addEventListener('input', ({ target: { name, value } }) => {
        if (name === 'sortBy') {
            sortBy = value; 
        } else if (name === 'searchBy') {
            searchBy = value; 
        } else if (name === 'filterBy') {
            filterBy = value; 
        }
        
        createCards(getChosenUsers()); 
    }); 
    
    resetButton.addEventListener('click', () => createCards(users))
}

function getChosenUsers() {
    let newUsers = [...users]; 
    
    if (filterBy !== 'all') {
        newUsers = filterByGender(newUsers); 
    }; 
    if (searchBy) {
        newUsers = filterBySearch(newUsers); 
    }; 
    if (sortBy === '0-9' || sortBy === '9-0') {
        newUsers = sortByAge(newUsers); 
    } else if (sortBy === 'a-z' || sortBy === 'z-a') {
        newUsers = sortByName(newUsers)
    }

    return newUsers; 
}

function createCards(dataArray) {
    const cardsContainer = document.querySelector('.cards__items'); 

    cardsContainer.innerHTML = dataArray.map(( { picture: {large}, name: { first, last }, dob: {age}, email, phone } ) => {
        return `
            <li class="cards__item card">
                <img class="card__img" alt="user image" src="${large}">
                <h2 class="card__title">${first} ${last}</h2>
                <p class="card__detail">${age} years old </p>
                <h3 class="card__subtitle">Contact details</h3>
                <a class="card__detail card__detail_link" href="mailto:${email}">${email}</a>
                <a class="card__detail card__detail_link" href="tel:${phone}">${phone}</a>
            </li>
        `; 
    }).join(''); 
}

function sortByAge(dataArray) {
    if (sortBy === '0-9') {
        sortByOrder(dataArray, 'dob', 'age', 'ascending')
    } else if (sortBy === '9-0') {
        sortByOrder(dataArray, 'dob', 'age', 'descending')
    }

    return dataArray;
}

function sortByName(dataArray) {
    if (sortBy === 'a-z') {
        sortByOrder (dataArray, 'name', 'first', 'ascending')
    } else if (sortBy === 'z-a') {
        sortByOrder (dataArray, 'name', 'first', 'descending')
    }

    return dataArray; 
}

function sortByOrder(dataArray, keyToCompare, valueToCompare, sortType) {
    dataArray.sort((a,b) => {
        if (a[keyToCompare][valueToCompare] < b[keyToCompare][valueToCompare]) {
            return -1; 
        }
        if (a[keyToCompare][valueToCompare] > b[keyToCompare][valueToCompare]) {
            return 1; 
        }
        return 0; 
    })

    if (sortType === 'ascending') {
        return dataArray; 
    } else if (sortType === 'descending') {
        return dataArray.reverse(); 
    }
}

function filterByGender(dataArray) {
    return dataArray.filter(el => el.gender === filterBy)
}

function filterBySearch(dataArray) {
    return dataArray.filter(
      ({ name:  { first, last } }) =>
        first.toLowerCase().includes(searchBy.toLowerCase()) ||
        last.toLowerCase().includes(searchBy.toLowerCase())
    );
}  
  
initApp()
