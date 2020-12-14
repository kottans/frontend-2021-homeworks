/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
   constructor(name, gender, saying, species, legs, friends) {
      this.name = name;
      this.gender = gender;
      this.species = species;
      this.saying = saying;
      this.friends = friends;
      this.legs = legs;
   }
   getProperties() {
      return [this.species, this.name, this.gender, this.legs, this.saying, this.friends.join(', ')];
   }
   toString() {  
      return this.getProperties().join('; ');
   }
}

class Human extends Inhabitant {
   constructor(name, gender, saying, friends) {
      super(name, gender, saying, 'human', 2, friends);
      this.hands = 2;
   }

   getProperties() {
      const props = super.getProperties();
      props.splice(3, 0, this.hands);
      return props;
   }
}

class Dog extends Inhabitant {
   constructor(name, gender, friends) {
      super(name, gender, 'woof-woof!', 'dog', 4, friends);
   }
}

class Cat extends Inhabitant {
   constructor(name, gender, friends) {
      super(name, gender, 'meow!', 'cat', 4, friends);
   }
}

class CatWoman extends Human {
   constructor(name, saying, friends) {
      super(name, 'female', saying, friends);
      this.species = 'CatWoman';
   }
}

const dog = new Dog('Jhonny', 'male', ['Andrew', 'Anastasia']);
const cat = new Cat('Murka', 'female', ['Anastasia']);
const woman = new Human('Anastasia', 'female', 'I\'m a woman!', ['Andrew', 'Murka', 'Jhonny']);
const man = new Human('Andrew', 'male', 'I\'m a man!', ['Anastasia', 'Jhonny', 'Murka']);
const catwoman = new CatWoman('CatWoman', cat.saying, []);

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


const inhabitants = [dog, cat, man, woman, catwoman];

// function tmplStr({species, name, gender, legs, hands, saying, friends}) {
//    return `${species};${name};${gender};${legs};${hands};${saying};${friends.join(', ')}`;
// }

inhabitants.forEach( obj => {
   print( obj );
} );


