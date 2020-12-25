/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/ORybka/a-tiny-JS-world
   Web app: https://orybka.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(species, name, gender, legs, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.friends = friends;
  }

  callFriends() {
    return this.friends.join(', ');
  }

  getValues() {
    return [this.species, `<strong>${this.name}</strong>`, this.gender, this.legs, `<em>${this.saying}</em>`, this.callFriends()];
  }

  printValues() {
    return this.getValues().join('; ');
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying, friends) {
    super('human', name, gender, 2, saying, friends);
    this.hands = 2;
  }

  getValues() {
    return [...super.getValues(), this.hands];
  }
}

const man = new Human('John', 'male', "Hey! What's up?", ['Mary', 'Marley', 'Tisha']);
const woman = new Human('Mary', 'female', 'Hey there!', ['John', 'Marley', 'Tisha']);

class Animal extends Inhabitant {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, 4, saying, friends);
  }
}

const dog = new Animal('dog', 'Marley', 'male', 'woof-woof!', ['John', 'Mary', 'Selina']);
const cat = new Animal('cat', 'Tisha', 'male', 'meow-purr!', []);

class CatWoman extends Inhabitant {
  constructor(name, gender, friends) {
    super('catWoman', name, gender, 2, cat.saying, friends);
  }
}

const catWoman = new CatWoman('Selina', 'female', ['Tisha']);

// ======== OUTPUT ========

[man, woman, dog, cat, catWoman].forEach((el) => print(el.printValues(), 'div'));
