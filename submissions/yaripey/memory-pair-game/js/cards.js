const cardFlipDelay = 500

const Card = function (name, id) {
  this.name = name;
  this.id = id;
  this.isOpened = false;
  this.isPresent = true;
}

Card.prototype.makeCard = function () {
  const newCard = document.createElement('div')
  newCard.setAttribute('class', `${this.name} element flip-container`)
  newCard.setAttribute('ontouchstart', 'this.classList.toggle(\'hover\')');
  newCard.setAttribute('id', this.id)
  newCard.innerHTML = `
    <div class="flipper">
      <div class="front">
      
      </div>
      <div class="back">
        <img src="images/${this.name}.png">
      </div>
    </div>
  `
  this.html = newCard;
  return newCard;
}

Card.prototype.peek = function () {
  if (this.isOpened === false) {
    this.isOpened = true;
    this.html.classList.add('opened')
  } else {
    this.isOpened = false;
    setTimeout(() => {
      this.html.classList.remove('opened')
    }, cardFlipDelay)
  }
}

Card.prototype.disappear = function () {
  this.isPresent = false;
  setTimeout(() => {
    this.html.classList.add('disappeared')
  }, cardFlipDelay)
}

const getCardName = function () {
  const cardNames = ['anemo', 'cryo', 'dendro', 'electro', 'geo', 'hydro', 'pyro']
  const num = Math.floor(Math.random() * (cardNames.length))
  return cardNames[num]
}

export { Card, getCardName }
