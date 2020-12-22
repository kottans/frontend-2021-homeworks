class Creature {
  constructor(name, gender, species, legs, saying) {
    this.name = name;
    this.gender = gender;
    this.species = species;
    this.legs = legs;
    this.saying = saying;
    this.friends = [];
  }

  addFriends(...newFriends) {
    newFriends.forEach(({ name }) => this.friends.push(name));
    return this.friends;
  }

  toString() {
    let template = [
      `name: ${this.name}`,
      `gender: ${this.gender}`,
      `species: ${this.species}`,
      `saying: ${this.saying}`,
      `legs: ${this.legs}`,
    ]

    if (this.friends.length > 0) {
      template.push(`friends: ${this.friends}; `);
    }
    return template.join('; ');
  }
}

class Dog extends Creature {
  constructor(name, gender) {
    super(name, gender, 'dog', 4, 'woof!');
  }
}

class Cat extends Creature {
  constructor(name, gender) {
    super(name, gender, 'cat', 4, 'mew-mew-mew-mew');
  }
}

class Human extends Creature {
  constructor(name, gender, saying) {
    super(name, gender, 'homo sapiens', 2, saying);
    this.hands = 2;
  }

  toString() {
    return [super.toString(), `hands: ${this.hands}`].join('');
  }
}

class Woman extends Human {
  constructor(name) {
    super(name, 'female', 'I am a woman.');
  }
}

class Man extends Human {
  constructor(name) {
    super(name, 'male', 'I am a man.');
  }
}

const dog = new Dog('Alex', 'male');
const cat = new Cat('Dora', 'female');
const woman = new Woman('Anna');
const man = new Man('Elon');
man.addFriends(cat, woman);
woman.addFriends(man, dog);
dog.addFriends(cat, woman, man);

const creatures = [dog, cat, woman, man];

creatures.forEach((creature) => {
  print(creature);
});
