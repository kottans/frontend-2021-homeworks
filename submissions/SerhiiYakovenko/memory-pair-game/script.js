const cards = [
  {
    name: "alt",
    img: "img/alt.png",
  },
  {
    name: "hanako",
    img: "img/hanako.png",
  },
  {
    name: "kerry_eurodyne",
    img: "img/kerry_eurodyne.png",
  },
  {
    name: "saburo",
    img: "img/saburo.png",
  },
  {
    name: "silverhand",
    img: "img/silverhand.png",
  },
  {
    name: "smasher",
    img: "img/smasher.png",
  },
  {
    name: "v-female",
    img: "img/v-female.png",
  },
  {
    name: "v-male",
    img: "img/v-male.png",
  },
];
const CARDS_AMOUNT = 16;
const MAX_FLIPS = 2;

const div = document.createElement("div");
div.id = "board";
document.body.appendChild(div);

const mixedCards = cards.concat(cards).sort(function () {
  return 0.5 - Math.random();
});

let nameOfFirstCard = "";
let nameOfSecondCard = "";
let flip = 0;
let previousCard = null;

const board = document.getElementById("board");
const boardGrid = document.createElement("section");
boardGrid.classList.add("boardGrid");
board.appendChild(boardGrid);

mixedCards.forEach(function (item) {
  const card = document.createElement("div");
  const front = document.createElement("div");
  const back = document.createElement("div");

  card.classList.add("card");
  card.dataset.name = item.name;
  front.classList.add("front");
  back.classList.add("back");
  back.style.backgroundImage = `url('${item.img}')`;

  boardGrid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = function () {
  const selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.add("match");
  });
};

const checkForWin = function () {
  if (document.getElementsByClassName("card match").length == CARDS_AMOUNT) {
    setTimeout(confirm("Congrats! You won!"), 3000);
    window.location.reload();
  }
};

const reset = function () {
  nameOfFirstCard = "";
  nameOfSecondCard = "";
  flip = 0;

  const selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.remove("selected");
  });
};

boardGrid.addEventListener("click", function ({ target }) {
  if (
    !target.classList.contains("front") ||
    target.closest(".card").classList.contains("selected") ||
    target.closest(".card").classList.contains("match")
  ) {
    return;
  }
  const cardName = target.closest(".card").dataset.name;
  if (flip < MAX_FLIPS) {
    flip++;
    flip === 1 ? (nameOfFirstCard = cardName) : (nameOfSecondCard = cardName);
    target.closest(".card").classList.add("selected");
    if (nameOfFirstCard === nameOfSecondCard) setTimeout(match, 1000);
    if (nameOfFirstCard && nameOfSecondCard) setTimeout(reset, 1000);
  }
  setTimeout(checkForWin, 1500);
});

const footer = document.createElement("footer");
const p = document.createElement("p");
p.insertAdjacentHTML(
  "afterbegin",
  `Created by <a href="https://github.com/serhiiyakovenko" target="_blank">serhiiyakovenko</a> for <a href="https://kottans.org/" target="_blank">kottans</a>`
);
footer.appendChild(p);
document.body.appendChild(footer);
