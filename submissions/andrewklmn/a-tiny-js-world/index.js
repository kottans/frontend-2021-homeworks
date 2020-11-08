/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/andrewklmn/a-tiny-JS-world
   Web app: https://andrewklmn.github.io/a-tiny-JS-world/
   */
// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor ({ species, name, gender, legs = 0, hands = 0, saying, friends = [] }) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = friends;
  }

  getFriendsList () {
    if (this.friends.length > 0) {
      return this.friends.map(friend => friend.name).join(', ');
    }
    return 'No friends!';
  }

  toString () {
    return `${this.species}; ${this.name}; ${this.gender}; ${this.legs}; ${this.hands}; ${this.saying}; ${this.getFriendsList()}`;
  }

  addFriends(friends){
    this.friends = this.friends.concat(friends);
  }
}

class Pet extends Inhabitant {
  constructor ({ species, name, gender, saying }) {
    super({ species, name, gender, legs: 4, saying });
  }
}

class Dog extends Pet {
  constructor ({ name, gender }) {
    super({ species: 'dog', name, gender, saying: 'woof!' });
  }
}

class Cat extends Pet {
  constructor ({ name, gender }) {
    super({ species: 'cat', name, gender, saying: 'meow!' });
  }
}

class Human extends Inhabitant {
  constructor ({ name, gender, saying }) {
    super({ species: 'human', name, gender, legs: 2, hands: 2, saying });
  }
}

class Woman extends Human {
  constructor({ name, saying }) {
    super({ name, gender: 'woman', saying });
  }
}

class Man extends Human {
  constructor({ name, saying }) {
    super({ name, gender: 'man', saying });
  }
}

class CatWoman extends Woman {
  constructor() {
    const catSpirit =new Cat({ name: 'Cat-woman', gender: 'female'});
    super({ name: catSpirit.name, saying: catSpirit.saying });
  }
}

// define inhabitants
const dog = new Dog({ name: 'Dyuka', gender: 'male' });
const cat = new Cat({ name: 'Barsik', gender: 'male' });
const woman = new Woman({ name: 'Leeloo Dallas', saying: 'Multi-pass!' });
const man = new Man({ name: 'Korben Dallas', saying: 'Hello there!' });
const catWoman = new CatWoman();


const inhabitants = [
  dog,
  cat,
  woman,
  catWoman,
  man,
];

// define friends for everyone except the cat...
dog.addFriends([man, woman, cat]);
woman.addFriends([man, dog, cat]);
man.addFriends([woman, dog, cat, catWoman]);
catWoman.addFriends([cat]);

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

  // ... other objects ...
  inhabitants.forEach( creature => {
    print(creature.toString());
  });

  // ... other print-outs ...

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
