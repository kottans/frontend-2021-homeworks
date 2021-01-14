class Render {
  constructor() {
    if (Render.instance == null) {
      this.profilesContainer = document.querySelector('.profile-cards');
      this.filtersContainer = document.querySelector('#filters');
      document.querySelector('#menu').addEventListener('click', () => {
        document.querySelector('#filters').classList.toggle('active');
      });
      Render.instance = this;
    }
    return Render.instance;
  }

  getHtmlProfile(profileData, profileIndex) {
    return `
      <div id="I${profileIndex}" class="user-card">
        <div class="content">
          <div class="profile-header">
            <div class="protocol">
              <div class="id-protocol icon exclamation">
                Protocol
                <div>6520-A44</div>
              </div>
              <img src="img/protocol.png" alt="User protocol" class="profile-protocol">
            </div>
            <div class="user-photo">
              <img src="${profileData.picture.large}" alt="Profile photo" class="profile-photo">
            </div>
          </div>
          <div class="profile-id">
            <div class="id-info block">
              <span>record id</span>
              <div class="record-id">
                ${profileData.id.value}
              </div>
            </div>
            <div class="id-info block">
              <span>type id</span>
              <div class="type-id">${profileData.id.name}</div>
            </div>
          </div>
          <div class="profile-info">
            <div class="name">
              <div class="name-info block">
                <span>first name</span>
                <div class="first-name">${profileData.name.first}</div>
              </div>
              <div class="name-info block">
                <span>last name</span>
                <div class="last-name">${profileData.name.last}</div>
              </div>
            </div>
            <div class="details">
              <div class="details-info block">
                <span>alias</span>
                <div class="alias">V</div>
              </div>
              <div class="details-info block">
                <span>years old</span>
                <div class="age">${profileData.dob.age}</div>
              </div>
              <div class="details-info block">
                <span>gender</span>
                <div class="gender">${profileData.gender}</div>
              </div>
            </div>
            <div class="social">
              <div class="social-info block">
                <span>phone</span>
                <div class="tel">
                  <a href="tel:+${profileData.phone}">+${profileData.phone}</a>
                </div>
              </div>
              <div class="social-info block">
                <span>email</span>
                <div class="mail">
                  <a href="mailto:${profileData.email}" class="user-mail">${profileData.email}</a>
                </div>
              </div>
            </div>
            <div class="location">
              <div class="location-info block">
                <span>country</span>
                <div class="country">${profileData.location.country}</div>
              </div>
              <div class="location-info block">
                <span>city</span>
                <div class="city">${profileData.location.city}</div>
              </div>
            </div>
          </div>
          <div class="auth">
              <span>authetication code</span>
              <div class="code">
                <img src="img/code.png" alt="User code" class="profile-code">
              </div>
          </div>
        </div>
      </div>
    `;
  }

  renderProfiles() {
    this.profilesContainer.innerHTML = '';
    this.usersDataForRender.forEach((profile, index) => {
      this.profilesContainer.insertAdjacentHTML(
        'beforeend',
        this.getHtmlProfile(profile, index)
      );
    });
  }

  getHtmlFilter() {
    return `   
      <fieldset class="filter filter-gender">
        <p>filter by gender</p>
        <div class="radio-wrapper">
        <input type="radio" id="male" name="sort-gender">
        <label for="male" class="radio-lable">Male</label>
        <input type="radio" id="female" name="sort-gender">
        <label for="female" class="radio-lable">female</label>
        <input type="radio" id="allGenders" name="sort-gender">
        <label for="allGenders" class="radio-lable">all</label>
        </div>
      </fieldset>

      <fieldset class="filter filter-name">
        <p>sort by name</p>
        <div class="radio-wrapper">
        <input type="radio" id="nameAZ" name="sort-name">
        <label for="nameAZ" class="radio-lable">A - Z</label>
        <input type="radio" id="nameZA" name="sort-name">
        <label for="nameZA" class="radio-lable">Z - A</label>
        <input type="radio" id="nameAll" name="sort-name">
        <label for="nameAll" class="radio-lable">default</label>
        </div>
      </fieldset>
      
      <fieldset class="filter filter-age">
        <p>sort by age</p>
        <div class="radio-wrapper">
        <input type="radio" id="age09" name="sort-age">
        <label for="age09" class="radio-lable">young - old</label>
        <input type="radio" id="age90" name="sort-age">
        <label for="age90" class="radio-lable">old - young</label>
        <input type="radio" id="ageAll" name="sort-age">
        <label for="ageAll" class="radio-lable">default</label>
        </div>
      </fieldset>

      
      <fieldset class="filter filter-search">
        <p>Search user by email</p>
        <input id="nameInput" type="text" size="30" class="searchEmail icon search">
      </fieldset>
    `;
  }

  renderFilters() {
    this.filtersContainer.insertAdjacentHTML('beforeend', this.getHtmlFilter());
  }
}

class Filter {
  constructor(renderer) {
    this.profilesContainer = document.querySelector('.profile-cards');
    this.renderDataWithFilters = renderer;
    renderer.renderFilters();
    this.filtersPanel = document.querySelector('#filters');
    this.searchInput = document.querySelector('#nameInput');
    this.sortedUsers = [];
    this.sortIndicators = {
      age: 'age',
      name: 'name',
    };
    this.sortMethods = {
      byGender: 'sort-gender',
      byAge: 'sort-age',
      byName: 'sort-name',
    };
    this.sortByNameTypes = {
      inAscending: 'nameAZ',
      inDescending: 'nameZA',
      byDefault: 'nameAll',
    };
    this.sortByAgeTypes = {
      inAscending: 'age09',
      inDescending: 'age90',
      byDefault: 'ageAll',
    };
    this.sortByGenderTypes = {
      male: 'male',
      female: 'female',
    };
  }

  uncheckRadioButton(node) {
    const checkedRadio = document.querySelector(
      `input[type=radio][name=${node.buttonName}]:checked `
    );
    if (checkedRadio) {
      checkedRadio.checked = false;
    }
  }

  selectSortMethod(selectedRadioButton) {
    const methodName = selectedRadioButton.name;
    const sortMethod = {
      [this.sortMethods.byGender]: () => {
        this.uncheckRadioButton({buttonName : this.sortMethods.byName});
        this.uncheckRadioButton({buttonName : this.sortMethods.byAge});
        this.sortByGender(selectedRadioButton.id);
      },
      [this.sortMethods.byName]: () => {
        this.uncheckRadioButton({buttonName : this.sortMethods.byAge});
        this.sortByContent(
          selectedRadioButton.id,
          this.sortByNameTypes,
          this.sortIndicators.name
        );
      },
      [this.sortMethods.byAge]: () => {
        this.uncheckRadioButton({buttonName : this.sortMethods.byName});
        this.sortByContent(
          selectedRadioButton.id,
          this.sortByAgeTypes,
          this.sortIndicators.age
        );
      },
    };
    return sortMethod[methodName]();
  }

  startFilter() {
    this.usersByDefault = [...this.usersDataForFilter];

    this.searchInput.addEventListener('input', ({ target }) => {
      let userInput = target.value.toUpperCase();

      const usersByEmail = this.usersDataForFilter.filter(user =>
        user.email.toUpperCase().startsWith(userInput)
      );
      this.renderDataWithFilters.usersDataForRender = usersByEmail;
      this.renderDataWithFilters.renderProfiles();
    });

    this.filtersPanel.addEventListener('change', ({ target }) => {
      this.selectSortMethod(target);
      this.renderDataWithFilters.usersDataForRender = this.usersDataForFilter;
      this.renderDataWithFilters.renderProfiles();
    });
  }

  sortByGender(gender) {
    this.usersDataForFilter = [...this.usersByDefault];
    const selectGender = {
      allGenders: () => {
        this.usersDataForFilter = this.sortedUsers = [...this.usersByDefault];
      },
      male: () => {
        this.usersDataForFilter = this.usersDataForFilter.filter(
          user => user.gender == this.sortByGenderTypes.male
        );
        this.sortedUsers = [...this.usersDataForFilter];
      },
      female: () => {
        this.usersDataForFilter = this.usersDataForFilter.filter(
          user => user.gender == this.sortByGenderTypes.female
        );
        this.sortedUsers = [...this.usersDataForFilter];
      },
    };

    return selectGender[gender]();
  }

  sortByContent(sortType, sortTypes, sortBy) {
    if (this.sortedUsers.length !== 0) {
      this.usersDataForFilter = [...this.sortedUsers];
    } else {
      this.sortedUsers = [...this.usersByDefault];
    }

    const typesOfSort = {
      [sortTypes.byDefault]: () => {
        this.usersDataForFilter = [...this.sortedUsers];
      },
      [sortTypes.inAscending]: () => {
        if (sortBy == this.sortIndicators.name)
          this.usersDataForFilter.sort((a, b) =>
            a.name.first.localeCompare(b.name.first)
          );
        if (sortBy == this.sortIndicators.age)
          this.usersDataForFilter.sort((a, b) =>
            a.dob.age.toString().localeCompare(b.dob.age.toString())
          );
      },
      [sortTypes.inDescending]: () => {
        if (sortBy == this.sortIndicators.name)
          this.usersDataForFilter.sort((a, b) =>
            b.name.first.localeCompare(a.name.first)
          );
        if (sortBy == this.sortIndicators.age)
          this.usersDataForFilter.sort((a, b) =>
            b.dob.age.toString().localeCompare(a.dob.age.toString())
          );
      },
    };
    return typesOfSort[sortType]();
  }
}

class Users {
  constructor(renderer, filter) {
    this.renderData = renderer;
    this.filterData = filter;
    this.apiURL = `https://randomuser.me/api/`;
    this.errorMessage = `Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you.`;
  }

  async getUsersData() {
    try {
      const response = await fetch(this.apiURL + `?results=100&seed=abc`);
      if (!response.ok) throw new Error(errorMessage);
      const usersData = await response.json();

      this.renderData.usersDataForRender = this.filterData.usersDataForFilter =
        usersData.results;

      this.renderData.renderProfiles();
      this.filterData.startFilter();
    } catch (err) {
      console.error(err);
    }
  }
}

function animation() {
  const animationDuration = 7000;
  setTimeout(() => {
    document.querySelector('#preload').remove();
    document.querySelector('body').style.setProperty('--scroll', 'auto');
    document.querySelector('.wrapper').classList.remove('hidden');
  }, animationDuration);
}

const renderer = new Render();
const filter = new Filter(renderer);
const getUsersData = new Users(renderer, filter);

getUsersData.getUsersData();
animation();
