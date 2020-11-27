const state = {
  friends: [],
  filters: [], 
  x: 10,
}

const drawFriendsList = (list)=> {
  // TODO call DOM updater with new set of friends
  console.log(list);
}


const initApp = (state) => {
  fetch('https://randomuser.me/api/?results=5')
    .then(response => response.json())
    .then(json => drawFriendsList(json.results));

  // Add filters driver

};

document.addEventListener('DOMContentLoaded',(event)=>{
  initApp(state);

})
