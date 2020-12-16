const images = [
  "ghost",
  "hat",
  "headstone",
  "jaw",
  "knife",
  "pumpkin",
  "skull",
  "zombie",
];
const cards = [...images, ...images];
const field = document.querySelector(".field");
let cardsAmount = cards.length;
let isBlockedField = false;
const winMessage = "u are win!";
const standartTimeout = 1000;
const longTimeout = 2000;

const htmlTemplate = (img) => `
<div class="card" data-name="${img}">
 <div class="flipper">
   <div class="front">
     <img src="./img/pumpkin-front.png" class="front-img"/>
    </div>
    <div class="back">
     <div class="image-container">
       <img class="image" src="./img/${img}.png" />
     </div>
   </div>
 </div>
</div>`;

const shuffleCards = (cards) => cards.sort(() => 0.5 - Math.random());

function createCardsFromArr(arr) {
  let fragment = "";
  arr.forEach((img) => {
    return (fragment += htmlTemplate(img));
  });
  field.innerHTML = fragment;
}

function goToInitState(cards) {
  setTimeout(() => {
    shuffleCards(cards);
    createCardsFromArr(cards);
    cardsAmount = cards.length;
  }, longTimeout);
}

function checkTwoCards() {
  let checkedCards = [];
  cardsInField = Array.from(field.children);

  cardsInField.filter((item) => {
    item.classList.contains("active") ? checkedCards.push(item) : null;
  });
  if (checkedCards.length === 2) {
    isBlockedField = true;
    checkedCards.reduce((first, curr, index, arr) => {
      if (first.dataset.name === curr.dataset.name) {
        cardsAmount -= 2;
        setTimeout(
          () =>
            arr.forEach((item) => {
              item.classList.remove("active");
              item.classList.add("hidden");
            }, (isBlockedField = false)),
          standartTimeout
        );
        checkedCards = [];
      } else {
        arr.forEach((item) => item.classList.remove("active")),
          setTimeout(
            () =>
              arr.forEach(
                (item) => item.classList.remove("flipped"),
                (isBlockedField = false)
              ),
            standartTimeout
          );
        checkedCards = [];
      }
    });
  }
}

function toggleClassName(element, classNames) {
  element.classList.remove(...classNames);
  element.classList.add(...classNames);
}

shuffleCards(cards);
createCardsFromArr(cards);

field.addEventListener("click", function ({ target }) {
  if (target.classList.contains("card") && !isBlockedField) {
    toggleClassName(target, ["active", "flipped"]);
    checkTwoCards();
  }
  if (cardsAmount === 0) {
    setTimeout(() => {
      alert(winMessage);
    }, longTimeout);
    goToInitState(cards);
  }
});
