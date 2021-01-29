const cardsId = ["01", "02", "03", "04", "05", "06"];
const cardsArr = [...cardsId, ...cardsId];
const maxNumOfHiddenCards = 12;
const maxNumOfFlippedCards = 2;
const delayForHidden = 100;
const delayForClicked = 800;
const delayForAlert = 700;
let gameField = document.querySelector(".game_field");
let numOfHiddenCards = 0;
let arrOfFlippedCardsId = [];
let firstFlippedContainer;
let secondFlippedContainer;

function createCard(id) {
  let flipContainer = document.createElement("div");
  flipContainer.className = "flip-container";
  flipContainer.setAttribute("id", id);
  gameField.append(flipContainer);
  flipContainer.innerHTML = `      
      <div class="flipper">
          <div class="front">
              <img src="img/paw.jpg">
          </div>
          <div class="back">
              <img src="img/funny-cat_${id}.jpg">
          </div>
      </div>`;
}
function createField() {
  cardsArr.sort(function () {
    return 0.5 - Math.random();
  });
  cardsArr.forEach((id) => createCard(id));
}
function flipCard(event) {
  if (arrOfFlippedCardsId.length == 0) {
    firstFlippedContainer = event.target.closest(".flip-container");
    firstFlippedContainer.classList.add("clicked");
    arrOfFlippedCardsId.push(firstFlippedContainer.id);
  } else if (arrOfFlippedCardsId.length == 1 && event.target.closest('.flip-container')!==firstFlippedContainer) {
    secondFlippedContainer = event.target.closest(".flip-container");
    secondFlippedContainer.classList.add("clicked");
    arrOfFlippedCardsId.push(secondFlippedContainer.id);
    CheckPairs();
  }
}
function CheckPairs() {
  if (
    arrOfFlippedCardsId[0] == arrOfFlippedCardsId[1] &&
    firstFlippedContainer !== secondFlippedContainer
  ) {
    setTimeout(() => {
      firstFlippedContainer.classList.add("hidden");
      secondFlippedContainer.classList.add("hidden");
      arrOfFlippedCardsId = [];
      numOfHiddenCards += 2;
      setTimeout(() => {
        checkNumOfHiddenCard();
      }, delayForAlert);
    }, delayForHidden);
  } else {
    setTimeout(() => {
      firstFlippedContainer.classList.remove("clicked");
      secondFlippedContainer.classList.remove("clicked");
      arrOfFlippedCardsId = [];
    }, delayForClicked);
    
  }
}
function checkNumOfHiddenCard() {
  if (numOfHiddenCards === maxNumOfHiddenCards) {
    alert("You win!");

    gameField.innerHTML = "";
    numOfHiddenCards = 0;
    createField();
  }
}

createField();
gameField.addEventListener("click", flipCard);
