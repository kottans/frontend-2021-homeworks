/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/evgenii-del/a-tiny-JS-world
   Web app: http://crooked-discovery.surge.sh/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
    constructor(species, name, gender, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
    }

    toString(object) {
        return [this.species, this.name, this.gender, this.saying].join(';');
    }
}

class Man extends Inhabitant {
    constructor(species, name, gender, saying, hands, legs) {
        super(species, name, gender, saying);
        this.hands = hands;
        this.legs = legs;
    }

    toString(object) {
        return super.toString() + [this.hands, this.legs].join(';');
    }
}

class Woman extends Inhabitant {
    constructor(species, name, gender, saying, hands, legs) {
        super(species, name, gender, saying);
        this.hands = hands;
        this.legs = legs;
    }

    toString(object) {
        return super.toString() + [this.hands, this.legs].join(';');
    }
}

class Cat extends Inhabitant {
    constructor(species, name, gender, saying, legs) {
        super(species, name, gender, saying);
        this.legs = legs;
    }

    toString(object) {
        return super.toString() + this.legs;
    }
}

class Dog extends Inhabitant {
    constructor(species, name, gender, saying, legs) {
        super(species, name, gender, saying);
        this.legs = legs;
    }

    toString(object) {
        return super.toString() + this.legs;
    }
}

const inhabitants = [
    new Man('man', 'John', 'male', 'Hi!', 2, 2),
    new Woman('woman', 'Emma', 'female', 'Hello!', 2, 2),
    new Cat('cat', 'Sam', 'make', 'meow-meow!', 4),
    new Dog('dog', 'Bob', 'female', 'woof-woof!', 4)
];

inhabitants.forEach(obj => print(obj));

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
