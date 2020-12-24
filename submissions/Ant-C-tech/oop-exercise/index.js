/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Ant-C-tech/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
    constructor(species, name, legs, saying, friends) {
        this.species = species;
        this.name = name;
        this.legs = legs;
        this.friends = friends;
        this.saying = saying;

        this.templete = [`I am a ${this.species}`,
            `My name is ${ this.name }`,
            `I have ${this.legs} legs`,
            `I want to say you: "${this.saying}"`
        ].join('. ');
    };

    getVoice() {
        return (this.friends) ? [
            this.templete,
            `I have friend${(this.friends.length > 1) ? 's' : ''}: ${this.friends.join(', ')}`
        ].join('. ') : [
            this.templete,
            'I am looking for friends'
        ].join('. ');
    };
};

class Animal extends Inhabitant {
    constructor(gender, species, name, legs, saying, friends) {
        super(species, name, legs, saying, friends);
        this.gender = gender;
    };

    getVoice() {
        return [
            super.getVoice(),
            `My gender is ${this.gender}`
        ].join('. ');
    };
}

class Dog extends Animal {
    constructor(gender, name, friends) {
        super(gender, 'dog', name, 4, 'Woof-Woof!', friends);
    };

    getVoice() {
        return super.getVoice() + '.';
    };
}

class Cat extends Animal {
    constructor(gender, name, friends) {
        super(gender, 'cat', name, 4, 'Meow-Meow!', friends);
    };

    getVoice() {
        return super.getVoice() + '.';
    };
}

class Human extends Animal {
    constructor(gender, name, saying, friends) {
        super(gender, 'human', name, 2, saying, friends);
        this.hands = 2;
    };

    getVoice() {
        return [
            super.getVoice(),
            `I have ${this.hands} hands.`
        ].join('. ');
    };
}

const dog = new Dog('male', 'Spike', ['John']);
const cat = new Cat('male', 'Tom', ['John']);
const woman = new Human('female', 'Jane', 'Nice to meet you!');
const man = new Human('male', 'John', 'Hi, how are you?', ['Spike', 'Tom']);

const inhabitants = [dog, cat, woman, man];

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

inhabitants.forEach((inhabitant) => {
    print(inhabitant.getVoice(), 'div');
});
