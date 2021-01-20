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

const div = document.createElement("div");
div.id = "board";
document.body.appendChild(div);

let mixedCards = cards.concat(cards).sort(function () {
  return 0.5 - Math.random();
});

let firstFlip = "";
let secondFlip = "";
let turn = 0;
let previousCard = null;

const board = document.getElementById("board");
const boardGrid = document.createElement("section");
boardGrid.setAttribute("class", "boardGrid");
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

let match = function match() {
  let selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.add("match");
  });
  if (document.getElementsByClassName("card match").length == 16) {
    setTimeout(alert("Congrats! You won!"), 3000);
  }
};

let reset = function reset() {
  firstFlip = "";
  secondFlip = "";
  turn = 0;
  previousCard = null;

  let selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.remove("selected");
  });
};

boardGrid.addEventListener("click", function (event) {
  let target = event.target;
  if (
    target.nodeName === "SECTION" ||
    target === previousCard ||
    target.parentNode.classList.contains("selected") ||
    target.parentNode.classList.contains("match")
  ) {
    return;
  }
  if (turn < 2) {
    turn++;
    if (turn === 1) {
      firstFlip = target.parentNode.dataset.name;
      target.parentNode.classList.add("selected");
    } else {
      secondFlip = target.parentNode.dataset.name;
      target.parentNode.classList.add("selected");
    }
    if (firstFlip && secondFlip) {
      if (firstFlip === secondFlip) {
        setTimeout(match, 1000);
      }
      setTimeout(reset, 1000);
      previousCard = target;
    }
  }
});

const footer = document.createElement("footer");
const p = document.createElement("p");
p.insertAdjacentHTML(
  "afterbegin",
  `Created by <a href="https://github.com/serhiiyakovenko" target="_blank">serhiiyakovenko</a> for <a href="https://kottans.org/" target="_blank">kottans</a>`
);
footer.appendChild(p);
document.body.appendChild(footer);
