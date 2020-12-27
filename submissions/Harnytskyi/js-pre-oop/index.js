/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Harnytskyi/a-tiny-JS-world
   Web app: https://harnytskyi.github.io/a-tiny-JS-world 
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
    constructor(species, name, gender, legs, hands, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.hands = hands;
        this.saying = saying;
    };
    toString() {
        const infoMessage = [
            this.saying,
            'I am a',
            this.species + '.',
            'My name is',
            this.name + '.',
            'My gender is',
            this.gender + '.',
            `I have`,
            this.legs,
            this.definitionExtremities()
        ];
        return infoMessage.join(' ');
    }
    definitionExtremities() {
        if (this.species == 'human')
            return 'legs and ' + this.hands + ' hands.'
        else
            return 'paws.'
    }
}
class Human extends Inhabitant {
    constructor(name, gender, saying) {
        super('human', name, gender, 2, 2, saying);
    }
}
class Man extends Human {
    constructor(name, saying) {
        super(name, 'male', saying);
    }
}
class Woman extends Human {
    constructor(name, saying) {
        super(name, 'female', saying);
    }
}
class Dog extends Inhabitant {
    constructor(name, gender) {
        super('dog', name, gender, 4, 0, 'Gav');
    }
}
class Cat extends Inhabitant {
    constructor(name, gender) {
        super('cat', name, gender, 4, 0, 'Meow');
    }
}

const man = new Man('John', 'Hello, everybody!');
const woman = new Woman('Jessica', 'Good morning, gays!');
const cat = new Cat('Tom', 'male');
const dog = new Dog('Jerry', 'female');

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

const inhabitants = [man, woman, cat, dog];
inhabitants.forEach(key => print(key));

