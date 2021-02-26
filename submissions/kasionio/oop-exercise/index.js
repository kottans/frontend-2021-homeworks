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
      this.friends = [];
  }

  addFriends = (...friendsInstances) => this.friends.includes(...friendsInstances) ? false : this.friends = [...this.friends, ...friendsInstances];

  getFriendsNames = () => this.friends.length > 0 ? this.friends.map(friend => friend.name) : 'forever alone...';

  toString() {
      const properties = ['species', 'name', 'gender', 'legs', 'saying'];
      return properties.map(prop => `${prop}: ${this[prop]}`)
          .join('; ') + `; friends: ${this.getFriendsNames()}`
  }
}

class HumanBeing extends Inhabitant {
  constructor(species, name, gender, saying) {
      super(species, name, gender, 2, saying);
      this.hands = 2;
  }
  toString() {
      return super.toString() + `; hands: ${this.hands};`
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

man.addFriends(woman, cat);
woman.addFriends(man, cat);
dog.addFriends(man);
catWoman.addFriends(cat);

const inhabitants = [man, woman, catWoman, cat, dog];

inhabitants.forEach(inhabitant => print(inhabitant));

