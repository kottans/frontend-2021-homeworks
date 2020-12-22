/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/YuliiaHordiichuk/a-tiny-JS-world/tree/post-oop
   Web app: https://yuliiahordiichuk.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
   constructor(name, gender, saying, species) {
      this.name = name; 
      this.gender = gender; 
      this.saying = saying; 
      this.species = species; 
   };

   getMessage() {
      const messageText = [
      this.saying,
      `I am a ${this.species}.`, 
      `My name is ${this.name}.`,
      `Nice to meet you!`,
      `My gender is ${this.gender}.`
   ]; 

   return messageText.join(' ');  
   }
}

class Human extends Inhabitant {
   constructor(name, gender, saying, species) {
      super(name, gender, saying, species); 
      this.hands = 2; 
      this.legs = 2; 
   }

   getMessage () {
      return `${super.getMessage()} I have ${this.legs} legs and ${this.hands} hands.` 
   }
}

class Animal extends Inhabitant {
   constructor(name, gender, saying, species) {
      super(name, gender, saying, species); 
      this.legs = 4; 
   }

   getMessage () {
      return `${super.getMessage()} I have ${this.legs} legs.`
   }
}

const man = new Human('Mark', 'male', 'Hi, there!', 'human'); 
const woman = new Human('Jane', 'female', 'Hello, darling!', 'human'); 
const dog = new Animal('Donny', 'male', 'Woof!', 'dog'); 
const cat = new Animal('Beniia', 'male', 'Mrrrr!','cat')

const inhabitants = [man, woman, dog, cat]; 

inhabitants.forEach(inhabitant => print(inhabitant.getMessage())); 

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
