const USERS_DATA = []
const USERS_QUANTITY = 30
const RESULTS = document.getElementById('results')
const SORT = document.getElementById('sort')
const FILTER = document.getElementById('filter')
const REQUEST_PARAMETERS = {order: 'ascending'}
let connectionAttemps = 1

function connectToServer() {
  RESULTS.innerHTML = `<div class='connection_message'>Please wait. Connecting to server. Attemp: ${connectionAttemps}</div>`
  connectionAttemps++
  fetchUserData(showResults, connectToServer)
}
function fetchUserData(onReady, onError) {
  let apiUrl = 'https://randomuser.me/api/1.3/'
  let fields = ['name', 'gender', 'location', 'dob', 'phone', 'picture']
  fetch(`${apiUrl}?results=${USERS_QUANTITY}&inc=${fields.join(',')}`, {headers: {'Content-Type': 'application/json'}})
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)}
      return response})
    .then(response => response.json())
    .then(responseJSON => {
      if (responseJSON.hasOwnProperty('results')) {
        pushUserData(responseJSON.results)
        onReady()}
      else onError()
    }).catch(error => onError(error))
}
function pushUserData(randomUserResults) {
  randomUserResults.forEach(user => USERS_DATA.push(
      {name: user.name.first,
       surname: user.name.last,
       gender: user.gender,
       age: user.dob.age,
       country: user.location.country,
       city: user.location.city,
       phone: user.phone,
       image128px: user.picture.large}))
}
function showResults() {
  RESULTS.innerHTML = getUserDataToShow(USERS_DATA, REQUEST_PARAMETERS).map(user => getUserCard(user)).join('')
  SORT.innerHTML = [`<div class='sort_line'>Sort by: ${getSortLinks(REQUEST_PARAMETERS.sort)}</div>`,
                  `<div class='sort_line'> Order: ${getSortOrderLinks(REQUEST_PARAMETERS.order)}</div>`].join('')
}
function getUserDataToShow(userData, parameters) {
  return sort(filter(userData, parameters), parameters)
}
function sort(userData, parameters) {
  if (parameters.hasOwnProperty('sort')) {
    let sortedData = sortAscending(userData, parameters.sort)
    if (parameters.hasOwnProperty('order') && parameters['order']==='descending') sortedData.reverse()
    return sortedData
  }
  else return userData
}
function sortAscending(userData, propertyToSort) {
  if (propertyToSort === 'name') return sortAscendingFullName(userData, 'name', 'surname')
  else if (propertyToSort === 'surname') return sortAscendingFullName(userData, 'surname', 'name')
  else if (propertyToSort === 'age') return sortAscendingNumeric(userData, 'age')
  else return sortAscendingString(userData, propertyToSort)
}
function sortAscendingFullName(userData, firstToSort, secondToSort) {
  let sortedData = userData.slice()
  sortedData.sort((a,b) => {return `${a[firstToSort]} ${a[secondToSort]}`.localeCompare(`${b[firstToSort]} ${b[secondToSort]}`)})
  return sortedData
}
function sortAscendingNumeric(userData, propertyToSort) {
  let sortedData = userData.slice()
  sortedData.sort((a,b) => {return a[propertyToSort] - b[propertyToSort]})
  return sortedData
}
function sortAscendingString(userData, propertyToSort) {
  let sortedData = userData.slice()
  sortedData.sort((a,b) => {
    if (a[propertyToSort] > b[propertyToSort]) return 1
    else if (a[propertyToSort] < b[propertyToSort]) return -1
    else return 0})
  return sortedData
}
function filter(userData, parameters) {
  Object.keys(parameters).forEach(key => {
    if (['name', 'surname', 'country', 'city'].includes(key)) {
      userData = userData.filter(user => user[key].toLowerCase().startsWith(parameters[key]))}
    else if (key==='gender') {
      userData = userData.filter(user => user.gender.toLowerCase()===parameters.gender)}
    else if (key==='age_from') {
      userData = userData.filter(user => user.age >= parameters.age_from)}
    else if (key==='age_till') {
      userData = userData.filter(user => user.age <= parameters.age_till)}
  })
  return userData
}
function getUserCard(userData) {
  return [`<div class='card'>`,
            `<img class='photo' alt='${userData.name} ${userData.surname} photo' src='${userData.image128px}'>`,
            `<p class='name'>${userData.name} ${userData.surname}</p>`,
            `<p class='demographics card_text'>${userData.gender}, ${userData.age} years</p>`,
            `<p class='city card_text'>${userData.city}</p>`,
            `<p class='country card_text'>${userData.country}</p>`,
            `<p class='phone card_text'>${userData.phone}</p>`,
          `</div>`].join('')
}
function getSortLinks(currentSort) {
  return ['name', 'surname', 'age', 'gender', 'city', 'country'].map(property => {
    if (property === currentSort) return `<span class='sorting_selected'>${property}</span>`
    else return `<a href='#sort=${property}' class='sorting_option'>${property}</a>`
  }).join(' ')
}
function getSortOrderLinks(currentOrder) {
  return ['ascending', 'descending'].map(orderType => {
    if (orderType === currentOrder) return `<span class='sorting_selected'>${orderType}</span>`
    else return `<a href='#order=${orderType}' class='sorting_option'>${orderType}</a>`
  }).join(' ')
}

SORT.addEventListener('click', evt => {
  if (evt.target.hash!==undefined) {
    [property, value] = evt.target.hash.slice(1).split('=')
    REQUEST_PARAMETERS[property] = value
    showResults()
  }
  evt.preventDefault()
})
FILTER.addEventListener('input', evt => {
  ['name', 'surname', 'age_from', 'age_till', 'city', 'country'].forEach(key => {
    FILTER[key].value.length>0 ? REQUEST_PARAMETERS[key] = FILTER[key].value.toLowerCase() : delete REQUEST_PARAMETERS[key]
  })
  FILTER.gender.value!=='all' ? REQUEST_PARAMETERS.gender = FILTER.gender.value : delete REQUEST_PARAMETERS.gender
  showResults()
})

connectToServer()
