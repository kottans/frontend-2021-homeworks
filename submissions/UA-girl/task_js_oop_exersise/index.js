/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/UA-girl/a-tiny-JS-world
   Web app: https://ua-girl.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Creature {
    constructor(species, name, age, gender, legs, say, friends) {
        this.species = species;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.say = say;
        this.legs = legs
        this.friends = !(friends instanceof Array) ? [] : friends;
    }

    toString() {
        let message = `${this.say}! My name is ${this.name} and I am ${this.age} years old ${this.gender} ${this.species}. `
        message += this.friends.length > 0 ? 'My friends are ' + this.friends.join(', ') + '. ' : ''
        message += `I have ${this.legs} legs.`
        return message
    }
}

class Person extends Creature {
    constructor(species, name, age, gender, legs, say, friends) {
        super(species, name, age, gender, legs, say, friends);
        this.hands = 2;
    }

    toString() {
        let message = super.toString().slice(0, -1);
        return message + ` and ${this.hands} hands.`
    }
}

class Animal extends Creature {
    constructor(species, name, age, gender, legs, say, friends) {
        super(species, name, age, gender, legs, say, friends);
    }
}

const woman = new Person('human', 'Alice', 25, 'female', 2, 'Hello, dear!', ['Adam', 'Stephany', 'Iren']);
const man = new Person('human', 'Adam', 35, 'male', 2, 'Hey!', ['Alice', 'Stephany', 'Jeorge', 'Jack']);
const dog = new Animal('dog', 'Margo', 7, 'female', 4, 'Buf-buf!', ['Jack', 'Pashtet', 'Cesar']);
const cat = new Animal('cat', 'Murzik', 4, 'male', 4, 'Meow-meow!', ['Margo', 'Murka']);

// ======== OUTPUT ========

const inhabitats = [man, woman, dog, cat];
inhabitats.forEach(item => print(item, 'div'));
