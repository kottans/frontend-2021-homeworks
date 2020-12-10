/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
   species: 'dog',
   name: 'Buddy',
   gender: 'male',
   age: 3,
   legs: 4,
   hands: 0,
   saying: 'bark-bark!',
   friends: ['Elsa', 'Chip', 'Max']
};

const cat = {
   species: 'cat',
   name: 'Chloe',
   gender: 'female',
   age: 1,
   legs: 4,
   hands: 0,
   saying: 'meow!',
   friends: ['Leo', 'Simon', 'Kitty']
};

const man = {
   species: 'human',
   name: 'Brian',
   gender: 'male',
   age: 26,
   legs: 2,
   hands: 2,
   saying: 'Everyone thinks of changing the world, but no one thinks of changing himself!',
   friends: ['Ethan', 'James', 'Ryan']
};

const woman = {
   species: 'human',
   name: 'Olivia',
   gender: 'female',
   age: 24,
   legs: 2,
   hands: 2,
   saying: 'The simplest way to be happy is to do good!',
   friends: ['Maria', 'Kelly', 'Jennifer']
}

// ======== OUTPUT ========

const inhabitants = [dog, cat, man, woman];

const message = ({
   species,
   name,
   age,
   legs,
   hands,
   friends,
   saying
}) => {
   return `I am a ${species}. My name is ${name}. I am ${age} years old. I have ${legs} legs and ${hands} hands. My friends are: ${friends}. I say: ${saying}`;
}
inhabitants.forEach(elem => {
   print(message(elem), 'p');
}) 

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


