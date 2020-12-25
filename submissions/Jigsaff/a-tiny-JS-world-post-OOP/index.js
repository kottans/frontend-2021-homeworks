/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Organism {
    constructor(type, legs, hands, name, gender, saying) {
        this.type = type;
        this.legs = legs;
        this.hands = hands;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.friends = [];
    }

    addFriends(...Friends) {
        Friends.forEach(({name}) => this.friends.push(name));
        return this.friends;
    }

    toString() {
        let strings = [
            `type: ${this.type}; `,
            `legs: ${this.legs}; `,
            `hands: ${this.hands}; `,
            `name: ${this.name}; `,
            `gender: ${this.gender}; `,
            `saying: ${this.saying}; `,
        ];

        if (this.friends.length > 0) {
            strings.push(`friends: ${this.friends}; `);
        }
        return strings.join('');
    }
}

class Dog extends Organism {
    constructor(name, gender) {
        super('dog', 4, 0, name, gender, 'Woof!');
    }
}

class Cat extends Organism {
    constructor(name, gender) {
        super('cat', 4, 0, name, gender, 'Meow!');
    }
}

class Human extends Organism {
    constructor(name, gender, saying) {
        super('human', 2, 2, name, gender, saying);
    }
}

class Woman extends Human {
    constructor(name) {
        super(name, 'female', 'Hey there!');
    }
}

class Man extends Human {
    constructor(name) {
        super(name, 'male', 'Hello world!');
    }
}

class CatWoman extends Human {
    constructor(name) {
        super(name, 'female', cat.saying);
    }
}

const dog = new Dog('Fred', 'male');
const cat = new Cat('Luna', 'female');
const woman = new Woman('Adele');
const man = new Man('Arnold');
const catWoman = new CatWoman('Bella');
dog.addFriends(woman, man);
cat.addFriends(woman, man);
woman.addFriends(man, cat, dog);
man.addFriends(woman, cat, dog);
catWoman.addFriends(woman, cat);

const residents = [man, woman, cat, dog, catWoman];

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

residents.forEach((resident) => print(resident));

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
