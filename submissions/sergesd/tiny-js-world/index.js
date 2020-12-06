/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

let dog = {
   species: "dog",
   gender: 'male',
   legs: 4,
   hands: 0,
   name: "Bars",
   saying: "Gav gav!",
   friends: ["James"]
};

let cat = {
   species: "cat",
   gender: 'female',
   legs: 4,
   hands: 0,
   name: "Sunny",
   saying: "Meow!",
   friends: []
};

let woman = {
   species: "human",
   gender: 'female',
   legs: 2,
   hands: 2,
   name: "Lisa",
   saying: "Hi!",
   friends: ["James, Sunny"]
};

let man = {
   species: "human",
   gender: 'male',
   legs: 2,
   hands: 2,
   name: "James",
   saying: "Howdy!",
   friends: ["Lisa, Bars, Sunny"]
};

let catWoman = {
   species: "catWoman",
   gender: 'female',
   legs: 4,
   hands: 0,
   name: "Selina",
   saying: cat.saying,
   friends: ["Lisa", "Sunny"]
}

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

let inhabitants = [dog, cat, woman, man, catWoman];

function inhabitantInfo(inhabitant) {
   let nameInBold = `<strong>${inhabitant.name}</strong>`;
   return [inhabitant.species, nameInBold, inhabitant.gender, inhabitant.legs, inhabitant.hands, inhabitant.saying, inhabitant.friends.join(", ")].join("; ")
}

inhabitants.forEach(inhabitant => {
   print(inhabitantInfo(inhabitant));
})
