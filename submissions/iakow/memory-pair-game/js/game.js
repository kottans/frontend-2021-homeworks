import { handler } from "./controller.js";
import { GAME_SIZE, IMAGES } from "./config.js";

function preloadImages() {
  return new Promise((resolve) => {
    let uploadedImages = 0;
    const fragment = document.createDocumentFragment();

    IMAGES.forEach((image) => addLink(`img/${image}`));

    document.head.appendChild(fragment);

    function addLink(path) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = path;
      link.as = "image";
      link.addEventListener("load", onLoadHandler);
      fragment.appendChild(link);

      function onLoadHandler({ target }) {
        uploadedImages++;
        target.removeEventListener("load", onLoadHandler);

        if (uploadedImages === IMAGES.length) {
          removeSpinner();
          resolve();
        }

        function removeSpinner() {
          document.querySelector(".lds-grid").remove();
        }
      }
    }
  });
}

const timeToCheckCards = 600;

function greeting() {
  const mountAwaiting = 500;

  setTimeout(() => {
    alert(
      "It's time to learn to distinguish between masks!\n\n " +
        "Well you know what to do... :)"
    );
  }, mountAwaiting);
}

function mountGame() {
  const gameContainer = document.querySelector(".container");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < GAME_SIZE; i++) {
    fragment.appendChild(createCard(i));
  }

  gameContainer.appendChild(fragment);
  gameContainer.addEventListener("click", handler);

  function createCard(id) {
    const cardPlace = document.createElement("div");
    cardPlace.classList.add("cardPlace");

    const card = document.createElement("div");
    card.classList.add("card");
    card.id = id;
    cardPlace.appendChild(card);

    return cardPlace;
  }
}

function animateOpen(cardID, image) {
  const card = document.getElementById(cardID);
  card.classList.add("open");
  card.style.backgroundImage = `none, url("./img/${image}")`;
}

function showResults(time, moves, score, bestScore) {
  let comment;

  if (bestScore === 0) {
    comment = "Congratulations! Now try to improve your result!";
  } else {
    if (bestScore > score) {
      comment = "You can better...";
    } else {
      comment = "This is your new record!!!";
    }
  }

  alert(
    [
      `Best result: ${bestScore}`,
      "",
      comment,
      `Moves: ${moves}`,
      `Time: ${time.getMinutes()}min ${time.getSeconds()}sec`,
      `Score: ${score}`,
    ].join("\n")
  );
}

function showNewCards() {
  document
    .querySelectorAll(".card")
    .forEach((card) => card.removeAttribute("style"));
}

function animateClose(...cardsID) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();

      cardsID.forEach((cardID) => {
        const card = document.getElementById(cardID);

        card.classList.add("closing");
        card.classList.remove("open");
        card.addEventListener("transitionend", clear);
      });

      function clear(e) {
        if (e.propertyName === "transform") {
          e.target.classList.remove("closing");
          e.target.removeAttribute("style");
          e.target.removeEventListener("transitionend", clear);
        }
      }
    }, timeToCheckCards);
  });
}

function animateDiscard(...cardsID) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cardsID.forEach((cardID) => {
        resolve();

        window.navigator.vibrate(100);

        const openedCard = document.getElementById(cardID);

        openedCard.classList.add("hiding");
        openedCard.classList.remove("open");
        openedCard.addEventListener("transitionend", removeCard);

        function removeCard(e) {
          if (e.propertyName === "opacity") {
            e.target.style.display = "none";
            e.target.classList.remove("hiding");
            e.target.removeEventListener("transitionend", removeCard);
          }
        }
      });
    }, timeToCheckCards);
  });
}

export {
  animateOpen,
  mountGame,
  animateClose,
  animateDiscard,
  showNewCards,
  greeting,
  showResults,
  preloadImages,
};
