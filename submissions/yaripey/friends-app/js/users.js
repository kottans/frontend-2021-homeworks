export class User {
  constructor({ cell, dob, email, gender, location, name, picture, registered, id }) {
    this.cellPhone = cell
    this.dateOfBirth = dob.date
    this.age = dob.age
    this.email = email
    this.gender = gender
    this.location = location
    this.title = name.title
    this.firstName = name.first
    this.lastName = name.last
    this.picture = picture
    this.registered = registered
    this.id = id
  }

  get htmlMarkUp() {
    this.card = document.createElement('a')
    this.card.setAttribute('href', '#')
    this.card.classList.add('user')
    this.card.id = this.id
    this.card.innerHTML = `
      <img class="profilePicture" src="${this.picture.medium}" alt="profile picture">
      <div class="name">${this.title} ${this.firstName} ${this.lastName}</div>
      <div class="gender-age">${this.age} y.o. ${this.gender}</div>
    `
    return this.card
  }

  get expandedHtmlMarkUp() {
    this.expandedCardContainer = document.createElement('div')
    this.expandedCardContainer.classList.add('expanded-card-container')
    this.expandedCardContainer.id = 'expanded-card'
    this.expandedCardContainer.innerHTML = `
      <div class="expanded-card">
        <button id="big-close-button"></button>
        <div class="big-upper-part">
          <img class="big-avatar-picture" src="${this.picture.large}">
          <div class="big-upper-part-right">
            <div class="big-name">${this.title} ${this.firstName} ${this.lastName}</div>
            <div class="big-gender-age">${this.age} y.o. ${this.gender}</div>
          </div>
        </div>
        <div class="big-lower-class">
          <div class="big-location">${this.location.city}, ${this.location.country}</div>
          <div class="big-registered">Registered ${this.registered.age} years ago.</div>
          <a href="tel:${this.cellPhone}" class="big-cell-phone">${this.cellPhone}</a>
          <a href="mailto:${this.email}" class="big-email">${this.email}</a>
        </div>
      </div>
    `

    return this.expandedCardContainer
  }
}

export const loadedUsers = []
