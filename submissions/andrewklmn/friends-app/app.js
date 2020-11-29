
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

const drawPerson = (person, index) => {  
  const div = document.createElement('div');
  div.classList.add('person');
  div.dataset.index = index;
  div.title = `Address: ${person.location.street.number}, ${person.location.street.name}, ${person.location.city}, ${person.location.state}
  Phone: ${person.phone}
  Email: ${person.email}`;
  div.innerHTML =`
      <div class="person-name ${person.gender}">${person.name.first} ${person.name.last}</div>
      <div class="person-image">
      <picture>
        <source media="(max-width:300px)" 
                srcset="${person.picture.thumbnail} 1x, ${person.picture.medium} 2x">
        <source media="(max-width:400px)" 
                srcset="${person.picture.medium} 1x, ${person.picture.large} 2x">
        <img class="rounded" src="${person.picture.large}">
      </picture>
      </div>
      <div class="person-age">
        ${person.dob.age} y.o.
      </div>
      <div class="person-location">
        ${person.location.country}
      </div>
  `;
  container.appendChild(div);
}

const filterList = (friends)=>{
  return friends.filter( person => {
    if (state.filters.namePart != '') {
      if((person.name.first + ' ' + person.name.last).toUpperCase()
              .indexOf(state.filters.partOfName.toUpperCase()) == -1) { 
        return false;
      }
    }
    if (state.filters.gender != '') {
      if(person.gender != state.filters.gender) { 
        return false;
      }
    }

    if (state.filters.ageRange[0] > person.dob.age
        || state.filters.ageRange[1] < person.dob.age) {
      return false;
    }

    if (state.filters.country != '') {
      if(person.location.country != state.filters.country) { 
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

  const index0 = state.sorter.fieldPathList[state.sorter.keyName][0];
  const index1 = state.sorter.fieldPathList[state.sorter.keyName][1];
  
  return friends.sort(function(a, b){
    if(state.sorter.keyName == '') return 0;
    if(state.sorter.order == 'DESC') {
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

const setResetButtonView = (state) => {
  if(state.sorter.keyName != ''
      || state.filters.partOfName != ''
      || state.filters.gender != ''
      || state.filters.ageRange[0] != minPersonAge
      || state.filters.ageRange[1] != maxPersonAge
      || state.filters.country != '') {
    resetButton.classList.remove('off');
    return;
  };
  resetButton.classList.toggle('off',true);
}

const resetButtonClickHandler = () => {
  const change = new Event('change');

  state.filters.partOfName = searchField.value = '';
  state.filters.gender = filterGender.value = '';
  state.filters.ageRange[0] = filterMinAge.value = minPersonAge;
  state.filters.ageRange[1] = filterMaxAge.value = maxPersonAge;
  state.filters.country = filterCountry.value = '';

  sortField.value = sortField.value = '';
  sortField.dispatchEvent(change);
}

const redrawFriends = (state) => {
  preloader.classList.remove('hidden');
  setResetButtonView(state);

  container.innerHTML = '';
  state.numberOfShowedFriends = 0;
  container.scrollTop = 0;

  sortList(filterList(state.friends))
    .slice(0, state.initialListLength)
    .forEach((friend, index) => {
      state.numberOfShowedFriends++;
      drawPerson(friend, index);
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
  Object.keys(state.sorter.fieldPathList).forEach((field)=>{
    addOptionToSelect(sortField, field, field);
  });
  sortField.addEventListener('change',({target}) => {
    switch (target.value) {
      case '':
        sortOrder.innerHTML = '';
        state.sorter.order = '';
        state.sorter.keyName = '';
        break;
      default:
        if(sortOrder.innerHTML == ''){
          sortOrder.innerHTML = state.sorter.orderSymbols.ASC;
          state.sorter.order = 'ASC';
        };    
        state.sorter.keyName = target.value; 
    };
    redrawFriends(state);
  });

  sortOrder.addEventListener('click',({target})=>{
    if(sortField.value == ''){
      target.innerHTML = '';
      state.sorter.order = '';
      return;
    };

    switch (state.sorter.order) {
      case 'ASC':
        target.innerHTML = state.sorter.orderSymbols.DESC;
        state.sorter.order = 'DESC';
        break;
      default:
        target.innerHTML = state.sorter.orderSymbols.ASC;
        state.sorter.order = 'ASC';
        break;
    };
    redrawFriends(state);
  });
}

const drawFilters = (state) => {

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  
  state.filters.genderList = state.friends.map(person => person.gender).filter(onlyUnique);
  state.filters.genderList.forEach((gender)=>{
    addOptionToSelect(filterGender, gender, gender);
  });
  filterGender.addEventListener('change',({target}) => {
    if (target.value == state.filters.gender) {
      return true;
    }
    state.filters.gender = target.value;
    redrawFriends(state);
  });

  filterMinAge.value = state.filters.ageRange[0];
  filterMinAge.addEventListener('change',({target})=>{
    state.filters.ageRange[0] = target.value;
    redrawFriends(state);
  });
  
  filterMaxAge.value = state.filters.ageRange[1];
  filterMaxAge.addEventListener('change',({target})=>{
    state.filters.ageRange[1] = target.value;
    redrawFriends(state);
  });

  state.filters.countryList = state.friends.map(person => person.location.country).filter(onlyUnique);
  state.filters.countryList.sort().forEach( country => {
    addOptionToSelect(filterCountry, country, country);
  });
  filterCountry.addEventListener('change', ({target}) => {
    if (target.value == state.filters.country) {
      return true;
    }
    state.filters.country = target.value;
    redrawFriends(state);
  });
  
  searchField.addEventListener('keyup',({target})=>{
    if (state.filters.partOfName == target.value) {
      return true;
    }
    state.filters.partOfName = target.value;
    redrawFriends(state);
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
  
  friends.forEach((friend, index) => {
    state.numberOfShowedFriends++;
    drawPerson(friend, index);
  });
  
  setTimeout(() => {
    container.scrollTop += state.afterLoadingMoreFriendsScrollShift;
  }, state.nextMoreFriendAutoloadDelay*2);
};

const autoLoaderOnScroll = () => {
  if (state.scrollDisabled) return true;
  if (container.scrollTop + container.clientHeight >= --container.scrollHeight) {
    if(state.numberOfShowedFriends < state.friends.length) {
      state.scrollDisabled = true;
      container.scrollTop--;
      
      preloader.classList.remove('hidden');

      const additionalFriendList = sortList(filterList(state.friends))
        .slice( state.numberOfShowedFriends, state.numberOfShowedFriends + state.initialListLength);

      requestAnimationFrame(() => drawMoreFriends(additionalFriendList) );
      
      setTimeout(()=>{        
        state.scrollDisabled = false;
        preloader.classList.add('hidden');
      }, state.nextMoreFriendAutoloadDelay);
    };
  }
};

document.addEventListener('DOMContentLoaded',() => {
  
  initApp(state);

  container.addEventListener('scroll', autoLoaderOnScroll);
  resetButton.addEventListener('click', resetButtonClickHandler);

});
