/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
  species: "dog",
  name: "Toby",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Woof-woof!",
  friends: [
    "Puss"
  ]
};

const cat = {
  species: "cat",
  name: "Puss",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Meow!",
  friends: [
    "Toby",
    "Halley"
  ]
};

const man = {
  species: "human",
  name: "Jack",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Hey baby!",
  friends: [
    "Jennie",
    "Halley"
  ]
};

const woman = {
  species: "human",
  name: "Jennie",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Hi darling!",
  friends: [
    "Jack",
    "Toby"
  ]
};

const catWoman = {
  species: "super-hero",
  name: "Halley",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: cat.saying,
  friends: [
    "Puss"
  ]
};

const inhabitants = [dog, cat, man, woman, catWoman];
const propsToPrint = ["species", "name", "gender", "legs", "hands", "friends", "saying"];

inhabitants.forEach(item => {
  print(Object.entries(item).filter(entry => propsToPrint.includes(entry[0])).map(entry => Array.isArray(entry[1]) ? entry[1].join(', ') : entry[1]).join('; '));
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
