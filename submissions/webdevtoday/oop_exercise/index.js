/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const Mammal = function({name, gender, friends}) {
   this.legs = 4;
   this.hands = 0;

   this.name = name;
   this.gender = gender;
   this.friends = friends;
};

const Human = function({name, gender, saying, friends}) {
   Mammal.call(this, {name: name, gender: gender, friends: friends});
   this.legs = 2;
   this.hands = 2;
   this.saying = saying;
   this.species = 'human';
};

const Animal = function({name, gender, saying, species, friends}) {
   Mammal.call(this, {name: name, gender: gender, friends: friends});
   this.saying = saying;
   this.species = species;
};
const dog = new Animal({name: 'Jhonny', gender: 'male', saying: 'woof-woof!', species: 'dog', friends: ['Andrew', 'Anastasia']});
const cat = new Animal({name: 'Murka', gender: 'female', saying: 'meow!', species: 'cat', friends: ['Anastasia']});
const woman = new Human({name: 'Anastasia', gender: 'female', saying: 'I\'m a woman!', friends: ['Andrew', 'Murka', 'Bim']});
const man = new Human({name: 'Andrew', gender: 'male', saying: 'I\'m a man!', friends: ['Anastasia', 'Bim', 'Murka']});
const catwoman = new Human({name: 'CatWoman', gender: 'female', saying: cat.saying, friends: []});

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


