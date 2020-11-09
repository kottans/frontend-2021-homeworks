/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
   species: 'dog',
   name: 'Lucy',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'guf',
   friends: ['Luck']
};

const cat = {
   species: 'cat',
   name: 'Murzick',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'meow',
   friends: ['Elza','Nicky']
};

const woman = {
   species: 'human',
   name: 'Anna',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hello!',
   friends: ['Sergey','Kate','Karina']
}

const man = {
   species: 'human',
   name: 'Vlad',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hi!',
   friends: ['Sergey','Anton','Vlad']
}

const catWoman = {
   species: 'human',
   name: 'Liza',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: cat.saying,
   friends: ['Batman']
};


const inhabitants = [man,woman,cat,dog,catWoman];
let output = '';
inhabitants.forEach(item=>{
   for(let key in item){
      output+=`<b>${key}</b>: ${item[key]}\t`
   }
   output+='\n'
})
print(output);
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


