const NUM_OF_FRIENDS = 20;
const FRIENDS = document.querySelector(".friends");
let sex;
let sortedFriends;
let allFriends;

function fetchFriends() {
  const apiUrl = `https://randomuser.me/api/?results=${NUM_OF_FRIENDS}`;
  fetch(apiUrl)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => (allFriends = data.results))
    .then(() => renderFriends(allFriends))
    .catch(showErrorMessage);
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function showErrorMessage() {
  document.body.innerHTML = `<div class="errorMessage">Ops...Something went wrong.</div>`;
}

function renderFriends(friendsToBeAdded) {
  FRIENDS.innerHTML = " ";
  let fragment = document.createDocumentFragment();
  friendsToBeAdded.forEach((friend) => {
    let friendCard = document.createElement("div");
    friendCard.setAttribute("class", "friend_card");
    friendCard.innerHTML = `
    <div class="card_wrapper ${friend.gender}">
        <p class="name ">${`${friend.name.first} ${friend.name.last}`}</p>
        <div class="photo">
           <img src="${friend.picture.large}">
         </div>
        <div class="info_block">
            <p class="age">Age ${friend.dob.age}</p>
            <p class="place">${friend.location.city}</p>
            <div class="email">
                <a href="mailto:${friend.mail}" class="email_link">${friend.email}</a>
            </div>
            <p class="gender">${friend.gender}</p>
        </div>
    </div>
`;
    fragment.appendChild(friendCard);
  });
  FRIENDS.appendChild(fragment);
}

document.querySelector(".sortPanel").addEventListener("click", handleUserInput);

function handleUserInput({ target }) {
  const sorters = {
    nameUp: () => {
      allFriends.sort(sortByName);
    },
    nameDown: () => {
      allFriends.sort((a, b) => sortByName(b, a));
    },
    ageUp: () => {
      allFriends.sort(sortByAge);
    },
    ageDown: () => {
      allFriends.sort((a, b) => sortByAge(b, a));
    },
  };
  if (sorters[target.value]) {
    sortedFriends = sorters[target.value]();
    defineSortedFriends(sex);
    renderFriends(sortedFriends);
  }
}

function sortByName(a, b) {
  return a.name.first.localeCompare(b.name.first);
}

function sortByAge(a, b) {
  return a.dob.age - b.dob.age;
}

document.querySelector(".filter").addEventListener("click", filterByGender);

function filterByGender({ target }) {
  defineSortedFriends(target.value);
  renderFriends(sortedFriends);
}

function defineSortedFriends(sex) {
  sex = document.querySelector("input[name=filter]:checked").value;
  if (sex !== "all") {
    sortedFriends = allFriends.filter((el) => el.gender === sex);
  } else {
    sortedFriends = allFriends;
  }
}

document.querySelector(".search").addEventListener("keyup", doSearch);

function doSearch() {
  const searchValue = document.querySelector(".search").value.toLowerCase();
  defineSortedFriends(sex);
  friendsAccordingToSearch = sortedFriends.filter((elem) => {
    return elem.name.last.toLowerCase().startsWith(searchValue, 0) || elem.name.first.toLowerCase().startsWith(searchValue);
  });
  renderFriends(friendsAccordingToSearch);
}

window.addEventListener("load", fetchFriends);
