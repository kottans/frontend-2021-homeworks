class Mammal {
  constructor(name, gender, saying) {
    this.name = name;
    this.gender = gender;
    this.saying = saying;
  }
  toString() {
    return `${this.name}; ${this.gender}; ${this.saying}`;
  }
}

class Animal extends Mammal {
  constructor(name, gender, saying, legs = 4) {
    super(name, gender, saying);
    this.species = 'animal';
    this.legs = legs;
  }
  toString() {
    return `${super.toString()}; ${this.species}; ${this.legs}`;
  }
}

class Human extends Mammal {
  constructor(name, gender, saying, friend, legs = 2, hands = 2) {
    super(name, gender, saying);
    this.species = 'human';
    this.friend = friend;
    this.legs = legs;
    this.hands = hands;
  }
  toString() {
    return `${super.toString()}; ${this.species}; ${this.legs}; ${
      this.hands
    }; ${this.friend}`;
  }
}

class Cat extends Animal {
  constructor(name, gender, saying, friend) {
    super(name, gender, saying);
    this.species = 'cat';
    this.friend = friend;
  }
  toString() {
    return `${super.toString()}; ${this.friend}`;
  }
}
class Dog extends Animal {
  constructor(name, gender, saying, friend) {
    super(name, gender, saying);
    this.species = 'dog';
    this.friend = friend;
  }
  toString() {
    return `${super.toString()}; ${this.friend}`;
  }
}
class Werewolf extends Human {
  constructor(name, gender, saying, friend, transforms) {
    super(name, gender, saying);
    this.species = 'werewolf';
    this.friend = friend;
    this.transforms = transforms;
  }
  toString() {
    return `${super.toString()}; ${this.transforms}`;
  }
}

const man = new Human('Bob', 'male', 'Hi!', 'Bobik');
const woman = new Human('Lara', 'female', 'Hello!', 'Zarina');
const dog = new Dog('Bobik', 'male', 'Woof-Woof', 'Bob');
const cat = new Cat('Zarina', 'female', `Meow-Meow`, 'Lara');
const werewolf = new Werewolf(
  'Dorian',
  'male',
  `Lingering howl!`,
  'Bobik',
  'full moon'
);

const inhabitants = [man, woman, dog, cat, werewolf];

inhabitants.forEach((inhabitant) => print(inhabitant));
