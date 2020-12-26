/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/YuliiaHordiichuk/a-tiny-JS-world/tree/post-oop
   Web app: https://yuliiahordiichuk.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
   constructor(name, gender, saying, species, legs) {
      this.name = name; 
      this.gender = gender; 
      this.saying = saying; 
      this.species = species; 
      this.legs = legs; 
   };

   toString() {
      const messageText = [
         this.saying,
         `I am a ${this.species}.`, 
         `My name is ${this.name}.`,
         `Nice to meet you!`,
         `My gender is ${this.gender}.`,
         `I have ${this.legs} legs.` 
      ]; 

      return messageText.join(' ');  
   }
};

class Human extends Inhabitant {
   constructor(name, gender, saying) {
      super(name, gender, saying, 'human', 2); 
      this.hands = 2; 
   }

   toString () {
      return `${super.toString()} Also I have ${this.hands} hands.` 
   }
};

class Man extends Human {
   constructor(name, saying) {
      super(name, 'male', saying); 
   }
};

class Woman extends Human {
   constructor(name, saying) {
      super(name, 'female', saying); 
   }
};

class Dog extends Inhabitant {
   constructor(name, gender) {
      super(name, gender, 'Woof!', 'dog', 4);    
   }   
}; 

class Cat extends Inhabitant {
   constructor(name, gender) {
      super(name, gender, 'Mrrrr!', 'cat', 4);     
   }
};

const man = new Man('Mark', 'Hi, there!'); 
const woman = new Woman('Jane', 'Hello, darling!'); 
const dog = new Dog('Donny', 'male'); 
const cat = new Cat('Beniia', 'male');

const inhabitants = [man, woman, dog, cat]; 

inhabitants.forEach(inhabitant => print(inhabitant)); 

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
