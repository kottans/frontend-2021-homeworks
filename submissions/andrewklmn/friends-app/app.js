const randomUserUrl = 'https://randomuser.me/api/?results=30';

const state = {
  friends: [],
  filters: {
    name: null,
    gender: null,
    ageRange: [0,150],
  },
  sorter: {
    keyName: null,
    type: null,
  }
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
  //TODO filter by filter settings
  return friends;
}

const sortList = (friends)=>{
  //TODO sort by sorter settings
  return friends;
}

const redrawFriends = (friends) => {
  container.innerHTML = '';
  sortList(filterList(friends)).forEach(friend => drawPerson(friend));
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