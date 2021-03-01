let isMusicMuted = false;
const turnedOnVolume = 0.05

const music = document.createElement('audio')
music.setAttribute('src', 'src/music.mp3')
music.setAttribute('loop', '')
music.volume = turnedOnVolume

const muteButton = document.createElement('button')
muteButton.classList.add('mute')
muteButton.addEventListener('click', musicToggler)
const body = document.querySelector('body')

export function createMusic() {
  body.appendChild(music)
  body.appendChild(muteButton)
  music.play()
}

function musicToggler() {
  muteButton.classList.toggle('muted')
  if (isMusicMuted) {
    music.volume = turnedOnVolume
    isMusicMuted = false
  } else {
    music.volume = 0
    isMusicMuted = true
  }
}
