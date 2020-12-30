class Inhabitants {
    constructor(species, name, gender, legs, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.saying = saying;
    }

    sayHi() {
        let template = [
            `${this.saying}`,
            `My name is ${this.name}.`,
            `I am a ${this.species}.`,
            `My gender is ${this.gender}.`,
            `I have ${this.legs} legs`
        ];
        return template.join(' ');
    }
}

class Human extends Inhabitants {
    constructor(name, gender, saying) {
        super('human', name, gender, 2, saying);
        this.hands = 2;
    }

    sayHi() {
        return (
            super.sayHi() + ` and ${this.hands} hands.`
        )
    }
}

class Woman extends Human {
    constructor(name, saying) {
        super(name, 'female', saying)
    }
}

class Man extends Human {
    constructor(name, saying) {
        super(name, 'male', saying)
    }
}

class Animal extends Inhabitants {
    constructor(species, name, gender, saying) {
        super(species, name, gender, 4, saying)
    }
}

class Cat extends Animal {
    constructor(name, gender, saying) {
        super('cat', name, gender, saying)
    }
}

class Dog extends Animal {
    constructor(name, gender, saying) {
        super('dog', name, gender, saying)
    }
}

const woman = new Woman('Emilia', 'Hello, World!');
const man = new Man('Efrain', 'Hola! Mucho gusto!');
const cat = new Cat('Fluffy', 'female', 'Meow!');
const dog = new Dog('Buddy', 'male', 'Woof-woof!');

let inhabitants = [woman, man, cat, dog];

inhabitants.forEach(element => print(element.sayHi()));
