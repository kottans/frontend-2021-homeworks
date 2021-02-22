/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/NJul/a-tiny-JS-world
   Web app: https://njul.github.io/a-tiny-JS-world/
  */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
  constructor(species, name, gender, legs, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.friends = Array.isArray(friends)
      ? `My friends: <strong>${friends.join(', ')}</strong>. `
      : [];
  }

  aboutMe() {
    return (
      `My name is <strong>${this.name}</strong>. I'm a ${this.species}. I'm a ${this.gender}. <strong>${this.saying}</strong>. ${this.friends}` +
      `I have ${this.legs} legs.`
    );
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying, friends) {
    super('human', name, gender, 2, saying, friends);
    this.hands = 2;
  }
  aboutMe() {
    return super.aboutMe() + ` I also have ${this.hands} hands.`;
  }
}

class Dog extends Inhabitant {
  constructor(name, gender, friends) {
    super('dog', name, gender, 4, `Woof-woof!`, friends);
  }
}

class Cat extends Inhabitant {
  constructor(name, gender, friends) {
    super('cat', name, gender, 4, 'Meow-meow', friends);
  }
}

class CatWoman extends Human {
  constructor(name, gender, saying, friends) {
    super(name, gender, saying, friends);
    this.species = 'cat-woman';
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

const catWoman = new CatWoman('Selina', 'female', new Cat().saying, ['Barsik']);

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Output: My name is Arnold. I'm a human. I'm a male. I have 2 legs and 2 hands. My friends: no one. I'll be back */

const allInhabitants = [man, woman, dog, cat, catWoman];

allInhabitants.forEach((inhabitant) => print(inhabitant.aboutMe()), 'div');

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
