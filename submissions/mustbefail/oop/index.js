/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: _put repo URL here_
  Web app: _put project's github pages URL here_
  */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
  constructor(species, name, gender, hands, legs, friends, phrase) {
    this.friends = friends;
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.hands = hands;
    this.legs = legs;
    this.phrase = phrase;
  }
  saying() {
    return this.phrase;
  }
}

class Cat extends Inhabitant {
  constructor(name, gender, friends, phrase) {
    super('cat', name, gender, 0, 4, friends, phrase);
  }
}

class Dog extends Inhabitant {
  constructor(name, gender, friends, phrase) {
    super('dog', name, gender, 0, 4, friends, phrase);
  }
}

class Human extends Inhabitant {
  constructor(name, gender, friends, phrase) {
    super('human', name, gender, 2, 2, friends, phrase);
  }
}

const dog = new Dog('Maki', 'male', ['Alfred', 'Prokhor'], 'Bark-bark!');
const cat = new Cat('Prokhor', 'male', ['June', 'Maki'], 'Meow!');
const man = new Human('Alfred', 'male', ['Maki', 'Anna'], 'Master Bruce, I...');
const woman = new Human(
  'Anna',
  'female',
  ['June', 'Alfred'],
  'Need more money!'
);

// ======== OUTPUT ========
/* Use print(message) for output.
  Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

  Message can contain HTML markup. You may also tweak index.html and/or styles.css.
  However, please, REFRAIN from improving visuals at least until your code is reviewed
  so code reviewers might focus on a single file that is index.js.
*/

const inhabitants = [cat, man, woman, dog];

const formatOutput = (habitant) => {
  return `Hello! I am <strong>${
    habitant.species
  }</strong>, my name is <strong>${
    habitant.name
  }</strong>, my gender is <strong>${
    habitant.gender
  }</strong>, I have <strong>${habitant.hands}</strong> arms and <strong>${
    habitant.legs
  }</strong> legs and you know what: <strong>${habitant.saying()}</strong>. My friends: <strong>${
    habitant.friends
  }</strong>`;
};

inhabitants.forEach((habitant) => print(formatOutput(habitant)));

/* Print examples:
  print('ABC');
  print('<strong>ABC</strong>');
  print('<strong>ABC</strong>', 'div');

  print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
  print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
  print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
*/
