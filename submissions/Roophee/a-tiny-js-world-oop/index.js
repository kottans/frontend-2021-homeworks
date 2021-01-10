"use strict";

const delimiter = '; '

class Inhabitant {
    constructor(name, gender, saying, legs = 4, tail = 1) {
        this.name = name;
        this.gender = gender;
        this.species = this.constructor.name.toLowerCase();
        this.saying = saying;
        this.legs = legs;
        this.tail = tail;
        this.friends = [];
    }

    addFriends(...arrayOfFriends) {
        arrayOfFriends.forEach(({ name }) => this.friends.push(name));
    }

    description() {
        return ['name', 'gender', 'species', 'saying', 'legs', 'tail', 'friends'].map(property => Array.isarray(this[property]) && this[property].length === 0 ? `${property}:none` : `${property}:${this[property]}`).join(delimiter);
    }
}

class Dog extends Inhabitant {
    static saying = 'Woof-Woof!';
    constructor(name, gender) {
        super(name, gender, Dog.saying);
    }
}

class Cat extends Inhabitant {
    static saying = 'Meow!';
    constructor(name, gender) {
        super(name, gender, Cat.saying);
    }
}

class Human extends Inhabitant {
    static saying = 'Cogito ergo sum!';
    constructor(name, gender, saying, legs = 2, tail = 'none') {
        super(name, gender, saying || Human.saying, legs, tail);
        this.hands = 2;
    }
    description() {
        return [super.description(), `hands:${this.hands}`].join(delimiter);
    }
}

class WomanCat extends Human {
    constructor(name, gender) {
        super(name, gender, Cat.saying);
    }
}

const dog = new Dog('Milo', 'male'),
    cat = new Cat('Kitty', 'female'),
    man = new Human('Michael', 'male'),
    woman = new Human('Helga', 'female', 'Per aspera ad astra!'),
    hero = new WomanCat('Sara', 'female'),
    population = [man, woman, dog, cat, hero];

dog.addFriends(man, woman);
man.addFriends(woman);
woman.addFriends(man, cat, dog);
hero.addFriends(man, woman, cat, dog);

population.forEach(item => print(item.description()));
