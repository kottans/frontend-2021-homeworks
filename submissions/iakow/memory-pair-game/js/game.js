import * as Render from "./render.js";
import { IMAGES, GAME_SIZE } from "./config.js";

let gameCards;
const openedCardsIDs = [];
let bestScore = 0;
let matchMoves, matchStartTime;

Render.mountGame();
Render.greeting();
setMatch();

export function pickCard(cardID) {
  const pickIsDisabled =
    openedCardsIDs.some((openedCardID) => openedCardID === cardID) ||
    gameCards[cardID] === null;

  if (pickIsDisabled) return;

  switch (openedCardsIDs.length) {
    case 0:
      openCard(cardID);
      if (checkIfLastPair())
        autoOpenLastCard()
          .then(discardMatchedPair)
          .then(completeMatch)
          .then(newMatch);
      break;
    case 1:
      openCard(cardID);
      checkIfMatched() ? discardMatchedPair() : closeMismatchedPair();
      break;
    case 2:
      return;
    default:
      throw new Error(
        "Something went wrong: openedCardsIDs array should`t be longer than 2"
      );
  }
}

function setMatch() {
  matchMoves = 0;
  matchStartTime = Date.now();

  gameCards = getNewCardsSet();

  function getNewCardsSet() {
    const randomize = () => 0.5 - Math.random();
    const randomImgSet = [...IMAGES].sort(randomize).slice(0, GAME_SIZE / 2);

    return [...randomImgSet, ...randomImgSet].sort(randomize);
  }
}

function completeMatch() {
  return new Promise((resolve) => {
    const awaitDiscardingLastCards = 1400;

    setTimeout(() => {
      const time = new Date(Date.now() - matchStartTime);
      const score = Math.round(100000000 / (matchMoves * time));

      if (score >= bestScore) bestScore = score;

      Render.showResults(time, matchMoves, score, bestScore);

      resolve();
    }, awaitDiscardingLastCards);
  });
}

function newMatch() {
  setMatch();
  Render.showNewCards();
}

function openCard(pickedCardID) {
  openedCardsIDs.push(pickedCardID);
  Render.animateOpen(pickedCardID, gameCards[pickedCardID]);
}

function checkIfMatched() {
  return gameCards[openedCardsIDs[0]] === gameCards[openedCardsIDs[1]];
}

function closeMismatchedPair() {
  matchMoves++;
  Render.animateClose(...openedCardsIDs).then(clearOpenedCards);
}

function discardMatchedPair() {
  matchMoves++;
  gameCards[openedCardsIDs[0]] = gameCards[openedCardsIDs[1]] = null;
  Render.animateDiscard(...openedCardsIDs).then(clearOpenedCards);
}

function checkIfLastPair() {
  return gameCards.filter((card) => card != null).length === 2;
}

function autoOpenLastCard() {
  return new Promise((resolve) => {
    setTimeout(() => {
      openCard(getLastCardID());
      resolve();
    }, 300);
  });

  function getLastCardID() {
    return gameCards.findIndex(
      (card, i) =>
        card === gameCards[openedCardsIDs[0]] && i !== openedCardsIDs[0]
    );
  }
}

function clearOpenedCards() {
  openedCardsIDs.length = 0;
}
