/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/NJul/a-tiny-JS-world
   Web app: https://njul.github.io/a-tiny-JS-world/
  */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
  constructor(species, name, gender, legs, hands, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = Array.isArray(friends) ? friends.join(', ') : 'no one';
  }
  toString() {
    return `My name is <strong>${this.name}</strong>. I'm a ${this.species}. I'm a ${this.gender}. I have ${this.legs} legs and ${this.hands} hands. My friends: ${this.friends}. <strong>${this.saying}</strong>`;
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying, friends) {
    super('human', name, gender, 2, 2, saying, friends);
  }
}

class Dog extends Inhabitant {
  constructor(name, gender, friends) {
    super('dog', name, gender, 4, 0, `Woof-woof!`, friends);
  }
}

class Cat extends Inhabitant {
  constructor(name, gender, friends) {
    super('cat', name, gender, 4, 0, 'Meow-meow', friends);
  }
}

class CatWoman extends Cat {
  constructor(name, gender, friends) {
    super(name, gender, friends);
    this.species = 'cat-woman';
    this.legs = 2;
    this.hands = 2;
  }
}

const man = new Human('Arnold', 'male', `I'll be back`);

const woman = new Human(
  'Lara',
  'female',
  `There are things that shouldn't be found`,
  ['Chica', 'Arnold']
);

const dog = new Dog('Chica', 'female', ['Lara', 'Arnold']);

const cat = new Cat('Barsik', 'male');

const catWoman = new CatWoman('Selina', 'female', ['Barsik']);

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Output: My name is Arnold. I'm a human. I'm a male. I have 2 legs and 2 hands. My friends: no one. I'll be back */

const allInhabitants = [man, woman, dog, cat, catWoman];

allInhabitants.forEach((inhabitant) => print(inhabitant), 'div');

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
