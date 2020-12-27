/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kasionio/pre-oop
   Web app: https://kasionio.github.io/pre-oop
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species: 'dog',
  name: 'Toby',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!'
};

const cat = {
  species: 'cat',
  name: 'Bobby',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'meow!'
};

const man = {
  species: 'human',
  name: 'Arnold',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Hasta la vista, baby!'
};

const woman = {
  species: 'human',
  name: 'Kate',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Merry Christmas!'
};

const catWoman = {
  species: 'catWoman',
  name: 'Betty',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: cat.saying
};

const inhabits = [dog, cat, man, woman, catWoman];
const properties = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];

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

const message = (arr, props) => arr.map(item => props.map(prop => item[prop])
  .join('; '))
  .join('\n');

print(message(inhabits, properties));
