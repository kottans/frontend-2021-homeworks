/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kasionio/a-tiny-JS-world/tree/gh-pages
   Web app: https://kasionio.github.io/a-tiny-JS-world
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
  constructor(species, name, gender, legs, saying, friends = 'forever alone') {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.saying = saying;
      this.friends = friends;
  }

  addFriends(...friends)  {
    this.friends = [...friends].map(friend => friend.name).join(', ');
  }

  getOutput() {
    const properties = ['species', 'name', 'gender', 'legs', 'saying', 'friends'];
    return properties.map(prop => `${prop}: ${this[prop]}`)
    .join('; '); 
  }
}

class HumanBeing extends Inhabitant {
  constructor(species, name, gender, saying, hands) {
      super(species, name, gender, 2, saying);
      this.hands = 2;
  }
  getOutput() {
    return super.getOutput() + `; hands: ${this.hands};`
  } 
}

class Human extends HumanBeing {
  constructor(name, gender, saying) {
    super('human', name, gender, saying);
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
      super('cat', name, gender);
      this.saying = Cat.say()
  }
  static say() {
    return 'meow';
  } 
}

class CatWoman extends HumanBeing {
  constructor(name) {
      super('catWoman', name, 'female', Cat.say());
  }
}

let man = new Man('Arnold', 'Hasta la vista, baby!');
let woman = new Woman('Kate', 'Merry Christmas!');
let cat = new Cat('Bobby', 'male');
let dog = new Dog('Toby', 'male');
let catWoman = new CatWoman('Betty');

man.addFriends(woman, cat, dog);
woman.addFriends(man, cat);
dog.addFriends(man);
catWoman.addFriends(cat)

const inhabitants = [man, woman, catWoman, cat, dog];

inhabitants.forEach(inhabitant => print(inhabitant.getOutput()))
