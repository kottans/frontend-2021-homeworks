/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitans {
   constructor ( name, gender, friends, say, legs, hands = 0){
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.hands = hands;
      this.friends = friends;
      this.say = say
   }
   speak() {
      let hands = ''; 
      if (this.hands) {
         hands = ` and ${this.hands} hands`;
      }

      return ` ${this.say} My name is ${this.name}, my gender is ${this.gender}, I have ${this.legs} legs${hands} and I have friends: ${this.friends}.`;
   }
}

class Human extends Inhabitans {
   constructor( name, gender, friends, say, legs = 2, hands = 2 ) {
      super( name, gender, friends, say, legs, hands );
   } 
}

class Cat extends Inhabitans {
   constructor( name, gender, friends, say, legs = 4 ) {
      super( name, gender, friends, say, legs );
   } 
}

class Dog extends Inhabitans {
   constructor( name, gender, friends, say , legs = 4 ) {
      super( name, gender, friends, say, legs );
   } 
}

const woman = new Human('Hanna', 'female', ['Vlad', 'Ernest', 'Emilia'], 'Hi!');
const man = new Human('Vlad', 'male', ['Hanna', 'Ernest', 'Emilia'], 'Hello!');
const cat = new Cat('Ernest', 'male', ['Vlad', 'Hanna', 'Emilia'], 'Meow!');
const dog = new Dog('Emilia', 'female', ['Vlad', 'Ernest', 'Hanna'], 'Wooof!');

print(woman.speak());
print(man.speak());
print(cat.speak());
print(dog.speak());

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


