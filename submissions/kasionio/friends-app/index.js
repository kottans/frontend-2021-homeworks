let users;

const fetchUsersData = async (url, retries) => {
	try {
		let response = await fetch(url);
		let responseJson = await response.json();
		return responseJson.results;
	} catch (err) {
		if (retries > 0) throw err;
		return await fetchUsersData(url, retries - 1);
	}
}

const initApp = async () => {
	const API_URL = 'https://randomuser.me/api/?results=10&inc=name,picture,gender,location,dob,cell,email&noinfo';
	const NUMBER_OF_FETCH_RETRIES = 5;
	users = await fetchUsersData(API_URL, NUMBER_OF_FETCH_RETRIES);
	renderUserCards(users);
	hideLoader();	
}

const cardsContainer = document.createDocumentFragment();
const userCards = document.querySelector('#user-cards');

const createUserCard = user => {
	let userDiv = document.createElement('div');
	userDiv.classList.add('user-card');
	userDiv.innerHTML = `
     <div class="name" id='fullName'>${user.name.title} <span id='firstName'>${user.name.first}</span> ${user.name.last}</div>
     <img class="img" src=${user.picture.large} alt='avatar'>
     <div class="gender">${user.gender}</div>
     <div class="location">${user.location.country}</div>
     <div class="age"><span id="age">${user.dob.age}</span> y.o.</div>
     <a class='tel' href="tel:+${user.cell}">${user.cell.replace(/[^\d]/g, '')}</a>
     <a class='email' href="mailto:${user.email}">Send email</a>
 `;
	cardsContainer.appendChild(userDiv);
}

const renderUserCards = users => {
	userCards.innerHTML='';  
	users.forEach(user => {
		createUserCard(user);
	});
	userCards.appendChild(cardsContainer);
}

const hideLoader = () => document.querySelector('#loader').classList.add('hidden');

const ascendSortByName = currentUsers => currentUsers.sort((prev, next) => prev.name.first > next.name.first ? 1 : -1);
const descendSortByName = currentUsers => ascendSortByName(currentUsers).reverse();
const descendSortByAge = currentUsers => currentUsers.sort((prev, next) => next.dob.age - prev.dob.age);
const ascendSortByAge = currentUsers => descendSortByAge(currentUsers).reverse();

const sort = (targetValue, usersToSort) => {
	switch (targetValue) {
	case 'ascendSortByName':
		ascendSortByName(usersToSort);
		break;
	case 'descendSortByName':
		descendSortByName(usersToSort);
		break;
	case 'ascendSortByAge':
		ascendSortByAge(usersToSort);
		break;
	case 'descendSortByAge':
		descendSortByAge(usersToSort);
	}
	return usersToSort;
}

const filterByGender = (targetValue, usersToFilter) => {
return usersToFilter = targetValue === 'default' ? usersToFilter 
: usersToFilter.filter(user => user.gender === targetValue);
}

const maxAgeRange = document.querySelector('#ageRangeMax');
const minAgeRange = document.querySelector('#ageRangeMin');
const MIN_AGE = 18;
const MAX_AGE = 99;

const filterAge = (usersToFilter) => usersToFilter.filter(user => user.dob.age < maxAgeRange.value 
	&& user.dob.age > minAgeRange.value);

const searchByName = (usersToSearch) => {
	const nameSearchInput = nameSearchFilter.value.toLowerCase().trim();
	return usersToSearch.filter(user => user.name.first.toLowerCase().includes(nameSearchInput));
}

const filter = ({target: {value, name}}) => {
	let filteredUsers = [...users];
	
	filteredUsers = (name === 'filterByGender') ? filterByGender(value, filteredUsers)
	: (name === 'sort') ? sort(value, filteredUsers)
	: filteredUsers = filterAge(filteredUsers);
	  filteredUsers = searchByName(filteredUsers);

	renderUserCards(filteredUsers);
}

const resetAllFilters = () => {
	form.reset();
	renderUserCards(users);
}

const nameSearchFilter = document.querySelector('#searchByName');
const resetFilters = document.querySelector('#resetFilters');
const form = document.querySelector('#form');

form.addEventListener('input', filter);
resetFilters.addEventListener('click', resetAllFilters);

document.addEventListener('DOMContentLoaded', initApp);