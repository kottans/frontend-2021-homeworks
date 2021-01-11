const BODY = document.querySelector("body");
const MAIN = document.querySelector(".main");
const FILTERS = document.querySelector(".filters");
const RESET_BUTTON = document.querySelector(".filters__button");
const DAY_NIGHT = document.querySelector(".day_night");
const FRIENDS_COUNT = 60;
const REQUEST_LINK = `https://randomuser.me/api/?results=${FRIENDS_COUNT}`;

const fetchData = async (requestLink) => {
	try {
		const response = handleErrors(await fetch(requestLink));
		const { results } = await response.json();
		return results;
	} catch (error) {
		alert(error);
	}
};

const handleErrors = (response) => {
	if (!response.ok) {
		throw Error("HTTP-Error: " + response.statusText);
	}
	return response;
};

const initApp = (friendsDataArray) => {
	const friends = new FriendsList(friendsDataArray, MAIN);
	friends.renderCards();
	bindEventListeners(friends);
};

const bindEventListeners = (friends) => {
	FILTERS.addEventListener("input", ({ target }) => {
		if (target.name == "search") {
			friends.filterBySearch(target.value);
		}
		if (target.name == "gender") {
			friends.filterByGender(target.id);
			FILTERS.elements.search.value = "";
			if (FILTERS.querySelector("[name=name]:checked")) {
				friends.sortByName(FILTERS.querySelector("[name=name]:checked").id);
			}
			if (FILTERS.querySelector("[name=age]:checked")) {
				friends.sortByAge(FILTERS.querySelector("[name=age]:checked").id);
			} //this two forEach callbacks is needed to re-sort new arrays of cards, filtered by gender
		}
		if (target.name == "name") {
			friends.sortByName(target.id);
			FILTERS.elements.search.value = "";
			if (FILTERS.querySelector("[name=age]:checked")) {
				FILTERS.querySelector("[name=age]:checked").checked = false;
			}
		}
		if (target.name == "age") {
			friends.sortByAge(target.id);
			FILTERS.elements.search.value = "";
		}
	});
	RESET_BUTTON.addEventListener("click", (e) => {
		e.preventDefault();
		FILTERS.querySelectorAll("input[type=radio]:checked").forEach((radioButton) => {
			radioButton.checked = false;
		});
		FILTERS.elements.search.value = "";
		friends.resetFilters();
	});
	FILTERS.addEventListener("keydown", (event) => {
		if (event.key == "Enter") {
			event.preventDefault();
		}
	});
};

class FriendsList {
	constructor(data, parentWrapper) {
		this.allCards = data.map((friendData) => new FriendCard(friendData));
		this.currentCards = [...this.allCards];
		this.wrapper = parentWrapper;
	}
	renderCards(cardsArray = this.currentCards) {
		this.wrapper.innerHTML = "";
		this.wrapper.append(...cardsArray.map((card) => card.createCard()));
	}
	resetFilters() {
		this.currentCards = [...this.allCards];
		this.renderCards();
	}
	filterByGender(gender) {
		if (gender == "male") {
			this.currentCards = this.allCards.filter(
				(friendCard) => friendCard["gender"] == "male"
			);
		}
		if (gender == "female") {
			this.currentCards = this.allCards.filter(
				(friendCard) => friendCard["gender"] == "female"
			);
		}
		if (gender == "all") {
			this.currentCards = [...this.allCards];
		}
		this.renderCards();
	}
	filterBySearch(searchValue) {
		const filteredArray = this.currentCards.filter(
			(friendCard) =>
				Object.values(friendCard)
					.slice(1)
					.join(" ")
					.toLowerCase()
					.indexOf(searchValue.toLowerCase()) > -1
		);
		this.renderCards(filteredArray);
	}
	sortByName(sortType) {
		if (sortType == "az") {
			this.currentCards = sortObjectsByPropertyValue(
				this.currentCards,
				"name",
				"ascending"
			);
		}
		if (sortType == "za") {
			this.currentCards = sortObjectsByPropertyValue(
				this.currentCards,
				"name",
				"descending"
			);
		}
		this.renderCards();
	}
	sortByAge(sortType) {
		if (sortType == "ascending") {
			this.currentCards = sortObjectsByPropertyValue(
				this.currentCards,
				"age",
				"ascending"
			);
		}
		if (sortType == "descending") {
			this.currentCards = sortObjectsByPropertyValue(
				this.currentCards,
				"age",
				"descending"
			);
		}
		this.renderCards();
	}
}

const sortObjectsByPropertyValue = (arrayOfObjects, key, sortOrder) => {
	const array = arrayOfObjects;
	const modifier = sortOrder == "ascending" ? 1 : -1;
	return array.sort((a, b) => {
		if (a[key] > b[key]) return 1 * modifier;
		else if (a[key] < b[key]) return -1 * modifier;
		else return 0;
	});
};

class FriendCard {
	constructor(friendData) {
		this.gender = friendData.gender;
		this.name = `${friendData.name.first} ${friendData.name.last}`;
		this.age = friendData.dob.age;
		this.photo = friendData.picture.large;
		this.email = friendData.email;
		this.phone = friendData.cell;
		this.country = friendData.location.country;
	}

	createCard() {
		const card = document.createElement("div");
		card.classList.add("card");
		card.innerHTML = `<img class="card__img" src="${this.photo}" alt="${this.name} photo"'>\n
                          <h3 class="card__name">${this.name}</h3>\n
                          <span class="card__age">Age: ${this.age}</span>\n
                          <a class="card__phone" href="tel:+${this.phone.replace(/\D/g,"")}">${this.phone}</a>\n
                          <a class="card__email" href="mailto:${this.email}">${this.email}</a>\n
                          <span class="card__country">${this.country}</span>`;
		return card;
	}
}

const dayNightChange = () => {
	BODY.classList.toggle("light");
	DAY_NIGHT.classList.toggle("light");
};

document.addEventListener("DOMContentLoaded", () => {
	fetchData(REQUEST_LINK).then((resultDataArray) => initApp(resultDataArray));
	DAY_NIGHT.addEventListener("click", () => {
		dayNightChange();
	});
});
