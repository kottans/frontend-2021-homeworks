const Element = function (name, id) {
  // Information about card
  this.name = name;
  this.id = id;

  // Information about card's state
  this.opened = false;
  this.present = true;
}

Element.prototype.makeElement = function () {
  const newElement = document.createElement('div')
  newElement.setAttribute('class', `${this.name} element flip-container`)
  newElement.setAttribute('ontouchstart', 'this.classList.toggle(\'hover\')');
  newElement.setAttribute('id', this.id)

  const flipper = document.createElement('div')
  flipper.setAttribute('class', 'flipper')

  const front = document.createElement('div')
  front.setAttribute('class', 'front')

  const back = document.createElement('back')
  back.setAttribute('class', 'back')

  const newImage = document.createElement('img')
  newImage.setAttribute('src', `images/${this.name}.png`)

  back.appendChild(newImage)

  flipper.appendChild(front)
  flipper.appendChild(back)

  newElement.appendChild(flipper)

  this.html = newElement;

  return newElement;
}

Element.prototype.peek = function () {
  if (this.opened === false) {
    this.opened = true;
    this.html.classList.add('opened')
  } else {
    this.opened = false;
    setTimeout(() => {
      this.html.classList.remove('opened')
    }, 500)
  }
}

Element.prototype.dissapear = function () {
  this.present = false;
  setTimeout(() => {
    this.html.classList.add('dissapeared')
  }, 500)
}

// This function returns a random element name.
// Used for creating an array of cards.
const getElementName = function () {
  const elementNames = ['anemo', 'cryo', 'dendro', 'electro', 'geo', 'hydro', 'pyro']
  const num = Math.floor(Math.random() * (elementNames.length))
  return elementNames[num]
}

export { Element, getElementName }
