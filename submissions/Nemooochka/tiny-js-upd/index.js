/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
    constructor(species, name, gender, saying, friends) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.friends = friends;
    }

    sayHi() {
        return( `${this.saying} I'm a ${this.species} with the name ${this.name}, which means I'm ${this.gender}. I want to say hi to <b>${this.friends}</b>, you are the best!`);
    }
}

class Animal extends Inhabitant {
    legs = 4;
    constructor(name, gender, friends) {
        super();
        this.name = name;
        this.gender = gender;
        this.friends = friends;
    }

    sayHi() {
        return(
            super.sayHi() + ` By the way, I have ${this.legs} legs.`
        )
    }
}


class Dog extends Animal {
    species = 'dog';
    saying = 'Woof-woof';
    constructor(name, gender, friends) {
        super(name, gender, friends);
    }
}

class Cat extends Animal {
    species = 'cat';
    saying = 'Meeeow!';
    constructor(name, gender, friends) {
        super(name, gender, friends);
    }
}

class Human extends Inhabitant {
    species = 'human';
    hands = 2;
    constructor(name, friends) {
        super();
        this.name = name;
        this.friends = friends;
    }

    sayHi() {
        return(
            super.sayHi() + ` By the way, I have ${this.hands} hands.`
        )
    }
}

class Man extends Human {
    gender = 'male';
    saying = 'How you doing?';

    constructor(name, friends) {
        super(name, friends);
    }
}

class Woman extends Human {
    gender = 'female';
    saying = 'Nice to meet you!';

    constructor(name, friends) {
        super(name, friends);
    }
}

const dog = new Dog('Ivan', 'male',  ['Ira']);
const cat = new Cat('Pushok', 'male',  ['Sharik', 'Ponchik']);
const catWoman = new Cat('Murka', 'female',  ['Pushok']);
const man = new Man('Andre', ['Vasya', 'Mitya']);
const woman = new Woman('Natali', ['Madona']);

const inhabitants = [dog, cat, catWoman, man, woman];

inhabitants.forEach(inhabitant => print(inhabitant.sayHi()));

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


