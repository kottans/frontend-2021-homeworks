
const maxNumberOfFriends = 100;
const randomUserUrl = 'https://randomuser.me/api/?results=' + maxNumberOfFriends;

const state = {
  friends: [],
  filters: {
    partOfName: '',
    gender: '',
    genderList: [],
    ageRange: [18,99],
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
  initialListLength: 45,
  numberOfShowedFriends: 0,
}

const preloader = document.querySelector('.preloader');
const container = document.querySelector('.container');

const sortField = document.querySelector('.sort-field');
const sortOrder = document.querySelector('.sort-order');

const searchField = document.querySelector('.search-field');
const filterGender = document.querySelector('.filter-gender');
const filterMinAge = document.querySelector('.filter-min-age');
const filterMaxAge = document.querySelector('.filter-max-age');
const filterCountry = document.querySelector('.filter-country');

const drawPerson = (person) => {
  container.innerHTML += `
    <div class="person">
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
    </div>
  `;
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

const redrawFriends = (state) => {
  preloader.classList.remove('hidden');
  container.innerHTML = '';

  sortList(filterList(state.friends))
    .slice(0, state.initialListLength)
    .forEach(friend => drawPerson(friend));

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
    .then(json => {
      console.log(json.results)
      updateFriendsList(json.results);
      drawSorter(state);
      drawFilters(state);
      preloader.classList.add('hidden');
    })
    .catch(function() {
      const header = document.querySelector('.header');
      const footer = document.querySelector('.footer')
      header.innerHTML = "ERROR: Can't get friend list!";
      header.classList.add('error');
      footer.innerHTML = "Try Refresh this page again!";
      footer.classList.add('error');
    });
    
};

document.addEventListener('DOMContentLoaded',(event)=>{
  initApp(state);

  /* TODO when get scrolled down, add new people to list
  document.addEventListener('scroll', function(e) {
    //console.log(window.scrollY + ' ' + window.innerHeight);
  });
  */

});
