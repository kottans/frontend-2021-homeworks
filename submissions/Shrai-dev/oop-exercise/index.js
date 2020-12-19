/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Shrai-dev/a-tiny-JS-world
   Web app: https://shrai-dev.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
   constructor (species, name, gender, age, saying, friends) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.age = age;
      this.saying = saying;
      this.friends = friends;
   }
   toString() {
      return `I am a ${this.species}. My name is ${this.name}. I am ${this.age} years old. My friends are ${this.friends.join(', ')}. I say: ${this.saying}`
   }

}

class Animal extends Inhabitant {
   constructor(species, name, gender, age, paws, saying, friends) {
      super(species, name, gender, age, saying, friends);
      this.paws = paws;
   }
   toString() {
      return super.toString() + ` I have ${this.paws} paws.`
   }
}

class Human extends Inhabitant {
   constructor (species, name, gender, age, legs, hands, saying, friends) {
      super(species, name, gender, age, saying, friends);
      this.legs = legs;
      this.hands = hands;
   }
   toString() {
      return super.toString() + ` I have ${this.legs} legs and ${this.hands} hands.`
   }

}

// ======== OUTPUT ========

const dog = new Animal ('dog', 'Buddy', 'male', 3, 4, 'bark-bark!', ['Elsa', 'Chip', 'Max']);
const cat = new Animal ('cat', 'Chloe', 'female', 2, 4, 'meow!', ['Leo', 'Simon', 'Kitty']);
const man = new Human ('human', 'Brian', 'male', 26, 2, 2, 'Everyone thinks of changing the world, but no one thinks of changing himself!', ['Ethan', 'James', 'Ryan']);
const woman = new Human ('human', 'Olivia', 'female', 24, 2, 2, 'The simplest way to be happy is to do good!', ['Maria', 'Kelly', 'Jennifer']);

const inhabitants = [dog, cat, man, woman];

inhabitants.forEach(elem => {
   print(elem, 'p');
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


