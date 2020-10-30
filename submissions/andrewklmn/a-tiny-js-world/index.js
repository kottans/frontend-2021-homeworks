/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/andrewklmn/a-tiny-JS-world
   Web app: https://andrewklmn.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
const dog = {
  species: 'dog',
  name: 'Dyuka',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof!',
  friends: [],
};

const cat = {
  species: 'cat',
  name: 'Barsik',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'meow!',
  friends: [],
};

const woman = {
  species: 'human',
  name: 'Leeloo Dallas',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'People hi!',
  friends: [],
};

const man = {
  species: 'human',
  name: 'Korben Dallas',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Hello there!',
  friends: [],
};

// define cat-woman
const catWoman = { ...woman };
catWoman.name = 'Cat-woman';
catWoman.saying = cat.saying;

// define friends for everyone except the cat...
dog.friends = [man, woman, cat];
woman.friends = [man, dog, cat];
man.friends = [woman, dog, cat, catWoman];
catWoman.friends = [cat];

const inhabitants = [
  dog,
  cat,
  woman,
  catWoman,
  man,
];

const getFormatedOutput = (obj) => Object.entries(obj).map((a) => {
  if (typeof (a[1]) === 'object') {
    if (a[1].length > 0) {
      return a[1].map((elem) => elem.name).join(', ');
    }
    return 'No friends';
  }
  return a[1];
}).join('; ');

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */


  // ... other objects ...

  inhabitants.forEach(obj => print(getFormatedOutput(obj)));

 // ... other print-outs ...

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
