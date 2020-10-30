/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
"use strict";

class Animal {
  constructor(name, saying, gender, species ) {
    this.name = name;
    this.gender = gender;
    this.species = species;
    this.saying = saying;
  }

  say() {
    return `i'm ${this.species}; My name is: <strong> ${this.name} </strong>; My gender: ${this.gender}; Saying: <em> ${this.saying} </em>`;
  }
}

class Pet extends Animal {
  constructor(name, saying, gender,  species, paws) {
    super(name, saying, gender,  species, paws);
    this.paws = paws || 4;
  }
  say() {
    return super.say() + `; I have ${this.paws} paws`;
  }
}

class Dog extends Pet {
  constructor(name, saying, gender,  species, paws) {
    super(name, saying,  gender, species = "dog",  paws);
  }
}

class Cat extends Pet {
  constructor(name, saying,  gender, species, paws) {
    super(name, saying, gender,  species = "cat",  paws);
  }
}

class Homo extends Animal {
  constructor(name,  saying, gender, species,  legs, hands) {
    super(name, saying, gender, species = "human",  legs, hands);
    this.hands = hands || 2;
    this.legs = legs || 2;
  }
  say() {
    return super.say() + `; I have ${this.legs} legs, ${this.hands} hands`;
  }
}

class Man extends Homo {
  constructor(name, saying, gender,  species, legs, hands) {
    super(name, saying, gender = "male",  species,  legs, hands);
  }
}

class Woman extends Homo {
  constructor(name, saying, gender,  species, legs, hands) {
    super(name, saying, gender = "female",  species,  legs, hands);
  }
}

const inhabitans = [
  new Dog("Coby", "woof-woof", "Male"),
  new Cat("Briant", "meow", "Female" ),
  new Man("Keith", "Hello guys"),
  new Woman("Janet", "I'm here"),
];

inhabitans.forEach(el => {
  print(el.say());
});

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
