class Inhabitant {
    constructor(name, species, gender, greeting, friends) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.greeting = greeting;
        this.friends = friends;
    }
   
    say() {
        let haveFriend = (this.friends !== undefined) ? (this.friends.length === 1) ? "I have a friend. This is " + this.friends[0] : "I have friends. These are "+ this.friends.join(", ")   : "I'm alone. I have no friends!"; 
        return `I'm ${this.name}. I'm a ${this.species} and I have a ${this.gender} gender. ${haveFriend}.`;
    }
}

class Animal extends Inhabitant {
    constructor( name, species, gender, greeting, friends) {
       super( name, species, gender, greeting, friends)
       this.paws = 4;
    }

    say() {
        return `${this.greeting} ` + super.say() + ` I have ${this.paws} paws.`
    }
}

class Human extends Inhabitant {
    constructor(name, species, gender,  greeting, friends) {
       super(name, species, gender, greeting, friends);
       this.legs = 2;
       this.hands = 2;
       this.greeting = greeting;
    } 

    say() {
       return `${this.greeting} ` + super.say() + ` I have ${this.legs} legs and ${this.hands} hands.`
    }
}

class Dog extends Animal {
    constructor(name, species, gender, greeting, friends) {
        super(name, species, gender, greeting, friends)
    }
}

class Cat extends Animal {
    constructor(name, species, gender, greeting, friends) {
        super(name, species, gender, greeting, friends);
    }
}

class CatWoman extends Human {
    constructor(name, species, gender, greeting, friends) {
        super(name, species, gender, greeting, friends);
    } 
}


const man = new Human("Boris", "human", "male", "HI!", ["Vladimir", "Innokentiy", "Fedor"]);
const woman = new Human("Larisa", "human", "female", "Hello!", ["Diana","Laura","Svetlana"]);
const dog = new Dog("Sharikk", "dog", "male", "Woof-woof", ["Bublik"]);

let catVoice = "Meow-meow!"
const cat = new Cat("Murzik", "cat", "male",  catVoice, ["Sonya", "Garfild", "Carapka"]);
const catwoman = new CatWoman ("Selina Kyle", "humicat", "female", catVoice, ); 

print(man.say());
print(woman.say());
print(dog.say());
print(cat.say());
print(catwoman.say());

