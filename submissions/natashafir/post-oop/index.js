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

const woman = new Inhabitants('human', 'Emilia', 'female', 2, 2, 'Hello, World!');
const man = new Inhabitants('human', 'Efrain', 'male', 2, 2, 'Nice to meet you!');
const cat = new Inhabitants('cat', 'Fluffy', 'female', 4, 0, 'Meow!');
const dog = new Inhabitants('dog', 'Buddy', 'male', 4, 0, 'Woof-woof!');

let inhabitants = [woman, man, cat, dog];

inhabitants.forEach(element => print(element.sayHi()));
