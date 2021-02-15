const API_URL = "https://randomuser.me/api/?results=50";
let users = [];
const ageDescending = document.querySelector(".age-desc");
const ageAscending = document.querySelector(".age-asc");
const nameDescending = document.querySelector(".name-desc");
const nameAscending = document.querySelector(".name-asc");
const main = document.getElementById("friends-list");
const search = document.querySelector(".search");
const usersCards = document.querySelector(".users");

fetch(API_URL)
  .then((response) => {
    return response.json();
  })
  .then(function (json) {
    users = json.results;
    render(users);
  })
  .catch((error) => console.log(error));

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

function sortAgeAsc(users) {
  createCards(users.sort((a, b) => a.dob.age - b.dob.age));
}

function sortAgeDesc(users) {
  createCards(users.sort((a, b) => b.dob.age - a.dob.age));
}

function sortNameAsc(users) {
  createCards(
    users.sort((a, b) => {
      if (a.name.first < b.name.first) return -1;
      if (a.name.first > b.name.first) return 1;
      return 0;
    })
  );
}

function sortNameDesc(users) {
  createCards(
    users.sort((a, b) => {
      if (b.name.first < a.name.first) return -1;
      if (b.name.first > a.name.first) return 1;
      return 0;
    })
  );
}

function searchUser(text, users) {
  let searchResult = [];
  users.map((user) => {
    if (
      user.name.first.toLowerCase().includes(text.toLowerCase()) ||
      user.name.last.toLowerCase().includes(text.toLowerCase())
    ) {
      searchResult.push(user);
    }
  });
  createCards(searchResult);
}

function render(users) {
  createCards(users);
  ageAscending.addEventListener("click", () => sortAgeAsc(users));
  ageDescending.addEventListener("click", () => sortAgeDesc(users));
  nameAscending.addEventListener("click", () => sortNameAsc(users));
  nameDescending.addEventListener("click", () => sortNameDesc(users));
  search.addEventListener("input", (event) =>
    searchUser(event.target.value, users)
  );
}
