import { createGameScene } from './game.js'

let currentScene = -1;
const mainContainer = document.querySelector('.container')

function createSceneElement({ sceneType = "text", content }) {
  if (sceneType === "game") {
    return content
  }

  const sceneContainer = document.createElement('div')
  sceneContainer.classList.add('scene-background')

  const sceneContent = document.createElement('div')
  sceneContent.classList.add('scene-content')
  sceneContent.innerHTML = content
  sceneContainer.appendChild(sceneContent)

  if (sceneType !== "final") {
    const nextSceneButton = document.createElement('button')
    nextSceneButton.textContent = 'Next'
    nextSceneButton.classList.add('next-button')
    nextSceneButton.addEventListener('click', nextScene)
    
    sceneContainer.appendChild(nextSceneButton)
  }

  return sceneContainer
}

export function nextScene() {
  currentScene++;
  if (currentScene >= scenesElements.length) { return }
  mainContainer.innerHTML = ''
  mainContainer.appendChild(scenesElements[currentScene])
}

const disclaimerScene = {
  sceneType: 'text',
  content: `
  <div class="scene-main-text">
    Disclaimer! All rights regarding Genshin Impact trademarks belong to Mihoyo. This project was created purely for learning purposes.
  </div>
  `
}

const greetingsScene = {
  sceneType: 'text',
  content: `
    <img class="greetings-paimon" src="images/paimon.png">
    <div class="scene-main-text">
      Greetings, Traveler! My name is Paimon, the best guide in the world! Welcome to the world, known as Teyvat. In Teyvat everything around you resonates with elemental energy. This energy resembles building block of this world and keeps eveything in balance. But there is one dark mage that tends to destroy this precious world. He somehow found a way to shuffle all the elements to create chaos. We need to stop him and we can start by doing something simple. I\'ve gathered some elemental energy. Come, help me sort it! You need to find pairs of the same element for them to resonate again. Good luck, traveler!
    </div>
  `
}

const congratulationsScene = {
  sceneType: 'final',
  content: `
    <img class="congratulations-paimon" src="images/paimon.png">
    <div class="scene-main-text">
      Mission complete, Traveler! Now that these elements are sorted out, we know how to bring everything to order. Thank you for your help and good luck on your adventures!
    </div>
  `
}

const gameScene = createGameScene()

const scenesSequence = [
  disclaimerScene,
  greetingsScene,
  gameScene, 
  congratulationsScene
]

export const scenesElements = scenesSequence.map(scene => createSceneElement(scene))
