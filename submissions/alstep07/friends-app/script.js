const MAX_FRIENDS_VALUE = 100;
const main = document.querySelector(".main");
const url = `https://randomuser.me/api/?results=${MAX_FRIENDS_VALUE}&noinfo`;
const phoneImg = "./img/phone.png";
const mailImg = "./img/mail.png";
const errMessage = "server is not responding";
const searchInput = document.querySelector("#search");
const filterGender = document.querySelector(".search__by-gender");
const filterName = document.querySelector(".search__by-alphabet");
const filterAge = document.querySelector(".search__by-age");
const filterDate = document.querySelector(".search__by-date");
const resetBtn = document.querySelector(".search__reset__btn");
const popupBtn = document.querySelector(".popup");
const navbar = document.querySelector(".navbar");
const filters = {
	search: null,
	gender: null,
	age: null,
	name: null,
	date: null,
};

popupBtn.addEventListener("click", () => {
	popupBtn.classList.toggle("popup-active");
	navbar.classList.toggle("navbar-active");
})

const fetchFriends = async (url) => {
	try {
		let response = await fetch(url);
		let data = await response.json();
		return data.results;
	} catch (err) {
		main.innerHTML = `<div class="error">${errMessage}<br>(error: ${err})</div>`;
	}
};

const init = (results) => {
	render(results);
	data = results.slice();

	searchInput.addEventListener("keyup", ({ target }) => {
		filters.search = target.value;
		filterCards();
	});

	filterGender.addEventListener("click", ({ target }) => {
		filters.gender = target.id;
		filterCards();
	});

	filterName.addEventListener("click", ({ target }) => {
		filters.name = target.id;
		filters.age = null;
		filters.date = null;
		filterCards();
	});

	filterAge.addEventListener("click", ({ target }) => {
		filters.age = target.id;
		filters.name = null;
		filters.date = null;
		filterCards();
	});

	filterDate.addEventListener("click", ({ target }) => {
		filters.date = target.id;
		filters.age = null;
		filters.name = null;
		filterCards();
	});

	resetBtn.addEventListener("click", () => {
		filters.search = null;
		filters.gender = null;
		filters.name = null;
		filters.age = null;
		render(results);
	});
};

function filterCards() {
	let filteredArr = data;
	if (filters.search) filteredArr = sortBySearch(filteredArr, filters.search);
	if (filters.gender) filteredArr = sortByGender(filteredArr, filters.gender);
	if (filters.name) filteredArr = sortByName(filteredArr, filters.name);
	if (filters.age) filteredArr = sortByAge(filteredArr, filters.age);
	if (filters.date) filteredArr = sortByDate(filteredArr, filters.date);
	render(filteredArr);
}

function sortBySearch(arr, str) {
	return arr.filter((elem) =>
		`${elem.name.first}${elem.name.last}${elem.location.country}${elem.location.city}`
			.toLowerCase()
			.includes(str.toLowerCase())
	);
}

function sortByGender(arr, type) {
	if (type === "all") {
		return arr;
	}
	return arr.filter((elem) => elem.gender === type);
}

function sortByName(arr, type) {
	if (type === "name_a-z") {
		return arr.sort((a, b) => a.name.first.localeCompare(b.name.first));
	} else if (type === "name_z-a")
		return arr.sort((a, b) => b.name.first.localeCompare(a.name.first));
}

function sortByAge(arr, type) {
	if (type === "age_up") {
		return arr.sort((a, b) => a.dob.age - b.dob.age);
	} else if (type === "age_down") {
		return arr.sort((a, b) => b.dob.age - a.dob.age);
	}
}

function sortByDate(arr, type) {
	if (type === "date_up") {
		return arr.sort((a, b) => a.registered.age - b.registered.age);
	} else if (type === "date_down") {
		return arr.sort((a, b) => b.registered.age - a.registered.age);
	}
}

function render(arr) {
	main.innerHTML = "";
	const container = document.createDocumentFragment();
	arr.forEach((elem) => container.append(createCard(elem)));
	main.append(container);
}

function createCard(friend) {
	const card = document.createElement("div");
	card.innerHTML = `
		<div class="card ${friend.gender}">
			<img src="${friend.picture.large}" alt="photo" class="card__img">
			<p class="card__name">${friend.name.first} ${friend.name.last}</p>
			<p class="card__age">${friend.dob.age} years</p>
			<p class="card__location">${friend.location.country}<br>${friend.location.city}</p>
			<div class="card__contacts">
				<a class="card__link" href="tel: ${friend.cell}">
					<img class="card__phone__img" src="${phoneImg}" alt = "phone to">
				</a>
				<a class="card__link" href="mailto: ${friend.email}">
					<img class="card__mail__img" src="${mailImg}" alt = "mail to">
				</a>
			</div>
		</div>`;
	return card;
}

document.addEventListener("DOMContentLoaded", () => {
	fetchFriends(url).then((results) => init(results));
});
