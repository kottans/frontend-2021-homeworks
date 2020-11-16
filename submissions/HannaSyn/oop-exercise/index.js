/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
   constructor ( name, gender, friends, say, biologicalSpecies ) {
      this.name = name;
      this.biologicalSpecies = biologicalSpecies;
      this.gender = gender;
      this.friends = friends;
      this.say = say
   }
   toString() {
      return `${this.say} I'm ${this.biologicalSpecies}! My name is ${this.name}, my gender is ${this.gender}, and I have friends: ${this.friends}.`;
   }
}

class Human extends Inhabitant {
   constructor( name, gender, friends, say, legs, hands ) {
      super( name, gender, friends, say, 'human');
      this.legs = 2 || legs;
      this.hands = 2 || hands;
   } 
   toString() {
      return super.toString() + ` I have ${this.legs} legs and ${this.hands} hands.`
   }
}

class Animal extends Inhabitant {
   constructor( name, gender, friends, say, biologicalSpecies, paws) {
      super( name, gender, friends, say, biologicalSpecies )
      this.paws = 4 || paws;
   }
   toString() {
      return super.toString() + ` I have ${this.paws} paws.`
   }
}

class Cat extends Animal {
   constructor( name, gender, friends, say, paws) {
      super( name, gender, friends, say, 'cat', paws );
      this.say = 'Meow!' || say;
   } 
}

class Dog extends Animal {
   constructor( name, gender, friends, Human, say, paws) {
      super( name, gender, friends, say, 'dog', paws);
      this.master = Human;
      this.say = 'Woof!' || say;
   } 
   toString() {
      return super.toString() + ` I love my master ${this.master.name} very much!`
   }
}


const woman = new Human('Hanna', 'female', ['Vlad', 'Ernest', 'Emilia'], 'Hi!');
const man = new Human('Vlad', 'male', ['Hanna', 'Ernest', 'Emilia'], 'Hello!');
const cat = new Cat('Ernest', 'male', ['Vlad', 'Hanna', 'Emilia']);
const dog = new Dog('Emilia', 'female', ['Vlad', 'Ernest'], woman);

[woman, man, cat, dog].forEach(inhabitant => print(inhabitant));

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


