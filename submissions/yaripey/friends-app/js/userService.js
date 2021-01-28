import { User, loadedUsers } from './users.js'
import { settings } from './settings.js'
let fetchingTries = 0
const maxTriesAmount = 5;

async function fetchUsers(amount) {
  const usersURL = `https://randomuser.me/api/?results=${amount}`
  try {
    const fetchedResult = await fetch(usersURL)
    const fetchedUsers = await fetchedResult.json()
    console.log(fetchedUsers.results)
    return fetchedUsers.results
  } catch (err) {
    console.log(err, 'Trying to fetch again.')
    if (fetchingTries < maxTriesAmount) {
      fetchingTries++;
      return fetchUsers(amount)
    } else {
      console.log('Too many fetching attempts. Check connection or try again later.')
      fetchingTries = 0;
    }
  }
}

export async function loadUsers(amount) {
  const fetchedUsers = await fetchUsers(amount)
  fetchedUsers.forEach(loadedUser => {
    const id = loadedUsers.length
    const newUser = new User({...loadedUser, id})
    loadedUsers.push(newUser)
  })
  updateUsersToShow()
}

export function peekUser({ target }) {
  const targetElement = target.closest('.user')
  if (targetElement) {
    const id = target.closest('.user').id
    const clickedUser = loadedUsers.find(user => user.id === parseInt(id))
    document.body.appendChild(clickedUser.expandedHtmlMarkUp)
  }
}

export function closePeekedUser({ target }) {
  if (target.id === 'expanded-card') {
    document.body.removeChild(target)
  } else if (target.id === 'big-close-button') {
    document.body.removeChild(document.querySelector('#expanded-card'))
  }
}

function filterUsers (usersToFilter) {
  const filteredUsers = usersToFilter.filter(loadedUser => {
    if (settings.gender !== 'both') {
      if (loadedUser.gender !== settings.gender) {
        return false
      }
    }
    if (!(`${loadedUser.firstName} ${loadedUser.lastName}`.toLowerCase().includes(settings.nameFilter))) {
      return false
    }
    if (settings.ageFilter) {
      if (!(loadedUser.age === settings.ageFilter)) {
        return false
      }
    }
    return true
  })
  return filteredUsers;
}

function alphaSort(usersToSort, ascending) {
  if (ascending) {
    return usersToSort.sort(function (a, b) {
      if (a.firstName > b.firstName) {
        return 1;
      }
      if (a.firstName < b.firstName) {
        return -1;
      }
      return 0;
    })
  } else {
    return usersToSort.sort(function (a, b) {
      if (a.firstName < b.firstName) {
        return 1;
      }
      if (a.firstName > b.firstName) {
        return -1;
      }
      return 0;
    })
  }
}

function ageSort(usersToSort, ascending) {
  if (ascending) {
    return usersToSort.sort(function (a, b) {
      return a.age - b.age;
    })
  } else {
    return usersToSort.sort(function (a, b) {
      return b.age - a.age;
    })
  }
}

function sortUsers(usersToSort, sortType) {
  switch(sortType) {
    case 'A-Z':
      return alphaSort(usersToSort, true);
    case 'Z-A':
      return alphaSort(usersToSort, false);
    case 'ageAsc':
      return ageSort(usersToSort, true);
    case 'ageDesc':
      return ageSort(usersToSort, false);
  }
}

function renderUsers(usersToRender) {
  const usersContainer = document.querySelector('.users')
  const tempContainer = document.createElement('div')
  tempContainer.classList.add('temp-container')
  usersToRender.forEach(userToRender => {
    tempContainer.appendChild(userToRender.htmlMarkUp)
  })

  const existingContainer = document.querySelector('.temp-container')
  if (existingContainer) {
    usersContainer.replaceChild(tempContainer, existingContainer) 
  } else {
    usersContainer.appendChild(tempContainer)
  }
}

export function updateUsersToShow() {
  const filteredUsers = filterUsers(loadedUsers)
  const sortedUsers = sortUsers(filteredUsers, settings.sortType)

  renderUsers(sortedUsers)
}
