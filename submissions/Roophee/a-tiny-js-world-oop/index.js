"use strict";

class Animalia {
    alive = true;
    canSaying = false;
    constructor(gender, legs, tail) {
        this.legs = legs;
        this.tail = tail;
        this.gender = gender;
    }
}

class Mammalia extends Animalia {
    canSaying = true;
    gregarious = true;
    description (arrayOfProperties) {
        return arrayOfProperties.map(property =>this[property]).join(';')
    }
    constructor(gender, friends, legs, tail) {
        super(gender, legs, tail);
        this.friends = friends.split(',');

    }
}

class HomoSapiens extends Mammalia {
    species = "human";
    hasName = true;
    constructor(name, gender, friends, sayingText) {
        super(gender, friends);
        this.name = name;
        this.legs = 2;
        this.hands = 2;
        this.tail = 'none';
        this.saying = sayingText;
    }
}

class Dog extends Mammalia {
    species = "dog";
    hasName = true;
    static saying = "Woof-Woof!";
    constructor(name, gender, friends) {
        super(gender, friends);
        this.legs = 4;
        this.hands = 'none';
        this.tail = 1;
        this.name = name;
        this.saying = Dog.saying;
    }
}

class Cat extends Mammalia {
    species = "cat";
    hasName = true;
    static saying = "Meow!";
    constructor(name, gender, friends) {
        super(gender, friends);
        this.legs = 4;
        this.hands = 'none';
        this.tail = 1;
        this.name = name;
        this.saying = Cat.saying;
    }
}

class CatWoman extends HomoSapiens {
    species = "cat-woman";
    catSaying() {
        return Cat.saying;
    }
    constructor(name, gender, friends) {
        super(name, gender, friends);
        this.saying = this.catSaying();
    }
}
const properties = ['species', 'name', 'gender', 'legs', 'hands', 'tail', 'saying', 'friends'],
    man = new HomoSapiens('Sam', 'male', 'Hanna, Milo', 'Honey, I\'m home'),
    woman = new HomoSapiens('Hanna', 'female', 'Sam, Milo, Kitty', "I\'m traveling down the river."),
    dog = new Dog('Milo', 'male', 'Sam, Hanna'),
    cat = new Cat("Kitty", 'female', ''),
    catWoman = new CatWoman('Susanna', 'female', 'Sam, Hanna, Milo, Kitty'),
    tinyWorld = [man, woman, dog, cat, catWoman];

print(tinyWorld.map(item => item.description(properties)).join('\n'))
