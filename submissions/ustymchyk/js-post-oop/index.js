/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Creature {
    constructor(name, gender, age) {
        if (new.target === Creature) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        this.name = name;
        this.gender = gender;
        this.age = age;
    }

    bornCreature(partner = {}, femaleName, maleName) {
        if (partner.species === this.species && partner.gender !== this.gender) {
            const gender = Math.random() < .5 ? 'f' : 'm';
            const name = gender === 'f' ? femaleName : maleName;

            return new this.__proto__.constructor(name, gender, 0);
        } else {
            console.log('Sorry, we are traditional');
        }
    }
}

class Pet extends Creature {
    #happySound;
    #angrySound;
    #energy;

    constructor(name, gender, age, happySound, angrySound) {
        if (new.target === Creature) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        super(name, gender, age);

        this.#happySound = happySound;
        this.#angrySound = angrySound;
        this.#energy = 5;
    }

    play() {
        if (this.#energy) {
            this.#energy--;
            this._talk(this.#happySound);
        } else {
            this._talk(this.#angrySound);
            this._rest();
        }
    }

    pat() {
        this._talk(this.#happySound);
    }

    feed() {
        this.#energy++;
        this._talk(this.#happySound);
    }

    introduce() {
        return `${this.#happySound} ${this.name} ${this.#happySound} ${this.#happySound} ${this.gender} ${this.#happySound} ${this.age}`;
    }

    _talk(sound) {
        console.log(sound);
    }

    _rest() {
        this.#energy = 5;
    }
}

// I use _ instead of # in methods for prototype inheritance.
class Cat extends Pet {
    constructor(name, gender, age) {
        super(name, gender, age, 'meow', 'shhhh');
        this.species = 'cat';
    }
}

class Dog extends Pet {
    constructor(name, gender, age) {
        super(name, gender, age, 'wof', 'grrrr');
        this.species = 'dog';
    }
}

class Human extends Creature {
    #friends = [];
    #sympathy = [];
    #contacts = [];

    constructor(name, gender, age) {
        super(name, gender, age);
        this.species = 'human';
        this.spouse = null;
    }

    talkWith(otherHuman) {
        if (otherHuman instanceof Human) {
            if (!this.#contacts.includes(otherHuman.name)) {
                this._createContact(otherHuman);
                otherHuman.talkWith(this);
            }
        } else {
            console.log('I can speak only with human');
        }
    }

    makeProposal(otherHuman) {
        if (!this.spouse && otherHuman.answerProposal(this)) {
            this.spouse = otherHuman.name;
        }
    }

    answerProposal(otherHuman) {
        if (!this.spouse && this.#sympathy.includes(otherHuman.name)) {
            this.spouse = otherHuman.name;

            return true;
        }
    }

    getFriendsNames() {
        return this.#friends.join('; ');
    }

    introduce() {
        const intro = `Hello! My name is ${this.name}, I'm ${this.age}. `;
        let friends = '';
        let spouse = '';

        if (this.#friends.length) {
            friends = `There is my friends: ${this.getFriendsNames()}. `;
        }

        if (this.spouse) {
            spouse = `And i have a spouse ${this.spouse}; `;
        }

        return intro + friends + spouse;

    }

    _createContact(otherHuman) {
        const name = otherHuman.name;
        const random = Math.random();

        this.#contacts.push(name);

        if (random > .3) {
            this.#friends.push(name);
        }

        if (otherHuman.gender !== this.gender && random > .5) {
            this.#sympathy.push(otherHuman.name);
        }
    }
}

const getRandomAge = () => Math.floor(Math.random() * 15 + 20);

const men = ['Liam', 'Noah', 'Oliver', 'William', 'Elijah', 'James', 'Benjamin'].map(name => new Human(name, 'm', getRandomAge()));
const women = ['Olivia', 'Emma', 'Ava', 'Sophia', 'Isabella', 'Charlotte', 'Amelia'].map(name => new Human(name, 'f', getRandomAge()));

men.forEach(man => {
    women.forEach(woman => {
        man.talkWith(woman);
        man.makeProposal(woman);
    });
});

const luna = new Cat('Luna', 'f', 1);
const leo = new Cat('Leo', 'm', 1);

const kitty = luna.bornCreature(leo, 'Lola', 'Loki');

const asher = new Dog('Asher', 'm', 2);
const ruby = new Dog('Ruby', 'f', 2);

const puppy = ruby.bornCreature(asher, 'Sushi', 'Sid');


// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */

[...men, ...women, luna, leo, kitty, asher, ruby, puppy].forEach(creature => print(creature.introduce()));
