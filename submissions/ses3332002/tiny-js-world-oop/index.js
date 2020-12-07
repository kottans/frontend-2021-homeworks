/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Being {
  constructor (name, friends, species) {
    this.species = species;
    this.name = name;
    this.friends = friends;
  }
  
  getDescription() {
    return Object.entries(this)
    .filter(([key]) => propsToPrint.includes(key))
    .map(([,value]) => Array.isArray(value) ? value.join(', ') : value)
    .join('; ');
  }
};

class Animal extends Being {
  constructor (name, friends, gender, saying, species) {
    super(name, friends, species);
    this.gender = gender;
    this.saying = saying;
    this.legs = 4;
    this.hands = 0;
  }
};

class Dog extends Animal {
  constructor (name, friends, gender) {
    super(name, friends, gender);
    this.species = "dog";
    this.saying = "Woof-woof!";
  }
};

class Cat extends Animal {
  constructor (name, friends, gender) {
    super(name, friends, gender);
    this.species = "cat";
    this.saying = "Meow!";
  }
};

class Human extends Animal {
  constructor (name, friends, gender, saying) {
    super(name, friends, gender, saying);
    this.species = "human";
    this.legs = 2;
    this.hands = 2;
  }
};

class Superhero extends Human {
  constructor (name, friends, gender, saying) {
    super(name, friends, gender);
    this.species = "super-hero";
  }
};

const dog = new Dog ("Toby", ["Puss"], "male");
const cat = new Cat ("Puss", ["Toby", "Halley"], "male");
const man = new Human ("Jack", ["Jennie", "Halley"], "male", "Hey baby!");
const woman = new Human ("Jennie", ["Jack", "Toby"], "female", "Hi darling!");
const catWoman = new Superhero ("Halley", ["Puss"], "female");
catWoman.saying = new Cat().saying;

const inhabitants = [dog, cat, man, woman, catWoman];
const propsToPrint = ["species", "name", "gender", "legs", "hands", "friends", "saying"];

inhabitants.forEach(item => print(item.getDescription()));

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
