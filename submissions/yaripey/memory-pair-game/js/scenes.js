import { Scene } from './game.js'
import { game } from './main.js'

// Warning scene, comes first
const warning = new Scene()

warning.background = document.createElement('div')
warning.background.setAttribute('class', 'warning-background')

warning.mainText = document.createElement('div')
warning.mainText.setAttribute('class', 'warning-main-text')
warning.mainText.textContent = 'Disclamer! All right about Genshin Impact trademarks belong to Mihoyo. This project war created purely for learning purposes.'

warning.closeButton = document.createElement('button')
warning.closeButton.setAttribute('class', 'warning-close-button')
warning.closeButton.textContent = 'CLOSE'
warning.closeButton.addEventListener('click', () => { game.nextScene(); game.startMusic() })

warning.background.appendChild(warning.mainText)
warning.background.appendChild(warning.closeButton)
warning.container.appendChild(warning.background)


// Greetings scene, comes second
const greetings = new Scene()

greetings.background = document.createElement('div')
greetings.background.setAttribute('class', 'greetings-background')

greetings.paimon = document.createElement('img')
greetings.paimon.setAttribute('class', 'greetings-paimon')
greetings.paimon.setAttribute('src', 'images/paimon.png')

greetings.mainText = document.createElement('div')
greetings.mainText.setAttribute('class', 'greetings-main-text')
greetings.mainText.textContent = 'Greetings, Traveler! My name is Paimon, the best guide in the world! Welcome to the world, known as Teyvat. In Teyvat everything around you resonates with elemenetal energy. This energy resembles building block of this world and keeps eveything in balance. But there is one dark mage that tends to destroy this precious world. He somehow found a way to shuffle all the elements to create chaos. We need to stop him and we can start by doing something simple. I\'ve gathered some elemental energy. Come, help me sort it! You need to find pairs of the same element for them to resonate again. Good luck, traveler!'

greetings.closeButton = document.createElement('button')
greetings.closeButton.setAttribute('class', 'greetings-close-button')
greetings.closeButton.textContent = "CLOSE";
greetings.closeButton.addEventListener('click', () => { game.nextScene() });

greetings.background.appendChild(greetings.paimon)
greetings.background.appendChild(greetings.mainText)
greetings.background.appendChild(greetings.closeButton)
greetings.container.appendChild(greetings.background)


// Final scene after you win
const congratulations = new Scene()

congratulations.background = document.createElement('div')
congratulations.background.setAttribute('class', 'congratulations-background')

congratulations.paimon = document.createElement('img')
congratulations.paimon.setAttribute('class', 'congratulations-paimon')
congratulations.paimon.setAttribute('src', 'images/paimon.png')

congratulations.mainText = document.createElement('div')
congratulations.mainText.setAttribute('class', 'congratulations-main-text')
congratulations.mainText.textContent = "Mission complete, Traveler! Now that these elements are sorted out, we know how to bring everything to order. Thank you for your help and good luck on your adventures!"

congratulations.background.appendChild(congratulations.paimon)
congratulations.background.appendChild(congratulations.mainText)
congratulations.container.appendChild(congratulations.background)

export { warning, greetings, congratulations }
