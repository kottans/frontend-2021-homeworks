import { updateUsersToShow } from './userService.js'

export class Settings {
  constructor() {
    this.gender = 'both'
    this.sortType = 'A-Z'
    this.nameFilter = ''
    this.ageFilter = null
  }

  applySettings({ target }) {
    const value = target.value
    switch (target.name) {
      case 'gender':
        this.gender = value
        break;
      case 'sort-type':
        this.sortType = value
        break;
      case 'name-filter':
        this.nameFilter = value
        break;
      case 'age-filter':
        if (value === '') {
          this.ageFilter = null
        } else {
          this.ageFilter = parseInt(value)
        }
    }

    updateUsersToShow()
  }
}


export const settings = new Settings()
document.querySelector('#settings-form').addEventListener('input', (event) => { settings.applySettings(event) })
