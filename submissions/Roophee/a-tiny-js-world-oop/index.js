"use strict";

class Organism {
    constructor(name, gender, saying, legs, hands, tail) {
        this.name = name;
        this.gender = gender;
        this.species = this.constructor.name.toLowerCase();
        this.saying = saying;
        this.legs = legs;
        this.hands = hands;
        this.tail = tail;
        this.friends = [];
    }

    addFriends(...arrayOfFriends) {
        arrayOfFriends.forEach(({ name }) => this.friends.push(name));
    }

    description() {
        let descriptionArray = [this.name, this.gender, this.species, this.saying, this.legs, this.hands, this.tail];
        this.friends.length === 0 ? descriptionArray.push('none') : descriptionArray.push(this.friends);
        return descriptionArray;
    }
}

class Dog extends Organism {
    static saying = 'Woof-Woof!';
    constructor(name, gender) {
        super(name, gender, Dog.saying, 4, 0, 1);
    }
}

class Cat extends Organism {
    static saying = 'Meow!';
    constructor(name, gender) {
        super(name, gender, Cat.saying, 4, 0, 1);
    }
}

class Human extends Organism {
    static saying = 'Cogito ergo sum!';
    constructor(name, gender, saying) {
        saying ? super(name, gender, saying, 2, 2, 0) : super(name, gender, Human.saying, 2, 2, 0);
    }
}

class WomanCat extends Human {
    constructor(name, gender) {
        super(name, gender, Cat.saying, 2, 2, 0);
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

population.forEach(item => print(item.description().join(';')));
