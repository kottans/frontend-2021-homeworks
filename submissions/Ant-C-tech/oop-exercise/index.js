/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Ant-C-tech/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
    constructor(name, friends) {
        this.name = name;
        this.friends = friends;
        this.templete = `My name is ${this.name}`;
    };

    getVoice() {
        let pluralEnding;
        (this.friends && this.friends.length > 1) ? pluralEnding = 's': pluralEnding = '';
        return (this.friends) ? [
            this.templete,
            `I have friend${pluralEnding}: ${this.friends.join(', ')}`
        ].join('. ') : [
            this.templete,
            'I am looking for friends'
        ].join('. ');
    };
};

class Animal extends Inhabitant {
    constructor(gender, name, friends) {
        super(name, friends);
        this.gender = gender;
    };

    getVoice() {
        return [
            super.getVoice(),
            `My gender is ${ this.gender }`
        ].join('. ');
    };
}

class Dog extends Animal {
    constructor(gender, name, friends) {
        super(gender, name, friends);
        this.species = 'dog';
        this.saying = 'Woof-Woof!';
        this.legs = 4;
    };

    getVoice() {
        return [`I am a ${this.species}`,
            super.getVoice(),
            `I have ${this.legs} legs`,
            `I want to say you: "${this.saying}".`
        ].join('. ');
    };
}

class Cat extends Animal {
    constructor(gender, name, friends) {
        super(gender, name, friends);
        this.species = 'cat';
        this.saying = 'Meow-Meow!';
        this.legs = 4;
    };

    getVoice() {
        return [`I am a ${this.species}`,
            super.getVoice(),
            `I have ${this.legs} legs`,
            `I want to say you: "${this.saying}".`
        ].join('. ');
    };
}

class Human extends Animal {
    constructor(saying, gender, name, friends) {
        super(gender, name, friends);
        this.saying = saying;
        this.species = 'human';
        this.hands = 2;
        this.legs = 2;
    };

    getVoice() {
        return [
            `I am a ${this.species}`,
            super.getVoice(),
            `I have ${this.legs} legs and ${this.hands} hands`,
            `I want to say you: "${this.saying}".`
        ].join('. ');
    };
}

const dog = new Dog('male', 'Spike', ['John']);
const cat = new Cat('male', 'Tom', ['John']);
const woman = new Human('Nice to meet you!', 'female', 'Jane');
const man = new Human('Hi, how are you?', 'male', 'John', ['Spike', 'Tom']);

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
