/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/VBystrov/a-tiny-JS-world
   Web app: https://vbystrov.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
  species: 'dog',
  name: 'Globgor',
  gender: 'male',
  legs: 4,
  hands: 0,
  friends: ['Eclipsa'],
  saying: 'woof!',
};

const cat = {
  species: 'cat',
  name: 'Eclipsa',
  gender: 'female',
  legs: 4,
  hands: 0,
  friends: ['Globgor', 'Star'],
  saying: 'mew-mew-mew-mew',
};

const woman = {
  species: 'homo sapiens',
  name: 'Star',
  gender: 'female',
  legs: 2,
  hands: 2,
  friends: ['Eclipsa', 'Marko'],
  saying: "I'm a magical princess from another dimension!",
};

const man = {
  species: 'homo sapiens',
  name: 'Marko',
  gender: 'male',
  legs: 2,
  hands: 2,
  friends: ['Star'],
  saying: "I'm a misunderstood bad boy!",
};

const catWoman = {
  species: 'homo catus',
  name: 'Amelia',
  gender: 'female',
  legs: 2,
  hands: 2,
  friends: [],
  saying: cat.saying,
};

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

print(
  `${dog.species}; ${dog.name}; ${dog.gender}; ${dog.legs}; ${dog.hands}; ${dog.saying}; ${dog.friends};`
);
print(
  `${cat.species}; ${cat.name}; ${cat.gender}; ${cat.legs}; ${cat.hands}; ${cat.saying}; ${cat.friends};`
);
print(
  `${woman.species}; ${woman.name}; ${woman.gender}; ${woman.legs}; ${woman.hands}; ${woman.saying}; ${woman.friends};`
);
print(
  `${man.species}; ${man.name}; ${man.gender}; ${man.legs}; ${man.hands}; ${man.saying}; ${man.friends};`
);
print(
  `${catWoman.species}; ${catWoman.name}; ${catWoman.gender}; ${catWoman.legs}; ${catWoman.hands}; ${catWoman.saying}; ${catWoman.friends};`
);

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
