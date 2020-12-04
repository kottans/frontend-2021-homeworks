/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Mammal {
   legs = 4;

   constructor(name, gender, friends) {
      this.name = name;
      this.gender = gender;
      this.friends = friends;
   }
}

class Human extends Mammal {
   legs = 2;
   hands = 2;
   species = 'human';

   constructor(name, gender, saying, friends) {
      super(name, gender, friends);
      this.saying = saying;
   }
}

class Animal extends Mammal {
   constructor(name, gender, saying, species, friends) {
      super(name, gender, friends);
      this.saying = saying;
      this.species = species;
   }
}

const dog = new Animal('Jhonny', 'male', 'woof-woof!', 'dog', ['Andrew', 'Anastasia']);
const cat = new Animal('Murka', 'female', 'meow!', 'cat', ['Anastasia']);
const woman = new Human('Anastasia', 'female', 'I\'m a woman!', ['Andrew', 'Murka', 'Jhonny']);
const man = new Human('Andrew', 'male', 'I\'m a man!', ['Anastasia', 'Jhonny', 'Murka']);
const catwoman = new Human('CatWoman', 'female', cat.saying, []);

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


const printList = [dog, cat, man, woman, catwoman];

function tmplStr({species, name, gender, legs, hands, saying, friends}) {
   return `${species};${name};${gender};${legs};${hands};${saying};${friends.join(', ')}`;
}

printList.forEach( obj => {
   print( tmplStr(obj) );
} );


