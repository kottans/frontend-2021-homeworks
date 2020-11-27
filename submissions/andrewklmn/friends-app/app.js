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
    type: '',
  },
  initialListLength: 20
}

const container = document.querySelector('.container');

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

const sortList = (friends)=>{
  //TODO sort by sorter settings
  return friends;
}

const redrawFriends = (friends) => {
  container.innerHTML = '';
  sortList(filterList(friends))
    .slice(0, state.initialListLength)
    .forEach(friend => drawPerson(friend));
}

const updateFriendsList = (list)=> {
  state.friends = list;
  console.log(state.friends);
  redrawFriends(state.friends);
}


const initApp = (state) => {

  fetch(randomUserUrl)
    .then(response => response.json())
    .then(json => {
      updateFriendsList(json.results);
    })
    .catch(function() {
      console.log("Getting list error");
    });

  // Add filters driver

};

document.addEventListener('DOMContentLoaded',(event)=>{
  initApp(state);

  document.addEventListener('scroll', function(e) {

    console.log(window.scrollY + ' ' + window.innerHeight);

  });

});
