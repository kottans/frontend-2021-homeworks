
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
  container.innerHTML += `${person.name.first} ${person.name.last} <br>`;
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
