let FRIENDS_ARRAY = [],
	INITIAL_FRIENDS_ARRAY = [];
const USERS_AMOUNT = 20,
	API_URL = `https://randomuser.me/api/?results=${USERS_AMOUNT}`,
	CARDS_CONTAINER = document.querySelector(".cards__container"),
	TOTAL_COUNTER = document.querySelector(".amount");

fetch(API_URL)
	.then((response) => {
		if (checkResponseStatus(response.status)) {
			return response.json();
		} else {
			appendErrorMessage(
				getResponseErrorMessage(response.status, response.statusText)
			);
		}
	})
	.then((responseBody) => {
		if (responseBody !== undefined) {
			INITIAL_FRIENDS_ARRAY = flattenFriendProperties(
				responseBody.results
			);
			FRIENDS_ARRAY = INITIAL_FRIENDS_ARRAY;
			appendFriendsCards(FRIENDS_ARRAY);
			setTotalCounter(FRIENDS_ARRAY);
			initializeAgeEdges(FRIENDS_ARRAY);
		}
	})
	.catch((error) =>
		appendErrorMessage(
			`Please, check your network connection! <br> ${error}`
		)
	);

function checkResponseStatus(status) {
	if (status >= 200 && status < 300) {
		return true;
	} else {
		return false;
	}
}

function setTotalCounter(friendsArray) {
	TOTAL_COUNTER.innerText = `${friendsArray.length} Totals`;
	if (!friendsArray.length) {
		appendNoResultsMessage();
	}
}

function initializeAgeEdges(friendsArray) {
	["minAge", "maxAge"].forEach((edgeName) =>
		["min", "max"].forEach((edgeValue) =>
			setAgeEdge(findAge(friendsArray, edgeValue), edgeName, edgeValue)
		)
	);
}

function appendNoResultsMessage() {
	const noResultMessage = document.createElement("h3");
	noResultMessage.innerText = "Sorry! No results found :(";
	noResultMessage.classList.add("no-results");
	CARDS_CONTAINER.appendChild(noResultMessage);
}

function appendFriendsCards(friendsArray) {
	cleanCardsContainer();
	setTotalCounter(friendsArray);
	const fragment = document.createDocumentFragment();
	friendsArray.forEach((friend) => {
		const template = document.createElement("template");
		template.innerHTML = getFriendCardTemplate(friend);
		fragment.appendChild(template.content);
	});
	CARDS_CONTAINER.appendChild(fragment);
}

function appendErrorMessage(errorText) {
	const div = document.createElement("div"),
		img = document.createElement("img");
	div.innerHTML = errorText;
	div.classList.add("error__container");
	img.classList.add("error__image");
	img.src = "assets/error.svg";
	div.appendChild(img);
	document.querySelector(".main__row").style.display = "none";
	document.body.append(div);
}

function cleanCardsContainer() {
	CARDS_CONTAINER.innerHTML = "";
}

function flattenFriendProperties(friendsArray) {
	return friendsArray.map((friend) => {
		return {
			firstName: friend.name.first,
			lastName: friend.name.last,
			email: friend.email,
			gender: friend.gender,
			country: friend.location.country,
			username: friend.login.username,
			phone: friend.phone,
			age: friend.dob.age,
			image: friend.picture.large,
			registeredAge: friend.registered.age,
			registeredDate: friend.registered.date,
		};
	});
}

function getFriendCardTemplate(friend) {
	return `<div class="card__container shadow">
				<div class="card__row around">
					<a href='mailto:${friend.email}' class="email__button button"></a>
					<img src="${friend.image}" class="card__image">
					<a href='tel:${friend.phone}' class="phone__button button"></a>
				</div>
				<div class="card__row column">
					<h3 class="card__name">${friend.firstName} ${friend.lastName}</h3>
					<h5 class="card__username">@${friend.username}</h5>
				</div>
				<div class="card__row gender__container">
					<h6 class="card__gender">${getGenderIcon(friend.gender)}</h6>
					<h6 class="card__age">${friend.age}</h6>
				</div>
				<div class="card__row registered__container">
					<p class="registered__message">Friends since <br> 
					${getDate(friend.registeredDate)}</p>
					<div style="width:${friend.registredAge}%"></div>
				</div>
				<div class="card__row country__row">
					<h6 class="card__country">${friend.country}</h6>
				</div>
			</div>`;
}

function getDate(date) {
	return new Date(date).toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function getGenderIcon(gender) {
	return gender === "female"
		? '<span class="female">♀</span>'
		: '<span class="male">♂</span>';
}

function getResponseErrorMessage(status, statusText) {
	return `<h1 class='error__message'>Sorry, an error occured!</h1>
			<h2 class='error__code'>${status}: ${statusText}</h2>`;
}

function setAgeEdge(ageEdge, edgeName, edgeValue) {
	document.getElementById(edgeName)[edgeValue] = ageEdge;
}

function findAge(friendsArray, value) {
	const sortedArray = friendsArray.sort((a, b) => a.age - b.age);
	return value === "min"
		? sortedArray[0].age
		: sortedArray[sortedArray.length - 1].age;
}

function sortCardsArray(condition, friendsArray) {
	switch (condition) {
		case "ND":
			return FRIENDS_ARRAY.sort((a, b) =>
				b.firstName.localeCompare(a.firstName)
			);
		case "NA":
			return FRIENDS_ARRAY.sort((a, b) =>
				a.firstName.localeCompare(b.firstName)
			);
		case "AD":
			return FRIENDS_ARRAY.sort((a, b) => b.age - a.age);
		case "AA":
			return FRIENDS_ARRAY.sort((a, b) => a.age - b.age);
	}
}

function findSubstring(string, substring) {
	return string.toLowerCase().indexOf(substring.toLowerCase()) >= 0
		? true
		: false;
}

function findMatchesWithPropertiesValues(
	propertiesList,
	friendsArray,
	substring
) {
	return friendsArray.filter((friend) => {
		return propertiesList
			.map((property) => findSubstring(friend[property], substring))
			.some((el) => el);
	});
}

function removeByGender(gender, friendsArray) {
	return friendsArray.filter((friend) => friend.gender !== gender);
}

function filterByGender(gender, friendsArray) {
	return friendsArray.filter((friend) => friend.gender === gender);
}

function filterByAge(minAge, maxAge, friendsArray) {
	console.log(`minAge, ${minAge} maxAge, ${maxAge}`);
	return friendsArray.filter(
		(friend) => friend.age >= minAge && friend.age < maxAge
	);
}

document.querySelector("#showFiltersButton").addEventListener("click", (e) => {
	document.querySelector(".filters__container").classList.toggle("display");
});

document.querySelector("#sort").addEventListener("click", (e) => {
	document.querySelector(".select__list").classList.toggle("visible");
	if (e.target.attributes.class.nodeValue === "list__item") {
		document.querySelector(".select__face-item").innerText =
			e.target.textContent;
		appendFriendsCards(sortCardsArray(e.target.attributes.value.nodeValue));
	}
});

document.querySelector("#search").addEventListener("input", (e) => {
	const inputString = e.target.value,
		filteredArray = findMatchesWithPropertiesValues(
			["firstName", "lastName", "email", "username"],
			FRIENDS_ARRAY,
			inputString
		);
	appendFriendsCards(filteredArray);
});

document.querySelector("#genderFilter").addEventListener("click", (e) => {
	if (e.target.type === "checkbox") {
		if (e.target.checked) {
			FRIENDS_ARRAY = FRIENDS_ARRAY.concat(
				filterByGender(e.target.value, INITIAL_FRIENDS_ARRAY)
			);
		} else {
			FRIENDS_ARRAY = removeByGender(e.target.value, FRIENDS_ARRAY);
		}
		appendFriendsCards(FRIENDS_ARRAY);
	}
});

document.querySelector("#ageFilter").addEventListener("change", (e) => {
	if (e.target.type === "number") {
		const min = document.getElementById("minAge"),
			max = document.getElementById("maxAge");
		if (min.value && max.value) {
			FRIENDS_ARRAY = filterByAge(
				min.value,
				max.value,
				INITIAL_FRIENDS_ARRAY
			);
		}
		appendFriendsCards(FRIENDS_ARRAY);
	}
});

window.addEventListener("beforeunload", () => {
	["#search", "#minAge", "#maxAge"].forEach(
		(element) => (document.querySelector(element).value = "")
	);
});
