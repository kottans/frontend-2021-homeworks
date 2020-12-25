/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here


class Creature {
  constructor(species, name, age, gender, legs, say, friends) {
    this.species = species;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.legs = legs;
    this.saying = say;
    this._friends = friends
  }

  get friends() {
    let friendsRepresentation = '';
    if (this._friends && this._friends.length > 0) {
      friendsRepresentation = this._friends.join(', ');
    }
    return friendsRepresentation;
  }

  getAllCharacteristics() {
    return [
      `${this.species}`,
      `<strong>${this.name}</strong>`,
      `${this.age}`,
      `${this.gender}`,
      `${this.legs}`,
      `${this.saying}`,
      `${this.friends}`,
    ]
  }

  toString() {
    return this.getAllCharacteristics().join('; ')
  }
}

class Human extends Creature {
  constructor(name, age, gender, saying, friends) {
    let species = 'human';
    let legs = 2;
    super(species, name, age, gender, legs, saying, friends);
    this.hands = 2;
  }

  getAllCharacteristics() {
    let characteristics = super.getAllCharacteristics();
    characteristics.splice(5, 0, `${this.hands}`);
    return characteristics;
  }
}

class Man extends Human {
  constructor(name, age, saying, friends) {
    let gender = 'male';
    super(name, age, gender, saying, friends);
  }
}

class Woman extends Human {
  constructor(name, age, saying, friends) {
    let gender = 'female';
    super(name, age, gender, saying, friends);
  }
}

class Animal extends Creature {
  constructor(species, name, age, gender, say, friends) {
    let legs = 4;
    super(species, name, age, gender, legs, say, friends);
  }
}

const man = new Man('Jon', 35, 'Winter is coming!', ['Ghost', 'Ygritte']);
const woman = new Woman('Ygritte', 25, 'You Know Nothing, Jon Snow!', ['Jon']);
const direwolf = new Animal('direwolf', 'Ghost', 1, 'male', 'woof-woof!');
const cat = new Animal('cat', 'Tiger', 1, 'female', 'meow!');

const inhabitants = [man, woman, direwolf, cat];
inhabitants.forEach(obj => print(obj));
