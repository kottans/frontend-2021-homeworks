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
   saying: 'Give me your salary!'
}

const man = {
   species: 'human',
   name: 'John',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Give me your clothes, your boots and your motorcycle!',
   friends: ['Spike', 'Tom']
}

function createGreetingContent(obj) {

   let content = ''
   let interlocutor = ''
   
   switch (true) {
      case obj.species == 'dog':
         interlocutor = 'a cat'
         break;
      case obj.species == 'cat':
         interlocutor = 'a dog'
         break;
      case obj.species == 'human' && obj.gender == 'male':
         interlocutor = 'a biker'
         break;
      case obj.species == 'human' && obj.gender == 'female':
         interlocutor = 'my husband'
         break;
   }

   Object.keys(obj).forEach((key) => {
      switch (true) {
         case key == 'species':
            content += `Hello! I am a ${obj[key]}. `
            break;
         case key == 'name':
            content += `My name is ${obj[key]}. `
            break;
         case key == 'gender':
            content += `My gender is ${obj[key]}. `
            break;
         case key == 'legs':
            if (obj[key].length > 0) {
               content += `I have ${obj[key]} legs. `
            } else {
               content += `I have no legs. `
            }
           
            break;
         case key == 'hands':
            if (obj[key].length > 0) {
               content += `I have ${obj[key]} hands. `
            } else {
               content += `I have no hands. `
            }
            break;
         case key == 'saying':
            content += `If I see ${interlocutor}, I say "${obj[key]}". `
            break;
         case key == 'friends':
            if (obj[key].length > 1) {
               content += `I have friends: ${obj[key]}.`
            } else {
               content += `I have friend: ${obj[key]}.`
            }

            break;
         default:
            break;
      }
   })
   return content
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
for (const item of inhabitants) {
   print(createGreetingContent(item), 'div')
}
