/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {

    constructor(species, name, gender, saying, friends= [], legs) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.legs = legs;
        this.friends = friends.join(", ");
    }

    toString() {
        return`${this.saying} I am a ${this.species}, my name is ${this.name}, my gender is ${this.gender}. I have ${this.legs} legs. My friends: ${this.friends}`;
    }
}

class Animal extends Inhabitant{

    constructor(species, name, gender, saying, friends, legs = 4) {
        super(species, name, gender, saying, friends, legs);
    }
}

class Human extends Animal{

    constructor(name, gender, saying, friends, legs = 2, hands = 2) {
        super('human', name, gender, saying, friends, legs);
        this.hands = hands;
    }

    toString() {
        return super.toString() + ` and I also have ${this.hands} hands`;
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

class CatWoman extends Animal{

    constructor(name, saying, friends) {
        super('cat', name, 'female', saying, friends, 4);

    }
}

const dog = new Dog('Toby', 'male', 'woof-woof!', ["Kate", "Greg"]);
const cat = new Cat('Mary', 'female', 'meow-meow!', [dog.name]);
const man = new Human( 'Fred', 'male', 'Hi!', [dog.name, cat.name]);
const woman = new Human('Katy', 'female', 'Hello!', [dog.name, cat.name, man.name]);
const catWoman = new CatWoman('Murka', 'meow-meow! Hello!', [cat.name, woman.name]);

const inhabitants = [dog, cat, man, woman, catWoman];

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
