/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Ant-C-tech/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
   species: 'dog',
   name: 'Spike',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Woof-Woof!',
   friends: ['John']
}

const cat = {
   species: 'cat',
   name: 'Tom',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Meow-Meow!',
   friends: ['John']
}

const woman = {
   species: 'human',
   name: 'Jane',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Nice to meet you!',
}

const man = {
   species: 'human',
   name: 'John',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hi, how are you?',
   friends: ['Spike', 'Tom']
}

function createGreetingContent(obj) {

   let content = ''

   const propPrefixes = {
      species: 'I am a %. ',
      name: 'My name is %. ',
      gender: 'My gender is %. ',
      hands: 'I have % hands. ',
      legs: 'I have % legs. ',
      saying: 'I want to say you "%". ',
      friends: 'I have friend %. ',
   };

   Object.keys(obj).forEach((key) => {
      if (Array.isArray(obj[key])) {
         for (const item of obj[key]) {
            content += propPrefixes[key].replace('%', item)
         }
      } else if (obj[key] && propPrefixes[key]) {
         content += propPrefixes[key].replace('%', obj[key])
      }
   })
   
   return content.trim()
}

const inhabitants = [dog, cat, woman, man]

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

inhabitants.forEach((item) => {
   print(createGreetingContent(item), 'div')
})
