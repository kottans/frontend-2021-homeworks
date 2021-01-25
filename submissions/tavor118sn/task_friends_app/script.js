const CARD_LIST = document.getElementById('cardList');

let friends;

const createCard = (userInfo) => {
  const userCard = document.createElement('li');
  userCard.classList.add('user-card');

  const userImg = document.createElement('img');
  userImg.setAttribute('src', userInfo.picture.large);
  userImg.setAttribute('alt', 'user_photo');
  userImg.classList.add('user-photo');
  userCard.appendChild(userImg);

  const cardHeader = document.createElement('h2');
  cardHeader.classList.add('user-full-name');
  cardHeader.innerHTML = `${userInfo.name.first} ${userInfo.name.last}`;
  userCard.appendChild(cardHeader);

  const genderElem = document.createElement('p');
  genderElem.innerHTML = `Gender: <strong>${userInfo.gender}</strong>`;
  userCard.appendChild(genderElem);

  const ageElem = document.createElement('p');
  ageElem.innerHTML = `Age: <strong>${userInfo.dob.age}</strong>`;
  ageElem.classList.add('user-age');
  userCard.appendChild(ageElem);

  return userCard;
};

const generateFriendsListing = (friendList) => {
  CARD_LIST.innerHTML = '';
  const fragment = document.createDocumentFragment();

  friendList.forEach((elem) => {
    fragment.appendChild(createCard(elem));
  });

  CARD_LIST.appendChild(fragment);
};

async function loadUserList() {
  const userFields = ['gender', 'name', 'email', 'picture', 'dob'];
  const siteUrl = 'https://randomuser.me/api/';
  const baseUrl = new URL(siteUrl);
  baseUrl.searchParams.set('nat', 'us');
  baseUrl.searchParams.set('results', '12');
  baseUrl.searchParams.set('inc', userFields.join());

  // try to make request at least 5 times in case of errors
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const friends = await response.json();
        return friends.results;
      }
    } catch (e) {
      console.error(e);
    }
  }
}

const getFormData = (form) => {
  return {
    userSort: form.userSort.value,
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
  const enteredFirstName = event.target.value;

  let friendList = [...friends];
  friendList = friendList.filter((user) =>
    (user.name.first + user.name.last)
      .toLowerCase()
      .includes(enteredFirstName.toLowerCase())
  );

  generateFriendsListing(friendList);
};

const doSortByLastName = (a, b) => {
  const nameA = a.name.last.toUpperCase();
  const nameB = b.name.last.toUpperCase();
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
};

const doSortByAge = (a, b) => {
  return a.dob.age - b.dob.age;
};

const sortFuncMapper = {
  sortByAgeAsc: (a, b) => doSortByAge(a, b),
  sortByAgeDesc: (a, b) => doSortByAge(b, a),
  sortByLastNameAsc: (a, b) => doSortByLastName(a, b),
  sortByLastNameDesc: (a, b) => doSortByLastName(b, a),
};

const doListSortingAndFiltering = (event) => {
  event.preventDefault();
  const formData = getFormData(document.forms.mainForm);

  let friendList = filterByGender(formData.userFilterGender);
  const sortFunc = sortFuncMapper[formData.userSort];
  friendList = friendList.sort(sortFunc);

  generateFriendsListing(friendList);
};

(async () => {
  friends = await loadUserList();
  const friendList = friends.sort(sortFuncMapper.sortByAgeAsc);
  generateFriendsListing(friendList);
})();

document.forms.mainForm.addEventListener('submit', doListSortingAndFiltering);

document.forms.mainForm.firstname.addEventListener('input', filterByName);
