import { loadUsers } from './userService.js'
import { peekUser, closePeekedUser } from './userService.js'
import handleMenu from './mobileMenuLogic.js'

const startingUsersAmount = 10

const addMoreButton = document.querySelector('#addUsers')

document.addEventListener('click', peekUser)
document.addEventListener('click', closePeekedUser)

addMoreButton.addEventListener('click', () => { loadUsers(20) })

loadUsers(startingUsersAmount)

const mobileMenuButton = document.querySelector('.mobile-menu')
mobileMenuButton.addEventListener('click', handleMenu)
