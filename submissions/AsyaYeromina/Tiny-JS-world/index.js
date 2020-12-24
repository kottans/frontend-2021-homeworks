/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/AsyaYeromina/a-tiny-JS-world
   Web app: https://asyayeromina.github.io/a-tiny-JS-world/.
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
   species: 'Canis',
   name: 'Jessie',
   gender: 'female',
   legs: '4',
   hands: '0',
   speech: 'woof-woof!',
   friends: ['Stepan', 'Ivanka']
};

const cat = {
   species: 'Felis catus',
   name: 'Python',
   gender: 'male',
   legs: '4',
   hands: '0',
   speech: 'Meow',
   friends: []
};

const woman = {
   species: 'Homo sapiens',
   name: 'Ivanka',
   gender: 'female',
   legs: '2',
   hands: '2',
   speech: 'Hello!',
   friends: ['Stepan', 'Python', 'Jessie']
};

const man = {
   species: 'Homo sapiens',
   name: 'Stepan',
   gender: 'male',
   legs: '2',
   hands: '2',
   speech: 'Hello!',
   friends: ['Ivanka', 'Python', 'Jessie']
};

const catWoman = {
   species: 'Felis sapiens',
   name: 'Selina',
   gender: 'female',
   legs: '2',
   hands: '2',
   speech: cat.speech,
   friends: ['Stepan', 'Python']
};

const inhabitants = [cat, dog, woman, man, catWoman];
const keys = ['species', 'name', 'gender', 'legs', 'hands', 'speech', 'friends'];

const getValues = function(obj, arr) {
   const stringArr = [];
   arr.forEach(key => {
      const value = obj[key];
      if (typeof value === 'object') {
         stringArr.push(value.join(', '))
      } else
      stringArr.push(value);
   });
   return stringArr.join('; ');
}

inhabitants.map(inhabitant => {
   print(getValues(inhabitant, keys))
})



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
