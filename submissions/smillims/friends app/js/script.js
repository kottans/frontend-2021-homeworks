const button = document.querySelector('.form-button');

function startApp() {
	const requestURL = 'https://randomuser.me/api?results=10&seed=users';
	fetch(requestURL)
		.then(handleErrors)
		.then(({results}) => {
			render(results);
			button.addEventListener('click', () => {applySetting(results)});
		})
		.catch(err => {
			console.log(err);
			alert('Happened error. Please, wait a second');
			location.reload();
		})
};

function handleErrors(response) {
	if (!response.ok) {
		 throw Error(response.statusText);
	}
	return response.json();
};

function render(users){
	const cards = document.querySelector('.cards');
	cards.innerHTML = makeCards(users);
};

function applySetting(results) {
	sortForm(results);
	render(filterFriends(results));
};

function makeCards(users) {
	return users.map(user => generateCard(user)).join('');
};

function generateCard({name, dob, gender, picture}) {
	return	`<div class="card-item">
					<img src="${picture.large}" alt="human">
					<div class="card-item-container">
						<h4 class="card-item-h4"><b>${name.first} ${name.last}</b></h4>
						<p class="card-item-age">Age: ${dob.age}</p>
						<p class="card-item-gender">Gender: ${gender}</p>
					</div>
				</div>`
};

function sortForm(users) {
	const form = document.forms.sortForm;
	const sortType = form.sort.value;

	switch(sortType) {
		case 'age asc':
			users.sort((a,b) => sortByAge(a,b));
			break;
		case 'age desc':
			users.sort((a,b) => sortByAge(b,a));
			break;
		case 'name asc':
			users.sort((a,b) => sortByName(a,b));
			break;
		case 'name desc':
			users.sort((a,b) => sortByName(b,a));
			break;
	}
};

function sortByAge({dob:a}, {dob:b}){
	return a.age-b.age;
};

function sortByName({name:a}, {name:b}){
	return a.first.localeCompare(b.first);
};

function filterFriends(users) {
	const form = document.forms.sortForm;
	const genderType = form.gender.value;
	const search = form.search.value;

	return users.filter(user => {
		if(user.gender !== genderType && genderType) return false;
		if(!(`${user.name.first} ${user.name.last}`.toLowerCase().includes (search.toLowerCase())) && search) return false;
		return true;
	})
};

document.addEventListener('DOMContentLoaded', startApp);
