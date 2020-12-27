/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _https://github.com/NJul/a-tiny-JS-world_
   Web app: _https://njul.github.io/a-tiny-JS-world/_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
  species: 'dog',
  name: 'Chica',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!',
  friends: ['Lara', 'Arnold'],
};

const cat = {
  species: 'cat',
  legs: 4,
  hands: 0,
  name: 'Barsik',
  gender: 'male',
  saying: 'meow-meow',
  friends: [],
};

const woman = {
  species: 'human',
  legs: 2,
  hands: 2,
  name: 'Lara',
  gender: 'female',
  saying: `There are things that shouldn't be found`,
  friends: ['Chica', 'Arnold'],
};

const man = {
  species: 'human',
  legs: 2,
  hands: 2,
  name: 'Arnold',
  gender: 'male',
  saying: `I'll be back`,
  friends: [],
};

const catWoman = {
  species: 'cat-woman',
  legs: 2,
  hands: 2,
  name: 'Selina',
  gender: 'female',
  saying: cat.saying,
  friends: ['Barsik'],
};

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

//  Output: human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny

const allInhabitants = [man, woman, dog, cat, catWoman];

const listEntry = ({ species, name, gender, legs, hands, saying, friends }) => {
  return `${species}; ${name}; ${gender}; ${legs}; ${hands}; ${saying};
  ${friends.join(', ') || '0'}`;
};

allInhabitants.forEach((inhabitant) => print(listEntry(inhabitant), 'div'));

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
