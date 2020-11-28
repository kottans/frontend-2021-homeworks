const randomUserUrl = 'https://randomuser.me/api/?results=100';

const state = {
  friends: [],
  filters: {
    namePart: '',
    gender: '',
    ageRange: [18,155],
    country: '',
  },
  sorter: {
    keyName: '',
    order: '',
  },
  initialListLength: 20
}

const genderList = [];
const countryList = [];

const sorterFieldPathList = {
  name: ['name', 'first'],
  age: ['dob', 'age'],
  country: ['location', 'country'],
};
const sorterOrderSymbols = {
  ASC: '&#9650;', 
  DESC: '&#9660;',
};

const container = document.querySelector('.container');
const sortField = document.querySelector('.sort-field');
const sortOrder = document.querySelector('.sort-order');

const drawPerson = (person) => {
  container.innerHTML += `
    <div class="person">
      <div class="person-name ${person.gender}">${person.name.first} ${person.name.last}</div>
      <div class="person-image">
        <img class="rounded" src="${person.picture.large}" alt="Person's photo">
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
      if(person.name.first.toUpperCase()
              .indexOf(state.filters.namePart.toUpperCase()) == -1) { 
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

  const index0 = sorterFieldPathList[state.sorter.keyName][0];
  const index1 = sorterFieldPathList[state.sorter.keyName][1];
  
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

const redrawFriends = () => {
  container.innerHTML = '';
  sortList(filterList(state.friends))
    .slice(0, state.initialListLength)
    .forEach(friend => drawPerson(friend));
}

const updateFriendsList = (list)=> {
  state.friends = list;
  //console.log(state.friends);
  redrawFriends();
}


const drawSorter = ()=>{
  Object.keys(sorterFieldPathList).forEach((field)=>{
    const option = document.createElement('option');
    option.value = field;
    option.innerHTML = field;
    sortField.appendChild(option);
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
          sortOrder.innerHTML = sorterOrderSymbols.ASC;
          state.sorter.order = 'ASC';
        };    
        state.sorter.keyName = target.value; 
    };
    redrawFriends();
  });

  sortOrder.addEventListener('click',({target})=>{
    if(sortField.value == ''){
      target.innerHTML = '';
      state.sorter.order = '';
      return;
    };
    
    switch (state.sorter.order) {
      case 'ASC':
        target.innerHTML = sorterOrderSymbols.DESC;
        state.sorter.order = 'DESC';
        break;
      default:
        target.innerHTML = sorterOrderSymbols.ASC;
        state.sorter.order = 'ASC';
        break;
    };
    redrawFriends();
  });
}

const initApp = () => {

  fetch(randomUserUrl)
    .then(response => response.json())
    .then(json => {
      updateFriendsList(json.results);
      drawSorter();
    })
    .catch(function() {
      console.log("Getting list error");
    });

  // TODO Add filters layout and drive
};

document.addEventListener('DOMContentLoaded',(event)=>{
  initApp(state);

  document.addEventListener('scroll', function(e) {
    //console.log(window.scrollY + ' ' + window.innerHeight);
  });

});
