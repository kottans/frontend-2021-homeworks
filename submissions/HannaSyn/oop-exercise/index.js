/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitans {
   constructor ( name, gender, friends, say, biologicalSpecies ){
      this.name = name;
      this.biologicalSpecies = biologicalSpecies;
      this.gender = gender;
      this.friends = friends;
      this.say = say
   }

}

class Human extends Inhabitans {
   constructor( name, gender, friends, say, legs, hands ) {
      super( name, gender, friends, say, 'human');
      this.legs = legs;
      this.hands = hands;
   } 

   speak() {
      return ` ${this.say} I'm ${this.biologicalSpecies}! My name is ${this.name}, my gender is ${this.gender}, I have ${this.legs} legs and ${this.hands} hands and I have friends: ${this.friends}.`;
   }
   
}

class Cat extends Inhabitans {
   constructor( name, gender, friends, say, paws) {
      super( name, gender, friends, say, 'cat' );
      this.paws = paws;
   } 

   purr() {
      return ` ${this.say}  I'm ${this.biologicalSpecies}! My name is ${this.name}, my gender is ${this.gender}, I have ${this.paws} paws and I have friends: ${this.friends}.` 
   }
}

class Dog extends Inhabitans {
   constructor( name, gender, friends, say, paws, Human ) {
      super( name, gender, friends, say, 'dog' );
      this.paws = paws;
      this.master = Human;
   } 

   bark() {
      return ` ${this.say}  I'm ${this.biologicalSpecies}! My name is ${this.name}, my gender is ${this.gender}, I have ${this.paws} paws, I love my master ${this.master.name} very much! And I have friends: ${this.friends}.` 
   }
}

const woman = new Human('Hanna', 'female', ['Vlad', 'Ernest', 'Emilia'], 'Hi!', 2, 2);
const man = new Human('Vlad', 'male', ['Hanna', 'Ernest', 'Emilia'], 'Hello!', 2, 2);
const cat = new Cat('Ernest', 'male', ['Vlad', 'Hanna', 'Emilia'], 'Meow!', 4);
const dog = new Dog('Emilia', 'female', ['Vlad', 'Ernest'], 'Wooof!', 4, woman);

print(woman.speak());
print(man.speak());
print(cat.purr());
print(dog.bark());

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


