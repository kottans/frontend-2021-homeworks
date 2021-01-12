// Shramko WEB  _---------------------------------------------------------------------------------------------------------

const USERS_AMOUNT = 20;
const RANDOM_USER_URL = `https://randomuser.me/api/?results=${USERS_AMOUNT}`;

const SortType = {
    ASCENDING: 'ascending',
    DESCENDING: 'descending',
    'A-Z': 'a',
    'Z-A': 'z',
    DEFAULT: 'default',
};

const Gender = {
    ALL: 'all',
    FEMALE: 'female',
    MALE: 'male',
};

const state = {
    users: [],
    search: '',
    sorting: SortType.DEFAULT,
    gender: Gender.ALL,
};

const listElement = document.querySelector('.friends__list');
const formElement = document.querySelector('.form');
const resetElement = document.querySelector('.form__reset');
const notificationElement = document.querySelector('.notification');

const handleResetClick = () => {
    state.search = '';
    state.sorting = SortType.DEFAULT;
    state.gender = Gender.ALL;

    render(state);
};

const filterByGender = (users, gender) => {
    if (gender === Gender.ALL) {
        return users;
    }

    return users.filter(user => user.gender === gender);
};

const filterByQuery = (users, query) => {
    if (query === '') {
        return users;
    }

    return users.filter(
        user => user.name.first
            .toLowerCase()
            .includes(query)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    );
};

const sortAscending = (users) => users.slice().sort((a, b) => a.dob.age - b.dob.age);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
const sortDescending = (users) => users.slice().sort((a, b) => b.dob.age - a.dob.age);
const sortByName = (users, isReverse = false) => {
    const sorted = users.slice().sort((a, b) => {
        const firstNAme = a.name.first.toUpperCase();
        const secondName = b.name.first.toUpperCase();

        if (firstNAme < secondName) {
            return -1;
        }
        if (firstNAme > secondName) {
            return 1;
        }

        return 0;
    });

    if (isReverse) {
        return sorted.reverse();
    }

    return sorted;
};
const defaultSort = (users) => users;


const sortingTypeMap = {
    [SortType.ASCENDING]: sortAscending,
    [SortType.DESCENDING]: sortDescending,
    [SortType['A-Z']]: (users) => sortByName(users),
    [SortType['Z-A']]: (users) => sortByName(users, true),
    'default': defaultSort,

};

const sortUsers = (users, compareType) => {
    if (compareType === SortType['A-Z'] || compareType === SortType['Z-A']) {
        return sortingTypeMap[compareType](users);
    }

    return sortingTypeMap[compareType](users);
};

const renderCard = (data) => {
    const { name, dob, gender, email, picture } = data;

    const markup = `
        <li class="friends__item">
          <section class="friend-card">
            <div class="friend-card__image-wrapper">
              <img class="friend-card__image" src=${picture.large} alt=${name.first}>
            </div>
            <h3 class="friend-card__title">${name.first} ${name.last}</h3>
            <a class="friend-card__mail" href="mailto:${email}">${email}</a>        
            <p class="friend-card__sex">Gender - ${gender}</p>
            <p class="friend-card__age">Age - ${dob.age}</p>
          </section>
        </li>
    `;

    return createElement(markup);
};

const renderCards = (cards, target) => {
    const fragment = document.createDocumentFragment();
    cards.forEach(card => fragment.appendChild(renderCard(card)));

    target.appendChild(fragment);
};

const render = (state) => {
    listElement.innerHTML = '';
    const sorted = sortUsers(state.users, state.sorting);
    const filteredByQuery = filterByQuery(sorted, state.search);
    const filteredUsers = filterByGender(filteredByQuery, state.gender);
    renderCards(filteredUsers, listElement);
};

const loadUsers = (url) => {
    return fetch(url)
        .then(res => res.json())
        .then(({ results }) => {
            state.users = results;
            return results;
        }).catch((error) => {
            notificationElement.textContent = error;
        });
};

const handleFormInput = (evt) => {
    state[evt.target.name] = evt.target.value;

    render(state);
};

const init = async () => {
    await loadUsers(RANDOM_USER_URL);
    render(state);

    resetElement.addEventListener('click', handleResetClick);
    formElement.addEventListener('input', debounced(300, handleFormInput));
};

init();




// ALDEGID -----------------------------------------------------------------------------------------------------------------

const content = document.querySelector('.users');
const searchField = document.querySelector('.search__input');
const genderNode = document.querySelector('.filter__gender');
const ageNode = document.querySelector('.filter__age');
const nameNode = document.querySelector('.filter__name');
const checkAll = document.querySelector('.all');
const filterAsc = document.querySelector('.age-asc');
const filterDesc = document.querySelector('.age-desc');
const filterAz = document.querySelector('.name-asc');
const filterZa = document.querySelector('.name-desc');
const resetBtn = document.querySelector('.filter__reset');
const scrollBtn = document.querySelector('.button__scroll');
const filterForm = document.querySelector('.filter__form');
const radioButtons = document.querySelectorAll('input[type = radio]');
const scrollHeight = 300;
let originData = [];

fetch('https://randomuser.me/api/?results=30')
  .then((res) => res.json())
  .then(data => {
    originData = data.results;
    totalData = originData.slice();
    renderUsers(originData);
  })
  .catch(function (err) {
    console.error(err);
  });

function asc(a, b) {
  if (a < b) {
    return -1;
  } else {
    return 1
  }
}
function desc(a, b) {
  if (a < b) {
    return 1;
  } else {
    return -1
  }
}

const createUsers = user => {
  let fragment = document.createDocumentFragment();
  let div = document.createElement('div');
  div.classList.add('user');
  let userContent = ` <p class = "user__gender"> ${user.gender}  |  ${user.dob.age} y.o.</p>
                      <img src="${user.picture.large}" alt="${user.name.first}">
                      <p class = "user__name">${user.name.first} ${user.name.last}</p>
                      <p class = "user__phone"><i class="fa fa-phone"></i>${user.phone}</p>
                      <p class = "user__email"><i class="fa fa-envelope"></i>${user.email}</p>`
  div.innerHTML = userContent;
  fragment.append(div);
  return fragment;
}
function renderUsers(data) {
  content.innerHTML = '';
  let users = data.map(createUsers);
  content.append(...users);
}
const searchFilter = (input, data) => {
  content.innerHTML = '';
  const inpValue = input.value;
  let newData = data.filter(user => {
    const fullName = user.name.first + user.name.last;
    return fullName.includes(inpValue);
  })
  return newData;
}
const filterByMale = data => {
  let newData = data.filter(user => user.gender === 'male');
  return newData;
}
const filterByFemale = data => {
  let newData = data.filter(user => user.gender === 'female');
  return newData;
}
const showAll = data => {
  let newData = data;
  return newData;
}
const sortByNameDesc = data => {
  let newData = data.sort((a, b) => desc(a.name.first, b.name.first));
  return newData;
}
const sortByNameAsc = data => {
  let newData = data.sort((a, b) => asc(a.name.first, b.name.first));
  return newData;
}
const sortByAgeDesc = (data) => {
  let newData = data.sort((a, b) => desc(a.dob.age, b.dob.age));
  return newData;
}
const sortByAgeAsc = (data) => {
  let newData = data.sort((a, b) => asc(a.dob.age, b.dob.age));
  return newData;
}

const handleChange = ({ target }) => {
  let friendsToProcess = originData.slice();
  const form = target.closest('form');
  const getCheckedInput = elem => Array.from(form.elements[elem]).find(input => input.checked);
  const inputAge = getCheckedInput('age-sort');
  const inputName = getCheckedInput('name-sort');
  const inputGender = getCheckedInput('gender');
  const inputSearch = form.elements['search'];

  let sortByAge;
  let sortByName;
  let filterByGender;

  if (inputSearch === target) {
    friendsToProcess = searchFilter(target, friendsToProcess);
  }
  if (inputAge === target) {
    sortByAge = inputAge.value === 'age-asc'
      ? sortByAgeAsc
      : sortByAgeDesc;
    friendsToProcess = sortByAge(friendsToProcess);
  }
  if (inputName === target) {
    sortByName = inputName.value === 'name-asc'
      ? sortByNameAsc
      : sortByNameDesc;
    friendsToProcess = sortByName(friendsToProcess);
  }
  if (inputGender) {
    if (inputGender.value === 'male') {
      filterByGender = filterByMale;
    }
    if (inputGender.value === 'female') {
      filterByGender = filterByFemale;
    }
    if (inputGender.value === 'all') {
      filterByGender = showAll;
    }
    friendsToProcess = filterByGender(friendsToProcess);
  }
  renderUsers(friendsToProcess);
}
searchField.addEventListener('input', handleChange);
filterForm.addEventListener('change', handleChange);

resetBtn.addEventListener('click', () => {
  content.innerHTML = '';
  searchField.value = '';
  radioButtons.forEach(item => {
    item.checked = !item.checked;
  })
  renderUsers(originData);
});

function scroll() {
  const bodyScrollTop = document.body.scrollTop;
  const elemScrollTop = document.documentElement.scrollTop
  if (bodyScrollTop > scrollHeight || elemScrollTop > scrollHeight) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
}
window.addEventListener('scroll', function () {
  scroll()
});
scrollBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
})


// ANDREW KLM ----------------------------------------------------------------------------------------------------------------

const maxNumberOfFriends = 100;
const randomUserUrl = 'https://randomuser.me/api/?results=' + maxNumberOfFriends + '&seed=friends';

const minPersonAge = 18;
const maxPersonAge = 99;

const state = {
  friends: [],
  filters: {
    partOfName: '',
    gender: '',
    genderList: [],
    ageRange: [minPersonAge, maxPersonAge],
    country: '',
    countryList: [],
  },
  sorter: {
    keyName: '',
    order: '',
    fieldPathList: {
      name: ['name', 'first'],
      age: ['dob', 'age'],
      country: ['location', 'country'],
    },
    orderSymbols: {
      ASC: '&#9650;', 
      DESC: '&#9660;',
    },
  },
  initialListLength: 25,
  numberOfShowedFriends: 0,
  scrollDisabled: false,
  afterLoadingMoreFriendsScrollShift: 25, /* px */
  nextMoreFriendAutoloadDelay: 300,       /* ms */
}

const preloader = document.querySelector('.preloader');
const container = document.querySelector('.container');

const sortField = document.querySelector('.sort-field');
const sortOrder = document.querySelector('.sort-order');
const resetButton = document.querySelector('.reset');

const searchField = document.querySelector('.search-field');
const filterGender = document.querySelector('.filter-gender');
const filterMinAge = document.querySelector('.filter-min-age');
const filterMaxAge = document.querySelector('.filter-max-age');
const filterCountry = document.querySelector('.filter-country');

const drawPerson = ({location, phone, email, gender, name, picture, dob}) => {  
  const {street, city, state, country} = location;
  const div = document.createElement('div');
  div.classList.add('person');
  div.title = `Address: ${street.number}, ${street.name}, ${city}, ${state}
  Phone: ${phone}
  Email: ${email}`;
  div.innerHTML =`
      <div class="person-name ${gender}">${name.first} ${name.last}</div>
      <div class="person-image">
      <picture>
        <source media="(max-width:300px)" 
                srcset="${picture.thumbnail} 1x, ${picture.medium} 2x">
        <source media="(max-width:400px)" 
                srcset="${picture.medium} 1x, ${picture.large} 2x">
        <img class="rounded" src="${picture.large}">
      </picture>
      </div>
      <div class="person-age">
        ${dob.age} y.o.
      </div>
      <div class="person-location">
        ${country}
      </div>
  `;
  container.appendChild(div);
}

const filterList = ({friends, filters})=>{
  return friends.filter(({name, gender, dob, location}) => {
    if (filters.namePart != ''
          && !`${name.first} ${name.last}`.toUpperCase()
                                          .includes(filters.partOfName.toUpperCase())) { 
        return false;
    }
    if (filters.gender != '' 
          && gender != filters.gender) { 
      return false;
    }
    if (filters.ageRange[0] > dob.age
        || filters.ageRange[1] < dob.age) {
      return false;
    }
    if (filters.country != '') {
      if(location.country != filters.country) { 
        return false;
      }
    };

    return true;
  })
}

const sortList = (friends) => {

  if(state.sorter.keyName == '') {
    return friends;
  }

  const [index0, index1] = state.sorter.fieldPathList[state.sorter.keyName];
  
  return friends.sort(function(a, b){
    if(state.sorter.keyName === '') return 0;
    if(state.sorter.order === 'DESC') {
      if (a[index0][index1] > b[index0][index1]) {
        return -1;
      }
      return 1;
    }
    if (a[index0][index1] < b[index0][index1]) {
      return -1;
    }
    return 1;
  });
}

const setResetButtonView = (filters, sorter) => {
  if(sorter.keyName != ''
      || filters.partOfName != ''
      || filters.gender != ''
      || filters.ageRange[0] != minPersonAge
      || filters.ageRange[1] != maxPersonAge
      || filters.country != '') {
    resetButton.classList.remove('off');
    return;
  };
  resetButton.classList.toggle('off',true);
}

const resetButtonClickHandler = ({filters, sorter}) => {

  if (resetButton.classList.contains('off')) {
    return;
  }

  const change = new Event('change');

  filters.partOfName = searchField.value = '';
  filters.gender = filterGender.value = '';
  filters.ageRange[0] = filterMinAge.value = minPersonAge;
  filters.ageRange[1] = filterMaxAge.value = maxPersonAge;
  filters.country = filterCountry.value = '';

  sorter.keyName = sortField.value = '';
  sortField.dispatchEvent(change);
}

const redrawFriends = (state) => {
  const {filters, sorter, initialListLength} = state;
  preloader.classList.remove('hidden');
  setResetButtonView(filters, sorter);
  state.numberOfShowedFriends = 0;
  container.innerHTML = '';
  container.scrollTop = 0;

  sortList(filterList(state))
    .slice(0, initialListLength)
    .forEach((friend) => {
      state.numberOfShowedFriends++;
      drawPerson(friend);
    });

  preloader.classList.add('hidden');
}

const updateFriendsList = (list)=> {
  state.friends = list;
  redrawFriends(state);
}

const addOptionToSelect = (select, optionValue, optionText) => {
  const option = document.createElement('option');
  option.value = optionValue;
  option.innerHTML = optionText;
  select.appendChild(option);
}

const drawSorter = (state)=>{
  const {sorter} = state;
  Object.keys(sorter.fieldPathList).forEach((field)=>{
    addOptionToSelect(sortField, field, field);
  });
}

const drawFilters = (state) => {

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const {friends, filters} = state;

  filters.genderList = friends.map(person => person.gender).filter(onlyUnique);
  filters.genderList.forEach((gender)=>{
    addOptionToSelect(filterGender, gender, gender);
  });
  filterMinAge.value = filters.ageRange[0];
  filterMaxAge.value = filters.ageRange[1];
  filters.countryList = friends.map(person => person.location.country).filter(onlyUnique);
  filters.countryList.sort().forEach( country => {
    addOptionToSelect(filterCountry, country, country);
  });
};

const initApp = (state) => {

  fetch(randomUserUrl)
    .then(response => response.json())
    .then(({results}) => {
      updateFriendsList(results);
      drawSorter(state);
      drawFilters(state);
      preloader.classList.add('hidden');
    })
    .catch(function() {
      const header = document.querySelector('.header');
      const footer = document.querySelector('.footer')
      header.innerHTML = "ERROR: Can't get friend list!";
      header.classList.add('error');
      footer.innerHTML = "Try Refresh this page later!";
      footer.classList.add('error');
    });
};

const drawMoreFriends = (friends) => {
  
  friends.forEach((friend) => {
    state.numberOfShowedFriends++;
    drawPerson(friend);
  });
  
  setTimeout(() => {
    if (container.scrollTop > 0) {
      container.scrollTop += state.afterLoadingMoreFriendsScrollShift;
    };
  }, state.nextMoreFriendAutoloadDelay * 2);
};

const autoLoaderOnScroll = (state) => {
  const {numberOfShowedFriends, friends, initialListLength, nextMoreFriendAutoloadDelay} = state;
  
  if (state.scrollDisabled) return true;

  if (container.scrollTop + container.clientHeight >= --container.scrollHeight) {
    if(numberOfShowedFriends < friends.length) {
      state.scrollDisabled = true;
      container.scrollTop--;
      preloader.classList.remove('hidden');

      const additionalFriendList = sortList(filterList(state))
        .slice( numberOfShowedFriends, numberOfShowedFriends + initialListLength);

      requestAnimationFrame(() => drawMoreFriends(additionalFriendList) );

      setTimeout(()=>{    
        state.scrollDisabled = false;
        preloader.classList.add('hidden');
      }, nextMoreFriendAutoloadDelay);
    };
  }
};

const sorterKeyChangeHandler = (target, state) => {
  const {sorter} = state;
  if (target.value === '') {    
    sortOrder.innerHTML = '';
    sorter.keyName = '';
    sorter.order = '';
  } else {
    if(sortOrder.innerHTML === ''){
      sortOrder.innerHTML = sorter.orderSymbols.ASC;
      sorter.order = 'ASC';
    };    
    sorter.keyName = target.value; 
  };
  redrawFriends(state);
}

const sorterOrderClickHandler = (target, state)=>{
  const {sorter} = state;

  if(sortField.value === ''){
    target.innerHTML = '';
    sorter.order = '';
    return;
  };
  if (sorter.order === 'ASC') {
    target.innerHTML = sorter.orderSymbols.DESC;
    sorter.order = 'DESC';
  } else {
    target.innerHTML = sorter.orderSymbols.ASC;
    sorter.order = 'ASC';
  };

  redrawFriends(state);
}

const searchFieldChangeHandler = (target, state)=>{
  const {filters} = state;
  if (filters.partOfName === target.value) {
    return true;
  }
  filters.partOfName = target.value;
  redrawFriends(state);
}

const filterGenderChangeHandler = (target, state) => {
  const {filters} = state;
  if (target.value === filters.gender) {
    return true;
  }
  filters.gender = target.value;
  redrawFriends(state);
}

const MIN_AGE_RANGE_INDEX = 0; 
const MAX_AGE_RANGE_INDEX = 1;

const filterAgeChangeHandler = (target, state, ageRangeIndex)=>{
  state.filters.ageRange[ageRangeIndex] = target.value;
  redrawFriends(state);
}

const filterCountryChangeHandler = (target, state) => {
  const {filters} = state;
  if (target.value === filters.country) {
    return true;
  }
  filters.country = target.value;
  redrawFriends(state);
}

document.addEventListener('DOMContentLoaded',() => {
  initApp(state);
  
  sortField.addEventListener('change', ({target}) => sorterKeyChangeHandler(target, state));
  sortOrder.addEventListener('click', ({target}) => sorterOrderClickHandler(target, state));
  
  resetButton.addEventListener('click', () => resetButtonClickHandler(state));
  
  searchField.addEventListener('keyup',({target}) => searchFieldChangeHandler(target, state));
  
  filterGender.addEventListener('change', ({target}) => filterGenderChangeHandler(target, state));
  filterMinAge.addEventListener('change', ({target}) => filterAgeChangeHandler(target, state, MIN_AGE_RANGE_INDEX));
  filterMaxAge.addEventListener('change', ({target}) => filterAgeChangeHandler(target, state, MAX_AGE_RANGE_INDEX));
  filterCountry.addEventListener('change', ({target}) => filterCountryChangeHandler(target, state));
  
  container.addEventListener('scroll', ()=>autoLoaderOnScroll(state));
});

//Evgeniy DEL ---------------------------------

let friendsArr = [];
const main = document.querySelector(".js-main");
const gender = document.querySelector(".js-gender");
const age = document.querySelector(".js-age");
const name = document.querySelector(".js-name");
const reset = document.querySelector(".js-reset");
let nameProp, ageProp, genderProp, searchProp;


const createBlock = (friend) => {
    const block = document.createElement("div");
    block.classList.add("card");
    block.innerHTML = `
                <div class="card__img">
                    <img src="${friend.picture.medium}" alt="avatar">
                </div>
                <div class="card__content">
                    <div class="card__top">
                        <p>${friend.name.first}</p>
                        <p>${friend.name.last}</p>
                    </div>
                    <div>
                        <p>Number:</p>
                        <p>${friend.phone}</p>
                    </div>
                    <div class="card__bottom">
                        <p>Age: ${friend.dob.age}</p>
                        <p>Gender: ${friend.gender}</p>
                    </div>
                </div>
        `;
    return block;
}

const renderItems = (friends) => {
    main.innerHTML = "";
    let fragment = document.createDocumentFragment();
    friends.forEach((friend) => {
        const block = createBlock(friend);
        fragment.append(block);
    })
    main.append(fragment);
}

const fetchFriends = () => {
    const headers = {
        dataType: 'json'
    }
    return fetch('https://randomuser.me/api/?inc=gender,name,phone,dob,picture&results=12', headers)
        .then(response => response.json())
}

const sortByName = (arr, type) => {
    let newFriendsArr = [...arr].sort((prev, next) => {
        if (prev.name.first < next.name.first) return -1;
        if (prev.name.first > next.name.first) return 1;
    });
    if (type === 'abc') {
        return newFriendsArr;
    } else if (type === 'cba') {
        return newFriendsArr.reverse();
    }
}

const sortByAge = (arr, type) => {
    let newFriendsArr = arr.sort((prev, next) => prev.dob.age - next.dob.age);
    if (type === 'asc') {
        return newFriendsArr;
    } else if (type === 'des') {
        return newFriendsArr.reverse();
    }
}

const filterBySex = (arr, sex) => {
    if (sex === 'male') {
        return arr.filter(friend => friend.gender === 'male');
    } else if (sex === 'female') {
        return arr.filter(friend => friend.gender === 'female');
    } else {
        return arr;
    }
}

const filterBySearch = (arr, value) => {
    return arr.filter(friend => {
        const name = `${friend.name.first.toLowerCase()} ${friend.name.last.toLowerCase()}`;
        return name.includes(value);
    })
}

const filterFriends = () => {
    let newFriendsArr = [...friendsArr];

    if (genderProp) {
        newFriendsArr = filterBySex(newFriendsArr, genderProp);
    }
    if (ageProp) {
        newFriendsArr = sortByAge(newFriendsArr, ageProp);
    }
    if (nameProp) {
        newFriendsArr = sortByName(newFriendsArr, nameProp);
    }
    if (searchProp) {
        newFriendsArr = filterBySearch(newFriendsArr, searchProp);
    }

    renderItems(newFriendsArr);
}

const runApp = (data) => {
    renderItems(data);
    friendsArr = data;

    document.querySelector('.js-search').addEventListener('keyup', ({target}) => {
        searchProp = target.value.toLowerCase();
        filterFriends();
    });

    gender.addEventListener('change', ({target}) => {
        genderProp = target.value;
        filterFriends();
    });

    age.addEventListener('change', ({target}) => {
        searchProp = null;
        nameProp = null;
        ageProp = target.value;
        filterFriends();
    });

    name.addEventListener('change', ({target}) => {
        searchProp = null;
        ageProp = null;
        nameProp = target.value;
        filterFriends();
    });

    reset.addEventListener('click', () => {
        searchProp = null;
        nameProp = null;
        ageProp = null;
        genderProp = null;
        filterFriends();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchFriends().then((response) => runApp(response.results));
})



//HANNA SYN  -----------------------------------------------------------------------------------------------------------------------

const searchInput = document.querySelector('.search-input');
const sortAge = document.querySelector('.sort-age');
const sortName = document.querySelector('.sort-name');
const mainContent = document.querySelector('.main-content');
const filterGender = document.querySelector('.gender-filter');
const ageAscending = document.getElementById('age-ascending');
const ageDescending = document.getElementById('age-descending');
const nameAscending = document.getElementById('name-ascending');
const nameDescending = document.getElementById('name-descending');
const url = 'https://randomuser.me/api/?results=30';
let users = [];

const loadUsers = async () => {
  try {
    const res = await fetch(url);
    const { results } = await res.json();
    users = results;
  }
  catch(error) {
    mainContent.innerHTML = `<p>Oops! Here is the error ${error}</p>`;
  }
}

function renderCards(arr) {
  let card = '';
  
  arr.forEach(({name, picture, dob, email}) => {
    const template = `<div class="card">
      <div class="card__content">
        <figure class="card__photo">
          <img src=${picture.large} alt="photo">
        </figure>
        <div class="card__info">
          <p class="card__name">${name.first} ${name.last}</p>
          <p class="card__age">${dob.age} y.o.</p>
          <a href="mailto:${email}" class="card__email">${email}</a>
        </div>
      </div>
    </div>`
    card += template;
  })
  mainContent.innerHTML = card;
}

function filterBySearch(arr, str) {
  return arr.filter( el => `${el.name.first}${el.name.last}`.toLowerCase().includes(str.toLowerCase()));
}

function filterByGender(value, arr) {
  if (value === 'all') {
    return arr;
  } 
  return arr.filter(el => el.gender === value);
}

function findChecked(element) {
  let checked;
  const inputs = element.querySelectorAll('input');
  for (let input of inputs) {
    if (input.checked) {
      checked = input;   
    }
  }
  return checked;
  
}

function sortByNameAsc(arr) {
	return arr.sort(function(a, b){
    return a.name.first.toLowerCase() < b.name.first.toLowerCase() ? -1 : 1;
  })
}

function sortByNameDesc(arr) {
	return arr.sort(function(a, b){
    return a.name.first.toLowerCase() > b.name.first.toLowerCase() ? -1 : 1;
	})
}

function sortByAgeAsc(arr) {
	return arr.sort(function(a, b){
    return a.dob.age < b.dob.age ? -1 : 1;
	})
}

function sortByAgeDesc(arr) {
	return arr.sort(function(a, b){
    return a.dob.age > b.dob.age ? -1 : 1;
	})
}

function showFilteredUsers() {
  let filteredArr = [...users];
  if (searchInput.value !== '') {
    filteredArr = filterBySearch(filteredArr, searchInput.value);
  }
  const gender = findChecked(filterGender);
  if (gender) {
    filteredArr = filterByGender(gender.value, filteredArr);
  }
  if (ageAscending.checked) {
    sortByAgeAsc(filteredArr);
  }
  if (nameAscending.checked) {
    sortByNameAsc(filteredArr);
  }
  if (ageDescending.checked) {
    sortByAgeDesc(filteredArr);
  }
  if (nameDescending.checked) {
    sortByNameDesc(filteredArr);
  }
  renderCards(filteredArr);
}

const initApp = async () => {
  await loadUsers();
  renderCards(users);
}

document.addEventListener("DOMContentLoaded", function() {
  initApp();

  sortName.addEventListener('click', showFilteredUsers);
  sortAge.addEventListener('click', showFilteredUsers);
  searchInput.addEventListener('input', showFilteredUsers);
  filterGender.addEventListener('click', showFilteredUsers);
})


// usides -------------------------------------------------------------------------------------------------------------

const HUMANS_LINK =
  'https://randomuser.me/api/?nat=us&results=36&inc=gender,name,picture,dob&seed=06b64d62bc01d624a';
const OK_STATUS = 200;
const DEBOUNCE_DELAY = 500;

const searchBtn = document.getElementById('search-btn');
const rightPane = document.getElementById('right-pane');
const cardsHolder = document.getElementById('cards-holder');
const optionGroup = document.getElementById('option-group');
const filterButtons = document.querySelectorAll('button[data-filter]');
const nameInput = document.getElementById('name-input');
const errorNotice = document.getElementById('error-notice');
const loader = document.getElementById('loader');

let humansOriginState;
const noFilter = 'none';

const currentState = {
  humans: undefined,
  sort: 'a-z',
  filter: noFilter,
  searchValue: '',
};

const handleSearchButton = function () {
  rightPane.classList.toggle('visible');
};

let timer;
const handleInput = function () {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    currentState.searchValue = this.value.toLowerCase();
    filterHumans(currentState.filter);
    sortHumans(currentState.sort);
    updateCards(currentState.humans);
    timer = null;
  }, DEBOUNCE_DELAY);
};

const handleOptionClick = function ({ target }) {
  const button = target.closest('button');
  if (!button) return;
  const { dataset } = button;
  if (dataset.sort) {
    const prevActiveSortBtn = document.querySelector(
      'button[data-sort].active',
    );
    prevActiveSortBtn.classList.remove('active');
    button.classList.add('active');
    sortHumans(dataset.sort);
  }
  if (dataset.filter) {
    if (currentState.filter === dataset.filter) {
      button.classList.toggle('active');
      filterHumans(noFilter);
    } else {
      const prevActiveFilterBtn = document.querySelector(
        'button[data-filter].active',
      );
      if (prevActiveFilterBtn) prevActiveFilterBtn.classList.remove('active');
      button.classList.add('active');
      filterHumans(dataset.filter);
    }
    sortHumans(currentState.sort);
  }
  updateCards(currentState.humans);
};

const filterHumans = function (filterOption) {
  const humansFilteredByName = humansOriginState.filter((elem) =>
    elem.name.first.toLowerCase().startsWith(currentState.searchValue),
  );
  currentState.humans =
    filterOption === noFilter
      ? humansFilteredByName
      : humansFilteredByName.filter(({ gender }) => gender === filterOption);
  currentState.filter = filterOption;
};

const sortByAge = (a, b) => (a.dob.age <= b.dob.age ? 1 : -1);
const sortByName = (a, b) =>
  a.name.first.toLowerCase() >= b.name.first.toLowerCase() ? 1 : -1;

const sortHumans = function (sortOption) {
  switch (sortOption) {
    case 'a-z':
      currentState.humans.sort((a, b) => sortByName(a, b));
      break;

    case 'z-a':
      currentState.humans.sort((a, b) => sortByName(b, a));
      break;

    case 'young':
      currentState.humans.sort((a, b) => sortByAge(b, a));
      break;

    case 'old':
      currentState.humans.sort((a, b) => sortByAge(a, b));
      break;
  }

  currentState.sort = sortOption;
};

const updateCards = function (arr) {
  cardsHolder.innerHTML = '';
  const fragment = document.createDocumentFragment();
  arr.forEach(({ name, picture, dob, gender }) => {
    const newElem = document.createElement('div');
    newElem.classList.add('card');
    const template = `
    <p class="u-name">${name.first} ${name.last}</p>
    <div class="splitter">
      <img src="${picture.large}" alt="User Photo">
      <div class="data-group">
        <p class="label">Age</p>
        <p class="data">${dob.age}</p>
        <p class="label">Gender</p>
        <p class="data">${gender}</p>
      </div>
    </div>`;
    newElem.innerHTML = template;
    fragment.appendChild(newElem);
  });
  cardsHolder.appendChild(fragment);
};

const getHumans = function () {
  return fetch(HUMANS_LINK)
    .then((res) => {
      if (res.status !== OK_STATUS) {
        throw new Error(`Couldn't fetch data. ${res.status}`);
      }
      return res.json();
    })
    .then(({ results }) => {
      humansOriginState = results;
      currentState.humans = results;
      loader.classList.add('hide');
    })
    .catch((err) => {
      errorNotice.innerHTML = `Sorry! We couldn't get data. <br> The problem is: ${err} !`;
    });
};

const init = async () => {
  await getHumans();
  sortHumans(currentState.sort);
  updateCards(currentState.humans);

  searchBtn.addEventListener('click', handleSearchButton);

  optionGroup.addEventListener('click', handleOptionClick);

  nameInput.addEventListener('input', handleInput);
};

init();


// AlexNugda -----------------------------------------------------------------------------------------------------------

const FRIENDS_API_URL = "https://randomuser.me/api/?results=20&nat=us";
const friendsContainer = document.getElementById("show-friends");
let listOfFriendsAll = [];

const showFriends = friends => {
	friendsContainer.innerHTML = "";
	friends.forEach(friend => {
		const friendContainer = document.createElement("div");
		let img = document.createElement("img");
		img.src = friend.picture.large;	
		let name  = document.createElement("p");
		name.textContent = (`${friend.name.first} ${friend.name.last}`);
		name.classList.add("friend-name");		
		let age = document.createElement("p");
		age.textContent = `I have ${friend.dob.age} years old`;
		let loc = document.createElement("p");
		loc.textContent = friend.location.state + " " + friend.location.city;
		let email = document.createElement("div");
		email.textContent = friend.email;
		email.classList.add("email");
		friendContainer.append(img, name, age,loc, email); 
		friendContainer.classList.add("person-card");
		friendsContainer.append(friendContainer);
	});
}

const friendsListInit = listOfFriends => {
	listOfFriendsAll = [...listOfFriends];	
	let filterParams = {
		gender: "",
		sortNameAge: "",
		searchFriend: ""
	};	
	addListenersToForm(filterParams);
	showFriends(listOfFriendsAll);
}

const addListenersToForm = (filterParams) => {
	document.querySelector(".search-form").addEventListener("change", ({target}) => {
		if(target.name === "gender") {
			filterParams.gender = target.value;
		}
		if(target.name === "sort") {
			filterParams.sortNameAge = target.value;
		}
		filterFriends(listOfFriendsAll, filterParams);
	});
	document.querySelector(".search-text").addEventListener("input", ({target}) => {
		filterParams.searchFriend = target.value;
		filterFriends(listOfFriendsAll, filterParams);
	});
	document.querySelector("[type=reset]").addEventListener("click", resetFilter);
}

const filterFriends = (listOfFriends, filterParams) => {
	let filteredFriends = [...listOfFriends];
	
	switch(filterParams.gender){
		case "male":
			filteredFriends = filteredFriends.filter(friend => friend.gender === "male");
			break;
		case "female":
			filteredFriends = filteredFriends.filter(friend => friend.gender === "female");
			break;
	}
	
 	switch(filterParams.sortNameAge){
		case "nameAsc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => (friend.name.first > friendNext.name.first ? 1 : -1) || 0);
			break;
 		case "nameDesc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => (friend.name.first < friendNext.name.first ? 1 : -1) || 0);
			break;
		case "ageAsc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => friend.dob.age - friendNext.dob.age);
			break;
		case "ageDesc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => friendNext.dob.age - friend.dob.age);
			break; 
	}
	
	if (filterParams.searchFriend){
		filteredFriends = filteredFriends.filter(
			({name}) => name.first.includes(filterParams.searchFriend) || name.last.includes(filterParams.searchFriend)
		);
	}	
	
	showFriends(filteredFriends);
}

const resetFilter = () => {
	filterParams = {
			gender: "",
			sortNameAge: "",
			searchFriend: ""
		};
	frendsAppInit();
}

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const frendsAppInit = () => {
fetch(FRIENDS_API_URL)
	.then(handleErrors)
	.then(response => response.json())
    .then(data => friendsListInit(data.results) )
    .catch(error => friendsContainer.innerHTML = error.message ); 
}

window.onload = frendsAppInit();


// AnnaGrynchuk ------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function init(){

    const url = 'https://randomuser.me/api/?results=15'; 
    const container = document.querySelector('.friend_container');
    const searchName = document.getElementById("searchName");
    const sortByNameUp = document.getElementById("sortNameUp");
    const sortByNameDown = document.getElementById("sortNameDown");
    const sortByAgeUp = document.getElementById("sortAgeUp");
    const sortByAgeDown = document.getElementById("sortAgeDown");
    const reset =  document.getElementById("reset");
    let sideMenu = document.querySelector('.side_menu_list');
    let friends=[]; 
    let filteredNames;
    
    function handleErrors(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    } 
    
    fetch(url)
    .then(handleErrors)
    .then((response) => response.json())
    .then(function(data) {
      friends = data.results;
      showFriends(friends);
    })
    .catch(error => console.log(error));
      
    function createFriendBox (friend){
        let friendBox = document.createElement('div');
        let friendInfo =document.createElement('div');
        let friendImg = document.createElement('img');
        let friendName = document.createElement('h3');
        let friendGender = document.createElement('p');
        let friendAge = document.createElement('p');
        let friendLocation = document.createElement('p');
        let friendPhone = document.createElement('p');
    
        friendBox.classList.add("info");
        friendImg.classList.add("photo");
        friendName.classList.add("name");
        friendGender.classList.add("text");
        friendAge.classList.add("text");
        friendLocation.classList.add("text");
        friendPhone.classList.add("text");
    
        friendImg.src = friend.picture.large;
        friendName.innerHTML = `${friend.name.first} ${friend.name.last}`;
        friendGender.innerHTML = `${friend.gender}`;
        friendAge.innerHTML ="I am " + `${friend.dob.age}` + " years old";
        friendLocation.innerHTML = "I live in " + `${friend.location.city}` + ", " + `${friend.location.state}`;
        friendPhone.innerHTML = "Call me: " + `${friend.phone}`;
         
        container.appendChild(friendBox);
        friendBox.append(friendImg, friendInfo);
        friendInfo.append(friendName, friendGender, friendAge, friendLocation, friendPhone);
    };
    
    function showFriends(data){
      container.innerHTML = "";
      data.forEach(createFriendBox);
    };
    
    searchName.addEventListener('change', () =>{
        let listOfFriends = [...friends];
        let writtenName = searchName.value.toLowerCase();
        filteredNames = listOfFriends.filter((item)=>
        item.name.first.toLowerCase().includes(writtenName));
        showFriends(filteredNames);
    });
    
    sideMenu.addEventListener('click', (e) =>{
        let friendList = [...friends];
        if(filteredNames)
         friendList = filteredNames;
         
     if( e.target === sortByNameUp){
        friendList.sort((a, b)=> 
         ((a.name.first > b.name.first) - (a.name.first < b.name.first)));
         showFriends(friendList);
     } else if( e.target === sortByNameDown){
        friendList.sort((a, b)=> 
         ((b.name.first > a.name.first) - (b.name.first < a.name.first)));
         showFriends(friendList);
     } else if(e.target === sortByAgeUp){
        friendList.sort((a, b)=> 
         a.dob.age - b.dob.age)
         showFriends(friendList);
     } else if( e.target === sortByAgeDown){
        friendList.sort((a, b)=> 
         b.dob.age - a.dob.age);
         showFriends(friendList);
     } else if(  e.target === reset){
         searchName.value = "";
         showFriends(friends);
     }
    });
    });
