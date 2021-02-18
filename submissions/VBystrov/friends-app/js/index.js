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
  sorting: 'nameAZ',
};

class FriendsApp {
  constructor() {
    this.init(requestFriendsUrl);
  }

  init(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((friendsData) => {
        const friendlist = new Friendlist(friendsData.results);
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
  constructor(friendsData) {
    this.container = document.getElementById('friendlist');
    this.createCards(friendsData);
  }

  createCards(friendlistData) {
    this.cards = [];
    friendlistData.forEach((cardData) => {
      this.cards.push(new Card(cardData));
    });
  }

  applySearch(search) {
    this.applyFilters(search);
    this.applySorting(search.sorting);
  }

  applyFilters(search) {
    this.filteredCards = [...this.cards];

    if (search.age) {
      this.filteredCards = this.filteredCards.filter(
        (card) => card.age === search.age
      );
    }

    if (search.name) {
      this.filteredCards = this.filteredCards.filter((card) =>
        `${card.firstName} ${card.lastName}`.includes(search.name)
      );
    }

    if (search.gender !== 'all') {
      this.filteredCards = this.filteredCards.filter(
        (card) => card.gender === search.gender
      );
    }
  }

  applySorting(sortingOrder) {
    let sortFunction;
    switch (sortingOrder) {
      case 'nameAZ':
      case 'nameZA':
        sortFunction = (function () {
          const orderSign = sortingOrder === 'nameAZ' ? 1 : -1;
          return (card1, card2) => {
            const fullName1 = card1.firstName + card1.lastName;
            const fullName2 = card2.firstName + card2.lastName;
            let order = orderSign;
            if (fullName1 < fullName2) {
              return order * -1;
            }
            if (fullName1 > fullName2) {
              return order * 1;
            }
            if (fullName1 === fullName2) {
              return 0;
            }
          };
        })();
        break;
      case 'ageDec':
        sortFunction = (card1, card2) => {
          return card2.age - card1.age;
        };
        break;
      case 'ageInc':
        sortFunction = (card1, card2) => {
          return card1.age - card2.age;
        };
        break;
      default:
        break;
    }
    this.sortedCards = [...this.filteredCards].sort(sortFunction);
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
    this.parameters = this.parseUrl();
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

  setUrl(searchParameter, searchParameterValue) {
    if (searchParameterValue) {
      this.urlSearchParameters.set(searchParameter, searchParameterValue);
    } else {
      this.urlSearchParameters.delete(searchParameter);
    }
    this.url.search = `?${this.urlSearchParameters.toString()}`;
    window.history.replaceState({}, '', this.url);
  }

  changeSearchName({ target }) {
    this.parameters.name = target.value;

    this.setUrl('name', target.value);

    this.friendlist.applySearch(this.parameters);
    this.friendlist.showCards();
  }

  changeSearchAge({ target }) {
    this.parameters.age = parseInt(target.value, 10);

    this.setUrl('age', target.value);

    this.friendlist.applySearch(this.parameters);
    this.friendlist.showCards();
  }

  changeSearchGender() {
    const selectedGender = this.genderContainer.querySelector(
      '.search-gender__input:checked'
    ).value;
    if (selectedGender !== this.parameters.gender) {
      this.setUrl('gender', selectedGender);
      this.parameters.gender = selectedGender;

      this.friendlist.applySearch(this.parameters);
      this.friendlist.showCards();
    }
  }

  changeSorting({ target }) {
    const sortingControl = target.closest('.search__sort');
    if (sortingControl) {
      this.parameters.sorting = sortingControl.value;

      this.setUrl('sorting', sortingControl.value);

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

document.addEventListener('DOMContentLoaded', () => {
  const friendsApp = new FriendsApp();
});
