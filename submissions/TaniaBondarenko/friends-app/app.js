const NUM_OF_FRIENDS = 20;
const FRIENDS = document.querySelector(".friends");
const MALE_RADIO_BUTTON = document.getElementById("male");
const FEMALE_RADIO_BUTTON = document.getElementById("female");
const ALL_RADIO_BUTTON = document.getElementById("all");
let sortedFriends;
let allFriends;
let isFiltered = false;

function fetchFriends() {
  const apiUrl = `https://randomuser.me/api/?results=${NUM_OF_FRIENDS}`;
  fetch(apiUrl)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => (allFriends = data.results))
    .then(() => addFriends(allFriends))
    .catch(showErrorMessage);
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function showErrorMessage() {
  const wholePage = document.body;
  wholePage.innerHTML = `<div class="errorMessage">Ops...Something went wrong.</div>`;
}

function addFriends(friendsToBeAdded) {
  let fragment = document.createDocumentFragment();
  friendsToBeAdded.forEach((friend) => {
    let friendCard = document.createElement("div");
    friendCard.setAttribute("class", "friend_card");
    friendCard.innerHTML = `<div class="card_wrapper ${friend.gender}"><div class="name ">${`${friend.name.first} ${friend.name.last}`}</div>
                                <div class="photo"><img src="${friend.picture.large}"></div>
                                <div class="info_block">
                                <div class="age">Age ${friend.dob.age}</div>
                                <div class="place">${friend.location.city}</div>
                                <div class="email"><a href="mailto:${friend.mail}" class="email_link">${friend.email}</a></div>
                                <div class="gender">${friend.gender}</div>
                                </div></div>
                                `;
    fragment.appendChild(friendCard);
  });
  FRIENDS.appendChild(fragment);
}

document.querySelector(".sortPanel").addEventListener("click", showSorteredFriends);

function makeContainerEmpty() {
  let innerText = " ";
  FRIENDS.innerHTML = innerText.replace(innerText, " ");
}

function showSorteredFriends({ target }) {
  switch (target.value) {
    case "nameUp":
      showSortByNameUp();
      break;
    case "nameDown":
      showSortByNameDown();
      break;
    case "ageUp":
      showSortByAgeUp();
      break;
    case "ageDown":
      showSortByAgeDown();
      break;
  }
}

function showSortByNameUp() {
  makeContainerEmpty();
  if (MALE_RADIO_BUTTON.checked) {
    sortedFriends = sortByNameUp().filter((el) => el.gender === "male");
  } else if (FEMALE_RADIO_BUTTON.checked) {
    sortedFriends = sortByNameUp().filter((el) => el.gender === "female");
  } else if (ALL_RADIO_BUTTON.checked) {
    sortedFriends = sortByNameUp();
  }
  addFriends(sortedFriends);
}

function showSortByNameDown() {
  makeContainerEmpty();
  if (MALE_RADIO_BUTTON.checked) {
    sortedFriends = sortByNameDown().filter((el) => el.gender === "male");
  } else if (FEMALE_RADIO_BUTTON.checked) {
    sortedFriends = sortByNameDown().filter((el) => el.gender === "female");
  } else if (ALL_RADIO_BUTTON.checked) {
    sortedFriends = sortByNameDown();
  }
  addFriends(sortedFriends);
}

function showSortByAgeUp() {
  makeContainerEmpty();
  if (MALE_RADIO_BUTTON.checked) {
    sortedFriends = sortByAgeUp().filter((el) => el.gender === "male");
  } else if (FEMALE_RADIO_BUTTON.checked) {
    sortedFriends = sortByAgeUp().filter((el) => el.gender === "female");
  } else if (ALL_RADIO_BUTTON.checked) {
    sortedFriends = sortByAgeUp();
  }
  addFriends(sortedFriends);
}

function showSortByAgeDown() {
  makeContainerEmpty();
  if (MALE_RADIO_BUTTON.checked) {
    sortedFriends = sortByAgeDown().filter((el) => el.gender === "male");
  } else if (FEMALE_RADIO_BUTTON.checked) {
    sortedFriends = sortByAgeDown().filter((el) => el.gender === "female");
  } else if (ALL_RADIO_BUTTON.checked) {
    sortedFriends = sortByAgeDown();
  }
  addFriends(sortedFriends);
}

function sortByNameUp() {
  return allFriends.sort((a, b) => a.name.first.localeCompare(b.name.first));
}

function sortByNameDown() {
  return allFriends.sort((a, b) => b.name.first.localeCompare(a.name.first));
}

function sortByAgeUp() {
  return allFriends.sort((a, b) => a.dob.age - b.dob.age);
}

function sortByAgeDown() {
  return allFriends.sort((a, b) => b.dob.age - a.dob.age);
}

document.querySelector(".filter").addEventListener("click", doFilter);

function doFilter({ target }) {
  if (target.value === "male" || target.value === "female") {
    makeContainerEmpty();
    sortedFriends = filterBySex(target.value);
    isFiltered = true;
    addFriends(sortedFriends);
  } else if (target.value === "all") {
    makeContainerEmpty();
    addFriends(allFriends);
    isFiltered = false;
  }
}

function filterBySex(sex) {
  return allFriends.filter((el) => el.gender === sex);
}

document.querySelector(".search").addEventListener("keyup", makeValidSearch);

function makeSearch(friendsForSearch) {
  const searchValue = document.querySelector(".search").value.toLowerCase();
  let friendsAccordingToSearch = friendsForSearch.filter((elem) => {
    return elem.name.last.toLowerCase().startsWith(searchValue, 0) || elem.name.first.toLowerCase().startsWith(searchValue);
  });
  makeContainerEmpty();
  addFriends(friendsAccordingToSearch);
}

function makeValidSearch() {
  if (isFiltered) {
    makeSearch(sortedFriends);
  } else {
    makeSearch(allFriends);
  }
}

window.addEventListener("load", fetchFriends);
