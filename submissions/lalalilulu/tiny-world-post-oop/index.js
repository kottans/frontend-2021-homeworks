/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {

    constructor(species, name, gender, saying, friends= []) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.friends = friends;
    }

    toString() {
        return`${this.saying} `+ [`I am a ${this.species}`, `My name is ${this.name}`, `My gender is ${this.gender}`].join(". ") +
        `. My friends: ${this.friends.map(friend => friend.name).join(", ")}.`;
    }
}

class Animal extends Inhabitant{

    constructor(species, name, gender, saying, friends, legs) {
        super(species, name, gender, saying, friends);
        this.legs = legs;
    }

    toString() {
        return super.toString() + ` I have ${this.legs} legs`;
    }
}

class Human extends Animal{

    constructor(name, gender, saying, friends, legs = 2, hands = 2) {
        super('human', name, gender, saying, friends, legs);
        this.hands = hands;
    }

    toString() {
        return super.toString() + ` and ${this.hands} hands`;
    }
}

class Dog extends Animal{

    constructor(name, gender, saying, friends) {
        super('dog', name, gender, saying, friends, 4);

    }
}

class Cat extends Animal{

    constructor(name, gender, saying, friends) {
        super('cat', name, gender, saying, friends, 4);

    }
}

//Catwoman is like a human with the exception that it speaks like a cat.
class Catwoman extends Human{

    constructor(name, friends) {
        super(name, 'female', 'Meow-meow!', friends);

    }
}

const dog = new Dog('Toby', 'male', 'Woof-woof!', [new Cat("Tom", "male", "Where is Jerry?")]);
const cat = new Cat('Mary', 'female', 'Meow-meow!', [dog]);
const man = new Human( 'Fred', 'male', 'Hi!', [dog, cat]);
const woman = new Human('Katy', 'female', 'Hello!', [dog, cat, man]);
const catwoman = new Catwoman('Murka', [cat, woman]);

const inhabitants = [dog, cat, man, woman, catwoman];

inhabitants.forEach(inhabitant => print(inhabitant));


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
