/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: https://github.com/kt-std/kottans-frontend/tree/main/task_tiny_js_world
  Web app: https://kt-std.github.io/a-tiny-JS-world/
  */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

/** Class representing an inhabitant. */
class Inhabitant {
  /**
   * Create an inhabitant
   * @param {string} species - The species of the inhabitant.
   * @param {string} name - The name of the inhabitant.
   * @param {string} gender - The gender of the inhabitant.
   * @param {number} legs - The amount of legs of the inhabitant.
   * @param {string} sayings - The text of inhabitant greetings.
   * @param {[]} friends - The list of inhabitant friends.
   */
  constructor(species, name, gender, legs, sayings, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.sayings = sayings;
    this.friends = this.haveFriends(friends);
  }

  /**
   * Check if an inhabitant has friends
   * @param {[]} friends - The list of inhabitant friends
   * @return {string} List of friends or sad quote
   */
  haveFriends(friends) {
    return Array.isArray(friends) && friends.length ?
      friends.join(', ') :
      'Forever alone...';
  }

  /**
   * Stringifies an inhabitant properties
   * @return {string} String consistings of an inhabitant
properties separated with semicolon
   */
  stringify() {
    return [this.species, this.name, this.gender, this.sayings,
      this.friends, this.legs].join('; ');
  }
}

/** Class representing a human inhabitant. */
class Human extends Inhabitant {
  /**
   * Create a human
   * @param {string} species - The species of the inhabitant.
   * @param {string} name - The name of the inhabitant.
   * @param {string} gender - The gender of the inhabitant.
   * @param {number} hands - The amount of hands of the inhabitant.
   * @param {number} legs - The amount of legs of the inhabitant.
   * @param {string} sayings - The text of inhabitant greetings.
   * @param {[]} friends - The list of inhabitant friends.
   */
  constructor(species, name, gender, hands, legs, sayings, friends) {
    super(species, name, gender, legs, sayings, friends);
    this.hands = hands;
  }
  /**
   * Stringifies a human properties
   * @return {string} String consistings of a human
properties separated with semicolon
   */
  stringify() {
    return `${super.stringify()}; ${this.hands}`;
  }
}


const dog = new Inhabitant('dog', 'Rex', 'male', 4, 'Woof!',
    ['Mukhtar', 'Sharik', 'Thunder']);
const cat = new Inhabitant('cat', 'Murka', 'female', 4, 'Meow!',
    ['Murchik', 'Anna']);
const woman = new Human('woman', 'Anna', 'female', 2, 2, 'Hi, folks!',
    ['John', 'Tom']);
const man = new Human('man', 'John', 'male', 2, 2, 'Ahoy!');
const catWoman = new Human('superhero', 'Selina', 'female?', 2, 2,
    cat.sayings, ['Alice', 'Arizona']);


[dog, cat, woman, man, catWoman].forEach((obj) => print(obj.stringify()));

// ======== OUTPUT ========
/* Use print(message) for output.
  Default tag for message is <pre>. Use print(message,'div')
  to change containing element tag.

  Message can contain HTML markup. You may also tweak
  index.html and/or styles.css.
  However, please, REFRAIN from improving visuals at least until
  your code is reviewed
  so code reviewers might focus on a single file that is index.js.
  */

/* Print examples:
  print('ABC');
  print('<strong>ABC</strong>');
  print('<strong>ABC</strong>', 'div');

  print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
  print('human; <strong>John</strong>; male; 2; 2;
  <em>Hello world!</em>; Rex, Tom, Jenny');
  print('human; <strong>John</strong>; male; 2; 2;
  <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
  */
