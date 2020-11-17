/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
    constructor(species, name, gender, legs, saying, friends = []) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.saying = saying;
        this.friends = friends;
        this.addFriends(friends);
    }

    addFriends(friends) {
        if(Array.isArray(friends)) this.friends = [...this.friends, ...friends];
        else this.friends.push(friends);
    }

    getFriendsName() {
        return this.friends.length > 0
            ? this.friends.map(friend => friend.name).join(', ')
            : 'the world';
    }

    sayHi() {
        return( `${this.saying} I'm a ${this.species}, ${this.gender} with the name ${this.name}. I want to say hi to <b>${this.getFriendsName()}</b>, you are the best! By the way, I have ${this.legs} legs.`);
    }
}

class Animal extends Inhabitant {
    constructor(species, name, gender, saying, friends) {
        super(species, name, gender, 4, saying, friends);
    }
}


class Dog extends Animal {
    constructor(name, gender, friends) {
        super('dog', name, gender, 'Woof-woof', friends);
    }
}

class Cat extends Animal {
    constructor(name, gender, friends) {
        super('cat', name, gender, 'Meeeow!', friends);
    }
}

class Human extends Inhabitant {
    hands = 2;
    constructor(name, gender, saying, friends) {
        super('human', name, gender, 2, saying, friends);
    }

    sayHi() {
        return(
            super.sayHi() + ` And ${this.hands} hands.`
        )
    }
}

class Man extends Human {
    constructor(name, saying, friends) {
        super(name, 'male', saying, friends);
    }
}

class Woman extends Human {
    constructor(name, saying, friends) {
        super(name, 'female', saying, friends);
    }
}

const dog = new Dog('Ivan', 'male');
const cat = new Cat('Pushok', 'male');
const catWoman = new Cat('Murka', 'female');
const manAndre = new Man('Andre', 'How you doing?');
const manVasya = new Man('Vasya', 'How do you dou?');
const manMitya = new Man('Mitya', 'How are you?');
const womanNatali = new Woman('Natali', 'Nice to meet you!');

dog.friends = [cat, catWoman, manVasya];
cat.friends = [dog, womanNatali];
catWoman.friends = [dog, womanNatali];
manAndre.friends = [manVasya, manMitya];
manVasya.friends = [dog, manAndre, manMitya];
manMitya.friends = [manAndre, manVasya];
womanNatali.friends = [cat, catWoman];

// Andre met Natali, they are friends now!
manAndre.addFriends(womanNatali);
womanNatali.addFriends(manAndre);


const inhabitants = [dog, cat, catWoman, manAndre, manVasya, manMitya, womanNatali];

inhabitants.forEach(inhabitant => print(inhabitant.sayHi()));

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


