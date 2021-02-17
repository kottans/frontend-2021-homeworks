const CONTAINER = document.querySelector(".container");
const SEARCH_BAR = document.querySelector(".searchBar");
const SORTING_MENU = document.querySelector(".wrapper__filters");
const SORT_GENDER = document.querySelector(".search__by-gender");
const URL = `https://randomuser.me/api/?results=100`;
let friends = [];

const fetchFriends = (url) =>
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(({ results }) => results);

const renderFriends = (friends) => {
  const friendsList = drawFriends(friends);
  CONTAINER.innerHTML = "";
  CONTAINER.append(friendsList);
};

const start = () => {
  fetchFriends(URL).then((results) => {
    renderFriends(results);
    friends = results.slice();
  });
};

const createCard = (friend) => {
  const card = document.createElement("div");
  card.classList.add("card", `${friend.gender}`);
  card.innerHTML = `<img src="${friend.picture.large}" alt="photo" class="card-img">
	<h2 class="card-name">${friend.name.first} ${friend.name.last}</h2>
	<p class="card-age">${friend.dob.age} years</p>
	<p class="card-location">${friend.location.country}<br>${friend.location.city}</p>`;
  return card;
};

const drawFriends = (friends) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  const friendsCards = friends.map(createCard);
  wrapper.append(...friendsCards);
  return wrapper;
};

SEARCH_BAR.addEventListener("input", (event) => {
  let searchName = event.target.value.toLowerCase();
  if (searchName !== "") {
    searchResults = friends.filter((el) =>
      `${el.name.first}${el.name.last}`.toLowerCase().includes(searchName)
    );
    return renderFriends(searchResults);
  } else {
    searchResults = [...friends];
    renderFriends(searchResults);
  }
});

SORTING_MENU.addEventListener("click", ({ target }) => {
  let sortedArr = [...friends];
  const gender = getChecked(SORT_GENDER);
  if (gender) {
    sortedArr = sortByGender(sortedArr, gender.value);
  }
  if (target.value === "age-ascending") {
    sortedArr.sort((a, b) => sortByAge(a, b));
  } else if (target.value === "age-descending") {
    sortedArr.sort((a, b) => sortByAge(b, a));
  } else if (target.value === "name-ascending") {
    sortedArr.sort((a, b) => sortByName(a, b));
  } else if (target.value === "name-descending") {
    sortedArr.sort((a, b) => sortByName(b, a));
  }
  return renderFriends(sortedArr);
});

const sortByAge = (a, b) => {
    return a.dob.age > b.dob.age ? 1 : -1;
};

const sortByName = (a, b) => {
  return a.name.first.localeCompare(b.name.first);
}

const sortByGender = (dataToSort, inputGenderFilter) => {
  const inputGenderAll = document.getElementById("all").value;
  if (inputGenderFilter === inputGenderAll) {
    return dataToSort;
  } else
    return dataToSort.filter((friend) => friend.gender === inputGenderFilter);
};

const getChecked = element => {
  const input = element.querySelector("input[name='gender']:checked");
  return input;
};

start();
