const cardsContainer = document.createDocumentFragment();
const userCards = document.getElementById('user-cards');
const API_URL = 'https://randomuser.me/api/?results=10&inc=name,picture,gender,location,dob,cell,email&noinfo';
const NUMBER_OF_FETCH_RETRIES = 5;
const MIN_AGE = 18;
const MAX_AGE = 99;

const fetchUsersData = async (url, retries) => {
	try {
		let response = await fetch(url);
		let usersData = await response.json();
		return usersData.results;
	} catch (err) {
		if (retries > 0) throw err;
		return await fetch_retry(url, retries - 1);
	}
}

fetchUsersData(API_URL, NUMBER_OF_FETCH_RETRIES)
	.then(usersData => createCards(usersData))
	.then(hideLoader())
	.catch(err => console.log(err))

function createUserCard(user) {
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

const createCards = usersData => {
	usersData.forEach(user => {
		createUserCard(user);
	})
	userCards.append(cardsContainer);
}

function hideLoader() {
	document.getElementById('loader').style.display = 'none';
}

const ascendSort = items => items.sort((prev, next) => prev.textContent > next.textContent ? 1 : -1);
const descendSort = items => ascendSort(items).reverse();
const renderSortedCards = sortedCards => sortedCards.forEach(card => userCards.appendChild(card.closest('.user-card')));

const sort = ({target}) => {
	const names = Array.from(document.querySelectorAll('#firstName'));
	const ages = Array.from(document.querySelectorAll('.age'));
	let result;
	switch (target.value) {
	case 'namesSortAsc':
		result = ascendSort(names);
		break;
	case 'namesSortDesc':
		result = descendSort(names);
		break;
	case 'agesSortAsc':
		result = ascendSort(ages);
		break;
	case 'agesSortDesc':
		result = descendSort(ages);
	}
	return result;
}

const sortUserCards = (users) => renderSortedCards(sort(users));

const renderFilteredCards = (filteredCards, target) => filteredCards.forEach(card => {
	if (target.value === card.textContent) {
		card.closest('.user-card').classList.remove('hidden');
	}
	if (target.value !== card.textContent) {
		card.closest('.user-card').classList.add('hidden');
	}
	if (target.value === 'all') {
		card.closest('.user-card').classList.remove('hidden');
	}
});

const filterGender = ({target}) => {
	let allGenders = Array.from(document.querySelectorAll('.gender'));
	renderFilteredCards(allGenders, target);
}

const renderSearchName = (names) => names.forEach(card => {
	let searchNameInput = document.getElementById('searchByName').value.toLowerCase().trim();
	if (!card.textContent.toLowerCase().includes(searchNameInput)) {
		card.closest('.user-card').classList.add('hidden');
	} else {
		card.closest('.user-card').classList.remove('hidden');
	}
});

const searchByName = () => {
	let allNames = Array.from(document.querySelectorAll('#firstName'));;
	renderSearchName(allNames);
}

const maxAgeRange = document.getElementById('ageRangeMax');
const minAgeRange = document.getElementById('ageRangeMin');
const filterAge = () => {
	let allAges = Array.from(document.querySelectorAll('#age'));
	allAges.forEach(card => {
		if (card.textContent >= minAgeRange.value && card.textContent <= maxAgeRange.value) {
			card.closest('.user-card').classList.remove('hidden');
		} else {
			card.closest('.user-card').classList.add('hidden');
		}
	});
}

const resetAgeFilter = () => {
	maxAgeRange.value = MAX_AGE;
	minAgeRange.value = MIN_AGE;
	filterAge();
}

const sortFilter = document.querySelectorAll('#sort');
const searchName = document.getElementById('searchName');
const genders = document.querySelectorAll('#filterGender');
const nameSearchFilter = document.getElementById('searchByName');

document.getElementById('resetAgeFilter').addEventListener('click', resetAgeFilter);
nameSearchFilter.addEventListener('keyup', searchByName);
sortFilter.forEach(age => age.addEventListener('change', sortUserCards));
genders.forEach(gender => gender.addEventListener('change', filterGender));
maxAgeRange.addEventListener('change', filterAge);
minAgeRange.addEventListener('change', filterAge);
