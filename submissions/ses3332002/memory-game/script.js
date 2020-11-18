"use strict";
  
  const doc = document.body;
  const themeButtons = document.querySelector(".theme_selector");
  const sizeSelector = document.querySelector(".size_selector");
  const cardThemeSelector = document.querySelectorAll('input[name="option"]');
  const startButton = document.querySelector(".start_button");
  const gameArea = document.querySelector(".game_area");
  const switchableControls = document.querySelectorAll(".switchable");
  let numbersArray;
  let cardThemeSelected;
  let cardSelected;
  let cardsArray;
  let matchedCounter;
  
  startButton.addEventListener("click", startGame);
  doc.classList.add("theme1");
  
  themeButtons.addEventListener("click", function({target}) {
    if (target.tagName != "BUTTON") {
      return;
    };
    doc.classList.remove(doc.classList[0]);
    doc.classList.add(target.dataset.theme);
  });
  
  function startGame() {
    cardThemeSelected = document.querySelector('input[name="option"]:checked');
    matchedCounter = 0;
    prepareGameField();
    switchControls();
  };
  
  function switchControls() {
    switchableControls.forEach((item) => {
      item.disabled = !item.disabled;
      item.classList.toggle("form_item-desabled");
    });
  };
  
  function prepareGameField() {
    numbersArray = [];
    for (let i=0; i < sizeSelector.value/2; i++) {
      numbersArray[i] = i;
    };
    numbersArray = numbersArray.concat(numbersArray);

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      };
    };
    
    shuffle(numbersArray);
    
    if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
      if (sizeSelector.value == 12) {
        gameArea.classList.add("game_area-3columns");
      } else {
        gameArea.classList.add("game_area-4columns");
      };
    } else {
      if (sizeSelector.value <= 16) {
        gameArea.classList.add("game_area-4columns");
      } else if (sizeSelector.value == 20){
        gameArea.classList.add("game_area-5columns");
      } else {
        gameArea.classList.add("game_area-6columns");
      };
    };
    let fragment = document.createDocumentFragment();
    for (let i=0; i < sizeSelector.value; i++) {
      let card = document.createElement("button");
      card.classList.add("card");
      card.innerHTML = `<div class="card__front" style="background-image: url(img/${cardThemeSelected.value}_bg.jpg);"></div><div class="card__back" style="background-image: url(img/${cardThemeSelected.value}_${numbersArray[i] + 1}.jpg);"></div>`;
      fragment.append(card);
      card.addEventListener("click", checkCard);
    };
    gameArea.append(fragment);
    cardsArray = Array.from(document.querySelectorAll(".card"));
  };
  
  function checkCard({target}) {
    flipCard.call(target);
    setTimeout(function() {
      if (!cardSelected) {
        cardSelected = cardsArray.indexOf(target) + 1;
        lockCard.call(target);
      } else if ((numbersArray[cardSelected - 1] == numbersArray[cardsArray.indexOf(target)])&&(cardSelected - 1 != cardsArray.indexOf(target))) {
        vanishCard.call(cardsArray[cardSelected - 1]);
        vanishCard.call(target);
        cardSelected = "";
        matchedCounter++;
        if (matchedCounter == sizeSelector.value/2) {
          hailWinner();
        };
      } else {
        flipCard.call(cardsArray[cardSelected - 1]);
        unlockCard.call(cardsArray[cardSelected - 1])
        cardSelected = "";      
        flipCard.call(target);
      };
    }, 400);
    
    function vanishCard() {
      this.classList.add("card-vanish");
      this.setAttribute("tabindex", "-1");
    };
    
    function flipCard() {
      this.firstElementChild.classList.toggle("card__front-flip");
      this.lastElementChild.classList.toggle("card__back-flip");
    };
    
    function lockCard() {
      this.style.pointerEvents = "none";
      this.setAttribute("disabled", "true");
    };
    
    function unlockCard() {
      this.style.pointerEvents = "auto";
      this.removeAttribute("disabled");
    };
  };

  function hailWinner() {
    const popupHailWindow = document.querySelector(".popup_hail");
    popupHailWindow.classList.toggle("popup_hail-hide");
    const okButton = document.querySelector(".popup_hail__button");
    okButton.addEventListener("click", resetWindow);
    
    function resetWindow() {
      okButton.removeEventListener("click", resetWindow);
      popupHailWindow.classList.toggle("popup_hail-hide");
      gameArea.classList.remove(gameArea.classList[1]);
      gameArea.innerHTML = "";
      switchControls();
    };
  };
