/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== creatureECTS DEFINITIONS ========
// Define your creatureects here
const cat = {
  species: "cat",
  name: "Toby",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Meow! Feed me!",
  friends: "no one",
};

const dog = {
  species: "dog",
  name: "Rex",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Woof-woof!",
  friends: "",
};

const male = {
  species: "human",
  name: "Bill",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Hi!",
  friends: "",
};

const female = {
  species: "human",
  name: "Beverly",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "What a nice day!",
  friends: "",
};

const catWoman = {
  species: "cat-Woman",
  name: "Maggie",
  gender: "female",
  legs: 2,
  hands: 2,
  friends: "",
};

catWoman.saying = cat.saying;

dog.friends += `${female.name}, ${male.name}`;
male.friends += `${female.name}, ${cat.name} - a ${cat.species}`;
female.friends += `${dog.name} - a ${dog.species}`;
catWoman.friends += `${cat.name} - a ${cat.species}`;

const inhabitants = [cat, dog, male, female, catWoman];

function printCreatureDatas(creature) {
  print(["species", "name", "gender", "legs", "hands", "saying", "friends"].map((propertyName) => creature[propertyName].join("; ") + `;`));
}

inhabitants.forEach((inhabitant) => printCreatureDatas(inhabitant));

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
