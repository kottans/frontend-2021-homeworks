class Inhabitant {
  constructor(species, name, gender, legs, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.friends = 'No friends' ;
  }

  makeFriend(friend) {
    this.friends = this.friends === 'No friends' ? [] : this.friends;
    this.friends.push(friend.name);
  }
  getProperties() {
    return ['species', 'name', 'gender', 'legs', 'saying', 'friends'];
  }

  makeMessage() {
    return this.getProperties().map(property => `${capitalizeString(property)}: ${this[property]}`).join(' ')
  }
}

class Dog extends Inhabitant {
  constructor(name, gender) {
    super('dog', name, gender, 4, 'woof-woof!');
  }
}

class Cat extends Inhabitant {
  constructor(name, gender) {
    super('cat', name, gender, 4, 'mrrr!');
  }
}

class CatWoman extends Cat {
  constructor(name) {
    super(name, 'female');
    this.species = 'CatWoman';
    this.legs = 2;
    this.hands = 2;
  }
  getProperties() {
    let properties = super.getProperties();
    properties.splice(4, 0, 'hands');
    return properties;
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying) {
    super('human', name, gender, 2, saying);
    this.hands = 2;
  }

  getProperties() {
    let properties = super.getProperties();
    properties.splice(4, 0, 'hands');
    return properties;
  }
}

const man = new Human('Dmitry', 'male', 'Hello!');
const woman = new Human('Lero', 'female', 'Bye!');
const dog = new Dog('Toby', 'male');
const cat = new Cat('Sheldon', 'male');
const catWoman = new CatWoman('Mary');

dog.makeFriend(cat);
dog.makeFriend(man);
man.makeFriend(cat);
const inhabitantsArray = [dog, cat, man, woman, catWoman];

const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

inhabitantsArray.forEach(inhabitant => print(inhabitant.makeMessage()));
