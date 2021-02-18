const API_URL = "https://randomuser.me/api/?results=50";
let users = [];
const ageDescending = document.querySelector(".age-desc");
const ageAscending = document.querySelector(".age-asc");
const nameDescending = document.querySelector(".name-desc");
const nameAscending = document.querySelector(".name-asc");
const main = document.getElementById("friends-list");
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

function sortByAge(users, order) {
  return order.includes("asc")
    ? users.sort((a, b) => a.dob.age - b.dob.age)
    : users.sort((a, b) => b.dob.age - a.dob.age);
}

function sortByName(users, order) {
  return users.sort((a, b) => {
    if (order.includes("asc")) {
      return a.name.first < b.name.first ? -1 : 1
    } else {
      return b.name.first < a.name.first ? -1 : 1
    }
  });
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
  ageAscending.addEventListener("change", (event) =>
    createCards(sortByAge(users, event.target.className))
  );
  ageDescending.addEventListener("change", (event) =>
    createCards(sortByAge(users, event.target.className))
  );
  nameAscending.addEventListener("change", (event) =>
    createCards(sortByName(users, event.target.className))
  );
  nameDescending.addEventListener("change", (event) =>
    createCards(sortByName(users, event.target.className))
  );
  search.addEventListener("input", (event) =>
    createCards(searchUser(users, event.target.value))
  );
}

createFriendsList();
