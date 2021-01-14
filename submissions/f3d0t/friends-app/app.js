const MAIN = document.querySelector(".main");
const FILTERS = document.querySelector(".filters");
const RESET_BUTTON = document.querySelector(".filters__button");
const DAY_NIGHT = document.querySelector(".day_night");
const FRIENDS_COUNT = 60;
const REQUEST_LINK = `https://randomuser.me/api/?results=${FRIENDS_COUNT}`;

const fetchData = async (requestLink) => {
	try {
		const response = await fetch(requestLink);
		if (!response.ok) {
			throw Error("HTTP-Error: " + response.statusText);
		}
		const { results } = await response.json();
		return results;
	} catch (error) {
		alert(error);
	}
};

const initApp = (friendsDataArray) => {
	const friends = new FriendsList(friendsDataArray, MAIN);
	friends.renderCards();
	bindEventListeners(friends);
};

const bindEventListeners = (friends) => {
	FILTERS.addEventListener("input", ({ target }) => {
		if (target.name === "search") {
			friends.filterBySearch(target.value);
		}
		if (target.name === "gender") {
			friends.filterByGender(target.id);
			FILTERS.elements.search.value = "";
			const checkedUserName = FILTERS.querySelector("[name=userName]:checked");
			if (checkedUserName) {
				friends.sortByName(checkedUserName.id);
			}
			const checkedUserAge = FILTERS.querySelector("[name=userAge]:checked");
			if (checkedUserAge) {
				friends.sortByAge(checkedUserAge.id);
			} //this two forEach callbacks is needed to re-sort new arrays of cards, filtered by gender
		}
		if (target.name === "userName") {
			friends.sortByName(target.id);
			FILTERS.elements.search.value = "";
			const checkedUserAge = FILTERS.querySelector("[name=userAge]:checked");
			if (checkedUserAge) {
				checkedUserAge.checked = false;
			}
		}
		if (target.name === "userAge") {
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
		if (event.key === "Enter") {
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
		if (gender === "all") {
			this.currentCards = [...this.allCards];
		} else {
			this.currentCards = this.allCards.filter((friendCard) => friendCard.gender === gender);
		}
		this.renderCards();
	}
	filterBySearch(searchValue) {
		const filteredArray = this.currentCards.filter((friendCard) =>
			friendCard.searchTarget.toLowerCase().includes(searchValue.toLowerCase())
		);
		this.renderCards(filteredArray);
	}
	sortByName(sortType) {
		this.currentCards = sortObjectsByPropertyValue(this.currentCards, "name", sortType);
		this.renderCards();
	}
	sortByAge(sortType) {
		this.currentCards = sortObjectsByPropertyValue(this.currentCards, "age", sortType);
		this.renderCards();
	}
}

const sortObjectsByPropertyValue = (arrayOfCards, key, sortOrder) => {
	arrayOfCards.sort((a, b) => {
		if (a[key] > b[key]) {
			return 1;
		}
		if (a[key] < b[key]) {
			return -1;
		}
		return 0;
	});
	return sortOrder === "ascending" ? arrayOfCards : arrayOfCards.reverse();
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
		this.searchTarget = `${this.name} ${this.age} ${this.email} ${this.phone} ${this.country}`;
	}

	createCard() {
		const card = document.createElement("div");
		card.classList.add("card");
		card.innerHTML = `<img class="card__img" src="${this.photo}" alt="${this.name} photo"'>
                          <h3 class="card__name">${this.name}</h3>
                          <span class="card__age">Age: ${this.age}</span>
                          <a class="card__phone" href="tel:+${this.phone.replace(/\D/g, "")}">${this.phone}</a>
                          <a class="card__email" href="mailto:${this.email}">${this.email}</a>
                          <span class="card__country">${this.country}</span>`;
		return card;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	fetchData(REQUEST_LINK).then(initApp);
	DAY_NIGHT.addEventListener("click", () => {
		document.body.classList.toggle("light");
	});
});
