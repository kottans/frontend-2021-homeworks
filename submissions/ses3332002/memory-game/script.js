"use strict";
  
  const doc = document.body;
  const themeButtons = document.querySelector(".theme_selector");
  const sizeSelector = document.querySelector(".size_selector");
  const cardThemeSelector = document.querySelectorAll('input[name="option"]');
  const startButton = document.querySelector(".start_button");
  const gameArea = document.querySelector(".game_area");
  const switchableControls = document.querySelectorAll(".switchable");
  const popupHailWindow = document.querySelector(".popup_hail");
  const okButton = document.querySelector(".popup_hail__button");
  
  let numbersArray;
  let cardThemeSelected;
  let cardSelected;
  let cardsArray;
  let matchedCounter;
  const gamefieldSize1 = 12;
  const gamefieldSize2 = 16;
  const gamefieldSize3 = 20;
  const animationDelay = 400;
    
  startButton.addEventListener("click", startGame);
  okButton.addEventListener("click", resetWindow);
  doc.classList.add("theme1");
  
  themeButtons.addEventListener("click", function({target}) {
    if (target.tagName != "BUTTON") {
      return;
    };
    doc.className = "";
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
  
  function checkOrientationAndSize() {
    if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
      if (sizeSelector.value == gamefieldSize1) {
        gameArea.classList.add("game_area-3columns");
      } else {
        gameArea.classList.add("game_area-4columns");
      };
    } else {
      if (sizeSelector.value <= gamefieldSize2) {
        gameArea.classList.add("game_area-4columns");
      } else if (sizeSelector.value == gamefieldSize3){
        gameArea.classList.add("game_area-5columns");
      } else {
        gameArea.classList.add("game_area-6columns");
      };
    };
  };
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
  };
  
  function prepareGameField() {
    numbersArray = [];
    for (let i=0; i < sizeSelector.value/2; i++) {
      numbersArray[i] = i;
    };
    numbersArray = numbersArray.concat(numbersArray);
    
    shuffle(numbersArray);
    checkOrientationAndSize();
    
    const fragment = document.createDocumentFragment();
    for (let i=0; i < sizeSelector.value; i++) {
      let card = document.createElement("button");
      card.classList.add("card");
      card.innerHTML = `<div class="card__front" style="background-image: url(img/${cardThemeSelected.value}_bg.jpg);"></div><div class="card__back" style="background-image: url(img/${cardThemeSelected.value}_${numbersArray[i] + 1}.jpg);"></div>`;
      fragment.append(card);
    };
    gameArea.append(fragment);
    gameArea.addEventListener("click", checkCard);
    cardsArray = Array.from(document.querySelectorAll(".card"));
  };
  
  function checkCard({target}) {
    if (target.className != "card") {
      return;
    };
    
    flipCard(target);
    setTimeout(function() {
      if (!cardSelected) {
        cardSelected = cardsArray.indexOf(target) + 1;
        lockCard(target);
      } else if ((numbersArray[cardSelected - 1] == numbersArray[cardsArray.indexOf(target)])&&(cardSelected - 1 != cardsArray.indexOf(target))) {
        vanishCard(cardsArray[cardSelected - 1]);
        vanishCard(target);
        cardSelected = "";
        matchedCounter++;
        if (matchedCounter == sizeSelector.value/2) {
          hailWinner();
        };
      } else {
        flipCard(cardsArray[cardSelected - 1]);
        unlockCard(cardsArray[cardSelected - 1])
        cardSelected = "";      
        flipCard(target);
      };
    }, animationDelay);
  };
  
  function vanishCard(target) {
    target.classList.add("card-vanish");
    target.setAttribute("tabindex", "-1");
  };
  
  function flipCard(target) {
    target.classList.toggle("card-flip");
  };
  
  function lockCard(target) {
    target.classList.add("card-locked");
    target.setAttribute("disabled", "true");
  };
  
  function unlockCard(target) {
    target.classList.remove("card-locked");
    target.removeAttribute("disabled");
  };

  function hailWinner() {
    popupHailWindow.classList.toggle("popup_hail-hide");
  };
  
  function resetWindow() {
    popupHailWindow.classList.toggle("popup_hail-hide");
    gameArea.className = "game_area";
    gameArea.innerHTML = "";
    switchControls();
  };
