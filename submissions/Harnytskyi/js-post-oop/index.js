/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://harnytskyi.github.io/a-tiny-JS-world
   Web app: https://github.com/Harnytskyi/a-tiny-JS-world
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
    constructor(species, name, gender, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
    };
    toString() {
        return [
            this.saying,
            `I am a ${this.species}.`,
            `My name is ${this.name}.`,
            `My gender is ${this.gender}.`
        ].join(' ');
    }
}
class Human extends Inhabitant {
    constructor(name, gender, saying) {
        super('human', name, gender, saying);
        this.legs = 2;
        this.hands = 2;
    };
    toString(){
        return `{${super.toString()} I have ${this.legs} legs and ${this.hands} hands.`;
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
class Mammal extends Inhabitant{
    constructor(species, name, gender, saying){
        super(species, name, gender, saying);
        this.paws = 4;
    };
    toString(){
        return `{${super.toString()} I have ${this.paws} paws.`;
    }
}

class Dog extends Mammal {
    constructor(name, gender) {
        super('dog', name, gender, 'Gav');
    }
}
class Cat extends Mammal {
    constructor(name, gender) {
        super('cat', name, gender, 'Meow');
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

