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
  hands: 0,
  name: 'Doggy',
  gender: 'male',
  saying: 'bark-bark',
  friends: 'Alice',
};

const cat = {
  species: 'cat',
  legs: 4,
  hands: 0,
  name: 'Meowler',
  gender: 'male',
  saying: 'meow-meow',
  friends: 'Dude, Alice, Fur',
};

const man = {
  species: 'man',
  legs: 2,
  hands: 2,
  name: 'Dude',
  gender: 'male',
  saying: "Hey! What's up?",
  friends: 'Alice, Meowler',
};

const woman = {
  species: 'woman',
  legs: 2,
  hands: 2,
  name: 'Alice',
  gender: 'female',
  saying: 'What a nice place!',
  friends: 'Dude, Meowler, Doggy',
};

const catWoman = {
  species: 'cat-woman',
  legs: 2,
  hands: 2,
  name: 'Fur',
  gender: 'female',
  saying: cat.saying,
  friends: 'Meowler',
};

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

const inhabitants = [dog, cat, man, woman, catWoman];

function makeString({ species, legs, hands, name, gender, saying, friends }) {
  return `species: ${species}, legs: ${legs}, hands: ${hands}, name: ${name}, gender: ${gender}, saying: ${saying}, friends: ${friends}`;
}

inhabitants.forEach((elem) => print(makeString(elem)));
