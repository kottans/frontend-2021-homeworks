/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: _put repo URL here_
  Web app: _put project's github pages URL here_
  */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

/**
 * Represents an inhabitant
 * @constructor
 * @param {string} species - The species of the inhabitant.
 * @param {string} name - The name of the inhabitant.
 * @param {string} gender - The gender of the inhabitant.
 * @param {number} hands - The amount of hands of the inhabitant.
 * @param {number} legs - The amount of legs of the inhabitant.
 * @param {string} sayings - The text of inhabitant greetings.
 * @param {[]} friends - The list of inhabitant friends.
 */
function Inhabitant(species, name, gender, hands, legs, sayings, friends) {
  this.species = species;
  this.name = name;
  this.gender = gender;
  this.hands = hands === 0 ?
   `${this.species}s don't have hands! They have paws` : hands;
  this.legs = legs;
  this.friends = Array.isArray(friends) && friends.length ?
    friends.join(', ') :
    'Forever alone...';
  this.saySomething = sayings;
}

const dog = new Inhabitant('dog', 'Rex', 'male', 0, 4, 'Woof!',
    ['Mukhtar', 'Sharik', 'Thunder']);
const cat = new Inhabitant('cat', 'Murka', 'female', 0, 4, 'Meow!',
    ['Murchik', 'Anna']);
const woman = new Inhabitant('woman', 'Anna', 'female', 2, 2, 'Hi, folks!',
    ['John', 'Tom']);
const man = new Inhabitant('man', 'John', 'male', 2, 2, 'Ahoy!');
const catWoman = new Inhabitant('superhero', 'Selina', 'female?', 2, 2,
    cat.saySomething, ['Alice', 'Arizona']);

/**
 * This is a function.
 *
 * @param {Object} inhabitant - An object to stringify
 * @return {string} A joint string with project properties values
 *
 * @example
 *
 *     getString(dog)
 */
function getString(inhabitant) {
  return ['species', 'name', 'gender', 'hands', 'legs', 'sayings', 'friends']
      .map((property) => inhabitant[property]).join('; ');
}

[dog, cat, woman, man, catWoman].forEach((obj) => print(getString(obj)));

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
