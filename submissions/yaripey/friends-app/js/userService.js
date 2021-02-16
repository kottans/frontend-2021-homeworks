import { User, loadedUsers } from './users.js'
import { settings } from './settings.js'
let fetchingTries = 0
const maxTriesAmount = 5;

async function fetchUsers(amount) {
  const usersURL = `https://randomuser.me/api/?results=${amount}`
  try {
    const fetchedResult = await fetch(usersURL)
    const fetchedUsers = await fetchedResult.json()
    return fetchedUsers.results
  } catch (err) {
    if (fetchingTries < maxTriesAmount) {
      fetchingTries++;
      return fetchUsers(amount)
    } else {
      fetchingTries = 0;
    }
  }
}

function fetchErrorHandler() {
  document.querySelector('.content').innerHTML = "All fetching attempts failed. Please check your internet connection or try again later."
}

export async function loadUsers(amount) {
  const fetchedUsers = await fetchUsers(amount)
  if (!fetchedUsers) {
    fetchErrorHandler()
    return
  }
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
    const { id } = target.closest('.user')
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

function sortByName(a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

function sortByAge(a, b) {
  return a - b
}

function sortUsers(usersToSort, sortType) {
  switch(sortType) {
    case 'A-Z':
      return usersToSort.sort(({firstName: nameA}, {firstName: nameB}) => sortByName(nameA, nameB))
    case 'Z-A':
      return usersToSort.sort(({firstName: nameA}, {firstName: nameB}) => sortByName(nameB, nameA))
    case 'ageAsc':
      return usersToSort.sort(({age: ageA}, {age: ageB}) => sortByAge(ageA, ageB))
    case 'ageDesc':
      return usersToSort.sort(({age: ageA}, {age: ageB}) => sortByAge(ageB, ageA))
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
