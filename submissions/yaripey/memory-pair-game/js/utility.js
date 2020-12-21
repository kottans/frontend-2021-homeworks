// Function for displaying an array of cards (only names)
const showArrayOfElements = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].name)
  }
}

// Function for shuffling an array
const shuffleArray = function (arr) {
  return arr.sort(function () { return 0.5 - Math.random() });
}

const selectProperTarget = (currentTarget) => {
  if (currentTarget === document.querySelector('body')) {
    return false;
  }
  if (currentTarget.classList.contains('flip-container')) {
    return currentTarget
  } else {
    return selectProperTarget(currentTarget.parentNode)
  }
}

export { showArrayOfElements, shuffleArray, selectProperTarget }
