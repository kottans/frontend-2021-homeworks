/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const inhabitants = [
  {
    species: "cat",
    name: "Tom",
    legs: 4,
    hands: 0,
    gender: 'male',
    message: "Mrrrr...."
  },
  {
    species: "dog",
    name: "Goofy",
    legs: 4,
    hands: 0,
    gender: 'male',
    message: "Bark!"
  },
  {
    species: 'human',
    name: "Jeany",
    legs: 2,
    hands: 2,
    gender: 'female',
    message: "Hey there, James!",
  },
  {
    species: 'human',
    name: "James",
    legs: 2,
    hands: 2,
    gender: 'male',
    message: "Good morning, Jeany!"
  }
]

const properties = ['species', 'name', 'legs', 'hands', 'gender', 'message']

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

inhabitants.forEach(elem => {
  print(properties.map(prop => elem[prop]).join('; '))
})
