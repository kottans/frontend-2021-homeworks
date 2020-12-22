/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/VBystrov/a-tiny-JS-world
   Web app: https://vbystrov.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

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
      `name: ${this.name}; `,
      `gender: ${this.gender}; `,
      `species: ${this.species}; `,
      `saying: ${this.saying}; `,
      `legs: ${this.legs}; `,
    ];

    if (this.friends.length > 0) {
      template.push(`friends: ${this.friends}; `);
    }
    return template.join('');
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

const dog = new Dog('Globgor', 'male');
const cat = new Cat('Eclipsa', 'female');
const woman = new Woman('Star');
const man = new Man('Marko');
man.addFriends(cat, woman);
woman.addFriends(man, dog);
dog.addFriends(cat, woman, man);

const creatures = [dog, cat, woman, man];

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

creatures.forEach((creature) => {
  print(creature);
});

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
