
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

  if (resetButton.classList.contains('off')) return;

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
  
  if (state.scrollDisabled) return;

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

const filterTextChangeHandler = (target, state, nameOfFilterProp) => {
  const {filters} = state;
  if (filters[nameOfFilterProp] === target.value) {
    return true;
  }
  filters[nameOfFilterProp] = target.value;
  redrawFriends(state);
}

const MIN_AGE_RANGE_INDEX = 0; 
const MAX_AGE_RANGE_INDEX = 1;

const filterAgeChangeHandler = (target, state, ageRangeIndex)=>{
  state.filters.ageRange[ageRangeIndex] = target.value;
  redrawFriends(state);
}

document.addEventListener('DOMContentLoaded',() => {
  initApp(state);
  
  sortField.addEventListener('change', ({target}) => sorterKeyChangeHandler(target, state));
  sortOrder.addEventListener('click', ({target}) => sorterOrderClickHandler(target, state));
  
  resetButton.addEventListener('click', () => resetButtonClickHandler(state));
  
  searchField.addEventListener('keyup',({target}) => filterTextChangeHandler(target, state, 'partOfName'));
  filterGender.addEventListener('change', ({target}) => filterTextChangeHandler(target, state, 'gender'));
  filterMinAge.addEventListener('change', ({target}) => filterAgeChangeHandler(target, state, MIN_AGE_RANGE_INDEX));
  filterMaxAge.addEventListener('change', ({target}) => filterAgeChangeHandler(target, state, MAX_AGE_RANGE_INDEX));
  filterCountry.addEventListener('change', ({target}) => filterTextChangeHandler(target, state, 'country'));
  
  container.addEventListener('scroll', ()=>autoLoaderOnScroll(state));
});
