const API_URL = "https://randomuser.me/api/?results=50";
let users = [];
const main = document.getElementById("friends-list");
const sorting = document.querySelector(".sorting");
const search = document.querySelector(".search");
const usersCards = document.querySelector(".users");

function createFriendsList() {
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then(function (json) {
      users = json.results;
      render(users);
    })
    .catch((error) => console.log(error));
}

function createCards(users) {
  usersCards.innerHTML = "";
  users.forEach((item) => {
    usersCards.innerHTML += `<div class="userCard">
      <img src="${item.picture.large}" class="userimg">
      <div>
        <p class="nickname"><b>Nickname:</b>${item.login.username}</p>
        <p class="name"><b>Name:</b>${item.name.title} ${item.name.first}  ${item.name.last}</p>
        <p class="text"><b>Gender:</b> ${item.gender} <b>Age:</b> ${item.dob.age}</p>
        <p class="text"><b>Country:</b> ${item.location.country}</p>
        <p class="text"><b>Email:</b> ${item.email} </p>
      </div>
    </div>`;
  });
  main.appendChild(usersCards);
}

function sortByAge(a, b) {
  return a.dob.age > b.dob.age ? 1 : -1;
}

function sortByName(a, b) {
  return a.name.first.localeCompare(b.name.first);
}

function searchUser(users, text) {
  let searchResult = [];
  users.map((user) => {
    if (
      user.name.first.toLowerCase().includes(text.toLowerCase()) ||
      user.name.last.toLowerCase().includes(text.toLowerCase())
    ) {
      searchResult.push(user);
    }
  });
  return searchResult;
}

function render(users) {
  createCards(users);
  sorting.addEventListener("change", ({ target }) => {
    if (target.value == "name") {
      target.dataset.order == "asc"
        ? createCards(users.sort((a, b) => sortByName(a, b)))
        : createCards(users.sort((a, b) => sortByName(b, a)));
    }
    if (target.value == "age") {
      target.dataset.order == "asc"
        ? createCards(users.sort((a, b) => sortByAge(a, b)))
        : createCards(users.sort((a, b) => sortByAge(b, a)));
    }
  });

  search.addEventListener("input", ({ target }) => {
    createCards(searchUser(users, target.value));
  });
}

createFriendsList();
