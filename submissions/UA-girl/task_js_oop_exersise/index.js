/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/UA-girl/a-tiny-JS-world
   Web app: https://ua-girl.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Creature {
    constructor(species, name, age, gender, say) {
        this.species = species;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.say = say;
    }

    getDescription() {
        return `${this.say}! My name is ${this.name} and I am ${this.age} years old ${this.gender} ${this.species}. `}
}

class Person extends Creature {
    constructor(species, name, age, gender, say, friends = []) {
        super(species, name, age, gender, say);
        this.hands = 2;
        this.legs = 2;
        this.friends = friends.length > 0 ? friends : [];
    }

    getDescription() {
        let message = super.getDescription();
        message += `I have ${this.legs} legs and ${this.hands} hands. My friends are ${this.friends.join(', ')}.`;
        return message
    }
}

class Animal extends Creature {
    constructor(species, name, age, gender, say, friends = []) {
        super(species, name, age, gender, say);
        this.legs = 4;
        this.friends = friends.length > 0 ? friends : [];
    }

    getDescription() {
        let message = super.getDescription();
        message += `I have ${this.legs} legs. My friends are ${this.friends.join(', ')}.`;
        return message
    }
}

const woman = new Person(species='human', name='Alice', age = 25, gender = 'female', say = 'Hello, dear!', friends = ['Adam', 'Stephany', 'Iren']);
const man = new Person(species='human', name='Adam', age = 35, gender = 'male', say = 'Hey!', friends = ['Alice', 'Stephany', 'Jeorge', 'Jack']);
const dog = new Animal(species='dog', name='Margo', age = 7, gender = 'female', say = 'Buf-buf!', friends = ['Jack', 'Pashtet', 'Cesar']);
const cat = new Animal(species='cat', name='Murzik', age = 4, gender = 'male', say = 'Meow-meow!', friends = ['Margo', 'Murka']);

// ======== OUTPUT ========

const inhabitats = [man, woman, dog, cat];
inhabitats.forEach(item => print(item.getDescription(), 'div'));
