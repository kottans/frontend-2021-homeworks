/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/VBystrov/a-tiny-JS-world
   Web app: https://vbystrov.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Creature {
  constructor(name, gender = 'unknown') {
    this.name = name;
    this.gender = gender;
    this.friends = [];
  }

  addFriends(...newFriends) {
    newFriends.forEach(({ name }) => this.friends.push(name));
    return this.friends;
  }
}

class Dog extends Creature {
  constructor(name, gender) {
    super(name, gender);
    this.species = 'dog';
    this.legs = 4;
    this.saying = 'woof!';
  }
}

class Cat extends Creature {
  constructor(name, gender) {
    super(name, gender);
    this.species = 'cat';
    this.legs = 4;
    this.saying = 'mew-mew-mew-mew';
  }
}

class Human extends Creature {
  constructor(name, gender) {
    super(name, gender);
    this.species = 'homo sapiens';
    this.legs = 2;
    this.hands = 2;
  }
}

class Woman extends Human {
  constructor(name) {
    super(name, 'female');
    this.saying = 'I am a woman.';
  }
}

class Man extends Human {
  constructor(name) {
    super(name, 'male');
    this.saying = 'I am a man.';
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

const getTemplate = (creature) => {
  let template = '';
  for (let key in creature) {
    if (key === 'friends' && !creature[key].length) {
      continue;
    }
    if (creature[key]) {
      template += `${key}: ${creature[key]}; `;
    }
  }

  return template;
};

creatures.forEach((creature) => {
  print(getTemplate(creature));
});

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
