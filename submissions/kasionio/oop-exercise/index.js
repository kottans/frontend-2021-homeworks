/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kasionio/a-tiny-JS-world/tree/gh-pages
   Web app: https://kasionio.github.io/a-tiny-JS-world
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
  constructor(species, name, gender, legs, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.saying = saying;
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying, hands) {
      super('human', name, gender, 2, saying);
      this.hands = 2;
  }
}

class Man extends Human {
  constructor(name, saying) {
      super(name, 'male', saying);
  }
}

class Woman extends Human {
  constructor(name, saying) {
      super(name, 'female', saying);
  }
}

class Animal extends Inhabitant {
  constructor(species, name, gender, saying) {
      super(species, name, gender, 4, saying);
  }
}

class Dog extends Animal {
  constructor(name, gender) {
      super('dog', name, gender, 'woof-woof');
  }
}

class Cat extends Animal {
  constructor(name, gender) {
      super('cat', name, gender, 'meow');
  }
}

class CatWoman extends Inhabitant {
  constructor(name) {
      super('catWoman', name, 'female', 2, cat.saying);
  }
}

let man = new Man('Arnold', 'Hasta la vista, baby!');
let woman = new Woman('Kate', 'Merry Christmas!');
let cat = new Cat('Bobby', 'male');
let dog = new Dog('Toby', 'male');
let catWoman = new CatWoman('Betty');

const inhabitants = [man, woman, catWoman, cat, dog];
const properties = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];

const message = (inhabitants) => inhabitants.map(inhabitant => properties.map(prop => inhabitant[prop] ? inhabitant[prop] : 'undefined')
  .join('; '))
  .join('\n');

print(message(inhabitants));
