class Inhabitants {
    constructor(species, name, gender, legs, hands, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.hands = hands;
        this.saying = saying;
    }

    sayHi() {
        return "My name is " + this.name + ". I'm " + this.species + ". My gender is " + this.gender +
            ". I have " + this.legs + " legs and " + this.hands + " hands. " + this.saying
    }
}

class Human extends Inhabitants {
    constructor(name, gender, saying) {
        super('human', name, gender, 2, 2, saying)
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
        super(species, name, gender, 4, 0, saying)
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
