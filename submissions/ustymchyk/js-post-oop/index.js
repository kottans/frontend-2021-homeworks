/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Creature {
    constructor(name, gender, age, species) {
        if (new.target === Creature) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        this.species = species;
        this.name = name;
        this.gender = gender;
        this.age = age;
    }

    toString() {
        return [this.species, this.name, this.gender, this.age].join(',  ');
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

    constructor(name, gender, age, species, happySound, angrySound) {
        if (new.target === Pet) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        super(name, gender, age, species);

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

    toString() {
        return `${this.#happySound} ${super.toString()} ${this.#happySound}`;
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
        super(name, gender, age, 'cat', 'meow', 'shhhh');
    }
}

class Dog extends Pet {
    constructor(name, gender, age) {
        super(name, gender, age, 'dog', 'wof', 'grrrr');
    }
}

class Human extends Creature {
    #friends = [];
    #sympathy = [];
    #contacts = [];

    constructor(name, gender, age) {
        super(name, gender, age, 'human');
        this.spouse = null;
        this.children = [];
    }

    talkWith(otherHuman) {
        if (otherHuman instanceof Human) {
            if (!this.#contacts.includes(otherHuman)) {
                this._createContact(otherHuman);
                otherHuman.talkWith(this);
            }
        } else {
            console.log('I can speak only with human');
        }
    }

    makeProposal(otherHuman) {
        if (!this.spouse && otherHuman.answerProposal(this)) {
            this.spouse = otherHuman;
        }
    }

    answerProposal(otherHuman) {
        if (!this.spouse && this.#sympathy.includes(otherHuman)) {
            this.spouse = otherHuman;

            return true;
        }
    }

    getFriendsNames() {
        return this.#friends.map(human => human.name).join('; ');
    }

    toString() {
        const intro = `Hello! My name is ${this.name}, I'm ${this.age}. `;
        let friends = this.#friends.length ? `There is my friends: ${this.getFriendsNames()}. ` : '';
        let spouse = this.spouse ? `And i have a spouse ${this.spouse.name}; ` : '';
        let children = this.children.length
            ? `My ` + this.children.length > 1
                ? `children: ${this._getChildren()}`
                : `child: ${this._getChildren()}`
            : '';

        return intro + friends + spouse + children;
    }

    bornCreature(partner, femaleName, maleName) {
        if (this.spouse === partner) {
            const child = super.bornCreature(partner, femaleName, maleName);

            this.children.push(child);
            partner.addChild(child);

            return child;
        }
    }

    addChild(child) {
        this.children.push(child);
    }

    _getChildren() {
        return this.children.map(child => child.name).join('; ');
    }

    _createContact(otherHuman) {
        const random = Math.random();

        this.#contacts.push(otherHuman);

        if (random > .3) {
            this.#friends.push(otherHuman);
        }

        if (otherHuman.gender !== this.gender && random > .5) {
            this.#sympathy.push(otherHuman);
        }
    }
}

class Names {
    #maleNames = [
        'Liam', 'Noah', 'Oliver', 'William', 'Elijah', 'James', 'Benjamin',
        'Mason', 'Ethan', 'Alexander', 'Henry', 'Jacob', 'Michael', 'Daniel',
        'Logan', 'Jackson', 'Sebastian', 'Jack', 'Aiden', 'Owen', 'Samuel', 'Matthew'];

    #femaleNames = [
        'Olivia', 'Emma', 'Ava', 'Sophia', 'Isabella', 'Charlotte', 'Amelia', 'Mia', 'Harper',
        'Evelyn', 'Abigail', 'Emily', 'Ella', 'Elizabeth', 'Camila', 'Luna', 'Sofia', 'Avery',
        'Mila', 'Aria', 'Scarlett', 'Penelope', 'Layla', 'Chloe', 'Victoria', 'Madison', 'Eleanor',
        'Grace', 'Nora', 'Riley'];

    getMaleName() {
        return this._getRandomName(this.#maleNames);
    }

    getFemaleName() {
        return this._getRandomName(this.#femaleNames);
    }

    _getRandomName(namesArr) {
        return namesArr[Math.floor(Math.random() * namesArr.length)];
    }
}

const getRandomAge = () => Math.floor(Math.random() * 15 + 20);
const names = new Names();

const men = [];
const women = [];

for (let i = 0; i < 5; i++) {
    men.push(new Human(names.getMaleName(), 'm', getRandomAge()));
    women.push(new Human(names.getFemaleName(), 'f', getRandomAge()));
}

men.forEach(man => {
    women.forEach(woman => {
        man.talkWith(woman);
        man.makeProposal(woman);
        man.bornCreature(woman, names.getFemaleName(), names.getMaleName());
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

[...men, ...women, luna, leo, kitty, asher, ruby, puppy].forEach(creature => print(creature));
