const endpoint = 'https://randomuser.me/api/';
const includeFields = `inc=${[
  'gender',
  'name',
  'location',
  'picture',
  'dob',
  'email',
].join(',')}`;
const amountFriends = `results=${50}`;
const options = `?${[includeFields, amountFriends].join('&')}`;
const requestFriendsUrl = `${endpoint}${options}`;
const initialSearchParameters = {
  name: null,
  age: null,
  gender: 'all',
  sorting: 'nameAscending',
};

class FriendsApp {
  init(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((friends) => {
        const friendlist = new Friendlist(friends.results);
        const search = new Search(friendlist);
      })
      .catch((error) => {
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
      });
  }
}

class Friendlist {
  constructor(friends) {
    this.container = document.getElementById('friendlist');
    this.createCards(friends);
    this.sorters = new Sorters();
  }

  createCards(friendlistData) {
    this.cards = friendlistData.map((cardData) => new Card(cardData));
  }

  applySearch(searchParameters) {
    this.applyFilters(searchParameters);
    this.applySorting(searchParameters.sorting);
  }

  applyFilters(searchParameters) {
    this.filteredCards = [...this.cards];

    if (searchParameters.age) {
      this.filteredCards = this.filteredCards.filter(
        (card) => card.age === searchParameters.age
      );
    }

    if (searchParameters.name) {
      this.filteredCards = this.filteredCards.filter((card) =>
        `${card.firstName} ${card.lastName}`
          .toLowerCase()
          .includes(searchParameters.name.toLowerCase())
      );
    }

    if (searchParameters.gender !== 'all') {
      this.filteredCards = this.filteredCards.filter(
        (card) => card.gender === searchParameters.gender
      );
    }
  }

  applySorting(sortingOrder) {
    this.sortedCards = [...this.filteredCards].sort(this.sorters[sortingOrder]);
  }

  showCards() {
    if (this.sortedCards.length) {
      this.container.innerHTML = this.sortedCards
        .map(({ html }) => html)
        .join('');
    } else {
      this.container.innerHTML = `<div class="not-found">
        <p>No users found on request.</p>
      </div>`;
    }
  }
}

class Search {
  constructor(friendlist) {
    this.container = document.getElementById('search');
    this.inputName = this.container.querySelector('#search-name__text');
    this.inputAge = this.container.querySelector('#search-age__number');
    this.genderContainer = this.container.querySelector('#search-gender');
    this.friendlist = friendlist;
    this.urlController = new UrlController();
    this.parameters = this.urlController.parseUrl();
    this.setInitialSearch(this.parameters);
    this.friendlist.applySearch(this.parameters);
    this.friendlist.showCards();

    this.container.addEventListener('click', this.changeSorting.bind(this));
    this.inputName.addEventListener('input', this.changeSearchName.bind(this));
    this.inputAge.addEventListener('input', this.changeSearchAge.bind(this));
    this.genderContainer.addEventListener(
      'click',
      this.changeSearchGender.bind(this)
    );
  }

  setInitialSearch(searchParameters) {
    for (let parameterName in searchParameters) {
      switch (parameterName) {
        case 'name':
          this.inputName.value = searchParameters[parameterName];
          break;
        case 'age':
          this.inputAge.value = searchParameters[parameterName];
          break;
        case 'sorting':
          this.sortingControlActive = this.container.querySelector(
            `.search__sort[value='${searchParameters[parameterName]}']`
          );
          this.sortingControlActive.classList.add('search__sort_active');
          break;
        case 'gender':
          this.container
            .querySelector(
              `.search-gender__input[value='${searchParameters[parameterName]}']`
            )
            .setAttribute('checked', true);
          break;
        default:
      }
    }
  }

  changeSearchName({ target }) {
    this.parameters.name = target.value;

    this.urlController.setUrl('name', target.value);

    this.friendlist.applySearch(this.parameters);
    this.friendlist.showCards();
  }

  changeSearchAge({ target }) {
    this.parameters.age = parseInt(target.value, 10);

    this.urlController.setUrl('age', target.value);

    this.friendlist.applySearch(this.parameters);
    this.friendlist.showCards();
  }

  changeSearchGender() {
    const selectedGender = this.genderContainer.querySelector(
      '.search-gender__input:checked'
    ).value;
    if (selectedGender !== this.parameters.gender) {
      this.urlController.setUrl('gender', selectedGender);
      this.parameters.gender = selectedGender;

      this.friendlist.applySearch(this.parameters);
      this.friendlist.showCards();
    }
  }

  changeSorting({ target }) {
    const sortingControl = target.closest('.search__sort');
    if (sortingControl) {
      this.parameters.sorting = sortingControl.value;

      this.urlController.setUrl('sorting', sortingControl.value);

      this.friendlist.applySorting(this.parameters.sorting);
      this.friendlist.showCards();

      this.sortingControlActive.classList.remove('search__sort_active');
      this.sortingControlActive = sortingControl;
      this.sortingControlActive.classList.add('search__sort_active');
    }
  }
}

class Card {
  constructor(cardData) {
    this.firstName = cardData.name.first;
    this.lastName = cardData.name.last;
    this.email = cardData.email;
    this.picture = cardData.picture.large;
    this.country = cardData.location.country;
    this.city = cardData.location.city;
    this.age = cardData.dob.age;
    this.gender = cardData.gender;
    this.generateHtml();
  }

  generateHtml() {
    const iconMale = 'fa-mars';
    const iconFemale = 'fa-venus';
    const iconOther = 'fa-genderless';
    let iconType;
    switch (this.gender) {
      case 'male':
        iconType = iconMale;
        break;
      case 'female':
        iconType = iconFemale;
        break;
      default:
        iconType = iconOther;
        break;
    }

    this.html = `<div class="friendcard" title="${this.firstName} ${this.lastName}">
    <header class="friendcard-header">
      <h3 class="friendcard-header__name">${this.firstName} ${this.lastName}</h3>
      <a title="${this.email}" href="mailto:${this.email}">
        <i
          class="far fa-envelope fa-lg friendcard-header__email-icon"
        ></i>
      </a>
    </header>
    <img
      class="friendcard__avatar"
      src="${this.picture}"
      alt="human face"
    />
    <div class="location-wrapper">
      <div class="friendcard__location">
        <p>${this.country}</p>
        <p>${this.city}</p>
      </div>
      <div class="gender-age-wrapper">
        <i class="fas ${iconType} fa-lg gender-icon"></i>
        <p class="friendcard__age">${this.age}</p>
      </div>
    </div>
  </div>`;
  }
}

class Sorters {
  constructor() {
    this.nameAscending = function (firstCard, secondCard) {
      const firstFullName = firstCard.firstName + firstCard.lastName;
      const secondFullName = secondCard.firstName + secondCard.lastName;
      return firstFullName.localeCompare(secondFullName, 'en', {
        sensitivity: 'base',
      });
    };
    this.nameDescending = function (firstCard, secondCard) {
      const firstFullName = firstCard.firstName + firstCard.lastName;
      const secondFullName = secondCard.firstName + secondCard.lastName;
      return secondFullName.localeCompare(firstFullName, 'en', {
        sensitivity: 'base',
      });
    };
    this.ageAscending = function (firstCard, secondCard) {
      return firstCard.age - secondCard.age;
    };
    this.ageDescending = function (firstCard, secondCard) {
      return secondCard.age - firstCard.age;
    };
  }
}

class UrlController {
  parseUrl() {
    const searchParameters = { ...initialSearchParameters };
    this.url = new URL(document.location.href);
    this.urlSearchParameters = new URLSearchParams(
      this.url.search.substring(1)
    );

    for (let parameterName in searchParameters) {
      const parameterValue = this.urlSearchParameters.get(parameterName);
      if (parameterValue) {
        searchParameters[parameterName] = parameterValue;
      }
    }
    if (!this.urlSearchParameters.get('sorting')) {
      this.setUrl('sorting', searchParameters.sorting);
    }
    if (!this.urlSearchParameters.get('gender')) {
      this.setUrl('gender', searchParameters.gender);
    }
    return searchParameters;
  }

  setUrl(searchParameter, searchParameterValue) {
    if (searchParameterValue) {
      this.urlSearchParameters.set(searchParameter, searchParameterValue);
    } else {
      this.urlSearchParameters.delete(searchParameter);
    }
    this.url.search = `?${this.urlSearchParameters.toString()}`;
    window.history.replaceState({}, '', this.url);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const friendsApp = new FriendsApp();
  friendsApp.init(requestFriendsUrl);
});
