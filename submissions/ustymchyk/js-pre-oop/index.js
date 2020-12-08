/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species: 'dog',
  legs: 4,
  name: 'Jack',
  gender: 'male',
  saying: 'Wof',
  friends: ['Tom'],
};
const cat = {
  species: 'cat',
  legs: 4,
  name: 'Arnold',
  gender: 'male',
  saying: 'Meow',
  friends: ['Jarry'],
};
const woman = {
  species: 'human',
  legs: 2,
  hands: 2,
  name: 'Leonid',
  gender: 'male',
  saying: 'This is sparta!',
  friends: ['Margaret'],
};
const man = {
  species: 'human',
  legs: 2,
  hands: 2,
  name: 'Margaret',
  gender: 'female',
  saying: 'No!',
  friends: ['Leonid'],
};



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

[dog, cat, woman, man].forEach(obj => print(convertToString(obj)));

function convertToString(obj) {
  return Object.values(obj).flat().join('; ');
}
