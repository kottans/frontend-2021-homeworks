
const state = {
  friends: [],
  filters: {
    name: null,
    gender: null,
    ageRange: [0,150],
  },
  sorter: {
    key: null,
    type: null,
  }
}

const container = document.querySelector('.container');

const drawPerson = (person) => {
  container.innerHTML += `
    <div class="person">
      <div class="person-name">${person.name.first} ${person.name.last}</div>
      <div class="person-image">
        <img src="${person.picture.thumbnail}" alt="Person's photo">
      </div>
      <div class="person-info">
        ${person.email}<br>
        ${person.phone}<br>
        ${person.location.city}, ${person.location.country}
      </div>
    </div>
  `;
}

const redrawFriends = (friends) => {

  friends.forEach(friend => drawPerson(friend));
}

const updateFriendsList = (list)=> {
  state.friends = list;
  console.log(state.friends);
  redrawFriends(state.friends);
}


const initApp = (state) => {

  fetch('https://randomuser.me/api/?results=5')
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

});
