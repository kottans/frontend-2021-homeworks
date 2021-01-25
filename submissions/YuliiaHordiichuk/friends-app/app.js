let users; 
let searchBy = ''; 
let sortBy = ''; 
let filterBy = 'all'; 
 
function fetchUsers() {
    const randomUsersUrl = 'https://randomuser.me/api/?results=36&inc=gender,name,email,phone,picture,dob'; 

    fetch(randomUsersUrl)
        .then(handleErrors)
        .then((response) => response.json())
        .then(({ results }) => handleFetchedUsers(results))
        .catch((errorText) => {
            console.warn(errorText);
            const textContainer = document.querySelector('.cards'); 
            textContainer.innerHTML = 'Uh oh, something has gone wrong. Reload the page'; 
        });
}; 

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function initApp() {
    fetchUsers();
    bindEventListeners(); 
}

function handleFetchedUsers(fetchedUsers) {
    users = fetchedUsers;
    createCards(fetchedUsers); 
}

function bindEventListeners () {
    const filteringAndSortingForm = document.querySelector('.form');
    const resetButton = document.querySelector('.form__button');

    filteringAndSortingForm.addEventListener('input', ({ target: { name, value } }) => {
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

function createCards(chosenUsers) {
    const cardsContainer = document.querySelector(".cards__items");
  
    cardsContainer.innerHTML = chosenUsers
        .map(
            ({
            picture: { large },
            name: { first, last },
            dob: { age },
            email,
            phone,
            }) => {
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
            }
        )
        .join("");
}

function sortByAge(users) {
    users.sort((a,b) => a.dob.age - b.dob.age); 
    return sortBy === '0-9' ? users : users.reverse(); 
}

function sortByName(users) {
    users.sort((a, b) => a.name.first.localeCompare(b.name.first))
    return sortBy === 'a-z' ? users : users.reverse(); 
}

function filterByGender(users) {
    return users.filter(el => el.gender === filterBy)
}

function filterBySearch(users) {
    return users.filter(
      ({ name:  { first, last } }) =>
        first.toLowerCase().includes(searchBy.toLowerCase()) ||
        last.toLowerCase().includes(searchBy.toLowerCase())
    );
}  
  
initApp()
