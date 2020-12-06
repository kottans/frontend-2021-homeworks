class Inhabitant {
  constructor({ species, name, gender, legs, hands, say }) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.say = say;
    this.friends = [];
  }

  makeFriends(...args) {
    const { friends } = this;

    args.forEach((item) => {
      if (item instanceof Inhabitant && item != this && !friends.includes(item.name)) {
        friends.push(item.name);
      }
    });
  }

  toString() {
    const { name, species, gender, legs, hands, say, friends } = this;

    const aboutFriends = (friends.length) ? `My friends: ${friends.join(', ')}.` : '';

    return `${say} About me: ${species}, ${gender}, ${name}, ${hands || 'no'} hands, ${legs} legs. ${aboutFriends}`;
  }
}

class Pet extends Inhabitant {
  constructor({ species, name, gender, say }) {
    super({ species, name, gender, legs: 4, hands: 0, say });
  }
}

class Dog extends Pet {
  constructor({ name, gender }) {
    super({ species: 'dog', name, gender, say: 'WOOF-WOOF!!!' });
  }
}

class Cat extends Pet {
  constructor({ name, gender }) {
    super({ species: 'cat', name, gender, say: 'Meow...' });
    this.friends = [this.name];
  }
}

class Human extends Inhabitant {
  constructor({ name, gender, say }) {
    super({ species: 'human', name, gender, legs: 2, hands: 2, say });
  }

  toString() {
    const { name, species, gender, legs, hands, say, friends } = this;

    const aboutFriends = (friends.length) ? `I am friends with ${friends.join(', ')}.` : '';

    return `${say} My name is ${name} end I'm ${species}, ${gender}. Obviously, I have ${legs} legs and ${hands} hands.
${aboutFriends}`;
  }
}

class CatWoman extends Human {
  constructor({ name, say }) {
    super({ name, gender: 'female', say });
    this.species = 'humacat';
  }
}

const cat = new Cat({ name: 'Murka', gender: 'female' });
const dog = new Dog({ name: 'Gektor', gender: 'male' });
const man = new Human({ name: 'Donald', gender: 'male', say: 'Aloha!' });
const woman = new Human({ name: 'Eva', gender: 'female', say: 'Hello.' });
const catWoman = new CatWoman({ name: 'Akrum', say: 'Meow!' });

const inhabitants = [cat, dog, man, woman, catWoman];

inhabitants.forEach((item) => {
  dog.makeFriends(item);
  woman.makeFriends(item);
});
man.makeFriends(woman, catWoman, dog);
catWoman.makeFriends(woman, cat)

inhabitants.forEach((item) => print(item));
