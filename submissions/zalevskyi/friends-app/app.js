const USERS_DATA = []
const RESULTS = document.getElementById('results')
const SORT = document.getElementById('sort')
const FILTER = document.getElementById('filter')
const REQUEST_PARAMETERS = {}

class User {
  constructor(randomUserAPIUser) {
    this.name = randomUserAPIUser.name.first
    this.surname = randomUserAPIUser.name.last
    this.gender = randomUserAPIUser.gender
    this.age = randomUserAPIUser.dob.age
    this.country = randomUserAPIUser.location.country
    this.city = randomUserAPIUser.location.city
    this.phone = randomUserAPIUser.phone
    this.image = randomUserAPIUser.picture.large
  }
  static compareName(a, b) {
    return `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`)
  }
  static compareSurname(a, b) {
    return `${a.surname} ${a.name}`.localeCompare(`${b.surname} ${b.name}`)
  }
}
function connectToServer() {
  let connectionAttemps = 1
  let usersQuantity = 30
  fetchUserData(usersQuantity, connectionAttemps)
    .then((responseJSON) => {
      responseJSON.results.forEach((user) => USERS_DATA.push(new User(user)))
      showResults()
    })
    .catch((error) => {
      connectionAttemps++
      fetchUserData(usersQuantity, connectionAttemps)
    })
}
function fetchUserData(usersQuantity, connectionAttemps) {
  let apiUrl = 'https://randomuser.me/api/1.3/'
  let fields = ['name', 'gender', 'location', 'dob', 'phone', 'picture']
  RESULTS.innerHTML = `<div class='connection_message'>Please wait. Connecting to server. Attemp: ${connectionAttemps}</div>`
  return fetch(`${apiUrl}?results=${usersQuantity}&inc=${fields.join(',')}`, {
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => response.json())
}
function showResults() {
  RESULTS.innerHTML = getUserDataToShow(USERS_DATA, REQUEST_PARAMETERS)
    .map((user) => getUserCard(user))
    .join('')
}
function getUserDataToShow(userData, parameters) {
  if (parameters.sort) {
    return sort(filter(userData, parameters), parameters.sort, parameters.order)
  } else {
    return filter(userData, parameters)
  }
}
function sort(userData, fieldToSort, order) {
  let orderValue = order === 'ascending' ? 1 : -1
  if (fieldToSort === 'name') {
    return userData.slice().sort((a, b) => User.compareName(a, b) * orderValue)
  } else if (fieldToSort === 'surname') {
    return userData
      .slice()
      .sort((a, b) => User.compareSurname(a, b) * orderValue)
  } else if (fieldToSort === 'age') {
    return userData.slice().sort((a, b) => (a.age - b.age) * orderValue)
  } else {
    return userData
      .slice()
      .sort((a, b) => a[fieldToSort].localeCompare(b[fieldToSort]) * orderValue)
  }
}
function filter(userData, parameters) {
  Object.keys(parameters).forEach((key) => {
    if (['name', 'surname', 'country', 'city'].includes(key)) {
      userData = userData.filter((user) =>
        user[key].toLowerCase().startsWith(parameters[key])
      )
    }
  })
  if (parameters.gender) {
    userData = userData.filter(
      (user) => user.gender.toLowerCase() === parameters.gender
    )
  }
  if (parameters.age_from || parameters.age_till) {
    userData = filterAge(userData, parameters.age_from, parameters.age_till)
  }
  return userData
}
function filterAge(userData, from, till) {
  if (from && till) {
    return userData.filter((user) => from <= user.age && user.age <= till)
  } else if (from) {
    return userData.filter((user) => from <= user.age)
  } else if (till) {
    return userData.filter((user) => user.age <= till)
  }
}
function getUserCard(userData) {
  return `<div class='card'>
    <img class='photo' alt='${userData.name} ${userData.surname} photo' src='${userData.image}'>
    <p class='name'>${userData.name} ${userData.surname}</p>
    <p class='demographics card_text'>${userData.gender}, ${userData.age} years</p>
    <p class='city card_text'>${userData.city}</p>
    <p class='country card_text'>${userData.country}</p>
    <p class='phone card_text'>${userData.phone}</p>
    </div>`
}

SORT.addEventListener('input', (evt) => {
  if (SORT.field.value) {
    REQUEST_PARAMETERS.sort = SORT.field.value
    REQUEST_PARAMETERS.order = SORT.order.value
  } else {
    delete REQUEST_PARAMETERS.sort
    delete REQUEST_PARAMETERS.order
  }
  showResults()
})
FILTER.addEventListener('input', (evt) => {
  let keys = [
    'name',
    'surname',
    'age_from',
    'age_till',
    'gender',
    'city',
    'country',
  ]
  keys.forEach((key) => {
    if (FILTER[key].value) {
      REQUEST_PARAMETERS[key] = FILTER[key].value.toLowerCase()
    } else {
      delete REQUEST_PARAMETERS[key]
    }
  })
  if (REQUEST_PARAMETERS.gender === 'all') {
    delete REQUEST_PARAMETERS.gender
  }
  showResults()
})

connectToServer()
