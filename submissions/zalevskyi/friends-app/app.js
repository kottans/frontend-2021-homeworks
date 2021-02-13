const USERS_DATA = []
const USERS_QUANTITY = 30
const RESULTS = document.getElementById('results')
const SORT = document.getElementById('sort')
const FILTER = document.getElementById('filter')
const REQUEST_PARAMETERS = {}
let connectionAttemps = 1

function connectToServer() {
  RESULTS.innerHTML = `<div class='connection_message'>Please wait. Connecting to server. Attemp: ${connectionAttemps}</div>`
  connectionAttemps++
  fetchUserData(connectToServer)
}
function fetchUserData(onError) {
  let apiUrl = 'https://randomuser.me/api/1.3/'
  let fields = ['name', 'gender', 'location', 'dob', 'phone', 'picture']
  fetch(`${apiUrl}?results=${USERS_QUANTITY}&inc=${fields.join(',')}`, {
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      pushUserData(responseJSON.results)
      showResults()
    })
    .catch((error) => onError(error))
}
function pushUserData(randomUserResults) {
  randomUserResults.forEach((user) =>
    USERS_DATA.push({
      name: user.name.first,
      surname: user.name.last,
      gender: user.gender,
      age: user.dob.age,
      country: user.location.country,
      city: user.location.city,
      phone: user.phone,
      image: user.picture.large,
    })
  )
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
  if (fieldToSort === 'name') {
    return sortFullName(userData, 'name', order)
  } else if (fieldToSort === 'surname') {
    return sortFullName(userData, 'surname', order)
  } else if (fieldToSort === 'age') {
    return sortNumeric(userData, 'age', order)
  } else {
    return sortString(userData, fieldToSort, order)
  }
}
function sortFullName(userData, firstToSort, order) {
  let sortedData = userData.slice()
  let secondToSort = 'surname'
  if (firstToSort === 'surname') {
    secondToSort = 'name'
  }
  if (order === 'ascending') {
    orderValue = 1
  } else {
    orderValue = -1
  }
  sortedData.sort(
    (a, b) =>
      `${a[firstToSort]} ${a[secondToSort]}`.localeCompare(
        `${b[firstToSort]} ${b[secondToSort]}`
      ) * orderValue
  )
  return sortedData
}
function sortNumeric(userData, propertyToSort, order) {
  let sortedData = userData.slice()
  if (order === 'ascending') {
    sortedData.sort((a, b) => a[propertyToSort] - b[propertyToSort])
  } else {
    sortedData.sort((a, b) => b[propertyToSort] - a[propertyToSort])
  }
  return sortedData
}
function sortString(userData, propertyToSort, order) {
  let sortedData = userData.slice()
  if (order === 'ascending') {
    orderValue = 1
  } else {
    orderValue = -1
  }
  sortedData.sort((a, b) => {
    if (a[propertyToSort] > b[propertyToSort]) {
      return 1 * orderValue
    } else if (a[propertyToSort] < b[propertyToSort]) {
      return -1 * orderValue
    } else {
      return 0
    }
  })
  return sortedData
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
