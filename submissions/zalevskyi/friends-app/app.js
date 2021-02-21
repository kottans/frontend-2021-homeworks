const USERS_DATA = []
let users_data_filtered = []
const RESULTS = document.getElementById('results')
const SORT = document.getElementById('sort')
const FILTER = document.getElementById('filter')
const FILTER_PARAMETERS = {}

class User {
  constructor(randomUserAPIRecord) {
    this.name = randomUserAPIRecord.name.first
    this.surname = randomUserAPIRecord.name.last
    this.gender = randomUserAPIRecord.gender
    this.age = randomUserAPIRecord.dob.age
    this.country = randomUserAPIRecord.location.country
    this.city = randomUserAPIRecord.location.city
    this.phone = randomUserAPIRecord.phone
    this.image = randomUserAPIRecord.picture.large
  }
  static compare = {
    name: (a, b) => `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`),
    surname: (a, b) => `${a.surname} ${a.name}`.localeCompare(`${b.surname} ${b.name}`),
    age: (a, b) => a.age - b.age,
    gender: (a, b) => a.gender.localeCompare(b.gender),
    country: (a, b) => a.country.localeCompare(b.country),
    city: (a, b) => a.city.localeCompare(b.city),
  }
}
function connectToServer() {
  let connectionAttemps = 1
  fetchUserData(connectionAttemps)
    .then((responseJSON) => {
      responseJSON.results.forEach((user) => USERS_DATA.push(new User(user)))
      users_data_filtered = [...USERS_DATA]
      showResults(users_data_filtered)
    })
    .catch((error) => {
      connectionAttemps++
      fetchUserData(connectionAttemps)
    })
}
function fetchUserData(connectionAttemps) {
  let apiUrl = 'https://randomuser.me/api/1.3/'
  let fields = ['name', 'gender', 'location', 'dob', 'phone', 'picture']
  let usersQuantity = 30
  RESULTS.innerHTML = `<div class='connection_message'>Please wait. Connecting to server. Attemp: ${connectionAttemps}</div>`
  return fetch(`${apiUrl}?results=${usersQuantity}&inc=${fields.join(',')}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => response.json())
}
function showResults(usersData) {
  RESULTS.innerHTML = usersData.map((user) => getUserCard(user)).join('')
}
const sorter = {
  ascending: (userData, fieldToSort) =>
    userData.slice().sort((a, b) => User.compare[fieldToSort](a, b)),
  descending: (userData, fieldToSort) =>
    userData.slice().sort((a, b) => User.compare[fieldToSort](b, a)),
}
function filter(userData, parameters) {
  Object.keys(parameters).forEach((key) => {
    if (['name', 'surname', 'country', 'city', 'gender'].includes(key)) {
      userData = userData.filter((user) =>
        user[key].toLowerCase().startsWith(parameters[key])
      )
    }
  })
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
    showResults(sorter[SORT.order.value](users_data_filtered, SORT.field.value))
  }
})
FILTER.addEventListener('input', ({ target: { name, value } }) => {
  if (value) FILTER_PARAMETERS[name] = value.toLowerCase()
  else delete FILTER_PARAMETERS[name]
  users_data_filtered = filter(USERS_DATA, FILTER_PARAMETERS)
  showResults(users_data_filtered)
})

connectToServer()
