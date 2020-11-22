/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const catSaying = 'meow!';

const dog = {
   legs: 4,
   hands: 0,
   name: 'A Dog',
   gender: 'male',
   saying: 'woof-woof!',
   species: 'dog',
   friends: ['A Man', 'A Woman'],
};
const cat = {
   legs: 4,
   hands: 0,
   name: 'A Cat',
   gender: 'male',
   saying: catSaying,
   species: 'cat',
   friends: ['A Woman'],
};
const woman = {
   legs: 2,
   hands: 2,
   name: 'A Woman',
   gender: 'female',
   saying: `I'm a woman!`,
   species: 'human',
   friends: ['A Man', 'A Cat', 'A Dog'],
};
const man = {
   legs: 2,
   hands: 2,
   name: 'A Man',
   gender: 'male',
   saying: `I'm a man!`,
   species: 'human',
   friends: ['A Woman', 'A Dog', 'A Cat'],
};
const catwoman = {
   legs: 2,
   hands: 2,
   name: 'A CatWoman',
   gender: 'female',
   saying: catSaying,
   species: 'human',
   friends: ['A Cat'],
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


const printList = [dog, cat, man, woman, catwoman];

function tmplStr({species, name, gender, legs, hands, saying, friends}) {
   return `${species};${name};${gender};${legs};${hands};${saying};${friends.join(', ')}`;
}

printList.forEach( obj => {
   print( tmplStr(obj) );
} );


