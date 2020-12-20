import "../css/vendor/normalize.css";
import "../css/styles.css";

const images = [
  "acrobatics",
  "boneCutter",
  "chaosRing",
  "doubleStrike",
  "innerDemon",
  "metamorphosis",
  "splittingSoul",
  "manaBurn",
];
const pairCounter = 8;
const winMsg = "You Win Bro! Play again?";
const cards = [...images, ...images];
const gameField = document.querySelector(".game-field");
let firstCard = "";
let secondCard = "";
let pairsCounter = 0;

function cardTemplate(image) {
  return `<div class="card" data-name="${image}">
 <div class="spin-card">
   <div class="card-front">
      <img src="./img/cardFront.png" class="front-img"/>
    </div>
    <div class="card-back">
      <img class="back-img" src="./img/${image}.png" />
   </div>
 </div>
</div>`;
}
function shuffleCards(cardsArray) {
  cardsArray.sort(() => {
    return 0.5 - Math.random();
  });
}
function renderNewField(cardsArray) {
  shuffleCards(cardsArray);
  let field = "";
  cardsArray.forEach((img) => {
    return (field += cardTemplate(img));
  });
  gameField.innerHTML = field;
}

gameField.addEventListener("click", onCardClick);

function onCardClick(e) {
  if (secondCard == "") {
    let selectedCard = e.target.closest(".card");

    spinCard(selectedCard);
  }
}
function spinCard(element) {
  if (
    !element.classList.contains("spined") &&
    element.classList.contains("card") &&
    !element.classList.contains("blocked")
  ) {
    element.classList.add("spined");

    if (firstCard === "") {
      firstCard = element.dataset.name;
    } else if (secondCard === "") {
      secondCard = element.dataset.name;

      setTimeout(() => checkTwo(firstCard, secondCard), 800);
    }
  }
}

function checkTwo(first, second) {
  if (first === second) choiseRigth();
  else choiseWrong();
  clearChoises();
}
function choiseRigth() {
  document.querySelectorAll(".spined").forEach((element) => {
    element.classList.add("bloked");
    element.classList.remove("spined");
  });
  pairsCounter++;

  checkWin();
}
function choiseWrong() {
  document.querySelectorAll(".spined").forEach((element) => {
    element.classList.remove("spined");
  });
}

function clearChoises() {
  firstCard = "";
  secondCard = "";
}
function checkWin() {
  if (pairsCounter == pairCounter) if (confirm(winMsg)) renderNewField(cards);
}
renderNewField(cards);
