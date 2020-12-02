/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/lalalilulu/a-tiny-JS-world
   Web app: https://lalalilulu.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {

    constructor(species, name, gender, saying, friends = []) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.friends = Array.from(friends).join(", ");
    }

    introduce() {
        return`${this.saying}, I am a ${this.species}, my name is ${this.name}, my gender is ${this.gender}. My friends: ${this.friends}`;
    }
}

class Human extends Inhabitant{

    constructor(name, gender, saying, friends, legs = 2, hands = 2) {
        super('human', name, gender, saying, friends);
        this.legs = legs;
        this.hands = hands;
    }

    introduce() {
        return  super.introduce() + ` and I have ${this.legs} legs and ${this.hands} hands`;
    }
}

class Animal extends Inhabitant{

    constructor(species, name, gender, saying, friends, legs = 4) {
        super(species, name, gender, saying, friends);
        this.legs = legs;
    }

    introduce() {
        return  super.introduce() + ` and I have ${this.legs} legs`;
    }
}

const dog = new Animal('dog', 'Toby', 'male', 'woof-woof!', ["Kate", "Greg"]);
const cat = new Animal('cat', 'Mary', 'female', 'meow-meow!', [dog.name]);
const man = new Human( 'Fred', 'male', 'Hi!', [dog.name, cat.name]);
const woman = new Human('Katy', 'female', 'Hello!', [dog.name, cat.name, man.name]);

const inhabitants = [dog, cat, man, woman];

inhabitants.forEach(inhabitant => print(inhabitant.introduce()));

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
