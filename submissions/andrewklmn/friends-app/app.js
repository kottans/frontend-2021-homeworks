const state = {
  friends: [],
  filters: [], 
  x: 10,
}

const container = document.querySelector('.container');

const redrawFriends = (friends) => {
  friends.forEach(friend => {
    container.innerHTML += `${friend.name.first} ${friend.name.last} <br>`;
  });
}

const updateFriendsList = (list)=> {
  // TODO call DOM updater with new set of friends
  state.friends = list;

  console.log(state.friends);

  redrawFriends(state.friends);
}


const initApp = (state) => {

  fetch('https://randomuser.me/api/?results=5')
    .then(response => response.json())
    .then(json => updateFriendsList(json.results))
    .catch(function() {
      console.log("Getting list error");
    });

  // Add filters driver

};

document.addEventListener('DOMContentLoaded',(event)=>{
  initApp(state);

})
