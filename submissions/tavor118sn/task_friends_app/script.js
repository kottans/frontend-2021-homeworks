// Global variables

const CARD_LIST = document.getElementById('cardList');
const FORM = document.forms.mainForm;
let friends;

// URL

const USER_FIELDS = [
  'gender',
  'name',
  'email',
  'picture',
  'dob',
];


const SITE_URL = 'https://randomuser.me/api/';
const BASE_URL = new URL(SITE_URL);
BASE_URL.searchParams.set('nat', 'us');
BASE_URL.searchParams.set('results', '12');
BASE_URL.searchParams.set('inc', USER_FIELDS.join());


let buildUrl = (queryParam, paramValue) => {
  let newUrl = new URL(BASE_URL);
  if (queryParam && paramValue) {
    newUrl.searchParams.set(queryParam, paramValue);
  }
  return newUrl;
};


// Render cards

const createCard = (userInfo) => {

  const userWholeCard = document.createElement('li');
  userWholeCard.classList.add("user-card");

  const userImg = document.createElement('img');
  userImg.setAttribute("src", userInfo.picture.large);
  userImg.setAttribute("alt", "user_photo");
  userImg.classList.add("user-photo");
  userWholeCard.appendChild(userImg);


  const cardHeader = document.createElement('h2');
  cardHeader.classList.add("user-full-name");
  cardHeader.innerHTML = `${userInfo.name.first} ${userInfo.name.last}`;
  userWholeCard.appendChild(cardHeader);

  const genderElem = document.createElement('p');
  genderElem.innerHTML = `Gender: <strong>${userInfo.gender}</strong>`;
  userWholeCard.appendChild(genderElem);

  const ageElem = document.createElement('p');
  ageElem.innerHTML = `Age: <strong>${userInfo.dob.age}</strong>`;
  ageElem.classList.add("user-age");
  userWholeCard.appendChild(ageElem);

  return userWholeCard;

};


const generateFriendsListing = (friendList) => {
  CARD_LIST.innerHTML = '';
  let fragment = document.createDocumentFragment();

  friendList.forEach(elem => {
    fragment.appendChild(createCard(elem));
  });

  CARD_LIST.appendChild(fragment);
};


// Load users

async function loadUserList() {

  let newUrl = buildUrl();
  // try to make request at least 5 times in case of errors
  for (let i = 0; i < 5; i++) {
    try {
      let response = await fetch(newUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        let friends = await response.json();
        generateFriendsListing(friends.results);
        return friends.results
      }
    } catch (e) {
      console.log(e);
    }
  }
}


// Sorting and filtering

const getFormData = (form) => {
  return {
    userSortAge: form.userSortAge.value,
    userSortName: form.userSortName.value,
    userFilterGender: form.userFilterGender.value,
  };

};


const filterByGender = (gender) => {
  let friendList = [...friends];
  if (gender !== 'all') {
    friendList = friendList.filter((user) => user.gender === gender);
  }
  return friendList;
};


const filterByName = (event) => {
  let enteredFirstName = event.target.value;

  let friendList = [...friends];
  friendList = friendList.filter(user => user.name.first.toLowerCase().search(
    enteredFirstName.toLowerCase()) !== -1
  );

  generateFriendsListing(friendList);
};


const sortAndFilterListing = (event) => {
  event.preventDefault();
  let formData = getFormData(FORM);

  let sortFunc = (a, b) => {

    let sortAge = 0;
    if (formData.userSortAge === "ascending") {
      sortAge = a.dob.age - b.dob.age;
    } else if (formData.userSortAge === "descending") {
      sortAge = b.dob.age - a.dob.age;
    }

    let nameA = a.name.last.toUpperCase();
    let nameB = b.name.last.toUpperCase();
    let sortName;
    if (formData.userSortName === "ascending") {
      sortName = (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    } else if (formData.userSortName === "descending") {
      sortName = (nameA < nameB) ? 1 : (nameA > nameB) ? -1 : 0;
    }
    return sortAge || sortName;
  };

  let friendList = filterByGender(formData.userFilterGender);
  friendList = friendList.sort(sortFunc);

  generateFriendsListing(friendList);
};


// Initialization

(async () => {
  friends = await loadUserList();
})();

FORM.addEventListener("submit", sortAndFilterListing);

FORM.firstname.addEventListener("input", filterByName);
