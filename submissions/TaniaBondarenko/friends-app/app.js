const numOfFriends=20;
const apiUrl = `https://randomuser.me/api/?results=${numOfFriends}`;
const friends = document.querySelector(".friends");
let friendsData;
let arrForFilter;
let isFiltered = false;
let justMale;
let justFemale;

function makeContainerEmpty() {
        let innerText = " "; 
        friends.innerHTML = innerText.replace(innerText, " ");    
}

function fetchFriend() {
        fetch(apiUrl)
                .then(response => response.json())
                .then((data) => friendsData = data.results)
                .then(() => addFriends(friendsData))
                .catch(err => {
                        refreshPage();
                });
};

function refreshPage() {
        const wholePage = document.querySelector("body");
        wholePage.setAttribute("class", "refresh");
        wholePage.innerHTML = `<div>Ops...Something went wrong.</div>
        <div>Refresh the page to start finding friends</div>
        <button class="refresh_button">Click to refresh</button>` ;
        document.querySelector(".refresh_button").addEventListener("click", fetchFriend);
}

 function addFriends(friendsToBeAdded) {
      let fragment = document.createDocumentFragment();
        friendsToBeAdded.forEach(friend=> {
                let friendCard = document.createElement("div");
               friendCard.setAttribute("class", "friend_card");
                friendCard.innerHTML = `<div class="card_wrapper ${friend.gender}"><div class="name ">${`${friend.name.first} ${friend.name.last}`}</div>
                                <div class="photo"><img src="${friend.picture.large}"></div>
                                <div class="info_block">
                                <div class="age">Age ${friend.dob.age}</div>
                                <div class="place">${friend.location.city}</div>
                                <div class="email"><a href="mailto:${friend.mail}" class="email_link">${friend.email}</a></div>
                                <div class="gender">${friend.gender}</div>
                                </div></div>
                                `;
                fragment.appendChild(friendCard);       
        });
              friends.appendChild(fragment);

};

document.querySelector(".sidebar").addEventListener("click", sortFriends);

function sortFriends({ target }) {
        chooseAppropriateFriends();
        switch (target.className||target.id) {
                case "ascendent_by_name":
                        arrForFilter.sort((a, b) => a.name.first.localeCompare(b.name.first));
                          redrawfriends(); 
                        break;
                case "descendent_by_name":
                        arrForFilter.sort((a, b) => b.name.first.localeCompare(a.name.first));
                          redrawfriends(); 
                        break;
                case "ascendent_by_age":
                        arrForFilter.sort((a, b) => a.dob.age - (b.dob.age));
                          redrawfriends(); 
                        break;
                case "descendent_by_age":
                        arrForFilter.sort((a, b) => b.dob.age - (a.dob.age));
                          redrawfriends(); 
                        break;
                case "male":
                case "female":
                case "all":
                        letFilter();
                        break;      
        }
         
}

function letFilter() {
        makeContainerEmpty();
        if (document.getElementById("male").checked) {
                justMale = friendsData.filter(el => el.gender === "male");
                addFriends(justMale);
                isFiltered = true;
        } else if (document.getElementById("female").checked) {
                justFemale = friendsData.filter(el => el.gender === "female");
                addFriends(justFemale);
                isFiltered = true;
        } else if (document.getElementById("all").checked) {
                addFriends(friendsData);
                isFiltered = false;
        }
}

function redrawfriends() {
        makeContainerEmpty();
        addFriends(arrForFilter);
}
 
document.querySelector(".search").addEventListener("keyup", makeSearch);

function chooseAppropriateFriends() {
        if (isFiltered && document.getElementById("male").checked) {
                arrForFilter = justMale;
        } if (isFiltered && document.getElementById("female").checked) {
                arrForFilter = justFemale;
        } if (!isFiltered) {
                arrForFilter = friendsData;
        }   
}

function makeSearch() {      
        const searchValue = document.querySelector(".search").value.toLowerCase();
        chooseAppropriateFriends();
        const filteredStr = arrForFilter.filter((elem) => {
                return (
                        elem.name.last.toLowerCase().startsWith(searchValue,0) ||
                        elem.name.first.toLowerCase().startsWith(searchValue)
                );   
        })
        makeContainerEmpty();
        addFriends(filteredStr);
}

window.addEventListener("load", fetchFriend);
